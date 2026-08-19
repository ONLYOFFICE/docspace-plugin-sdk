# Documentation Generation Guide

This guide explains how to generate and write documentation for the ONLYOFFICE DocSpace
Plugin SDK (`@onlyoffice/docspace-plugin-sdk`).

## Overview

The documentation system uses:

- **TypeDoc** — main documentation generator that extracts documentation from TypeScript source files.
- **typedoc-plugin-markdown** — converts TypeDoc output to Markdown format.
- **typedoc-plugin-frontmatter** — adds frontmatter metadata to generated Markdown files.
- **typedoc-docusaurus-theme** — provides a Docusaurus-compatible documentation structure.

The API reference is **fully generated from JSDoc comments** in the TypeScript source code.
There are no hand-written API pages: every interface, type, property and enum member on the
docs site is produced from the declarations in [`src/`](src/). Writing documentation means
writing good JSDoc — the pipeline turns it into Docusaurus-ready Markdown.

## Requirements

- **Node.js** v22 and above
- **npm** v10 and above

## Installation

```bash
git clone https://github.com/ONLYOFFICE/docspace-plugin-sdk.git
cd docspace-plugin-sdk
npm install
```

## Source and Output Structure

Documentation is generated from the entry points declared in
[`typedoc.config.mjs`](typedoc.config.mjs). Barrel `index.ts` re-export files are **excluded**
so symbols are not documented twice.

```
src/
├── interfaces/
│   ├── components/*.ts          # UI components (IButton, IBox, IModalDialog, ...)
│   ├── components/Selector/      # Selector component family (TSelector, ...)
│   ├── items/*.ts               # Plugin items (IContextMenuItem, IInfoPanelItem, ...)
│   ├── plugins/*.ts             # Plugin type interfaces (IPlugin, IContextMenuPlugin, ...)
│   ├── settings/*.ts            # Admin/user settings interfaces (ISettings, ...)
│   └── utils/index.ts           # Messaging types (IMessage, IPostMessage)
└── enums/*.ts                   # SDK constants (Actions, Events, Files, Security, ...)
```

Generated output in `docs/`:

```
docs/
├── index.md                     # Project root page (removed on sync)
├── typedoc-sidebar.cjs          # Docusaurus sidebar configuration
├── _category_.json              # Docusaurus category link
├── interfaces/
│   ├── components/              # One .md per component + a generated index.md
│   ├── items/                   # One .md per item + index.md
│   ├── plugins/                 # One .md per plugin type + index.md
│   ├── settings/                # Settings interfaces + index.md
│   └── utils.md                 # Messaging types (single file)
└── enums/                       # One .md per enum + index.md
```

> `docs/` is regenerated from scratch on every run (`cleanOutputDir: true`).
> **Never hand-edit files in `docs/`** — edit the JSDoc or a `tools/` script instead.

## Generating Documentation

### Command

```bash
npm run docs        # generate the Markdown docs into docs/
npm run docs:sync   # generate + copy into a local docs-site checkout for preview
```

`npm run docs` executes a **five-step pipeline** (see the `scripts` block in
[`package.json`](package.json)):

1. **`tools/update-revision.mjs`** — reads the current Git branch (`git rev-parse --abbrev-ref HEAD`)
   and writes it to `gitRevision` in `typedoc.config.mjs`, so the "View source on GitHub" links
   point to the branch you actually generated from. Exits early if the value is already correct.

2. **`typedoc`** — parses all entry points, extracts JSDoc comments, and generates one Markdown
   file per symbol in `docs/`, plus `docs/typedoc-sidebar.cjs` and `docs/index.md`.

