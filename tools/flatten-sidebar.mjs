// @ts-check
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SIDEBAR_FILE = join(process.cwd(), "docs", "typedoc-sidebar.cjs");
const PATH_PREFIX = "docspace/plugins-sdk/usage-sdk/coding-plugin";

/**
 * Recursively flattens sidebar structure
 * @param {any} items - Array of sidebar items
 * @param {string[]} pathParts - Current path parts for grouping
 * @returns {any[]} - Flattened array of items
 */
function flattenSidebar(items, pathParts = []) {
  if (!Array.isArray(items)) return items;

  const result = [];

  for (const item of items) {
    // Skip intermediate directory levels (interfaces, components, items, plugins, etc.)
    if (
      item.type === "category" &&
      (item.label === "interfaces" ||
        item.label === "components" ||
        item.label === "items" ||
        item.label === "plugins" ||
        item.label === "settings" ||
        item.label === "utils" ||
        item.label === "enums" ||
        item.label === "Interfaces" ||
        item.label === "Enumerations" ||
        item.label === "Type Aliases" ||
        item.label === "Classes" ||
        item.label === "Components" ||
        item.label === "Items" ||
        item.label === "Plugins" ||
        item.label === "Settings" ||
        item.label === "Utils" ||
        item.label === "Enums" ||
        item.label === "Properties")
    ) {
      // Flatten children directly
      if (Array.isArray(item.items)) {
        result.push(...flattenSidebar(item.items, pathParts));
      }
      continue;
    }

    // Process categories
    if (item.type === "category") {
      const newPathParts = [...pathParts, item.label];

      // Flatten children
      const flattenedChildren = flattenSidebar(item.items || [], newPathParts);

      // Skip empty categories
      if (flattenedChildren.length === 0 && !item.link) {
        continue;
      }

      // If category has only one child, unwrap it
      if (flattenedChildren.length === 1) {
        const child = flattenedChildren[0];

        // Always unwrap single-child categories to avoid unnecessary nesting
        // This handles cases like Selector -> SelectorType
        result.push(child);
      }
      // If category has children or link, keep it
      else if (flattenedChildren.length > 0 || item.link) {
        result.push({
          ...item,
          items: flattenedChildren
        });
      }
    } else {
      // Keep doc items as is
      result.push(item);
    }
  }

  return result;
}

/**
 * Sorts items: categories first, then docs
 * @param {any[]} items - Array of items to sort
 * @returns {any[]} - Sorted items
 */
function sortItems(items) {
  return items.sort((a, b) => {
    // Categories first, docs second
    if (a.type === "category" && b.type === "doc") return -1;
    if (a.type === "doc" && b.type === "category") return 1;

    // Within same type, sort alphabetically by label
    return (a.label || "").localeCompare(b.label || "");
  });
}

/**
 * Groups items by top-level categories (Components, Items, Plugins, etc.)
 * @param {any[]} items - Flat array of items
 * @returns {any[]} - Grouped items
 */
function groupByTopLevel(items) {
  /** @type {Record<string, any[]>} */
  const groups = {
    Components: [],
    Items: [],
    Plugins: [],
    Settings: [],
    Utils: [],
    Enums: []
  };

  for (const item of items) {
    let groupName = null;

    // Determine group from item ID or link ID
    const checkId = item.id || (item.link && item.link.id) || "";

    const checkIdLower = checkId.toLowerCase();
    if (checkIdLower.includes("/components/")) groupName = "Components";
    else if (checkIdLower.includes("/items/")) groupName = "Items";
    else if (checkIdLower.includes("/plugins/")) groupName = "Plugins";
    else if (checkIdLower.includes("/settings/")) groupName = "Settings";
    else if (checkIdLower.includes("/utils/") || checkIdLower.endsWith("utils"))
      groupName = "Utils";
    else if (checkIdLower.includes("/enums/")) groupName = "Enums";

    if (groupName && groups[groupName]) {
      groups[groupName].push(item);
    }
  }

  /**
   * Maps group name to the doc ID of the generated index.md.
   * These IDs already include PATH_PREFIX because the prefix
   * replacement runs before groupByTopLevel is called.
   * @type {Record<string, string | null>}
   */
  const INDEX_IDS = {
    Components: `${PATH_PREFIX}/interfaces/components/index`,
    Items: `${PATH_PREFIX}/interfaces/items/index`,
    Plugins: `${PATH_PREFIX}/interfaces/plugins/index`,
    Enums: `${PATH_PREFIX}/enums/index`,
    Settings: `${PATH_PREFIX}/interfaces/settings/index`,
    Utils: null // single file — link directly to the doc below
  };

  const result = [];
  for (const [groupName, groupItems] of Object.entries(groups)) {
    if (groupItems.length === 0) continue;

    const sortedItems = sortItems(groupItems);
    const indexId = INDEX_IDS[groupName];

    // Single-item group: push the item directly without a category wrapper
    if (sortedItems.length === 1) {
      result.push(sortedItems[0]);
      continue;
    }

    // Utils is a single file; point the category link directly to it
    const utilsDocId = groupItems[0]?.id ?? null;

    result.push({
      type: "category",
      label: groupName,
      link: indexId
        ? { type: "doc", id: indexId }
        : groupName === "Utils" && utilsDocId
          ? { type: "doc", id: utilsDocId }
          : { type: "generated-index" },
      items: sortedItems
    });
  }

  return result;
}

/**
 * Relabels doc items with the H1 title of the generated page, so the sidebar
 * matches the page title when it differs from the file name (e.g. the file
 * Utility.md documents FilterType). Files are never renamed — only labels.
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
    const mdPath = join(process.cwd(), "docs", `${relPath}.md`);
    try {
      const md = readFileSync(mdPath, "utf-8");
      const h1 = md.match(/^# (.+)$/m);
      if (h1 && h1[1].trim() && h1[1].trim() !== item.label) {
        item.label = h1[1].trim();
      }
    } catch {
      // No such file — keep the existing label
    }
  }
}

try {
  let content = readFileSync(SIDEBAR_FILE, "utf-8");

  // Update IDs with path prefix
  content = content.replace(/id:\s*"([^"]+)"/g, (_, id) => {
    // Don't add prefix if already present
    if (id.startsWith(PATH_PREFIX)) {
      return `id: "${id}"`;
    }
    return `id: "${PATH_PREFIX}/${id}"`;
  });

  // Parse the sidebar
  const sidebarMatch = content.match(
    /const typedocSidebar = ({[\s\S]+?});[\s\S]*module\.exports/
  );

  if (sidebarMatch) {
    const sidebarObj = eval(`(${sidebarMatch[1]})`);

    // Flatten the structure
    if (sidebarObj.items && Array.isArray(sidebarObj.items)) {
      const flattened = flattenSidebar(sidebarObj.items);
      sidebarObj.items = groupByTopLevel(flattened);
      relabelFromPageTitles(sidebarObj.items);
    }

    // Reconstruct the file content
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
