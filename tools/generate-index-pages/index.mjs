// @ts-check
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { SECTIONS } from "../constants/sections.mjs";
import { transformFile } from "../shared/markdown.mjs";
import { STRUCTURAL_TRANSFORMS, CLEANUP_TRANSFORMS } from "./page-transforms.mjs";
import { dropPageTitleFragments } from "./cross-page-links.mjs";
import { applyApiTables } from "./api-tables.mjs";
import { generateIndexPage } from "./section-index.mjs";
import typedocConfig from "../../typedoc.config.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const DOCS_DIR = join(ROOT, "docs");

/**
 * Edit link of the section index pages: the file their prose lives in, on the
 * revision being documented.
 */
const SECTIONS_EDIT_URL = String(typedocConfig.sourceLinkTemplate)
  .replace("{gitRevision}", String(typedocConfig.gitRevision))
  .replace("{path}", "tools/constants/sections.mjs");

/**
 * Every generated page under docs/ (index pages excluded — they are
 * regenerated from scratch below).
 */
function findGeneratedPages() {
  if (!existsSync(DOCS_DIR)) return [];

  return readdirSync(DOCS_DIR, { recursive: true })
    .filter(
      (entry) =>
        typeof entry === "string" &&
        entry.endsWith(".md") &&
        !entry.endsWith("index.md")
    )
    .map((entry) => join(DOCS_DIR, /** @type {string} */ (entry)));
}

const generatedPages = findGeneratedPages();

// Structural transforms first, cleanup second, index pages last — they read
// the final H1 titles and descriptions.

for (const pagePath of generatedPages) {
  for (const transform of STRUCTURAL_TRANSFORMS) {
    transformFile(pagePath, transform);
  }
}

// Needs every page's H1 at once, and must precede the anchor cleanup, which
// would otherwise warn about the very anchors this resolves.
dropPageTitleFragments(generatedPages);

for (const pagePath of generatedPages) {
  for (const transform of CLEANUP_TRANSFORMS) {
    transformFile(pagePath, transform);
  }
}

// Last: replaces the `<a id>` anchor scheme the passes above validated
// against with the ids the APITable component derives at runtime.
applyApiTables(generatedPages);

for (const section of SECTIONS) {
  generateIndexPage(section, DOCS_DIR, SECTIONS_EDIT_URL);
}

console.log("✅  All index pages generated.");
