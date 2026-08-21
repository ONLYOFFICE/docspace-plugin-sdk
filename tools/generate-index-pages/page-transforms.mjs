// @ts-check
import { basename } from "node:path";
import { collectPageAnchors, walkMarkdownLines } from "../shared/markdown.mjs";

export const SOURCE_LINK_LABEL = "View source on GitHub";

const IMAGE_BASE = "/assets/images/docspace";

const ANY_HEADING = /^(#{1,6}) /;
const SECTION_START = /^## /m;
const SOURCE_REFERENCE = /^Defined in: \[[^\]]+\]\((https:\/\/github\.com\/[^)]+)\)$/;
const PLUGIN_IMAGE_TAG =
  /<plugin-image\s+src=(["'])([^"']+)\1(\s+dark(?:=(["'])([^"']*)\4)?)?\s*\/>/g;
const IN_PAGE_LINK = /\]\(#([^)\s]+)\)/g;

/**
 * The H2 names under which a page's main symbol may live: the file name
 * itself, or the interface/type-alias spelling of it.
 * @param {string} pageName
 */
function mainSymbolNames(pageName) {
  return [pageName, `I${pageName}`, `T${pageName}`];
}

/**
 * Rewrites "Defined in: [file.ts:12](url)" to "[View source on GitHub](url)" —
 * one link per symbol (the line under an H1/H2). Member-level ones are dropped.
 * Runs before the heading shifts, while symbols are still H1/H2.
 * @param {string} content
 */
function convertSourceLinks(content) {
  /** @type {string[]} */
  const resultLines = [];

  let isUnderSymbolHeading = false;

  for (const { line, insideCodeBlock } of walkMarkdownLines(content)) {
    if (insideCodeBlock) {
      resultLines.push(line);
      continue;
    }

    const headingMatch = line.match(ANY_HEADING);
    if (headingMatch) {
      isUnderSymbolHeading = headingMatch[1].length <= 2;
      resultLines.push(line);
      continue;
    }

    const sourceMatch = line.match(SOURCE_REFERENCE);
    if (!sourceMatch) {
      resultLines.push(line);
      continue;
    }

    if (isUnderSymbolHeading) {
      resultLines.push(`[${SOURCE_LINK_LABEL}](${sourceMatch[1]})`);
      isUnderSymbolHeading = false;
      continue;
    }

    // Member-level source line: drop it and the blank line it leaves behind.
    if (resultLines[resultLines.length - 1]?.trim() === "") resultLines.pop();
  }

  return resultLines.join("\n");
}

/**
 * Moves the H2 section matching the file name to the front. Fixes TypeDoc's
 * kind-based ordering (e.g. an Interface before the main TypeAlias).
 * @param {string} content
 * @param {string} filePath
 */
function hoistMainSection(content, filePath) {
  const pageName = basename(filePath, ".md");

  const preambleMatch = content.match(/^([\s\S]*?)(?=^## )/m);
  if (!preambleMatch) return content;

  const preamble = preambleMatch[1];
  const sections = content.slice(preamble.length).split(/(?=^## )/m);
  if (sections.length <= 1) return content;

  const mainSectionIndex = sections.findIndex((section) =>
    mainSymbolNames(pageName).some((symbolName) =>
      new RegExp(`^## ${symbolName}\\b`).test(section)
    )
  );
  if (mainSectionIndex <= 0) return content; // already first or not found

  const mainSection = sections.splice(mainSectionIndex, 1)[0];
  return preamble + mainSection + sections.join("");
}

/**
 * Within each H2 section, moves `### Example(s)` ahead of the other H3
 * subsections (Type Declaration, Properties, ...) — the example belongs with
 * the prose, not below the reference tables.
 * @param {string} content
 */
function reorderExamplesFirst(content) {
  return content
    .split(/(?=^## )/m)
    .map((section) => {
      const parts = section.split(/(?=^### )/m);
      if (parts.length <= 1) return section;

      const [intro, ...subsections] = parts;
      const isExample = (/** @type {string} */ subsection) =>
        /^### Examples?\b/.test(subsection);

      const examples = subsections.filter(isExample);
      if (!examples.length) return section;

      const others = subsections.filter((subsection) => !isExample(subsection));
      return intro + examples.join("") + others.join("");
    })
    .join("");
}

/**
 * `main-button.png` -> `main-button.dark.png`
 * @param {string} imageName
 */
function deriveDarkImageName(imageName) {
  return imageName.replace(/(\.[^.]+)$/, ".dark$1");
}

/**
 * Rewrites `<plugin-image src="x.png" [dark[="y.png"]] />` to Markdown images.
 * With `dark`, a light/dark pair is emitted using the `#gh-*-mode-only` URL
 * convention the docs site toggles via CSS; a valueless `dark` derives the
 * file name. A tag that does not match is reported, not shipped.
 * @param {string} content
 * @param {string} filePath
 */
function resolvePluginImageTags(content, filePath) {
  const updated = content.replace(
    PLUGIN_IMAGE_TAG,
    (_tag, _quote, imageName, darkAttribute, _darkQuote, darkAttributeValue) => {
      const altText = imageName.replace(/\.[^.]+$/, "");

      if (darkAttribute === undefined) {
        return `![${altText}](${IMAGE_BASE}/${imageName})`;
      }

      const darkImageName = darkAttributeValue
        ? darkAttributeValue
        : deriveDarkImageName(imageName);
      const lightImage = `![${altText}](${IMAGE_BASE}/${imageName}#gh-light-mode-only)`;
      const darkImage = `![${altText}](${IMAGE_BASE}/${darkImageName}#gh-dark-mode-only)`;
      return `${lightImage}${darkImage}`;
    }
  );

  for (const leftoverTag of updated.matchAll(/<plugin-image[^>]*>/g)) {
    console.warn(
      `[warn] Unrecognised ${leftoverTag[0]} in ${basename(filePath)} — left as raw HTML`
    );
  }

  return updated;
}

/**
 * Gives the page its H1 (TypeDoc emits none — `hidePageTitle` is true):
 * - one H2, or the first H2 matches the file name → promote it to H1;
 * - several H2s with a module preamble → inject "# Filename" + preamble;
 * - otherwise leave as is.
 * @param {string} content
 * @param {string} filePath
 */
function promoteFirstH2toH1(content, filePath) {
  const pageName = basename(filePath, ".md");

  const frontmatterMatch = content.match(/^(---\n[\s\S]*?---\n)/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : "";
  const body = content.slice(frontmatter.length);

  // Already promoted — promoting again would create a second H1.
  if (/^# /m.test(body)) return content;

  const firstSectionStart = body.search(SECTION_START);
  if (firstSectionStart < 0) return content;

  const preamble = body.slice(0, firstSectionStart).trim();
  const sections = body.slice(firstSectionStart);

  const firstSectionName =
    (sections.match(/^## (.+?)(?:\s|$)/m) || [])[1]?.trim() ?? "";
  const sectionCount = (sections.match(/^## /gm) ?? []).length;
  const firstSectionIsMainSymbol =
    mainSymbolNames(pageName).includes(firstSectionName);

  if (firstSectionIsMainSymbol || sectionCount === 1) {
    return content.replace(SECTION_START, "# ");
  }

  if (preamble) {
    // The sidebar takes its label from this H1 (flatten-sidebar.mjs).
    const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return frontmatter + `# ${title}\n\n${preamble}\n\n` + sections;
  }

  return content;
}

/**
 * Shifts the main symbol's H3+ headings up one level, so after the H1
 * promotion its groups land on H2 and members on H3 — within Docusaurus'
 * TOC cutoff. Only the region between the H1 and the next H2 moves.
 * @param {string} content
 */
function raiseMainSymbolSubtree(content) {
  const markedLines = [...walkMarkdownLines(content)];

  const titleIndex = markedLines.findIndex(
    ({ line, insideCodeBlock }) => !insideCodeBlock && /^# /.test(line)
  );
  if (titleIndex < 0) return content;

  let subtreeEnd = markedLines.length;
  for (let index = titleIndex + 1; index < markedLines.length; index++) {
    const { line, insideCodeBlock } = markedLines[index];
    if (!insideCodeBlock && /^## /.test(line)) {
      subtreeEnd = index;
      break;
    }
  }

  return markedLines
    .map(({ line, lineNumber, insideCodeBlock }) => {
      if (insideCodeBlock || lineNumber <= titleIndex || lineNumber >= subtreeEnd) {
        return line;
      }

      const headingMatch = line.match(/^(#{3,6}) (.*)$/);
      return headingMatch ? `${headingMatch[1].slice(1)} ${headingMatch[2]}` : line;
    })
    .join("\n");
}

/**
 * Removes the stray `\|` TypeDoc leaves in front of the first member of a
 * union: on the line that opens a multi-line union, and after the `=>` of a
 * function type inside a table cell.
 * @param {string} content
 */
function fixUnionPipeArtifacts(content) {
  /** @type {string[]} */
  const resultLines = [];

  // Tracked separately from the current line: the previous line may already
  // have had its pipe stripped, which would make every union separator look
  // like an opener.
  let previousLineWasUnionMember = false;

  for (const { line, insideCodeBlock } of walkMarkdownLines(content)) {
    if (insideCodeBlock) {
      resultLines.push(line);
      previousLineWasUnionMember = false;
      continue;
    }

    const isUnionMember = /^\s*\\\| /.test(line);
    const opensUnion = isUnionMember && !previousLineWasUnionMember;

    let updatedLine = opensUnion ? line.replace(/^(\s*)\\\| /, "$1") : line;
    updatedLine = updatedLine.replaceAll("=> \\| ", "=> ");

    resultLines.push(updatedLine);
    previousLineWasUnionMember = isUnionMember;
  }

  return resultLines.join("\n");
}

/**
 * Escapes the `|` inside a table cell's inline code — TypeDoc escapes its own
 * pipes but not the ones a comment contributes (e.g. an @example of a union),
 * and an unescaped pipe breaks the row.
 * @param {string} content
 */
function escapePipesInTableCells(content) {
  return [...walkMarkdownLines(content)]
    .map(({ line, insideCodeBlock }) => {
      if (insideCodeBlock || !line.startsWith("|")) return line;

      return line.replace(/`[^`]*`/g, (inlineCode) =>
        inlineCode.replace(/(?<!\\)\|/g, "\\|")
      );
    })
    .join("\n");
}

/**
 * Repairs in-page hash links: drops stale `-N` dedup suffixes when the plain
 * anchor exists, and warns about anchors that resolve to nothing.
 * @param {string} content
 * @param {string} filePath
 */
function fixInPageAnchors(content, filePath) {
  const anchors = collectPageAnchors(content);

  return content.replace(IN_PAGE_LINK, (wholeLink, anchor) => {
    const normalizedAnchor = anchor.toLowerCase();
    if (anchors.has(normalizedAnchor)) return wholeLink;

    const withoutSuffix = normalizedAnchor.replace(/-\d+$/, "");
    if (withoutSuffix !== normalizedAnchor && anchors.has(withoutSuffix)) {
      return `](#${withoutSuffix})`;
    }

    console.warn(
      `[warn] Unresolved in-page anchor #${anchor} in ${basename(filePath)}`
    );
    return wholeLink;
  });
}

/**
 * Guarantees the blank line MDX needs before a heading — hoistMainSection can
 * leave a heading directly after the moved section's last line.
 * @param {string} content
 */
function ensureBlankLineBeforeHeadings(content) {
  /** @type {string[]} */
  const resultLines = [];

  for (const { line, insideCodeBlock } of walkMarkdownLines(content)) {
    const isHeading = !insideCodeBlock && ANY_HEADING.test(line);
    const previousLine = resultLines[resultLines.length - 1];

    if (isHeading && previousLine !== undefined && previousLine.trim() !== "") {
      resultLines.push("");
    }

    resultLines.push(line);
  }

  return resultLines.join("\n");
}

/**
 * Strips a dangling `***` at the end of a page — the member separator of a
 * section that hoistMainSection moved last.
 * @param {string} content
 */
function stripTrailingHorizontalRule(content) {
  return content.replace(/\n\*{3,}\s*$/, "\n");
}

export const STRUCTURAL_TRANSFORMS = [
  convertSourceLinks,
  hoistMainSection,
  reorderExamplesFirst,
  resolvePluginImageTags,
  promoteFirstH2toH1,
  raiseMainSymbolSubtree
];

export const CLEANUP_TRANSFORMS = [
  fixUnionPipeArtifacts,
  escapePipesInTableCells,
  fixInPageAnchors,
  ensureBlankLineBeforeHeadings,
  stripTrailingHorizontalRule
];
