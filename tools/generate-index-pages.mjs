// @ts-check
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SECTIONS } from "./constants/sections.mjs";

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, "../..");
const DOCS_DIR = join(ROOT, "docs");

/**
 * Returns the first sentence of a text. Unlike a plain indexOf("."), it does not
 * break on periods inside parentheses ("(file, folder, etc.)"), after common
 * abbreviations ("etc.", "e.g.", "i.e.") or inside tokens ("9.2", "file.png").
 * @param {string} text
 * @returns {string}
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
			// Not a sentence boundary if followed by a non-space (e.g. "9.2", "file.png")
			if (next !== undefined && next !== " ") continue;
			if (ch === "." && abbrev.test(text.slice(0, i + 1))) continue;
			return text.slice(0, i + 1);
		}
	}
	return text;
}

/**
 * Reads the H1 title of a generated page (falls back to the given name).
 * Used so index tables and sidebar labels match the page title even when it
 * differs from the file name (e.g. Utility.md → "FilterType").
 * @param {string} mdFilePath
 * @param {string} fallback
 * @returns {string}
 */
function pageTitle(mdFilePath, fallback) {
	const content = readFileSync(mdFilePath, "utf-8");
	const m = content.match(/^# (.+)$/m);
	return m ? m[1].trim() : fallback;
}

/**
 * Extracts the description of the page's main symbol from a fully post-processed
 * markdown file: the first paragraph after the H1 (skipping "Defined in:" lines
 * and embedded images). Must run AFTER hoistMainSection/promoteFirstH2toH1 so the
 * H1 belongs to the symbol matching the file name (or to the module preamble).
 * Falls back to the paragraph after the first "Defined in:" for pages without H1.
 * @param {string} mdFilePath - Path to the generated .md file
 * @returns {string}
 */
function extractDescriptionFromMd(mdFilePath) {
	const content = readFileSync(mdFilePath, "utf-8");
	const body = content.replace(/^---\n[\s\S]*?---\n/, "");
	const lines = body.split("\n");

	let sawContext = false; // set by the H1 or a "Defined in:" line
	let inFence = false;
	const descLines = [];

	for (const line of lines) {
		const trimmed = line.trim();

		// Skip fenced code blocks (e.g. the type alias signature under the H1)
		if (/^\s*(```|~~~)/.test(line)) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;

		if (/^# /.test(line) || trimmed.startsWith("Defined in:")) {
			if (descLines.length > 0) break;
			sawContext = true;
			continue;
		}

		// Stop at the next heading
		if (/^#{2,} /.test(line)) break;

		if (!trimmed) {
			// Stop at first blank line AFTER we already collected some text
			if (descLines.length > 0) break;
			continue;
		}

		// Skip embedded images — both the raw tag, in case one has not been resolved
		// yet, and the markdown it resolves to — and the blockquote TypeDoc renders
		// the declaration signature as ("> **Component** = ..."). None of them
		// describe the symbol.
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

		// Display the page's H1 (may differ from the file name, e.g. Utility → FilterType)
		const displayName = pageTitle(join(docsPath, mdFile), name);
		const description = extractDescriptionFromMd(join(docsPath, mdFile));
		const extraValue = section.tableExtraValues?.[name] ?? "";

		if (section.tableExtraColumn) {
			rows.push(
				`| [\`${displayName}\`](${mdFile}) | ${description || "—"} | ${extraValue || "—"} |`
			);
		} else {
			rows.push(tableRow(displayName, description, mdFile));
		}
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
		`---`,
		`sidebar_position: ${section.sidebarPosition}`,
		`---`,
		``,
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

	const outPath = join(docsPath, "index.md");
	writeFileSync(outPath, content, "utf-8");
	console.log(
		`✅  Generated: docs/${section.docsDir}/index.md  (${rows.length} entries)`
	);
}

/**
 * TypeDoc nests a module page as "## Symbol / ### Group / #### member". Once
 * promoteFirstH2toH1 lifts the main symbol to the page H1, its subtree sits one
 * level too deep — the group lands on H3 and members on H4, below Docusaurus'
 * default TOC cutoff of 3.
 *
 * Shift that subtree up by one so it reads "# Symbol / ## Properties / ### member".
 * Only the region between the H1 and the next H2 moves: secondary symbols further
 * down the page are still H2 and keep their own nesting.
 * @param {string} filePath
 */
function raiseMainSymbolSubtree(filePath) {
	if (!existsSync(filePath)) return;
	const lines = readFileSync(filePath, "utf-8").split("\n");

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
	if (h1 < 0) return;

	inFence = false;
	let changed = false;
	for (let i = h1 + 1; i < end; i++) {
		if (/^\s*(```|~~~)/.test(lines[i])) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;
		const m = lines[i].match(/^(#{3,6}) (.*)$/);
		if (!m) continue;
		lines[i] = `${m[1].slice(1)} ${m[2]}`;
		changed = true;
	}

	if (changed) writeFileSync(filePath, lines.join("\n"), "utf-8");
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
 * Derives the dark-theme file name from a light-theme one by inserting `.dark`
 * before the extension: `main-button-plugin.png` -> `main-button-plugin.dark.png`.
 * @param {string} src
 * @returns {string}
 */
function toDarkSrc(src) {
	return src.replace(/(\.[^.]+)$/, ".dark$1");
}

/**
 * Replaces `<plugin-image src="..." [dark[="..."]] />` tags with Markdown images.
 * The src is relative to IMAGE_BASE.
 *
 * With the `dark` attribute two images are emitted, using the
 * `#gh-light-mode-only` / `#gh-dark-mode-only` convention the docs site toggles via CSS
 * (`[data-theme='dark'] img[src$='#gh-light-mode-only']` etc.). The dark source is either the
 * explicit value of `dark="..."` or, when the attribute is valueless, auto-derived by inserting
 * `.dark` before the extension of `src`. Without it a single image is emitted.
 *
 * There is no size attribute — Markdown images cannot carry one. A tag that does
 * not match is reported rather than passed through: a stray `<plugin-image>` in
 * the output is raw HTML that fails the Docusaurus build.
 * @param {string} filePath
 */
function resolvePluginImageTags(filePath) {
	if (!existsSync(filePath)) return;
	const content = readFileSync(filePath, "utf-8");
	const updated = content.replace(
		/<plugin-image\s+src=(["'])([^"']+)\1(\s+dark(?:=(["'])([^"']*)\4)?)?\s*\/>/g,
		(_match, _q1, src, darkAttr, _q2, darkValue) => {
			const alt = src.replace(/\.[^.]+$/, "");

			// `darkAttr` is undefined only when the `dark` attribute is absent.
			// A valueless `dark` (or `dark=""`) auto-derives the dark file name.
			if (darkAttr === undefined) {
				return `![${alt}](${IMAGE_BASE}/${src})`;
			}

			// The site hides whichever image does not match the active theme, keyed
			// on the URL fragment — see the `#gh-*-mode-only` rule in its custom.css.
			const darkSrc = darkValue ? darkValue : toDarkSrc(src);
			const light = `![${alt}](${IMAGE_BASE}/${src}#gh-light-mode-only)`;
			const dark = `![${alt}](${IMAGE_BASE}/${darkSrc}#gh-dark-mode-only)`;
			return `${light}${dark}`;
		}
	);

	// An unrecognised attribute (`width=` was dropped, for one) leaves the tag in
	// place, where it becomes raw HTML. Say so instead of shipping it.
	for (const leftover of updated.matchAll(/<plugin-image[^>]*>/g)) {
		console.warn(
			`[warn] Unrecognised ${leftover[0]} in ${basename(filePath)} — left as raw HTML`
		);
	}

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

	// Frontmatter is optional — TypeDoc only emits a block when something puts a
	// key in it, and nothing does by default.
	const fmMatch = content.match(/^(---\n[\s\S]*?---\n)/);
	const fm = fmMatch ? fmMatch[1] : "";
	const afterFm = content.slice(fm.length);

	// Already promoted (e.g. the pipeline ran twice over the same output) —
	// promoting again would turn the NEXT H2 into a second H1.
	if (/^# /m.test(afterFm)) return;

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
		const newFm = fm
			? fm.replace(/^(---\n)/, `$1sidebar_label: "${title}"\n`)
			: `---\nsidebar_label: "${title}"\n---\n`;
		const patched = newFm + `\n# ${title}\n\n${preamble}\n\n` + h2Part;
		writeFileSync(filePath, patched, "utf-8");
	}
	// else: multiple types, no description — leave H2 structure as is
}

/**
 * Docusaurus-compatible slug for a heading text (github-slugger style):
 * lowercase, punctuation stripped, spaces → hyphens, `_`/`-` preserved.
 * @param {string} text
 * @returns {string}
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
 * Strips the raw `<a id>` anchors TypeDoc leaves behind. Under list format every
 * member is a heading, so Docusaurus generates the anchor natively and these are
 * pure noise — the sole exception, the page title, is handled by
 * {@link dropPageTitleFragments}.
 * @param {string} filePath
 */
function stripRawAnchors(filePath) {
	if (!existsSync(filePath)) return;
	const content = readFileSync(filePath, "utf-8");
	const updated = content
		.replace(/^<a id="[^"]+"><\/a>\n+/gm, "")
		.replace(/<a id="[^"]+"><\/a> ?/g, "");
	if (updated !== content) writeFileSync(filePath, updated, "utf-8");
}

/**
 * The anchors Docusaurus will generate for a page.
 *
 * Only H2–H6 count: the theme strips the id from the page title. Repeated
 * headings are disambiguated with a numeric suffix the same way github-slugger
 * does, so a page with four `onSubmit` headings yields `onsubmit`, `onsubmit-1`,
 * `onsubmit-2`, `onsubmit-3`. Getting that wrong makes a valid deep link look
 * broken and invites "repairing" it onto the wrong heading.
 *
 * Fenced blocks are skipped so a `#` inside a code sample is not read as one.
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

/**
 * Docusaurus deliberately strips the id from every `<h1>` — see theme Heading:
 * `if (As === 'h1' || !id) return <As id={undefined} />` — so the page title is
 * the one heading that can never own an anchor. Rather than materialize an HTML
 * anchor for it, drop the now-pointless fragment from links that target it:
 * "../utils.md#imessage" → "../utils.md" lands on the very same spot, the top of
 * the page.
 *
 * Cross-file, so it needs every page's title at once.
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
	 * A page title slug is only pointless when no heading claims it. On a page
	 * whose title repeats as a property name, that property owns the anchor and
	 * the link must keep it.
	 * @param {{title: string|undefined, anchors: Set<string>}} page
	 * @param {string} fragment
	 */
	const isDeadTitleLink = (page, fragment) =>
		page?.title === fragment.toLowerCase() && !page.anchors.has(fragment.toLowerCase());

	for (const filePath of filePaths) {
		const content = readFileSync(filePath, "utf-8");
		const own = pages.get(resolve(filePath));

		const updated = content
			// Another page's title: keep the link, drop the fragment.
			.replace(/\]\(([^)\s#]+)#([^)\s]+)\)/g, (full, rel, fragment) => {
				const target = pages.get(resolve(dirname(filePath), rel));
				return target && isDeadTitleLink(target, fragment) ? `](${rel})` : full;
			})
			// This page's own title: unlink it. Pointing the reader at the top of the
			// page they are already reading is noise.
			.replace(/\[([^\]]+)\]\(#([^)\s]+)\)/g, (full, label, fragment) =>
				own && isDeadTitleLink(own, fragment) ? label : full
			);

		if (updated !== content) writeFileSync(filePath, updated, "utf-8");
	}
}

/**
 * Repairs in-page hash links:
 * - drops stale TypeDoc dedup suffixes ("#name-1") when "#name" exists;
 * - warns about anchors that cannot be resolved at all.
 * @param {string} filePath
 */
function fixInPageAnchors(filePath) {
	if (!existsSync(filePath)) return;
	const original = readFileSync(filePath, "utf-8");
	let content = original;

	const ids = pageAnchors(content);

	content = content.replace(/\]\(#([^)\s]+)\)/g, (full, anchor) => {
		const target = anchor.toLowerCase();
		if (ids.has(target)) return full;
		// Only a suffix that matches nothing is stale: real repeats are in `ids`.
		const stripped = target.replace(/-\d+$/, "");
		if (stripped !== target && ids.has(stripped)) return `](#${stripped})`;
		console.warn(
			`[warn] Unresolved in-page anchor #${anchor} in ${basename(filePath)}`
		);
		return full;
	});

	if (content !== original) writeFileSync(filePath, content, "utf-8");
}

/**
 * Removes the leading pipe TypeDoc puts on the first line of a multi-line union.
 *
 * TypeScript allows `type X = | A | B` for alignment, and TypeDoc emits unions
 * that way — one member per line, each opening with an escaped pipe:
 *
 *     \| `void`
 *     \| `IMessage`
 *
 * Markdown joins those lines into one paragraph, so the reader sees
 * "| void | IMessage" with a pipe dangling at the front. Drop it from the line
 * that opens the run; the rest are genuine separators.
 *
 * Fenced blocks are skipped — there the union is source code, and the leading
 * pipe is valid TypeScript.
 * @param {string} filePath
 */
function fixUnionPipeArtifacts(filePath) {
	if (!existsSync(filePath)) return;
	const lines = readFileSync(filePath, "utf-8").split("\n");
	const isUnionLine = (/** @type {string} */ line) => /^\s*\\\| /.test(line);

	let inFence = false;
	let changed = false;
	// Tracked separately rather than re-read from `lines`: the previous line may
	// already have had its pipe stripped, which would make the whole run look
	// like a series of openers and strip every separator.
	let prevWasUnion = false;
	for (let i = 0; i < lines.length; i++) {
		if (/^\s*(```|~~~)/.test(lines[i])) {
			inFence = !inFence;
			prevWasUnion = false;
			continue;
		}
		const isUnion = !inFence && isUnionLine(lines[i]);

		// Only the line that opens the run carries a stray pipe.
		if (isUnion && !prevWasUnion) {
			lines[i] = lines[i].replace(/^(\s*)\\\| /, "$1");
			changed = true;
		}
		prevWasUnion = isUnion;
	}

	if (changed) writeFileSync(filePath, lines.join("\n"), "utf-8");
}

/**
 * Inserts a blank line before headings that directly follow content (usually a
 * table row) — a known fragility point for GFM/MDX parsers. Skips code fences.
 * @param {string} filePath
 */
function ensureBlankLineBeforeHeadings(filePath) {
	if (!existsSync(filePath)) return;
	const original = readFileSync(filePath, "utf-8");
	const lines = original.split("\n");
	/** @type {string[]} */
	const out = [];
	let inFence = false;
	for (const line of lines) {
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
	const patched = out.join("\n");
	if (patched !== original) writeFileSync(filePath, patched, "utf-8");
}

/**
 * Strips a dangling `***` thematic break at the very end of a page.
 * @param {string} filePath
 */
function stripTrailingHr(filePath) {
	if (!existsSync(filePath)) return;
	const content = readFileSync(filePath, "utf-8");
	const updated = content.replace(/\n\*{3,}\s*$/, "\n");
	if (updated !== content) writeFileSync(filePath, updated, "utf-8");
}

// Run.
// Order matters: structural transforms first, cleanup second, and the section
// index pages last — they read the final H1 titles and descriptions.

const ALL_MD_FILES = existsSync(DOCS_DIR)
	? readdirSync(DOCS_DIR, { recursive: true })
			.filter(
				(f) => typeof f === "string" && f.endsWith(".md") && !f.endsWith("index.md")
			)
			.map((f) => join(DOCS_DIR, /** @type {string} */ (f)))
	: [];

// 1. Per-file structural transforms
for (const filePath of ALL_MD_FILES) {
	hoistMainSection(filePath);
	reorderExamplesLast(filePath);
	resolvePluginImageTags(filePath);
	promoteFirstH2toH1(filePath);
	raiseMainSymbolSubtree(filePath);
}

// 2. Links to a page title lose their fragment. Needs every page's H1 at once,
// and must precede fixInPageAnchors, which would otherwise warn about the very
// anchors this resolves.
dropPageTitleFragments(ALL_MD_FILES);

// 3. Cleanup passes over the final content
for (const filePath of ALL_MD_FILES) {
	fixUnionPipeArtifacts(filePath);
	stripRawAnchors(filePath);
	fixInPageAnchors(filePath);
	ensureBlankLineBeforeHeadings(filePath);
	stripTrailingHr(filePath);
}

// 4. Section index pages (read the final page content)
for (const section of SECTIONS) {
	generateIndexPage(section);
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
