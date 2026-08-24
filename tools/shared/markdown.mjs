// @ts-check
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const CODE_BLOCK_MARKER = /^\s*(```|~~~)/;
const EXPLICIT_ANCHOR = /<a id="([^"]+)"><\/a>/g;
const SECONDARY_HEADING = /^#{2,6} (.+)$/;

/**
 * Yields every line of a Markdown document with its position and whether it
 * belongs to a code block (the ``` marker lines included).
 * @param {string} content
 * @returns {Generator<{line: string, lineNumber: number, insideCodeBlock: boolean}>}
 */
export function* walkMarkdownLines(content) {
  const lines = content.split("\n");

  let openedCodeBlock = false;

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    const isCodeBlockMarker = CODE_BLOCK_MARKER.test(line);

    if (isCodeBlockMarker) openedCodeBlock = !openedCodeBlock;

    yield {
      line,
      lineNumber,
      insideCodeBlock: openedCodeBlock || isCodeBlockMarker
    };
  }
}

/**
 * Reads a page, applies a content transform, writes back only on change.
 * @param {string} filePath
 * @param {(content: string, filePath: string) => string} transform
 */
export function transformFile(filePath, transform) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf-8");
  const updated = transform(content, filePath);

  if (updated !== content) writeFileSync(filePath, updated, "utf-8");
}

/**
 * Docusaurus-compatible slug for a heading text (github-slugger style).
 * @param {string} text
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*\\]/g, "")
    .replace(/[^\w\- ]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * All anchors a page offers: heading slugs (H2–H6, deduplicated with `-N`
 * suffixes the way github-slugger does) plus the `<a id>` on table rows.
 * @param {string} content
 * @returns {Set<string>}
 */
export function collectPageAnchors(content) {
  /** @type {Map<string, number>} */
  const usedSlugCounts = new Map();
  const anchors = new Set();

  for (const { line, insideCodeBlock } of walkMarkdownLines(content)) {
    if (insideCodeBlock) continue;

    for (const [, anchorId] of line.matchAll(EXPLICIT_ANCHOR)) {
      anchors.add(anchorId.toLowerCase());
    }

    const headingMatch = line.match(SECONDARY_HEADING);
    if (!headingMatch) continue;

    const slug = slugify(headingMatch[1]);
    if (!slug) continue;

    const timesSeen = usedSlugCounts.get(slug) ?? 0;
    usedSlugCounts.set(slug, timesSeen + 1);
    anchors.add(timesSeen === 0 ? slug : `${slug}-${timesSeen}`);
  }

  return anchors;
}
