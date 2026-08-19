// @ts-check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SECTIONS } from "./constants/sections.mjs";

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, "../..");
const DOCS_DIR = join(ROOT, "docs");

const SOURCE_LINK_LABEL = "View source on GitHub";
const IMAGE_BASE = "/assets/images/docspace";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Reads a page, applies a content transform, writes back only on change.
 * @param {string} filePath
 * @param {(content: string, filePath: string) => string} transform
 */
function transformFile(filePath, transform) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf-8");
  const updated = transform(content, filePath);
  if (updated !== content) writeFileSync(filePath, updated, "utf-8");
}

/**
 * True for a source reference line, raw ("Defined in:") or rewritten.
 * @param {string} line
 */
function isSourceLine(line) {
  return (
    line.startsWith("Defined in:") || line.startsWith(`[${SOURCE_LINK_LABEL}](`)
  );
}

/**
 * Docusaurus-compatible slug for a heading text (github-slugger style).
 * @param {string} text
 */
function slugify(text) {
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
 * Fenced blocks are skipped.
 * @param {string} content
 * @returns {Set<string>}
 */
function pageAnchors(content) {
  /** @type {Map<string, number>} */
  const seen = new Map();
  const ids = new Set();

  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    for (const [, id] of line.matchAll(/<a id="([^"]+)"><\/a>/g)) {
      ids.add(id.toLowerCase());
    }

    const m = line.match(/^#{2,6} (.+)$/);
    if (!m) continue;
    const base = slugify(m[1]);
    if (!base) continue;

    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    ids.add(count === 0 ? base : `${base}-${count}`);
  }

  return ids;
}

// ---------------------------------------------------------------------------
// Per-page transforms (content -> content), in pipeline order
// ---------------------------------------------------------------------------

/**
 * Rewrites "Defined in: [file.ts:12](url)" to "[View source on GitHub](url)" —
 * one link per symbol (the line under an H1/H2). Member-level ones are dropped.
 * Runs before the heading shifts, while symbols are still H1/H2.
 * @param {string} content
 */
function convertSourceLinks(content) {
  /** @type {string[]} */
  const out = [];

  let inFence = false;
  let underSymbolHeading = false;
  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const heading = line.match(/^(#{1,6}) /);
    if (heading) {
      underSymbolHeading = heading[1].length <= 2;
      out.push(line);
      continue;
    }

    const source = line.match(
      /^Defined in: \[[^\]]+\]\((https:\/\/github\.com\/[^)]+)\)$/
    );
    if (!source) {
      out.push(line);
      continue;
    }

    if (underSymbolHeading) {
      out.push(`[${SOURCE_LINK_LABEL}](${source[1]})`);
      underSymbolHeading = false;
      continue;
    }
    // Member-level source line: drop it and the blank line it leaves behind.
    if (out[out.length - 1]?.trim() === "") out.pop();
  }

  return out.join("\n");
}

/**
 * Moves the H2 section matching the file name to the front. Fixes TypeDoc's
 * kind-based ordering (e.g. an Interface before the main TypeAlias).
 * @param {string} content
 * @param {string} filePath
 */
