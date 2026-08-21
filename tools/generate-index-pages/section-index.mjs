// @ts-check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { walkMarkdownLines } from "../shared/markdown.mjs";
import { SOURCE_LINK_LABEL } from "./page-transforms.mjs";

/**
 * True for a source reference line, raw ("Defined in:") or rewritten.
 * @param {string} line
 */
function isSourceReferenceLine(line) {
  return (
    line.startsWith("Defined in:") || line.startsWith(`[${SOURCE_LINK_LABEL}](`)
  );
}

/**
 * First sentence of a text. Does not break on periods inside parentheses,
 * after common abbreviations ("etc.", "e.g.") or inside tokens ("9.2").
 * @param {string} text
 */
function firstSentence(text) {
  if (!text) return "";

  const endsWithAbbreviation = /(?:\betc|\be\.g|\bi\.e|\bvs)\.$/i;
  let parenthesesDepth = 0;

  for (let position = 0; position < text.length; position++) {
    const character = text[position];

    if (character === "(") parenthesesDepth++;
    else if (character === ")") {
      parenthesesDepth = Math.max(0, parenthesesDepth - 1);
    } else if (
      (character === "." || character === "!" || character === "?") &&
      parenthesesDepth === 0
    ) {
      const nextCharacter = text[position + 1];
      if (nextCharacter !== undefined && nextCharacter !== " ") continue;
      if (
        character === "." &&
        endsWithAbbreviation.test(text.slice(0, position + 1))
      ) {
        continue;
      }
      return text.slice(0, position + 1);
    }
  }

  return text;
}

/**
 * H1 title of a generated page (falls back to the given name), so index tables
 * and sidebar labels match the page even when it differs from the file name.
 * @param {string} pagePath
 * @param {string} fallback
 */
function readPageTitle(pagePath, fallback) {
  const content = readFileSync(pagePath, "utf-8");
  const titleMatch = content.match(/^# (.+)$/m);
  return titleMatch ? titleMatch[1].trim() : fallback;
}

/**
 * Description of the page's main symbol: the first paragraph after the H1,
 * skipping the source link, images and signature blocks. Runs after the H1
 * transforms; falls back to the paragraph after the source link.
 * @param {string} pagePath
 */
function readPageDescription(pagePath) {
  const content = readFileSync(pagePath, "utf-8");
  const body = content.replace(/^---\n[\s\S]*?---\n/, "");

  let passedTitleOrSourceLink = false;
  const descriptionLines = [];

  for (const { line, insideCodeBlock } of walkMarkdownLines(body)) {
    if (insideCodeBlock) continue;

    const trimmed = line.trim();

    if (/^# /.test(line) || isSourceReferenceLine(trimmed)) {
      if (descriptionLines.length > 0) break;
      passedTitleOrSourceLink = true;
      continue;
    }

    if (/^#{2,} /.test(line)) break;

    if (!trimmed) {
      if (descriptionLines.length > 0) break;
      continue;
    }

    const isImageOrQuote =
      trimmed.startsWith("![") ||
      trimmed.startsWith("<plugin-image") ||
      trimmed.startsWith(">");
    if (isImageOrQuote) continue;

    if (!passedTitleOrSourceLink) continue;

    descriptionLines.push(trimmed);
  }

  return firstSentence(descriptionLines.join(" ").trim());
}

/**
 * Generates index.md for one section: title, prose from sections.mjs, and an
 * overview table built from the final page titles and descriptions.
 * @param {import("../constants/sections.mjs").Section} section
 * @param {string} docsDir
 */
export function generateIndexPage(section, docsDir) {
  const sectionPath = join(docsDir, section.docsDir);

  if (!existsSync(sectionPath)) {
    console.warn(`⚠️  Skipping "${section.title}" — docs directory not found`);
    return;
  }

  const pageFiles = readdirSync(sectionPath)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "index.md")
    .sort();

  const tableRows = [];
  for (const fileName of pageFiles) {
    const pageName = basename(fileName, ".md");
    const pagePath = join(sectionPath, fileName);

    const displayName = readPageTitle(pagePath, pageName);
    const description = readPageDescription(pagePath) || "—";
    const extraColumnValue = section.tableExtraValues?.[pageName] || "—";

    tableRows.push(
      section.tableExtraColumn
        ? `| [\`${displayName}\`](${fileName}) | ${description} | ${extraColumnValue} |`
        : `| [\`${displayName}\`](${fileName}) | ${description} |`
    );
  }

  if (!tableRows.length) {
    console.warn(`⚠️  No docs found for "${section.title}" — skipping`);
    return;
  }

  const headerName = section.tableHeaderName ?? "Interface";
  const tableHeader = section.tableExtraColumn
    ? `| ${headerName} | Description | ${section.tableExtraColumn} |\n| --- | --- | --- |`
    : `| ${headerName} | Description |\n| --- | --- |`;

  const content = [
    `# ${section.title}`,
    ``,
    section.description,
    ...(section.usage ? [``, section.usage] : []),
    ``,
    `## Overview`,
    ``,
    section.tableCaption,
    ``,
    tableHeader,
    ...tableRows
  ].join("\n");

  writeFileSync(join(sectionPath, "index.md"), content, "utf-8");
  console.log(
    `✅  Generated: docs/${section.docsDir}/index.md  (${tableRows.length} entries)`
  );
}
