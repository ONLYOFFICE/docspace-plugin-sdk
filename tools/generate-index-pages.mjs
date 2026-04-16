// @ts-check
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, "../..");
const DOCS_DIR = join(ROOT, "docs");
const SRC_DIR = join(ROOT, "src");

/**
 * Extracts the description from a TypeDoc-generated markdown file.
 * Pattern: ### EntityName → Defined in: ... → blank → description text → #### ...
 * @param {string} mdFilePath - Path to the generated .md file
 * @returns {string}
 */
function extractDescriptionFromMd(mdFilePath) {
  const content = readFileSync(mdFilePath, "utf-8");
  const lines = content.split("\n");

  let afterDefinedIn = false;
  const descLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip until we pass the "Defined in:" line
    if (!afterDefinedIn) {
      if (line.startsWith("Defined in:")) afterDefinedIn = true;
      continue;
    }

    // Stop at the next heading
    if (line.startsWith("####") || line.startsWith("## ") || line.startsWith("### ")) break;

    const trimmed = line.trim();
    if (!trimmed) {
      // Stop at first blank line AFTER we already collected some text
      if (descLines.length > 0) break;
      continue;
    }

    descLines.push(trimmed);
  }

  const full = descLines.join(" ").trim();
  // Return only the first sentence
  const dot = full.indexOf(".");
  return dot !== -1 ? full.slice(0, dot + 1) : full;
}

/**
 * Builds a Markdown table row from a source file.
 * @param {string} name - Entity name (e.g. "IButton")
 * @param {string} description
 * @param {string} mdPath - Relative path to the .md file from index.md
 * @returns {string}
 */
function tableRow(name, description, mdPath) {
  return `| [\`${name}\`](${mdPath}) | ${description || "—"} |`;
}

/**
 * Section configuration.
 * dirPath: path inside src/ (source) and docs/ (output)
 * sidebarPosition: controls order in sidebar
 */
const SECTIONS = [
  {
    srcDir: "interfaces/components",
    docsDir: "interfaces/components",
    title: "Components",
    sidebarPosition: 1,
    description:
      "UI components for building plugin interfaces — dialogs, buttons, inputs, and other visual elements " +
      "rendered inside DocSpace modals and panels.",
    usage:
      "Use these interfaces when constructing custom plugin UI with `IModalDialog`, `IBox`, or other layout containers.",
    tableCaption: "The following components are available:",
  },
  {
    srcDir: "interfaces/items",
    docsDir: "interfaces/items",
    title: "Items",
    sidebarPosition: 2,
    description:
      "Plugin items that extend specific DocSpace UI locations — context menus, file rows, info panels, " +
      "toolbars and profile menus.",
    usage:
      "Choose the item interface that matches the DocSpace UI area you want to extend with your plugin action.",
    tableCaption: "Each plugin type has specific items described in this section:",
    tableExtraColumn: "When to use",
    tableExtraValues: {
      IContextMenuItem: "Embed a custom action in the file/folder context menu.",
      IInfoPanelItem:   "Add a custom tab to the file info panel on the right side.",
      IMainButtonItem:  "Add a sub-action to the main **More** button inside a room.",
      IProfileMenuItem: "Add a link or action to the user profile dropdown.",
      IFileItem:        "Handle clicks on files of a specific extension.",
      IEventListenerItem: "React to built-in DocSpace events (file created, room opened, etc.).",
      IArticleButtonItem: "Add a button to the left navigation bar.",
    },
  },
  {
    srcDir: "interfaces/plugins",
    docsDir: "interfaces/plugins",
    title: "Plugins",
    sidebarPosition: 3,
    description:
      "Core plugin interfaces that define the contract for each plugin type supported by DocSpace. " +
      "Every plugin must implement `IPlugin` plus one or more type-specific interfaces.",
    usage:
      "Implement the interface that matches the DocSpace UI area you want to extend. " +
      "All plugins must also implement the base `IPlugin` interface.",
    tableCaption: "Available plugin type interfaces:",
  },
  {
    srcDir: "interfaces/settings",
    docsDir: "interfaces/settings",
    title: "Settings",
    sidebarPosition: 4,
    description:
      "Interfaces for configuring plugin settings displayed in the DocSpace admin and user settings panels.",
    usage: "Implement `ISettingsPlugin` and use `ISettings` to describe each configurable field.",
    tableCaption: "Settings interfaces:",
  },
  {
    srcDir: "enums",
    docsDir: "enums",
    title: "Enums",
    sidebarPosition: 5,
    description:
      "Enumerations for actions, component types, events, file types, security permissions, " +
      "room types and other SDK-wide constants.",
    usage: "Import and use these typed constants in place of raw strings throughout your plugin.",
    tableCaption: "Available enumerations:",
  },
];

/**
 * Generates index.md for a single section.
 * @param {typeof SECTIONS[0]} section
 */
function generateIndexPage(section) {
  const docsPath = join(DOCS_DIR, section.docsDir);

  if (!existsSync(docsPath)) {
    console.warn(`⚠️  Skipping "${section.title}" — docs directory not found`);
    return;
  }

  // Collect generated .md files (exclude index.md itself)
  const mdFiles = readdirSync(docsPath)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .sort();

  const rows = [];
  for (const file of mdFiles) {
    const name = basename(file, ".md");
    const mdFile = file;

    const description = extractDescriptionFromMd(join(docsPath, mdFile));
    const extraValue  = section.tableExtraValues?.[name] ?? "";

    if (section.tableExtraColumn) {
      rows.push(`| [\`${name}\`](${mdFile}) | ${description || "—"} | ${extraValue || "—"} |`);
    } else {
      rows.push(tableRow(name, description, mdFile));
    }
  }

  if (!rows.length) {
    console.warn(`⚠️  No docs found for "${section.title}" — skipping`);
    return;
  }

  const tableHeader = section.tableExtraColumn
    ? `| Interface | Description | ${section.tableExtraColumn} |\n| --- | --- | --- |`
    : `| Interface | Description |\n| --- | --- |`;

  const content = [
    `---`,
    `sidebar_position: ${section.sidebarPosition}`,
    `---`,
    ``,
    `# ${section.title}`,
    ``,
    section.description,
    ``,
    section.usage,
    ``,
    `## Overview`,
    ``,
    section.tableCaption,
    ``,
    tableHeader,
    ...rows,
  ].join("\n");

  const outPath = join(docsPath, "index.md");
  writeFileSync(outPath, content, "utf-8");
  console.log(`✅  Generated: docs/${section.docsDir}/index.md  (${rows.length} entries)`);
}

// Run
for (const section of SECTIONS) {
  generateIndexPage(section);
}
console.log("✅  All index pages generated.");