function hoistMainSection(content, filePath) {
  const name = basename(filePath, ".md");

  const preambleMatch = content.match(/^([\s\S]*?)(?=^## )/m);
  if (!preambleMatch) return content;
  const preamble = preambleMatch[1];
  const h2Sections = content.slice(preamble.length).split(/(?=^## )/m);
  if (h2Sections.length <= 1) return content;

  const candidates = [name, `I${name}`, `T${name}`];
  const mainIdx = h2Sections.findIndex((s) =>
    candidates.some((c) => new RegExp(`^## ${c}\\b`).test(s))
  );
  if (mainIdx <= 0) return content; // already first or not found

  const main = h2Sections.splice(mainIdx, 1)[0];
  return preamble + main + h2Sections.join("");
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
      const h3Parts = section.split(/(?=^### )/m);
      if (h3Parts.length <= 1) return section;

      const [before, ...h3Sections] = h3Parts;
      const examples = h3Sections.filter((s) => /^### Examples?\b/.test(s));
      const others = h3Sections.filter((s) => !/^### Examples?\b/.test(s));

      if (!examples.length) return section;
      return before + examples.join("") + others.join("");
    })
    .join("");
}

/**
 * `main-button.png` -> `main-button.dark.png`
 * @param {string} src
 */
function toDarkSrc(src) {
  return src.replace(/(\.[^.]+)$/, ".dark$1");
}

/**
 * Rewrites `<plugin-image src="x.png" [dark[="y.png"]] />` to Markdown images.
 * With `dark`, a light/dark pair is emitted using the `#gh-*-mode-only` URL
 * convention the docs site toggles via CSS; a valueless `dark` derives the file
 * name via toDarkSrc. A tag that does not match is reported, not shipped.
 * @param {string} content
 * @param {string} filePath
 */
function resolvePluginImageTags(content, filePath) {
  const updated = content.replace(
    /<plugin-image\s+src=(["'])([^"']+)\1(\s+dark(?:=(["'])([^"']*)\4)?)?\s*\/>/g,
    (_match, _q1, src, darkAttr, _q2, darkValue) => {
      const alt = src.replace(/\.[^.]+$/, "");

      if (darkAttr === undefined) {
        return `![${alt}](${IMAGE_BASE}/${src})`;
      }

      const darkSrc = darkValue ? darkValue : toDarkSrc(src);
      const light = `![${alt}](${IMAGE_BASE}/${src}#gh-light-mode-only)`;
      const dark = `![${alt}](${IMAGE_BASE}/${darkSrc}#gh-dark-mode-only)`;
      return `${light}${dark}`;
    }
  );

  for (const leftover of updated.matchAll(/<plugin-image[^>]*>/g)) {
    console.warn(
      `[warn] Unrecognised ${leftover[0]} in ${basename(filePath)} — left as raw HTML`
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
  const name = basename(filePath, ".md");

  const fmMatch = content.match(/^(---\n[\s\S]*?---\n)/);
  const fm = fmMatch ? fmMatch[1] : "";
  const afterFm = content.slice(fm.length);

  // Already promoted — promoting again would create a second H1.
  if (/^# /m.test(afterFm)) return content;

  const firstH2Pos = afterFm.search(/^## /m);
  if (firstH2Pos < 0) return content;

  const preamble = afterFm.slice(0, firstH2Pos).trim();
  const h2Part = afterFm.slice(firstH2Pos);

  const firstH2Name = (h2Part.match(/^## (.+?)(?:\s|$)/m) || [])[1]?.trim() ?? "";
  const h2Count = (h2Part.match(/^## /gm) ?? []).length;
  const isMainType = [name, `I${name}`, `T${name}`].includes(firstH2Name);

  if (isMainType || h2Count === 1) {
    return content.replace(/^## /m, "# ");
  }
  if (preamble) {
    // The sidebar takes its label from this H1 (flatten-sidebar.mjs).
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    return fm + `# ${title}\n\n${preamble}\n\n` + h2Part;
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
  const lines = content.split("\n");

  let inFence = false;
  let h1 = -1;
  let end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (h1 < 0) {
      if (/^# /.test(lines[i])) h1 = i;
      continue;
    }
    if (/^## /.test(lines[i])) {
      end = i;
      break;
    }
  }
  if (h1 < 0) return content;

  inFence = false;
  for (let i = h1 + 1; i < end; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = lines[i].match(/^(#{3,6}) (.*)$/);
    if (m) lines[i] = `${m[1].slice(1)} ${m[2]}`;
  }

  return lines.join("\n");
}

/**
 * Docusaurus strips the id from every H1, so a fragment targeting a page title
 * resolves to nothing. Drop it from cross-page links (the top of the page is
 * the same spot) and unlink self-references. A title that repeats as a member
 * keeps its fragment — the member owns the anchor. Cross-file, needs all pages.
 * @param {string[]} filePaths
 */
function dropPageTitleFragments(filePaths) {
  /** @type {Map<string, {title: string|undefined, anchors: Set<string>}>} */
  const pages = new Map();
  for (const filePath of filePaths) {
    const content = readFileSync(filePath, "utf-8");
    const m = content.match(/^# (.+)$/m);
    pages.set(resolve(filePath), {
      title: m ? slugify(m[1]) : undefined,
      anchors: pageAnchors(content)
    });
  }

  /**
   * @param {{title: string|undefined, anchors: Set<string>}} page
   * @param {string} fragment
   */
  const isDeadTitleLink = (page, fragment) =>
    page?.title === fragment.toLowerCase() && !page.anchors.has(fragment.toLowerCase());

  for (const filePath of filePaths) {
    transformFile(filePath, (content) => {
      const own = pages.get(resolve(filePath));
      return (
        content
          // Another page's title: keep the link, drop the fragment.
          .replace(/\]\(([^)\s#]+)#([^)\s]+)\)/g, (full, rel, fragment) => {
            const target = pages.get(resolve(dirname(filePath), rel));
            return target && isDeadTitleLink(target, fragment) ? `](${rel})` : full;
          })
          // This page's own title: unlink it.
          .replace(/\[([^\]]+)\]\(#([^)\s]+)\)/g, (full, label, fragment) =>
            own && isDeadTitleLink(own, fragment) ? label : full
          )
      );
    });
  }
}

/**
 * Removes the stray `\|` TypeDoc leaves in front of the first member of a
 * union: on the line that opens a multi-line union, and after the `=>` of a
 * function type inside a table cell. Fenced blocks are skipped.
 * @param {string} content
 */
function fixUnionPipeArtifacts(content) {
  const lines = content.split("\n");
  const isUnionLine = (/** @type {string} */ line) => /^\s*\\\| /.test(line);

  let inFence = false;
  // Tracked separately: the previous line may already have had its pipe
  // stripped, which would make every separator look like an opener.
  let prevWasUnion = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      prevWasUnion = false;
      continue;
    }
    if (inFence) {
      prevWasUnion = false;
      continue;
    }
    const isUnion = isUnionLine(lines[i]);

    if (isUnion && !prevWasUnion) {
      lines[i] = lines[i].replace(/^(\s*)\\\| /, "$1");
    }
    lines[i] = lines[i].replaceAll("=> \\| ", "=> ");
    prevWasUnion = isUnion;
  }

  return lines.join("\n");
}

/**
 * Escapes the `|` inside a table cell's inline code — TypeDoc escapes its own
 * pipes but not the ones a comment contributes (e.g. an @example of a union),
 * and an unescaped pipe breaks the row. Fenced blocks are skipped.
 * @param {string} content
 */
function escapePipesInTableCells(content) {
  const lines = content.split("\n");

  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !lines[i].startsWith("|")) continue;
    lines[i] = lines[i].replace(/`[^`]*`/g, (code) =>
      code.replace(/(?<!\\)\|/g, "\\|")
    );
  }

  return lines.join("\n");
}

/**
 * Repairs in-page hash links: drops stale `-N` dedup suffixes when the plain
 * anchor exists, and warns about anchors that resolve to nothing.
 * @param {string} content
 * @param {string} filePath
 */
function fixInPageAnchors(content, filePath) {
  const ids = pageAnchors(content);

  return content.replace(/\]\(#([^)\s]+)\)/g, (full, anchor) => {
    const target = anchor.toLowerCase();
    if (ids.has(target)) return full;
    const stripped = target.replace(/-\d+$/, "");
    if (stripped !== target && ids.has(stripped)) return `](#${stripped})`;
    console.warn(
      `[warn] Unresolved in-page anchor #${anchor} in ${basename(filePath)}`
    );
    return full;
  });
}

/**
 * Guarantees the blank line MDX needs before a heading — hoistMainSection can
 * leave a heading directly after the moved section's last line.
 * @param {string} content
 */
function ensureBlankLineBeforeHeadings(content) {
  /** @type {string[]} */
  const out = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (
      !inFence &&
      /^#{1,6} /.test(line) &&
      out.length > 0 &&
      out[out.length - 1].trim() !== ""
    ) {
      out.push("");
    }
    out.push(line);
  }
  return out.join("\n");
}

/**
 * Strips a dangling `***` at the end of a page — the member separator of a
 * section that hoistMainSection moved last.
 * @param {string} content
 */
function stripTrailingHr(content) {
  return content.replace(/\n\*{3,}\s*$/, "\n");
}

// ---------------------------------------------------------------------------
// Section index pages
// ---------------------------------------------------------------------------

/**
 * First sentence of a text. Does not break on periods inside parentheses,
 * after common abbreviations ("etc.", "e.g.") or inside tokens ("9.2").
 * @param {string} text
 */
function firstSentence(text) {
  if (!text) return "";
  const abbrev = /(?:\betc|\be\.g|\bi\.e|\bvs)\.$/i;
  let parenDepth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "(") parenDepth++;
    else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
    else if ((ch === "." || ch === "!" || ch === "?") && parenDepth === 0) {
      const next = text[i + 1];
      if (next !== undefined && next !== " ") continue;
      if (ch === "." && abbrev.test(text.slice(0, i + 1))) continue;
      return text.slice(0, i + 1);
    }
  }
  return text;
}

/**
 * H1 title of a generated page (falls back to the given name), so index tables
 * and sidebar labels match the page even when it differs from the file name.
 * @param {string} mdFilePath
 * @param {string} fallback
 */
function pageTitle(mdFilePath, fallback) {
  const content = readFileSync(mdFilePath, "utf-8");
  const m = content.match(/^# (.+)$/m);
  return m ? m[1].trim() : fallback;
}

/**
 * Description of the page's main symbol: the first paragraph after the H1,
 * skipping the source link, images and signature blocks. Runs after the H1
 * transforms; falls back to the paragraph after the source link.
 * @param {string} mdFilePath
 */
function extractDescriptionFromMd(mdFilePath) {
  const content = readFileSync(mdFilePath, "utf-8");
  const body = content.replace(/^---\n[\s\S]*?---\n/, "");
  const lines = body.split("\n");

  let sawContext = false; // set by the H1 or the source link line
  let inFence = false;
  const descLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^# /.test(line) || isSourceLine(trimmed)) {
      if (descLines.length > 0) break;
      sawContext = true;
      continue;
    }

    if (/^#{2,} /.test(line)) break;

    if (!trimmed) {
      if (descLines.length > 0) break;
      continue;
    }

    if (
      trimmed.startsWith("![") ||
      trimmed.startsWith("<plugin-image") ||
      trimmed.startsWith(">")
    )
      continue;

    if (!sawContext) continue;
    descLines.push(trimmed);
  }

  return firstSentence(descLines.join(" ").trim());
}

/**
 * Generates index.md for one section: title, prose from sections.mjs, and an
 * overview table built from the final page titles and descriptions.
 * @param {typeof SECTIONS[0]} section
 */
function generateIndexPage(section) {
  const docsPath = join(DOCS_DIR, section.docsDir);

  if (!existsSync(docsPath)) {
    console.warn(`⚠️  Skipping "${section.title}" — docs directory not found`);
    return;
  }

  const mdFiles = readdirSync(docsPath)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .sort();

  const rows = [];
  for (const file of mdFiles) {
    const name = basename(file, ".md");
    const displayName = pageTitle(join(docsPath, file), name);
    const description = extractDescriptionFromMd(join(docsPath, file)) || "—";
    const extraValue = section.tableExtraValues?.[name] || "—";

    rows.push(
      section.tableExtraColumn
        ? `| [\`${displayName}\`](${file}) | ${description} | ${extraValue} |`
        : `| [\`${displayName}\`](${file}) | ${description} |`
    );
  }

  if (!rows.length) {
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
    ...rows
  ].join("\n");

  writeFileSync(join(docsPath, "index.md"), content, "utf-8");
  console.log(
    `✅  Generated: docs/${section.docsDir}/index.md  (${rows.length} entries)`
  );
}

// ---------------------------------------------------------------------------
// Run. Structural transforms first, cleanup second, index pages last — they
// read the final H1 titles and descriptions.
// ---------------------------------------------------------------------------

const ALL_MD_FILES = existsSync(DOCS_DIR)
  ? readdirSync(DOCS_DIR, { recursive: true })
      .filter(
        (f) => typeof f === "string" && f.endsWith(".md") && !f.endsWith("index.md")
      )
      .map((f) => join(DOCS_DIR, /** @type {string} */ (f)))
  : [];

const STRUCTURAL = [
  convertSourceLinks,
  hoistMainSection,
  reorderExamplesFirst,
  resolvePluginImageTags,
  promoteFirstH2toH1,
  raiseMainSymbolSubtree
];

const CLEANUP = [
  fixUnionPipeArtifacts,
  escapePipesInTableCells,
  fixInPageAnchors,
  ensureBlankLineBeforeHeadings,
  stripTrailingHr
];

for (const filePath of ALL_MD_FILES) {
  for (const transform of STRUCTURAL) transformFile(filePath, transform);
}

// Needs every page's H1 at once, and must precede fixInPageAnchors, which
// would otherwise warn about the very anchors this resolves.
dropPageTitleFragments(ALL_MD_FILES);

for (const filePath of ALL_MD_FILES) {
  for (const transform of CLEANUP) transformFile(filePath, transform);
}

for (const section of SECTIONS) {
  generateIndexPage(section);
}

// _category_.json so docs:sync carries it into the coding-plugin folder.
writeFileSync(
  join(DOCS_DIR, "_category_.json"),
  JSON.stringify(
    {
      link: {
        type: "doc",
        id: "docspace/plugins-sdk/usage-sdk/coding-plugin"
      }
    },
    null,
    2
  ) + "\n",
  "utf-8"
);

console.log("✅  All index pages generated.");
