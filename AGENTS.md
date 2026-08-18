# AGENTS.md

This repository is `@onlyoffice/docspace-plugin-sdk` — the TypeScript interfaces DocSpace plugins are written against (`src/`), the project template and `npx` generators (`template/`, `npx/`), and a skill that teaches an AI agent to build and audit plugins with them (`skills/docspace-plugin/`).

It is also a Claude Code plugin marketplace: `.claude-plugin/marketplace.json` lists one plugin whose source is the repository root, and `.claude-plugin/plugin.json` is that plugin's manifest. The skill is the plugin's only component.

## The DocSpace plugin skill

If the task is about DocSpace **plugins** rather than about this SDK's own sources — building one, adding a scope or an item to one, working out why one installs and does nothing, or answering a question about how the portal loads plugins — read [`skills/docspace-plugin/SKILL.md`](skills/docspace-plugin/SKILL.md) first and follow it. It is host-agnostic and is the same body every supported agent is pointed at.

Two things matter enough to repeat here:

- **Do not answer DocSpace plugin questions from memory.** The rules that decide whether a plugin works are portal behaviour, not type signatures, and they are written down in `skills/docspace-plugin/references/`. General knowledge about this SDK is unreliable.
- **Do not ship a plugin without validating it.** `node skills/docspace-plugin/scripts/validate-plugin.mjs <plugin-dir> --invoke` loads the built bundle in a sandbox and checks what the portal checks. A plugin that compiles cleanly and installs cleanly still does nothing if the registration name, a scope getter or a filter field is wrong, and none of that surfaces as an error anywhere else.

In the skill body, `$SKILL` means the `skills/docspace-plugin/` directory of this repository. Resolve it to an absolute path before running anything — the working directory is normally the plugin project being built, not this repository.

## Working on the SDK itself

- `npm run build` compiles `src/` to `dist/` with `tsc`; there is no test suite.
- Interfaces are the public contract — a change in `src/interfaces/` is a change every plugin author sees. Note it in `CHANGELOG.md`.
- A plugin project is never part of this repository. Generate one into a directory outside the checkout.
- `skills/docspace-plugin/scripts/test-validator.mjs` exercises the plugin validator against deliberately broken projects; run it after touching anything in `skills/docspace-plugin/scripts/`.
- `claude plugin validate .` checks both manifests; run it after touching anything in `.claude-plugin/` or renaming the skill directory.
