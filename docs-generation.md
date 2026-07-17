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
npm run docs:sync   # generate + copy the result to the external docs site
```

`npm run docs` executes a **five-step pipeline** (see the `scripts` block in
[`package.json`](package.json)):

1. **`tools/update-revision.mjs`** — reads the current Git branch (`git rev-parse --abbrev-ref HEAD`)
   and writes it to `gitRevision` in `typedoc.config.mjs`, so the "Defined in:" source links point
   to the branch you actually generated from. Exits early if the value is already correct.

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

### Publishing

`npm run docs:sync` runs the full `docs` pipeline, then **`tools/sync-docs.mjs`** copies `docs/` into
the external documentation repository checked out **next to** this repo:

```
../api.onlyoffice.com/site/docspace/plugins-sdk/usage-sdk/coding-plugin
```

It wipes the destination, copies everything, removes the top-level `index.md` (the site supplies
its own landing page), and writes a `_category_.json`. This requires `../api.onlyoffice.com` to
exist as a sibling directory.

> **`tools/fix-titles.mjs`** is a standalone helper (not wired into any script). It normalises any
> `# some/path/Title` heading down to `# Title` in a separate docs checkout. Run it manually only
> when maintaining that destination.

### Post-processing details

Step 3 applies a series of text transforms to fix TypeDoc's raw output. Because these are
regex-based transforms over TypeDoc's Markdown, they are the first place to check if a
TypeDoc/plugin upgrade changes the output shape.

| Transform | What it fixes |
| --- | --- |
| `resolvePluginImageTags` | Rewrites `<plugin-image src="x.png" width="..." />` → `<img src="/assets/images/docspace/x.png" .../>` |
| `convertEnumListToTable` | Converts list-format enum members into a `Member / Value / Description` table (all enums except list-format overrides like `Actions`) |
| `reorderExamplesLast` | Moves `### Example(s)` sections after `### Properties` within each section |
| `hoistMainSection` | In mixed-kind modules, moves the section matching the file name to the top (fixes Enum-before-Interface ordering) |
| `promoteFirstH2toH1` | Promotes the main type's `## Heading` to `# H1`, or injects a title + module description for multi-type modules |
| `patchTocLevel` / `patchTocMinLevel` | Tunes `toc_max/min_heading_level` in frontmatter per file (dense pages drop to level 2; `Actions` uses a member-only TOC) |

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
| `propertiesFormat` / `interfacePropertiesFormat` | `"table"` | Render interface properties as tables |
| `enumMembersFormat` | `"list"` | Emit enum members as a list (converted to a table in step 3) |
| `parametersFormat` / `typeDeclarationFormat` | `"table"` | Render parameters and inline types as tables |
| `excludePrivate` / `excludeProtected` / `excludeInternal` / `excludeExternals` | `true` | Exclude private/protected/`@internal`/external members |
| `commentStyle` | `"jsdoc"` | Use `/** */` comment style |
| `useTsLinkResolution` | `true` | Resolve `{@link}` tags via the TypeScript type checker |
| `sourceLinkTemplate` / `gitRevision` | GitHub blob URL / current branch | Build the "Defined in:" source links (branch set in step 1, reverted in step 5) |
| `frontmatterGlobals` | `toc_max_heading_level: 3`, `hide_title: true` | Default frontmatter for every page (some overridden in step 3) |
| `cleanOutputDir` | `true` | Wipe and rebuild `docs/` on every run |
| `sidebar` | `{ autoConfiguration: true }` | Auto-generate the Docusaurus sidebar |
| `validation` | notExported, invalidLink, rewrittenLink | Validate documentation quality on generation |

To document a **new section**, add its glob to `entryPoints` here **and** add an entry to
[`tools/constants/sections.mjs`](tools/constants/sections.mjs).

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
 * <plugin-image src="button.png" width="480px" />
 */
```

`width` is optional. Step 3 rewrites the tag to
`<img alt="button" src="/assets/images/docspace/button.png" style={{width: "480px"}} />`.

### Ordering: `@example` last

Write `@example` blocks wherever they read best in the source — step 3 moves every
`### Example(s)` section to the bottom of the page, after the properties table.

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
- `docs:sync` / `fix-titles.mjs` depend on sibling repositories being present at fixed relative paths.

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
| [`tools/sync-docs.mjs`](tools/sync-docs.mjs) | `docs:sync` — copy output to the external site |
| [`tools/fix-titles.mjs`](tools/fix-titles.mjs) | Standalone helper — normalise path-style titles |
| `docs/` | Generated output (do not edit by hand) |
