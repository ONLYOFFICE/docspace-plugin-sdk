// @ts-check
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SIDEBAR_FILE = join(process.cwd(), "docs", "typedoc-sidebar.cjs");
const PATH_PREFIX = "docspace/plugins-sdk/usage-sdk/coding-plugin";

// Directory and kind levels TypeDoc nests by; their children are lifted out.
const WRAPPER_LABELS = new Set([
  "interfaces", "components", "items", "plugins", "settings", "utils", "enums",
  "react",
  "Interfaces", "Enumerations", "Type Aliases", "Classes", "Functions",
  "Components", "Items", "Plugins", "Settings", "Utils", "React", "Enums",
  "Properties"
]);

// Top-level groups in sidebar order, each with the doc id of its index page
// (relative to PATH_PREFIX). Utils is a single file — its category links to it.
/** @type {Record<string, string | null>} */
const GROUPS = {
  Components: "interfaces/components/index",
  Items: "interfaces/items/index",
  Plugins: "interfaces/plugins/index",
  Settings: "interfaces/settings/index",
  Utils: null,
  React: "react/index",
  Enums: "enums/index"
};

/**
 * Drops the wrapper categories, unwraps single-child ones and skips empty ones.
 * @param {any[]} items
 * @returns {any[]}
 */
function flattenSidebar(items) {
  if (!Array.isArray(items)) return items;

  const result = [];

  for (const item of items) {
    if (item.type !== "category") {
      result.push(item);
      continue;
    }

    if (WRAPPER_LABELS.has(item.label)) {
      result.push(...flattenSidebar(item.items ?? []));
      continue;
    }

    const children = flattenSidebar(item.items ?? []);

    if (children.length === 0 && !item.link) continue;

    if (children.length === 1) {
      result.push(children[0]);
    } else {
      result.push({ ...item, items: children });
    }
  }

  return result;
}

/**
 * Categories first, then docs; alphabetical within each.
 * @param {any[]} items
 */
function sortItems(items) {
  return items.sort((firstItem, secondItem) => {
    if (firstItem.type === "category" && secondItem.type === "doc") return -1;
    if (firstItem.type === "doc" && secondItem.type === "category") return 1;

    return (firstItem.label || "").localeCompare(secondItem.label || "");
  });
}

/**
 * The GROUPS key an item belongs to, from the docs path in its id.
 * @param {any} item
 */
function groupNameOf(item) {
  const docId = (item.id || item.link?.id || "").toLowerCase();

  if (docId.includes("/components/")) return "Components";
  if (docId.includes("/items/")) return "Items";
  if (docId.includes("/plugins/")) return "Plugins";
  if (docId.includes("/settings/")) return "Settings";
  if (docId.includes("/utils/") || docId.endsWith("utils")) return "Utils";
  if (docId.includes("/react/")) return "React";
  if (docId.includes("/enums/")) return "Enums";

  return null;
}

/**
 * The sidebar link of a group category: its index page when it has one, the
 * single doc itself for Utils, a generated index otherwise.
 * @param {string} groupName
 * @param {any[]} groupItems
 */
function groupLink(groupName, groupItems) {
  const indexPageId = GROUPS[groupName];
  if (indexPageId) {
    return { type: "doc", id: `${PATH_PREFIX}/${indexPageId}` };
  }

  const utilsDocId = groupItems[0]?.id ?? null;
  if (groupName === "Utils" && utilsDocId) {
    return { type: "doc", id: utilsDocId };
  }

  return { type: "generated-index" };
}

/**
 * Regroups the flat items under the GROUPS categories, each linking to its
 * index page. Items matching no group are dropped.
 * @param {any[]} items
 * @returns {any[]}
 */
function groupByTopLevel(items) {
  /** @type {Record<string, any[]>} */
  const itemsByGroup = Object.fromEntries(
    Object.keys(GROUPS).map((groupName) => [groupName, []])
  );

  for (const item of items) {
    const groupName = groupNameOf(item);
    if (groupName) itemsByGroup[groupName].push(item);
  }

  const result = [];

  for (const [groupName, groupItems] of Object.entries(itemsByGroup)) {
    if (groupItems.length === 0) continue;

    // Single-item group: no category wrapper needed.
    const sortedItems = sortItems(groupItems);
    if (sortedItems.length === 1) {
      result.push(sortedItems[0]);
      continue;
    }

    result.push({
      type: "category",
      label: groupName,
      link: groupLink(groupName, groupItems),
      items: sortedItems
    });
  }

  return result;
}

/**
 * Relabels doc items with the H1 of the generated page, so the sidebar matches
 * the page title when it differs from the file name (e.g. Utility → FilterType).
 * @param {any[]} items
 */
function relabelFromPageTitles(items) {
  for (const item of items) {
    if (item.type === "category" && Array.isArray(item.items)) {
      relabelFromPageTitles(item.items);
      continue;
    }

    if (item.type !== "doc" || !item.id || item.id.endsWith("/index")) continue;

    const relativePath = item.id.startsWith(`${PATH_PREFIX}/`)
      ? item.id.slice(PATH_PREFIX.length + 1)
      : item.id;

    try {
      const pagePath = join(process.cwd(), "docs", `${relativePath}.md`);
      const pageContent = readFileSync(pagePath, "utf-8");

      const titleMatch = pageContent.match(/^# (.+)$/m);
      const pageTitle = titleMatch?.[1].trim();

      if (pageTitle && pageTitle !== item.label) item.label = pageTitle;
    } catch {
      // No such file — keep the existing label.
    }
  }
}

function main() {
  let content = readFileSync(SIDEBAR_FILE, "utf-8");

  // Prefix doc ids with the site path (skip ids that already carry it).
  content = content.replace(/id:\s*"([^"]+)"/g, (_idField, docId) =>
    docId.startsWith(PATH_PREFIX)
      ? `id: "${docId}"`
      : `id: "${PATH_PREFIX}/${docId}"`
  );

  const sidebarMatch = content.match(
    /const typedocSidebar = ({[\s\S]+?});[\s\S]*module\.exports/
  );

  if (sidebarMatch) {
    const sidebar = eval(`(${sidebarMatch[1]})`);

    if (sidebar.items && Array.isArray(sidebar.items)) {
      sidebar.items = groupByTopLevel(flattenSidebar(sidebar.items));
      relabelFromPageTitles(sidebar.items);
    }

    content = `// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = ${JSON.stringify(sidebar, null, 2)};
module.exports = typedocSidebar.items;
`;
  }

  writeFileSync(SIDEBAR_FILE, content, "utf-8");

  console.log(`✅ Sidebar flattened successfully!`);
  console.log(`📍 Updated: ${SIDEBAR_FILE}`);
}

try {
  main();
} catch (error) {
  console.error("Error flattening sidebar:", error);
  process.exit(1);
}
