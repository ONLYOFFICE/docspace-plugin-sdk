// @ts-check
import {
	readFileSync,
	writeFileSync,
	readdirSync,
	existsSync,
	mkdirSync
} from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { SECTIONS } from "./constants/sections.mjs";

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
		if (line.startsWith("####") || line.startsWith("## ") || line.startsWith("### "))
			break;

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
		const extraValue = section.tableExtraValues?.[name] ?? "";

		if (section.tableExtraColumn) {
			rows.push(
				`| [\`${name}\`](${mdFile}) | ${description || "—"} | ${extraValue || "—"} |`
			);
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
		...rows
	].join("\n");

	const outPath = join(docsPath, "index.md");
	writeFileSync(outPath, content, "utf-8");
	console.log(
		`✅  Generated: docs/${section.docsDir}/index.md  (${rows.length} entries)`
	);
}

/**
 * Files where toc_max_heading_level should be set to 2 (many types per page).
 * These override the global level-3 setting from typedoc.config.mjs.
 */
const TOC_LEVEL_2_OVERRIDES = [
	"interfaces/components/Selector.md",
	"interfaces/components/IMediaViewer.md",
	"interfaces/components/Component.md"
];

/**
 * Only Actions.md uses list format with H4 member headings in TOC.
 * toc_max_heading_level:4 + toc_min_heading_level:4 hides the "Actions" H2
 * and "Enumeration Members" H3, showing only the member names.
 */
const TOC_LEVEL_4_OVERRIDES = ["enums/Actions.md"];

/**
 * All enum files not in TOC_LEVEL_4_OVERRIDES — convert list-format members back to a table.
 * Discovered dynamically so new enum files are handled automatically.
 */
const ENUM_LIST_TO_TABLE_FILES = existsSync(join(DOCS_DIR, "enums"))
	? readdirSync(join(DOCS_DIR, "enums"))
			.filter((f) => f.endsWith(".md") && f !== "index.md")
			.map((f) => `enums/${f}`)
			.filter((f) => !TOC_LEVEL_4_OVERRIDES.includes(f))
	: [];

/**
 * Patches the toc_max_heading_level in a markdown file's frontmatter.
 * @param {string} relPath - relative path from docs/ (e.g. "interfaces/components/Selector.md")
 * @param {number} level
 */
function patchTocLevel(relPath, level) {
	const filePath = join(DOCS_DIR, relPath);
	if (!existsSync(filePath)) {
		console.warn(`⚠️  patchTocLevel: file not found: ${relPath}`);
		return;
	}
	const content = readFileSync(filePath, "utf-8");
	const patched = content.replace(
		/^(---\n[\s\S]*?)toc_max_heading_level:\s*\d+([\s\S]*?---)/m,
		`$1toc_max_heading_level: ${level}$2`
	);
	writeFileSync(filePath, patched, "utf-8");
	console.log(`✅  Patched toc_max_heading_level:${level} in ${relPath}`);
}

/**
 * Adds toc_min_heading_level to frontmatter so that H2/H3 section headings
 * ("Actions", "Enumeration Members") are excluded from the right-side TOC.
 * @param {string} relPath
 * @param {number} level
 */
function patchTocMinLevel(relPath, level) {
	const filePath = join(DOCS_DIR, relPath);
	if (!existsSync(filePath)) {
		console.warn(`⚠️  patchTocMinLevel: file not found: ${relPath}`);
		return;
	}
	const content = readFileSync(filePath, "utf-8");
	// Insert after toc_max_heading_level line if not already present
	if (content.includes("toc_min_heading_level:")) {
		const patched = content.replace(
			/toc_min_heading_level:\s*\d+/,
			`toc_min_heading_level: ${level}`
		);
		writeFileSync(filePath, patched, "utf-8");
	} else {
		const patched = content.replace(
			/(toc_max_heading_level:\s*\d+)/,
			`$1\ntoc_min_heading_level: ${level}`
		);
		writeFileSync(filePath, patched, "utf-8");
	}
	console.log(`✅  Patched toc_min_heading_level:${level} in ${relPath}`);
}

/**
 * For enum files that keep list format (like Actions), promotes H4 member headings
 * to H3 so they render larger, and removes the redundant "### Enumeration Members" line.
 * @param {string} relPath
 */
