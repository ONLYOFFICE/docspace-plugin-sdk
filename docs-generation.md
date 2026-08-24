# Documentation Generation Guide

This guide explains how the reference documentation for `@onlyoffice/docspace-plugin-sdk` is generated, how the pipeline is structured, and how to write documentation comments so the output stays consistent.

The generated output in `docs/` is published to `api.onlyoffice.com` (section `docspace/plugins-sdk/usage-sdk/coding-plugin`) — never edit `docs/` by hand; it is wiped and regenerated on every run (`cleanOutputDir: true`).

## Overview

The documentation system uses:

- **TypeDoc** — extracts documentation from JSDoc comments in the TypeScript sources
- **typedoc-plugin-markdown** — converts TypeDoc output to Markdown
- **typedoc-plugin-frontmatter** — adds frontmatter metadata to the generated files
- **typedoc-docusaurus-theme** — emits a Docusaurus-compatible sidebar (`typedoc-sidebar.cjs`)
- **`tools/`** — post-processing scripts that reshape the raw TypeDoc output into the final page skeleton

## Generating documentation

```bash
npm run docs        # full pipeline → docs/
npm run docs:sync   # full pipeline + copy into ../api.onlyoffice.com
```

`npm run docs` executes five steps in sequence (see `package.json`):

1. **`tools/update-revision.mjs`** — reads the current Git branch and writes it into `typedoc.config.mjs` → `gitRevision`, so "View source on GitHub" links point at the branch being documented.
2. **`typedoc`** — parses the entry points and generates raw Markdown into `docs/`.
3. **`tools/generate-index-pages/index.mjs`** — rewrites every generated page (see [Post-processing](#post-processing)) and builds an `index.md` per section.
4. **`tools/flatten-sidebar.mjs`** — flattens and regroups the Docusaurus sidebar (see [Sidebar](#sidebar)).
5. **`tools/update-sidebar.mjs`** — prefixes sidebar doc ids with the site path and reverts `gitRevision` back to `master`.

`npm run docs:sync` additionally runs `tools/sync-docs.mjs`, which replaces
`../api.onlyoffice.com/site/docspace/plugins-sdk/usage-sdk/coding-plugin` with the content of `docs/`, dropping the root `index.md`.

A healthy run introduces **no new TypeDoc warnings and no `[warn]` lines** from the post-processing scripts. A new warning usually means a broken `{@link}` target, an unresolved in-page anchor, or a malformed `<plugin-image>` tag. (A number of pre-existing TypeDoc warnings — relative `.md` links treated as file copies, `GroupItem` notExported — are known and harmless.)

## Entry points and output structure

TypeDoc entry points are listed explicitly in `typedoc.config.mjs` (not all of `src/`); the barrel `index.ts` files are excluded so each source file becomes its own page (`outputFileStrategy: "modules"`):

```
src/interfaces/components/*.ts + components/Selector/index.ts
src/interfaces/items/*.ts
src/interfaces/plugins/*.ts
src/interfaces/settings/*.ts
src/interfaces/utils/index.ts
src/enums/*.ts
```

Generated output:

```
docs/
├── index.md                     # project index (not synced to the site)
├── typedoc-sidebar.cjs          # Docusaurus sidebar
├── interfaces/
│   ├── components/              # one page per component + index.md
│   ├── items/                   # one page per item + index.md
│   ├── plugins/                 # one page per plugin type + index.md
│   ├── settings/                # ISettings.md + index.md
│   └── utils.md                 # IMessage/IPostMessage (single page, no section index)
└── enums/                       # one page per enum file + index.md
```

## TypeDoc configuration

The full configuration is `typedoc.config.mjs`. The options that define the look of the output:

| Option | Value | Purpose |
|---|---|---|
| `outputFileStrategy` | `"modules"` | One page per source file |
| `hidePageTitle` / `hideBreadcrumbs` / `hidePageHeader` | `true` | Post-processing supplies the H1 itself |
| `hideGroupHeadings` | `true` | No "Interfaces" / "Type Aliases" kind headings inside pages |
| `sort` | `["source-order"]` | Members appear in source order, not alphabetically |
| `useCodeBlocks` | `true` | Signatures as ` ```ts ` fences — long unions break across lines instead of wrapping into escaped braces |
| `expandObjects` / `expandParameters` | `true` | Inline objects expanded in signatures; the signature is the overview, the "Type Declaration" table below is the reference |
| `propertiesFormat` etc. | `"table"` | Members are table rows; TypeDoc's per-row `<a id>` anchors are later replaced by the `<APITable>` wrapper (see below) |
| `enumMembersFormat` | `"list"` | Enum members stay a list: their descriptions carry `@example` fences, which cannot live in a table cell |
| `tableColumnSettings` | `{ hideSources: true }` | No per-member source column; one "View source on GitHub" link per symbol instead |
| `excludeInternal` / `excludePrivate` / `excludeProtected` | `true` | `@internal` symbols never appear in the output |
| `sourceLinkTemplate` | GitHub blob URL with `{gitRevision}` | Source links; revision is set by `update-revision.mjs`, reverted to `master` by `update-sidebar.mjs` |
| `githubPages` | `false` | Keeps TypeDoc from dropping a `.nojekyll` that `docs:sync` would carry into the site repo |
| `commentStyle` | `"jsdoc"` | Only `/** */` comments are picked up |
| `validation` | notExported, invalidLink, rewrittenLink, unusedMergeModuleWith | Link and export validation on every run |

## Post-processing

Layout of `tools/`:

- `shared/markdown.mjs` — shared primitives: `walkMarkdownLines` (line walker that flags code blocks), `transformFile`, `slugify`, `collectPageAnchors`
- `generate-index-pages/index.mjs` — pipeline order only: structural transforms → cross-page links → cleanup transforms → APITable wrapping → section index pages
- `generate-index-pages/page-transforms.mjs` — per-page transforms (`STRUCTURAL_TRANSFORMS`, `CLEANUP_TRANSFORMS`)
- `generate-index-pages/cross-page-links.mjs` — drops dead page-title fragments (needs all pages at once)
- `generate-index-pages/api-tables.mjs` — wraps member tables in `<APITable>`, swaps the anchor scheme (needs all pages at once)
- `generate-index-pages/section-index.mjs` — `index.md` per section
- `constants/sections.mjs` — section titles, prose and table config for the index pages
- `flatten-sidebar.mjs`, `update-sidebar.mjs`, `update-revision.mjs`, `sync-docs.mjs` — sidebar, revision and sync steps

### Structural transforms (order matters)

1. `convertSourceLinks` — rewrites `Defined in: [file.ts:N](url)` to one `[View source on GitHub](url)` per symbol; member-level source lines are dropped.
2. `hoistMainSection` — moves the H2 section matching the file name to the front (fixes TypeDoc's kind-based ordering).
3. `reorderExamplesFirst` — inside each symbol section, `### Example(s)` moves ahead of the reference tables (Type Declaration, Properties, …).
4. `resolvePluginImageTags` — rewrites `<plugin-image src="x.png" [dark[="y.png"]] />` to Markdown images under `/assets/images/docspace/`; `dark` emits a light/dark pair using the `#gh-light-mode-only` / `#gh-dark-mode-only` URL convention.
5. `promoteFirstH2toH1` — gives the page its H1 (TypeDoc emits none): promotes the main-symbol H2, or injects a title derived from the file name when the page has several symbols and a module preamble.
6. `raiseMainSymbolSubtree` — shifts the main symbol's H3+ headings up one level so groups land on H2 and members on H3, within Docusaurus' TOC cutoff.

### Cross-page links

`dropPageTitleFragments` — Docusaurus strips the id from every H1, so a `#fragment` targeting a page title resolves to nothing. Fragments pointing at another page's title are dropped (the link keeps working, landing at the top); self-references to the own title are unlinked. Runs between the structural and cleanup passes because it needs every page's final H1 at once.

### Cleanup transforms

1. `fixUnionPipeArtifacts` — strips the stray `\|` TypeDoc leaves before the first member of a multi-line union.
2. `escapePipesInTableCells` — escapes `|` inside inline code in table cells (an unescaped pipe from a comment breaks the row).
3. `fixInPageAnchors` — drops stale `-N` dedup suffixes from in-page hash links; warns about anchors that resolve to nothing.
4. `ensureBlankLineBeforeHeadings` — restores the blank line MDX requires before a heading.
5. `stripTrailingHorizontalRule` — removes a dangling `***` left at the end of a page by `hoistMainSection`.

### APITable wrapping

`applyApiTables` (`api-tables.mjs`) runs last, after the cleanup transforms have validated the original anchors. It wraps every member table (a table whose rows carry TypeDoc's `<a id>` anchors) in the docs site's `<APITable>` component via `mdx-code-block` fences, strips the `<a id>` anchors, and rewrites all fragment links to the ids the component derives at runtime:

- the row id is the **literal text of the first cell** (case-sensitive, `?` included for optional members): `<a id="onclick">` becomes `#onClick`, `<a id="primary">` becomes `#primary?`;
- on pages where row names collide across tables, every table gets a `name="Symbol"` prop and ids become `Symbol-member` (e.g. `#IMessage-actions` in `utils.md`);
- the component makes rows clickable and highlights the row targeted by the URL hash;
- enum pages are unaffected — enum members render as a list, their anchors stay heading slugs.

The result carries no raw HTML: the only non-Markdown syntax in the output is the `mdx-code-block` fences around `<APITable>`.

### Section index pages

For every section in `tools/constants/sections.mjs` (`components`, `items`, `plugins`, `settings`, `enums`), `section-index.mjs` generates an `index.md`:

- **H1 title**, intro **description** and optional **usage** paragraph — all authored in `sections.mjs`;
- an **Overview table** (`| Interface | Description |`, header name configurable) built from each page's final H1 and the first sentence of its description.

## Sidebar

`flatten-sidebar.mjs` reshapes the auto-generated `typedoc-sidebar.cjs`:

- drops TypeDoc's wrapper levels (directory names, "Interfaces", "Type Aliases", …);
- regroups everything under six top-level categories — **Components, Items, Plugins, Settings, Utils, Enums** — each linking to its section `index.md` (Utils, a single page, links to the page itself);
- sorts categories before docs, alphabetically within each;
- relabels items with the H1 of the generated page when it differs from the file name (e.g. `Utility` → `FilterType`).

`update-sidebar.mjs` then prefixes every doc id with `docspace/plugins-sdk/usage-sdk` and reverts `gitRevision` to `master`.

## Writing documentation comments

### File header

Every source file starts with the copyright block ending in `@license` (which makes TypeDoc exclude it from output). Copy it verbatim from any existing file in `src/`.

### Symbol documentation

A typical interface page is authored like this:

```typescript
/**
 * Describes an item that will be embedded in the context menu.
 *
 * Items are registered by a plugin implementing
 * [`IContextMenuPlugin`](../plugins/IContextMenuPlugin.md).
 *
 * <plugin-image src="context-menu-plugin.png" dark />
 *
 * @example
 *
 * File analysis with progress reporting
 *
 * ```typescript
 * const analyzeFile: IContextMenuItem = { ... };
 * ```
 */
export interface IContextMenuItem { ... }
```

Conventions:

- **First sentence matters** — it becomes the page's description in the section Overview table and the H1 neighbourhood. Make it a complete, self-contained sentence.
- **Examples are fenced ` ```typescript ` blocks** inside `@example`, optionally preceded by a one-line caption. The post-processing moves them ahead of the reference tables, so write them as the "how to use" story of the symbol.
- **Cross-references**: `{@link Symbol}` / `{@link Symbol.member}` for same-project symbols (TypeDoc resolves and validates them), or an explicit relative Markdown link (`[`IContextMenuPlugin`](../plugins/IContextMenuPlugin.md)`) when linking to a page rather than a symbol. Never a plain-text mention — it rots silently.
- **Screenshots** via the `<plugin-image>` tag, never raw Markdown image syntax:
  - `<plugin-image src="button.png" />` — single image;
  - `<plugin-image src="button.png" dark />` — light/dark pair, dark name derived as `button.dark.png`;
  - `<plugin-image src="button.png" dark="custom.png" />` — explicit dark image.
  Images live in the site repo under `/assets/images/docspace/`.
- **Member comments** are inline `/** */` blocks on each field/method; `@param` / `@returns` on methods. Remember enum members render as a **list** (examples allowed), everything else as **tables** (keep member descriptions single-paragraph, no fences — TypeDoc would flatten a fenced example into one unreadable inline-code run in the cell).
- **`@internal`** on anything exported but not public — it is excluded from the output.
- **`@packageDocumentation`** provides the module-level description of an entry-point file (used by the barrel `index.ts` files and multi-symbol enum files such as `Files.ts`).

## Adding a new section or page

- **New source file** in an existing entry-point glob — nothing else to do; the page, section index row, and sidebar entry appear on the next run.
- **New directory/section** requires three edits:
  1. `typedoc.config.mjs` — add the entry point (and exclude its barrel `index.ts`);
  2. `tools/constants/sections.mjs` — add a `Section` entry (title, description, usage, table caption);
  3. `tools/flatten-sidebar.mjs` — add the wrapper label to `WRAPPER_LABELS` and the group to `GROUPS`.

## Gotchas

- `docs/` is regenerated from scratch (`cleanOutputDir: true`) and gitignored — manual edits are lost; fix the JSDoc or a `tools/` script.
- The `tools/` transforms are regex-based rewrites of TypeDoc's Markdown; a TypeDoc/plugin version bump can silently change the output shape and break them — diff `docs/` against a pre-bump run.
- `update-revision.mjs` mutates `typedoc.config.mjs` and `update-sidebar.mjs` reverts it. An interrupted run can leave `gitRevision` on your branch name — re-run `npm run docs` or reset it to `master` before committing.
- Barrel `index.ts` files are excluded on purpose; adding one as an entry point duplicates every symbol.
- `docs:sync` requires the `api.onlyoffice.com` checkout as a sibling directory of the repo.

## Fixing output problems

Fix problems at the source, in this order:

1. the JSDoc comment in `src/`;
2. TypeDoc configuration (`typedoc.config.mjs`);
3. only as a last resort — a new transform in `tools/` (and then a general rule, not a page-specific hack).

A regex transform papering over a comment that could simply be rewritten is technical debt in the pipeline.
