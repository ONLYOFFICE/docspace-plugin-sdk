// @ts-check
import { readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { transformFile, walkMarkdownLines } from "../shared/markdown.mjs";

const APITABLE_IMPORT =
  "import APITable from '@site/src/components/APITable/APITable';";

const ROW_ANCHOR = /^\| <a id="([^"]+)"><\/a> /;
const HEADING = /^(#{1,6}) (.+)$/;
const FIRST_CELL = /^\| ((?:\\\||[^|])+?) \|/;
const LINK_WITH_FRAGMENT = /\]\(([^)#\s]*)#([^)\s]+)\)/g;

// Subsection titles TypeDoc puts between a symbol heading and its tables —
// skipped when resolving which symbol a table belongs to.
const GROUP_HEADINGS = new Set([
  "example", "examples", "properties", "methods", "parameters", "returns",
  "type declaration", "enumeration members", "see", "remarks", "deprecated"
]);

/**
 * The row id the APITable component derives at runtime: the innermost text of
 * the first element in the first cell (mirrors its getRowName).
 * @param {string} cellText
 */
function rowNameOf(cellText) {
  const inlineCode = cellText.match(/`([^`]+)`/);
  return inlineCode ? inlineCode[1] : cellText.replace(/[~*_[\]`\\]/g, "").trim();
}

/**
 * A contiguous run of `|` lines containing at least one `<a id>` row, plus the
 * symbol heading it documents (nearest preceding non-group heading).
 * @typedef {Object} MemberTable
 * @property {number} start - first line of the table
 * @property {number} end - line after the table's last line
 * @property {string} symbolName
 * @property {{lineNumber: number, oldId: string, rowName: string}[]} rows
 */

/**
 * Finds the member tables of a page (tables whose rows carry TypeDoc's
 * `<a id>` anchors) and the symbol each belongs to.
 * @param {string[]} lines
 * @param {boolean[]} insideCode
 * @returns {MemberTable[]}
 */
function findMemberTables(lines, insideCode) {
  /** @type {MemberTable[]} */
  const tables = [];
  let symbolName = "";

  for (let index = 0; index < lines.length; index++) {
    if (insideCode[index]) continue;

    const headingMatch = lines[index].match(HEADING);
    if (headingMatch && !GROUP_HEADINGS.has(headingMatch[2].trim().toLowerCase())) {
      symbolName = headingMatch[2].trim();
      continue;
    }

    if (!lines[index].startsWith("|")) continue;

    const start = index;
    /** @type {MemberTable["rows"]} */
    const rows = [];

    while (index < lines.length && lines[index].startsWith("|")) {
      const anchorMatch = lines[index].match(ROW_ANCHOR);
      if (anchorMatch) {
        const cellMatch = lines[index]
          .replace(ROW_ANCHOR, "| ")
          .match(FIRST_CELL);
        rows.push({
          lineNumber: index,
          oldId: anchorMatch[1],
          rowName: rowNameOf(cellMatch ? cellMatch[1] : "")
        });
      }
      index++;
    }

    if (rows.length) tables.push({ start, end: index, symbolName, rows });
  }

  return tables;
}

/**
 * Wraps the member tables of one page in `<APITable>` (via mdx-code-block
 * fences, import once per page) and strips the `<a id>` row anchors — the
 * component derives the same row ids at runtime and adds hash navigation
 * with row highlighting. Tables get a `name` prefix when the page's row
 * names collide across tables. Returns the old anchor → new id map.
 * @param {string} filePath
 * @returns {Map<string, string>}
 */
function wrapMemberTables(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const marked = [...walkMarkdownLines(content)];
  const lines = marked.map(({ line }) => line);
  const insideCode = marked.map(({ insideCodeBlock }) => insideCodeBlock);

  const tables = findMemberTables(lines, insideCode);
  /** @type {Map<string, string>} */
  const anchorMap = new Map();
  if (!tables.length) return anchorMap;

  const allRowNames = tables.flatMap(({ rows }) => rows.map((row) => row.rowName));
  const usePrefix = new Set(allRowNames).size !== allRowNames.length;

  for (const table of tables) {
    const prefix = usePrefix
      ? `${table.symbolName.replace(/[^\w.-]/g, "")}-`
      : "";

    for (const row of table.rows) {
      const newId = prefix + row.rowName;
      if (anchorMap.has(row.oldId) || [...anchorMap.values()].includes(newId)) {
        console.warn(
          `[warn] Duplicate APITable row id "${newId}" in ${basename(filePath)}`
        );
      }
      anchorMap.set(row.oldId, newId);
      lines[row.lineNumber] = lines[row.lineNumber].replace(ROW_ANCHOR, "| ");
    }
  }

  // Rebuild the page back to front so line numbers stay valid.
  for (let i = tables.length - 1; i >= 0; i--) {
    const { start, end } = tables[i];
    const nameAttribute = usePrefix
      ? ` name="${tables[i].symbolName.replace(/[^\w.-]/g, "")}"`
      : "";
    const opener = [
      "```mdx-code-block",
      ...(i === 0 ? [APITABLE_IMPORT, ""] : []),
      `<APITable${nameAttribute}>`,
      "```",
      ""
    ];
    const closer = ["", "```mdx-code-block", "</APITable>", "```"];
    lines.splice(end, 0, ...closer);
    lines.splice(start, 0, ...opener);
  }

  transformFile(filePath, () => lines.join("\n"));
  return anchorMap;
}

/**
 * Wraps member tables in the APITable component on every page, then rewrites
 * in-page and cross-page fragment links from TypeDoc's lowercase `<a id>`
 * anchors to the case-sensitive row ids the component derives. Cross-file —
 * runs after the cleanup transforms, which validate the original anchors.
 * @param {string[]} filePaths
 */
export function applyApiTables(filePaths) {
  /** @type {Map<string, Map<string, string>>} */
  const anchorMapsByPage = new Map();

  for (const filePath of filePaths) {
    anchorMapsByPage.set(resolve(filePath), wrapMemberTables(filePath));
  }

  for (const filePath of filePaths) {
    transformFile(filePath, (content) =>
      content.replace(LINK_WITH_FRAGMENT, (wholeLink, relativePath, fragment) => {
        const targetPath = relativePath
          ? resolve(dirname(filePath), relativePath)
          : resolve(filePath);
        const newId = anchorMapsByPage.get(targetPath)?.get(fragment);
        return newId ? `](${relativePath}#${newId})` : wholeLink;
      })
    );
  }
}
