// @ts-check
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SIDEBAR_FILE = join(process.cwd(), "docs", "typedoc-sidebar.cjs");
const PATH_PREFIX = "docspace/plugins-sdk/usage-sdk/coding-plugin";

// Directory and kind levels TypeDoc nests by; their children are lifted out.
const WRAPPER_LABELS = new Set([
  "interfaces", "components", "items", "plugins", "settings", "utils", "enums",
  "Interfaces", "Enumerations", "Type Aliases", "Classes",
  "Components", "Items", "Plugins", "Settings", "Utils", "Enums", "Properties"
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
  return items.sort((a, b) => {
    if (a.type === "category" && b.type === "doc") return -1;
    if (a.type === "doc" && b.type === "category") return 1;
    return (a.label || "").localeCompare(b.label || "");
  });
}

/**
 * The GROUPS key an item belongs to, from the docs path in its id.
 * @param {any} item
 */
function groupOf(item) {
  const id = (item.id || item.link?.id || "").toLowerCase();
  if (id.includes("/components/")) return "Components";
  if (id.includes("/items/")) return "Items";
  if (id.includes("/plugins/")) return "Plugins";
  if (id.includes("/settings/")) return "Settings";
  if (id.includes("/utils/") || id.endsWith("utils")) return "Utils";
  if (id.includes("/enums/")) return "Enums";
  return null;
}

/**
 * Regroups the flat items under the GROUPS categories, each linking to its
 * index page. Items matching no group are dropped.
 * @param {any[]} items
 * @returns {any[]}
 */
function groupByTopLevel(items) {
  /** @type {Record<string, any[]>} */
  const groups = Object.fromEntries(Object.keys(GROUPS).map((k) => [k, []]));
  for (const item of items) {
    const name = groupOf(item);
    if (name) groups[name].push(item);
  }

  const result = [];
  for (const [groupName, groupItems] of Object.entries(groups)) {
    if (groupItems.length === 0) continue;

    // Single-item group: no category wrapper needed.
    const sortedItems = sortItems(groupItems);
    if (sortedItems.length === 1) {
      result.push(sortedItems[0]);
      continue;
    }

    const indexId = GROUPS[groupName];
    const utilsDocId = groupItems[0]?.id ?? null;
    result.push({
      type: "category",
      label: groupName,
      link: indexId
        ? { type: "doc", id: `${PATH_PREFIX}/${indexId}` }
        : groupName === "Utils" && utilsDocId
          ? { type: "doc", id: utilsDocId }
          : { type: "generated-index" },
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

    const relPath = item.id.startsWith(`${PATH_PREFIX}/`)
      ? item.id.slice(PATH_PREFIX.length + 1)
      : item.id;
    try {
      const md = readFileSync(join(process.cwd(), "docs", `${relPath}.md`), "utf-8");
      const h1 = md.match(/^# (.+)$/m);
      if (h1 && h1[1].trim() && h1[1].trim() !== item.label) {
        item.label = h1[1].trim();
      }
    } catch {
      // No such file — keep the existing label.
    }
  }
}

try {
  let content = readFileSync(SIDEBAR_FILE, "utf-8");

  // Prefix doc ids with the site path (skip ids that already carry it).
  content = content.replace(/id:\s*"([^"]+)"/g, (_, id) =>
    id.startsWith(PATH_PREFIX) ? `id: "${id}"` : `id: "${PATH_PREFIX}/${id}"`
  );

  const sidebarMatch = content.match(
    /const typedocSidebar = ({[\s\S]+?});[\s\S]*module\.exports/
  );

  if (sidebarMatch) {
    const sidebarObj = eval(`(${sidebarMatch[1]})`);

    if (sidebarObj.items && Array.isArray(sidebarObj.items)) {
      sidebarObj.items = groupByTopLevel(flattenSidebar(sidebarObj.items));
      relabelFromPageTitles(sidebarObj.items);
    }

    content = `// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = ${JSON.stringify(sidebarObj, null, 2)};
module.exports = typedocSidebar.items;
`;
  }

  writeFileSync(SIDEBAR_FILE, content, "utf-8");

  console.log(`✅ Sidebar flattened successfully!`);
  console.log(`📍 Updated: ${SIDEBAR_FILE}`);
} catch (error) {
  console.error("Error flattening sidebar:", error);
  process.exit(1);
}