function promoteEnumMemberHeadings(relPath) {
	const filePath = join(DOCS_DIR, relPath);
	if (!existsSync(filePath)) {
		console.warn(`⚠️  promoteEnumMemberHeadings: file not found: ${relPath}`);
		return;
	}
	let content = readFileSync(filePath, "utf-8");
	// Remove "### Enumeration Members" group header (it becomes redundant)
	content = content.replace(/^### Enumeration Members\n+/gm, "");
	// Promote member headings #### → ### first (while Example is still #####)
	content = content.replace(/^#### /gm, "### ");
	// Then promote ##### → #### (Example headings, won't reach H3 and won't appear in TOC)
	content = content.replace(/^##### /gm, "#### ");
	writeFileSync(filePath, content, "utf-8");
	console.log(`✅  Promoted enum member headings in ${relPath}`);
}

/**
 * Converts list-format enum members (H4 headings with code+description blocks)
 * back to a Markdown table — for all enums that don't need per-member TOC entries.
 * Handles files with multiple enums by processing each H2 section independently.
 * @param {string} relPath
 */
function convertEnumListToTable(relPath) {
	const filePath = join(DOCS_DIR, relPath);
	if (!existsSync(filePath)) {
		console.warn(`⚠️  convertEnumListToTable: file not found: ${relPath}`);
		return;
	}

	const content = readFileSync(filePath, "utf-8");
	const marker = "### Enumeration Members";
	if (!content.includes(marker)) {
		console.warn(`⚠️  convertEnumListToTable: no "${marker}" in ${relPath}`);
		return;
	}

	// Split file into preamble + H2 sections, process each H2 independently
	const preambleMatch = content.match(/^([\s\S]*?)(?=^## )/m);
	const preamble = preambleMatch ? preambleMatch[1] : "";
	const h2Content = content.slice(preamble.length);
	const h2Sections = h2Content.split(/(?=^## )/m);

	let totalMembers = 0;

	const converted = h2Sections.map((section) => {
		const markerIdx = section.indexOf(marker);
		if (markerIdx === -1) return section;

		const sectionPreamble = section.slice(0, markerIdx + marker.length);
		const membersContent = section.slice(markerIdx + marker.length);

		// Split into individual member blocks on #### heading boundaries
		const blocks = membersContent.split(/(?=\n#### )/);

		const rows = [];
		for (const block of blocks) {
			const nameMatch = block.match(/^\n#### (\w+)/);
			if (!nameMatch) continue;
			const name = nameMatch[1];

			// Value: from ```ts block — handles string and numeric values
			const valueMatch = block.match(/```ts\n\w+:\s*([^\n;]+);?\n```/);
			const value = valueMatch ? valueMatch[1].trim() : "";

			// Description: text after "Defined in:..." line, before next heading, HR or empty
			const descMatch = block.match(
				/Defined in:[^\n]*\n+([\s\S]*?)(?=\n##### |\n#### |\n\*\*\*|\n## |$)/
			);
			const desc = descMatch
				? descMatch[1]
						.trim()
						.replace(/\n+/g, " ")
						.replace(/\s*\*{3}\s*$/, "")
				: "";

			rows.push(`| \`${name}\` | \`${value}\` | ${desc || "—"} |`);
		}

		if (!rows.length) return section;

		totalMembers += rows.length;
		const table =
			"\n\n| Member | Value | Description |\n| :------ | :------ | :------ |\n" +
			rows.join("\n") +
			"\n";

		return sectionPreamble + table;
	});

	if (!totalMembers) {
		console.warn(`⚠️  convertEnumListToTable: no members parsed in ${relPath}`);
		return;
	}

	writeFileSync(filePath, preamble + converted.join(""), "utf-8");
	console.log(`✅  Converted to table: ${relPath}  (${totalMembers} members)`);
}

/**
 * Moves the H2 section whose heading matches the file name to be the first H2 in the file.
 * Fixes TypeDoc's kind-based grouping (Enum before Interface) for mixed-kind modules.
 * @param {string} filePath
 */
function hoistMainSection(filePath) {
	const name = basename(filePath, ".md");
	const content = readFileSync(filePath, "utf-8");

	// Everything before the first H2 (frontmatter + module description)
	const preambleMatch = content.match(/^([\s\S]*?)(?=^## )/m);
	if (!preambleMatch) return;
	const preamble = preambleMatch[1];
	const h2Content = content.slice(preamble.length);

	const h2Sections = h2Content.split(/(?=^## )/m);
	if (h2Sections.length <= 1) return;

	// Find section whose heading matches the file name (with optional I/T prefix)
	const candidates = [name, `I${name}`, `T${name}`];
	const mainIdx = h2Sections.findIndex((s) =>
		candidates.some((c) => new RegExp(`^## ${c}\\b`).test(s))
	);
	if (mainIdx <= 0) return; // already first or not found

	const main = h2Sections.splice(mainIdx, 1)[0];
	h2Sections.unshift(main);

	writeFileSync(filePath, preamble + h2Sections.join(""), "utf-8");
}

/**
 * Within each H2 section of a markdown file, moves all `### Example` / `### Examples`
 * subsections to the end (after `### Properties`, `### Enumeration Members`, etc.).
 * Safe to call on files that have no examples or no H3 subsections.
 * @param {string} filePath
 */
const IMAGE_BASE = "/assets/images/docspace";

/**
 * Replaces <plugin-image src="..." [width="..."] /> tags with <img> elements.
 * The src is relative to IMAGE_BASE. Width is optional.
 * @param {string} filePath
 */
function resolvePluginImageTags(filePath) {
	if (!existsSync(filePath)) return;
	const content = readFileSync(filePath, "utf-8");
	const updated = content.replace(
		/<plugin-image\s+src=(["'])([^"']+)\1(?:\s+width=(["'])([^"']+)\3)?\s*\/>/g,
		(_, _q1, src, _q2, width) => {
			const alt = src.replace(/\.[^.]+$/, "");
			const styleAttr = width ? ` style={{width: "${width}"}}` : "";
			return `<img alt="${alt}" src="${IMAGE_BASE}/${src}"${styleAttr} />`;
		}
	);
	if (updated !== content) writeFileSync(filePath, updated, "utf-8");
}

/** @param {string} filePath */
function reorderExamplesLast(filePath) {
	if (!existsSync(filePath)) return;
	const original = readFileSync(filePath, "utf-8");

	// Split on H2 boundaries, keeping the delimiter via lookahead
	const h2Parts = original.split(/(?=^## )/m);

	const result = h2Parts.map((section) => {
		// Split this H2 section into H3 subsections
		const h3Parts = section.split(/(?=^### )/m);
		if (h3Parts.length <= 1) return section;

		const before = h3Parts[0]; // content before the first H3
		const h3Sections = h3Parts.slice(1);

		const examples = h3Sections.filter((s) => /^### Examples?\b/.test(s));
		const others = h3Sections.filter((s) => !/^### Examples?\b/.test(s));

		if (!examples.length) return section;
		return before + others.join("") + examples.join("");
	});

	const patched = result.join("");
	if (patched !== original) writeFileSync(filePath, patched, "utf-8");
}

/**
 * - One H2 in file OR first H2 matches filename (with optional I/T prefix) → promote to H1.
 * - Multiple H2s, no match, but preamble exists (from @packageDocumentation in TS source) →
 *   inject "# Filename\n\npreamble" as section header, keep all H2s.
 * - Otherwise → leave as is.
 * @param {string} filePath
 */
function promoteFirstH2toH1(filePath) {
	if (!existsSync(filePath)) return;
	const name = basename(filePath, ".md");
	const content = readFileSync(filePath, "utf-8");

	const fmMatch = content.match(/^(---\n[\s\S]*?---\n)/);
	if (!fmMatch) return;
	const afterFm = content.slice(fmMatch[1].length);

	const firstH2Pos = afterFm.search(/^## /m);
	if (firstH2Pos < 0) return;

	const preamble = afterFm.slice(0, firstH2Pos).trim();
	const h2Part = afterFm.slice(firstH2Pos);

	const firstH2Name = (h2Part.match(/^## (.+?)(?:\s|$)/m) || [])[1]?.trim() ?? "";
	const h2Count = (h2Part.match(/^## /gm) ?? []).length;
	const candidates = [name, `I${name}`, `T${name}`];
	const isMainType = candidates.includes(firstH2Name);

	if (isMainType || h2Count === 1) {
		// Single main type — promote first H2 to H1
		const patched = content.replace(/^## /m, "# ");
		if (patched !== content) writeFileSync(filePath, patched, "utf-8");
	} else if (preamble) {
		// Multiple unrelated types + module description from @packageDocumentation
		const title = name.charAt(0).toUpperCase() + name.slice(1);
		// Inject sidebar_label so Docusaurus shows the capitalized title in the sidebar
		const fm = fmMatch[1].replace(/^(---\n)/, `$1sidebar_label: "${title}"\n`);
		const patched = fm + `\n# ${title}\n\n${preamble}\n\n` + h2Part;
		writeFileSync(filePath, patched, "utf-8");
	}
	// else: multiple types, no description — leave H2 structure as is
}

// Run
for (const section of SECTIONS) {
	generateIndexPage(section);
}

for (const relPath of TOC_LEVEL_2_OVERRIDES) {
	patchTocLevel(relPath, 2);
}

for (const relPath of TOC_LEVEL_4_OVERRIDES) {
	promoteEnumMemberHeadings(relPath);
	patchTocLevel(relPath, 3);
	patchTocMinLevel(relPath, 3);
}

for (const relPath of ENUM_LIST_TO_TABLE_FILES) {
	convertEnumListToTable(relPath);
}

// Reorder Example sections to appear after Properties in every generated page
const ALL_MD_FILES = existsSync(DOCS_DIR)
	? readdirSync(DOCS_DIR, { recursive: true })
			.filter(
				(f) => typeof f === "string" && f.endsWith(".md") && !f.endsWith("index.md")
			)
			.map((f) => join(DOCS_DIR, /** @type {string} */ (f)))
	: [];

for (const filePath of ALL_MD_FILES) {
	hoistMainSection(filePath);
	reorderExamplesLast(filePath);
	resolvePluginImageTags(filePath);
	promoteFirstH2toH1(filePath);
}

// Write _category_.json so docs:sync carries it into the coding-plugin folder
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
