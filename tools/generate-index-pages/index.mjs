// @ts-check
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { SECTIONS } from "../constants/sections.mjs";
import { transformFile } from "../shared/markdown.mjs";
import { STRUCTURAL_TRANSFORMS, CLEANUP_TRANSFORMS } from "./page-transforms.mjs";
import { dropPageTitleFragments } from "./cross-page-links.mjs";
import { generateIndexPage, writeCategoryFile } from "./section-index.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const DOCS_DIR = join(ROOT, "docs");

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

for (const section of SECTIONS) {
  generateIndexPage(section, DOCS_DIR);
}

writeCategoryFile(DOCS_DIR);

console.log("✅  All index pages generated.");