3. **`tools/generate-index-pages.mjs`** — the heaviest step. Does two jobs:
   - Builds a section `index.md` (summary table + prose) for each section defined in
     [`tools/constants/sections.mjs`](tools/constants/sections.mjs).
   - Post-processes every generated page (see [Post-processing](#post-processing-details) below).

4. **`tools/flatten-sidebar.mjs`** — collapses TypeDoc's deeply nested sidebar and regroups it
   under clean top-level categories (Components, Items, Plugins, Settings, Utils, Enums).

5. **`tools/update-sidebar.mjs`** — prefixes sidebar doc IDs with the site path
   `docspace/plugins-sdk/usage-sdk`, then reverts `gitRevision` back to `master` (undoing step 1),
   so the committed config always points at the default branch.

After step 5, `docs/` is the finished, publishable output.

### Syncing to a local docs-site checkout

`npm run docs:sync` runs the full `docs` pipeline, then **`tools/sync-docs.mjs`** copies `docs/` into
a **local checkout** of the documentation-site repository placed **next to** this repo:

```
../api.onlyoffice.com/site/docspace/plugins-sdk/usage-sdk/coding-plugin
```

This is a pure filesystem copy for **local preview**, not a deploy. It wipes the destination, copies
everything over, removes the top-level `index.md` (the site supplies its own landing page), and
writes a `_category_.json`. It requires `../api.onlyoffice.com` to exist as a sibling directory.

The script does **not** push or publish anything. To actually publish, commit and push the changes
in the `api.onlyoffice.com` repository yourself (its own build/deploy takes it from there).

### Post-processing details

Step 3 applies a series of text transforms to fix TypeDoc's raw output. Because these are
regex-based transforms over TypeDoc's Markdown, they are the first place to check if a
TypeDoc/plugin upgrade changes the output shape.

| Transform | What it fixes |
| --- | --- |
| `convertSourceLinks` | Rewrites `Defined in: [file.ts:12](url)` → `[View source on GitHub](url)`, one per symbol; drops the member-level ones |
| `resolvePluginImageTags` | Rewrites `<plugin-image src="x.png" [dark] />` → `![x](/assets/images/docspace/x.png)` (a `dark` attribute emits a light/dark pair) |
| `reorderExamplesFirst` | Moves `### Example(s)` sections ahead of `### Properties` / `### Methods` within each section |
| `hoistMainSection` | In mixed-kind modules, moves the section matching the file name to the top (fixes Enum-before-Interface ordering) |
| `promoteFirstH2toH1` | Promotes the main type's `## Heading` to `# H1`, or injects a title + module description (and a `sidebar_label`) for multi-type modules |
| `raiseMainSymbolSubtree` | Shifts the main symbol's headings up one level, so its group lands on H2 and its members on H3 — within Docusaurus' TOC cutoff |
| `fixUnionPipeArtifacts` | Strips TypeDoc's stray leading `\|` in union types, both across lines and inside a table cell |
| `escapePipesInTableCells` | Escapes the `\|` a comment puts inside a cell's inline code, which Markdown would otherwise read as a cell separator |
| `fixInPageAnchors` | Repairs in-page links whose target anchor does not exist, and warns about the ones it cannot resolve |
| `dropPageTitleFragments` | Drops the fragment from links that target a page title, which is the one heading Docusaurus cannot anchor |
| `ensureBlankLineBeforeHeadings` | Guarantees the blank line MDX needs before a heading |
| `stripTrailingHr` | Drops the trailing `***` TypeDoc puts between groups |

Every page's `# H1` comes from `promoteFirstH2toH1` — TypeDoc emits none, because `hidePageTitle`
is `true`. Several later steps key off that H1 (`raiseMainSymbolSubtree`, `dropPageTitleFragments`,
the sidebar labels in step 4, the index-page descriptions in step 3), so a change that stops the
promotion breaks them all silently.

### The only HTML in the output: table-row anchors

Members are rendered as table rows (see the `*Format` options below — enum members are the one
exception), and a row cannot carry an anchor without HTML, so TypeDoc puts a
`<a id="membername"></a>` in the first cell. Those are what `#label`, `#onclick` and every other
deep link into a member resolve to. They are also the only HTML: heading anchors are off
(`useHTMLAnchors` defaults to false) because Docusaurus anchors headings natively, applying the
sticky-navbar scroll offset (`.anchorTargetStickyNavbar`) an injected anchor does not get.

The one heading Docusaurus refuses to anchor is the page title (`Heading/index.js`:
`if (As === 'h1' || !id)`), so links to it drop their fragment instead of growing an anchor.

## TypeDoc Configuration

The full configuration is in [`typedoc.config.mjs`](typedoc.config.mjs). Key options:

| Option | Value | Purpose |
| --- | --- | --- |
| `entryPoints` | component/item/plugin/settings/utils/enum globs | Source files to document (**not** all of `src/`) |
| `exclude` | the barrel `index.ts` files | Prevent documenting re-exported symbols twice |
| `entryPointStrategy` | `"expand"` | Expand directory globs into individual files |
| `plugin` | markdown, frontmatter, docusaurus-theme | Output format and Docusaurus integration |
| `out` | `"docs"` | Output directory |
| `sort` | `["source-order"]` | Keep members in source order (not alphabetical) |
| every `*Format` option | `"table"` | Render members as table rows, as in the [JavaScript SDK docs](https://github.com/ONLYOFFICE/docspace-sdk-js) — TypeDoc anchors each row with an `<a id>` |
| `enumMembersFormat` | `"list"` | The exception: enum members document the message their action belongs in with an `@example`, and a fenced block flattens into an unreadable cell (see [`@example` first](#ordering-example-first)) |
| `tableColumnSettings` | `{ hideSources: true }` | Drop the per-row source column; `convertSourceLinks` keeps one "View source on GitHub" link per symbol instead |
| `useCodeBlocks` | `true` | Signatures as ` ```ts ` fences. The alternative, blockquotes, keeps type names linked but wraps long unions into a dense run of escaped braces |
| `expandObjects` / `expandParameters` | `true` | Spell inline objects and parameters out in signatures. Collapsed they render as a bare `object`; the cost is that their fields repeat in the "Type Declaration" section below |
| `excludePrivate` / `excludeProtected` / `excludeInternal` / `excludeExternals` | `true` | Exclude private/protected/`@internal`/external members |
| `commentStyle` | `"jsdoc"` | Use `/** */` comment style |
| `useTsLinkResolution` | `true` | Resolve `{@link}` tags via the TypeScript type checker |
| `sourceLinkTemplate` / `gitRevision` | GitHub blob URL / current branch | Build the "View source on GitHub" links (branch set in step 1, reverted in step 5) |
| `cleanOutputDir` | `true` | Wipe and rebuild `docs/` on every run |
| `sidebar` | `{ autoConfiguration: true }` | Auto-generate the Docusaurus sidebar |
| `validation` | notExported, invalidLink, rewrittenLink | Validate documentation quality on generation |

To document a **new section**, add its glob to `entryPoints` here **and** add an entry to
[`tools/constants/sections.mjs`](tools/constants/sections.mjs).

### Frontmatter

Pages carry no frontmatter unless something needs it. Only two keys are ever written, both by
step 3 and neither by `typedoc-plugin-frontmatter`:

| Key | Where | Written by |
| --- | --- | --- |
| `sidebar_label` | multi-type module pages with a `@packageDocumentation` preamble | `promoteFirstH2toH1` |
| `sidebar_position` | the five section `index.md` pages | `generateIndexPage` |

Do not reintroduce `toc_max_heading_level` / `hide_title` globals. `toc_max_heading_level: 3` is
already the Docusaurus default, and `hide_title` only suppresses Docusaurus' synthetic title,
which never renders while a page has its own `# H1`.

## Writing Documentation Comments

### File Header

Every source file starts with the Apache-2.0 copyright header, tagged `@license` so TypeDoc
excludes it from the output:

```typescript
/**
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ...
 *
 * @license
 */
```

### Module Description with `@packageDocumentation`

Add a module-level description at the top of an entry-point file with `@packageDocumentation`.
It becomes the intro paragraph of the generated page (e.g. for enum files that contain several
related enums):

```typescript
/**
 * Enumerations for file types, supported extensions, and security permissions.
 * @packageDocumentation
 */
```

### Interface Documentation

The first paragraph of an interface comment becomes its page description (and its first sentence
is reused as the summary in the section index table). Use the custom `<plugin-image>` tag to embed
a screenshot, and an `@example` block for usage:

```typescript
/**
 * A component that is used for an action on a page.
 *
 * <plugin-image src="button.png" />
 *
 * @example
 *
 * Primary save button with loading state and error handling
 *
 * ```typescript
 * const saveButton: IButton = {
 *   label: "Save Changes",
 *   size: ButtonSize.normal,
 *   onClick: async () => ({ actions: [Actions.showToast], toastProps: [...] }),
 *   primary: true,
 * };
 * ```
 */
export interface IButton {
  /** Defines the button text */
  label: string;

  /** Defines the button size. ... The default value is "extraSmall" */
  size: ButtonSize;
  // ...
}
```

Conventions:

- One top-level JSDoc block for the interface itself.
- One inline `/** */` comment per property — it becomes the **Description** column of the
  properties table.
- Note behaviour and defaults directly in the property comment.

### Property / Field Documentation

Keep property comments short and behaviour-focused:

```typescript
/** Specifies if the button is primary or not. If the button is primary, it is colored blue */
primary?: boolean;
```

### Enum Documentation

Enums are declared with a top-level description plus one inline comment per member. Members are
emitted as a list by TypeDoc and converted to a `Member / Value / Description` table in step 3
(except list-format enums like `Actions`, which keep per-member headings for the TOC):

```typescript
/**
 * Defines the supported file types.
 */
export enum FilesType {
  /** DocSpace room or workspace */
  room = "room",

  /** Generic file type */
  file = "file",

  /** Directory or folder */
  folder = "folder",
}
```

### Cross-References with `{@link}`

`useTsLinkResolution` is enabled, so `{@link}` tags resolve to navigable links between symbols.
Use them in descriptions and with `@see`:

```typescript
/**
 * Defines the {@link Component} discriminated union for embedding UI components into layouts.
 *
 * @see {@link TSelectorBreadCrumbs} - Breadcrumb navigation properties
 * @see {@link TSelectorPagination} - Pagination and item loading properties
 */
```

Common patterns:

- Reference a type/interface: `{@link IButton}`
- Reference a specific field: `{@link TFrameConfig.mode}`
- Reference an enum value: `{@link Actions.showToast}`

### Images with `<plugin-image>`

To embed a screenshot on a page, drop the image into the site's `assets/images/docspace/` folder
and add the custom tag to the symbol's JSDoc:

```typescript
/**
 * <plugin-image src="button.png" />
 */
```

Step 3 rewrites the tag to a plain Markdown image,
`![button](/assets/images/docspace/button.png)`.

There is no size attribute: Markdown images cannot carry one, and the output is deliberately
free of raw HTML. An image renders at its natural size, capped to the content column by the
site's global `img { max-width: 100% }`. Size a screenshot by saving the asset at the width it
should appear.

#### Theme-aware images (light / dark)

Add the optional `dark` attribute to emit a light/dark image pair. The docs site hides the
wrong one per theme via CSS on the `#gh-light-mode-only` / `#gh-dark-mode-only` src fragment
(`[data-theme='dark'] img[src$='#gh-light-mode-only']` etc. in its `src/css/custom.css`) — the
mechanism keys on the URL, not on the tag, so plain Markdown images work with it unchanged.

```typescript
/**
 * <plugin-image src="main-button-plugin.png" dark />
 */
```

rewrites to two images on one line:

```markdown
![main-button-plugin](/assets/images/docspace/main-button-plugin.png#gh-light-mode-only)![main-button-plugin](/assets/images/docspace/main-button-plugin.dark.png#gh-dark-mode-only)
```

- A valueless `dark` auto-derives the dark file name by inserting `.dark` before the extension
  (`main-button-plugin.png` → `main-button-plugin.dark.png`).
- Use `dark="other-name.png"` to point at an explicitly named dark asset instead.
- Both files must exist in the site's `assets/images/docspace/` folder.
- Without the `dark` attribute a single image is emitted.

### Ordering: `@example` first

Write `@example` blocks wherever they read best in the source — step 3 moves every
`### Example(s)` section ahead of the reference tables, so the page reads
description → example → properties.

An `@example` on a **member** rendered as a table row has nowhere to go: a fenced block cannot live
in a table cell, so TypeDoc flattens it into a long `**Example** \`…\`` run inside the description
cell. Keep those short (a literal, a type union) or move the example up to the symbol. Enum members
are the exception — they are a list precisely so their examples stay fenced.

## JSDoc Tags Reference

Tags used in this project:

| Tag | Usage | Example |
| --- | --- | --- |
| `@example` | Provide code examples (fenced with ` ```typescript `) | See examples above |
| `@remarks` | Additional context beyond the main description | `@remarks This action requires a modal to be open.` |
| `@see` | Reference related symbols | `@see {@link TSelectorPagination}` |
| `{@link}` | Inline navigable cross-reference | `Passed via {@link IButton.onClick}.` |
| `@license` | Mark the copyright header (excluded from output) | `@license` |
| `@packageDocumentation` | Provide a module-level description for an entry-point file | `@packageDocumentation` |
| `@internal` | Exclude a symbol from public docs (`excludeInternal: true`) | `@internal` |
| `@deprecated` | Mark deprecated features | `@deprecated Use IMainButtonItem instead.` |

## Gotchas

- `docs/` is regenerated from scratch — manual edits are lost. Fix the JSDoc or a `tools/` script.
- Steps 3–5 are regex-based transforms over TypeDoc's Markdown; a TypeDoc/plugin version bump can
  silently change the output shape and break them.
- `update-revision.mjs` mutates `typedoc.config.mjs` and `update-sidebar.mjs` reverts it. If a run
  is interrupted between them, `gitRevision` may be left on your branch name — re-run `npm run docs`
  or reset it to `master` before committing.
- Barrel `index.ts` files are excluded on purpose; adding one as an entry point duplicates every symbol.
- `docs:sync` depends on the sibling `api.onlyoffice.com` checkout being present at a fixed relative path.

## File Map

| Path | Role |
| --- | --- |
| [`src/`](src/) | Source of truth — TypeScript declarations + JSDoc |
| [`typedoc.config.mjs`](typedoc.config.mjs) | TypeDoc configuration |
| [`tools/update-revision.mjs`](tools/update-revision.mjs) | Step 1 — set `gitRevision` to current branch |
| [`tools/generate-index-pages.mjs`](tools/generate-index-pages.mjs) | Step 3 — section index pages + page post-processing |
| [`tools/constants/sections.mjs`](tools/constants/sections.mjs) | Section metadata for step 3 |
| [`tools/flatten-sidebar.mjs`](tools/flatten-sidebar.mjs) | Step 4 — flatten & regroup sidebar |
| [`tools/update-sidebar.mjs`](tools/update-sidebar.mjs) | Step 5 — prefix sidebar IDs, revert `gitRevision` |
| [`tools/sync-docs.mjs`](tools/sync-docs.mjs) | `docs:sync` — copy output into a local docs-site checkout for preview |
| `docs/` | Generated output (do not edit by hand) |
