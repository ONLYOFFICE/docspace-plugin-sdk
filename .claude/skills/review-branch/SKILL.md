---
name: review-branch
description: >
  Review the current branch of the plugin SDK against its parent branch:
  resolves the base automatically, checks the public API, the contract with
  the portal and the JSDoc, and reports ranked findings. Use when asked to
  review a branch or a pull request of this repository.
---

# Review a branch against its parent

Read-only code review of everything the current branch adds on top of its base.
Never edits, never commits, never pushes; the output is findings. Run it from
this repository: the DocSpace-client `review-branch` skill does not see it.

## Step 1: resolve the scope

```bash
node .claude/skills/review-branch/scripts/review-scope.mjs [<base>] [--fetch] [--save] [--diff]
```

Base resolution: an explicit `<base>`, then `git config branch.<current>.reviewBase`,
then auto-detect: of every `release/*`, `hotfix/*`, `develop`, `master`, `main`
and `feature/*` ref, local or `origin/`, the one whose fork point leaves the
fewest commits on our side. A ref that already contains HEAD is skipped, and a
local ref that lags `origin/` loses to it. Check the runners-up the script
prints; if the pick is implausible, pass the base explicitly. **State the
resolved base in the report.**

## Step 2: the diff

```bash
git diff <base>...HEAD
```

## Step 3: read the changed files whole

Never judge a hunk from the diff alone. Read each changed file in full, and
for a changed interface find what uses it: `src/index.ts` and the
`src/interfaces/*/index.ts` barrels, `src/react/index.ts`, the
`npx/helpers/*.js` templates, the samples.

## Step 4: checks the diff will not show you

| Check | How |
|---|---|
| **Public surface** | every new interface, enum and type is reachable from `src/index.ts` (React ones from `src/react/index.ts`) |
| **Contract with the portal** | enum string values (`Actions`, `Events`, `Section`, ...) are the wire format the portal matches: changing a value or renaming a member breaks plugins built against the old SDK. A new action or scope does nothing until DocSpace-client handles it (`packages/client/src/helpers/plugins/` and `src/store/PluginStore.ts`); find the paired client branch with `git -C <client> log --all --oneline -S"<new enum value>"`. Portal behaviour the JSDoc describes that only an unreleased client branch has needs "from version X" |
| **Compatibility** | removing an export, or making an optional field required, is breaking; a deprecation gets `@deprecated` and a `Deprecated` line |
| **CHANGELOG** | every public change has a line under the unreleased version: Added, Changed or Deprecated |
| **JSDoc** | the `docs-style` skill and `docs-generation.md`; a mention of another type is a link, not plain text. An `@example` matches the current API and follows the rules its own source file states; the fence may be `typescript`, `ts` or `tsx`. To compile an example that imports `@onlyoffice/apps-ui-kit`, take the kit's types from a DocSpace-client checkout |
| **Scaffold** | a new scope has its `npx/helpers/<scope>.js` template, an entry in `npx/createTemplate.js` and `npx/dialog.js`, and the template matches the interface |
| **Naming** | prose says ONLYOFFICE Apps; DocSpace only where `CLAUDE.md` lists it |
| **Headers** | new `src/**` files carry the Apache header |
| **Downstream copies** | agent-skills vendors a build of this SDK (`skills/apps-plugin-sdk/vendor/*.tgz`) and DocSpace-client may pin a pre-release tarball; a branch that changes `dist/` leaves them stale. Pack HEAD with `rm -rf dist && npm run build && npm pack --pack-destination <tmp>` (`tsc` does not clean `dist/`), extract both with `tar --force-local -xzf` and `diff -r`: only `package.json` may differ, in `version` and the final newline |

## Step 5: verify

```bash
npm run build
npx typedoc --options typedoc.config.mjs --emit none
```

There are no tests or lint: the two `tsc` passes check the types, and TypeDoc
checks the JSDoc (`npm run docs` rewrites the tracked `typedoc.config.mjs`, so a
review does not run it). Every link between pages warns "The relative path ...
is not a file"; that is how links look here, not a finding. Any other warning
in a file the branch touches is. An
`npx/` change is checked by scaffolding: call the default export of
`npx/createTemplate.js` with the arguments `npx/index.js` passes, into a folder
you created, install the fresh pack there and run `npx tsc --noEmit`. Report
what you ran and what it said, including "nothing was run".

## Step 6: report

Ranked most severe first, in the language the user wrote in. For each finding:
severity (high, medium, low, nit), a `file:line` link, what breaks with a
concrete input, the fix, and whether the branch introduced it. Open with the
base and the size of the diff and one sentence on whether the change does what
it claims; close with which findings block the merge.
