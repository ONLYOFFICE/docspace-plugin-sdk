// @ts-check
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { collectPageAnchors, slugify, transformFile } from "../shared/markdown.mjs";

const CROSS_PAGE_LINK = /\]\(([^)\s#]+)#([^)\s]+)\)/g;
const OWN_PAGE_LINK = /\[([^\]]+)\]\(#([^)\s]+)\)/g;

/** @typedef {{titleSlug: string | undefined, anchors: Set<string>}} PageAnchors */

/**
 * @param {PageAnchors | undefined} page
 * @param {string} fragment
 */
function isDeadTitleLink(page, fragment) {
  return (
    page?.titleSlug === fragment.toLowerCase() &&
    !page.anchors.has(fragment.toLowerCase())
  );
}

/**
 * Docusaurus strips the id from every H1, so a fragment targeting a page title
 * resolves to nothing. Drop it from cross-page links (the top of the page is
 * the same spot) and unlink self-references. A title that repeats as a member
 * keeps its fragment — the member owns the anchor. Cross-file, needs all pages.
 * @param {string[]} filePaths
 */
export function dropPageTitleFragments(filePaths) {
  /** @type {Map<string, PageAnchors>} */
  const pages = new Map();

  for (const filePath of filePaths) {
    const content = readFileSync(filePath, "utf-8");
    const titleMatch = content.match(/^# (.+)$/m);

    pages.set(resolve(filePath), {
      titleSlug: titleMatch ? slugify(titleMatch[1]) : undefined,
      anchors: collectPageAnchors(content)
    });
  }

  for (const filePath of filePaths) {
    transformFile(filePath, (content) => {
      const ownPage = pages.get(resolve(filePath));

      return content
        // Another page's title: keep the link, drop the fragment.
        .replace(CROSS_PAGE_LINK, (wholeLink, relativePath, fragment) => {
          const targetPage = pages.get(resolve(dirname(filePath), relativePath));
          return isDeadTitleLink(targetPage, fragment)
            ? `](${relativePath})`
            : wholeLink;
        })
        // This page's own title: unlink it.
        .replace(OWN_PAGE_LINK, (wholeLink, label, fragment) =>
          isDeadTitleLink(ownPage, fragment) ? label : wholeLink
        );
    });
  }
}
