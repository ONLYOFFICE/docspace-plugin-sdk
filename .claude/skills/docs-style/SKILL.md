---
name: docs-style
description: >
  Guards the look and skeleton of the generated SDK docs. Use when changing
  public JSDoc, typedoc.config.mjs, or the tools/ pipeline, or when
  regenerating docs.
---

# DocSpace Plugin SDK docs style

Full guide: `docs-generation.md` (pipeline, TypeDoc config rationale, JSDoc
conventions). Never edit `docs/` by hand — it is regenerated on every run and
published to `api.onlyoffice.com`.

## Invariants of the generated output

Changes to JSDoc, `typedoc.config.mjs`, or `tools/` must not break these.
If a change would — stop and confirm with the user first.

1. **Page skeleton:** H1 (main symbol) → one `[View source on GitHub]` link →
   description → optional light/dark image pair → Examples → reference tables.
2. **Members are table rows** in source order, each table wrapped in the
   site's `<APITable>` component (mdx-code-block fences); row anchors are the
   literal first-cell text (case-sensitive, `?` included), `Symbol-`-prefixed
   on pages with colliding names. No raw HTML in the output. Signatures are
   ` ```ts ` fences. **Enum members stay a list** — their example fences
   can't live in table cells.
3. **Section `index.md`** per section (prose from `tools/constants/sections.mjs`
   + Overview table from page H1s and first sentences). **Sidebar:** six flat
   groups — Components, Items, Plugins, Settings, Utils, Enums — linking to
   those index pages, labels from page H1s.
4. **No links to page titles by `#fragment`** (Docusaurus strips H1 ids);
   `gitRevision` ends every run as `"master"`; no stray files in `docs/`
   (no `_category_.json`, no `.nojekyll`).

## Rules

- **Fix at the source, in this order:** JSDoc comment → `typedoc.config.mjs` →
  a new transform in `tools/` only as a last resort, and general, not
  page-specific.
- **Transform phase order is load-bearing:** structural →
  `dropPageTitleFragments` → cleanup → section indexes. New transforms slot
  into the right phase.

## Verify

```bash
npm run docs   # no NEW TypeDoc warnings, zero [warn] lines from tools/
```

Then `git diff docs/` — only intended changes.
