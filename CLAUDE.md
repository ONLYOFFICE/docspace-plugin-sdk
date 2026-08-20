# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # Compile TypeScript → dist/
npm run docs           # Generate TypeDoc markdown docs (full pipeline)
npm run docs:sync      # Generate docs + sync to external location
```

There are no test or lint commands — TypeScript compiler (`tsc`) is the primary correctness check. Run `npm run build` to verify types compile cleanly.

## Architecture

This is `@onlyoffice/docspace-plugin-sdk` — a TypeScript type-definition package and CLI scaffolding tool for building plugins in ONLYOFFICE DocSpace.

**The package ships two things:**

1. **Types/interfaces** (`src/` → compiled to `dist/`) — imported by plugin developers
2. **CLI tools** (`npx/`) — `create-docspace-plugin` and `build-docspace-plugin` binaries

### Type hierarchy

All plugin types extend from `IPlugin` (base interface). Each plugin type corresponds to a UI extension point:

| Interface              | Extension point            |
| ---------------------- | -------------------------- |
| `IContextMenuPlugin`   | Right-click context menu   |
| `IInfoPanelPlugin`     | File details sidebar       |
| `IMainButtonPlugin`    | Main toolbar button        |
| `IProfileMenuPlugin`   | User profile dropdown      |
| `IFilePlugin`          | File-level actions         |
| `IApiPlugin`           | Backend communication      |
| `ISettingsPlugin`      | Admin settings block       |
| `IEventListenerPlugin` | Portal event subscriptions |
| `IPostMessagePlugin`   | Cross-frame messaging      |
| `IArticleButtonPlugin` | Article panel button       |

Each plugin type contains `*Item` interfaces (e.g., `IContextMenuItem`, `IInfoPanelItem`) which accept UI **components** as their content — `IButton`, `IInput`, `IBox`, `IModalDialog`, etc.

### Source layout

- `src/interfaces/plugins/` — one file per plugin type
- `src/interfaces/components/` — UI component interfaces
- `src/interfaces/items/` — item interfaces that link plugins to components
- `src/interfaces/settings/` — admin settings configuration
- `src/interfaces/utils/` — messaging types (`IMessage`, `IPostMessage`)
- `src/enums/` — constants constraining component/plugin behavior (`Actions`, `Events`, `Components`, `Files`, `Rooms`, `Security`, etc.)
- `src/index.ts` — barrel re-export of everything public
- `npx/` — CLI source (Inquirer.js prompts, template cloning, build tools)
- `template/` — boilerplate used by `create-docspace-plugin`
- `tools/` — documentation pipeline scripts (TypeDoc post-processing for Docusaurus)

### Docs pipeline

Documentation is generated from JSDoc comments by TypeDoc + post-processing scripts in `tools/` (`npm run docs`). The full pipeline description, TypeDoc configuration rationale, output structure, and JSDoc writing conventions live in [docs-generation.md](docs-generation.md). The invariants of the generated output (page skeleton, tables, sidebar shape) are enforced by the `docs-style` skill (`.claude/skills/docs-style/`) — consult it before changing anything in `tools/`, `typedoc.config.mjs`, or public JSDoc.

### Key constraints

- Targets ES5 / CommonJS output (see `tsconfig.json`)
- Minimum DocSpace version: 3.5.0 (enforced by SDK version 2.1.0)
- Package manager: yarn 4.6.0 (`.yarnrc.yml`) — use `yarn` for dependency management

---

## Plugin development rules (for code generation)

This section applies when helping users **write plugins** that consume this SDK.

### Mandatory TypeScript rules

- Always import types from `@onlyoffice/docspace-plugin-sdk` — never redefine interfaces that exist in the SDK
- Use enums, never raw strings: `Actions.showToast`, not `"show-toast"`; `PluginStatus.Active`, not `"active"`
- Every plugin class must implement `IPlugin` at minimum; additional scope interfaces are additive
- Item callbacks must return an `IMessage` object with an `actions` array

```typescript
// Correct callback return
onClick: () => ({
  actions: [Actions.showToast],
  toastProps: [{ type: ToastType.success, title: "Done" }],
});
```

### Plugin registration pattern

Every plugin must register itself on `window.Plugins`:

```typescript
declare global {
  interface Window {
    Plugins: any;
  }
}
window.Plugins.PluginName = plugin || {};
```

### Generated plugin project structure

After `npx create-docspace-plugin`, the plugin project looks like:

```
my-plugin/
├── src/index.ts          # Plugin implementation — exports all scope interfaces
├── assets/               # Icons (16×16px SVG/PNG)
├── dist/                 # Build output: plugin.js, plugin.css, plugin.zip
├── webpack.config.js
└── package.json          # Must include "scopes" array matching implemented interfaces
```

Build command inside a plugin project:

```bash
yarn build   # runs: webpack && npx build-docspace-plugin → dist/plugin.zip
```

`npx create-docspace-plugin` must be run **outside** the SDK repository directory, otherwise it errors with "could not determine executable to run".

### Common IMessage actions

```typescript
// Toast
{ actions: [Actions.showToast], toastProps: [{ type: ToastType.success, title: "..." }] }

// Modal open / close
{ actions: [Actions.showModal], modalDialogProps: { /* IModalDialog */ } }
{ actions: [Actions.closeModal] }

// Selector (files, people, rooms)
{ actions: [Actions.showSelector], selectorProps: { type: SelectorType.Files, /* ... */ } }

// Settings persistence
{ actions: [Actions.saveSettings], settings: { key: "value" } }

// Multiple actions can be combined in one return
{ actions: [Actions.showToast, Actions.closeModal], toastProps: [...] }
```

### Version compatibility

SDK 2.0+ replaced `node scripts/createZip.js` with `npx build-docspace-plugin`. Plugin `package.json` build script must be:

```json
"build": "webpack && npx build-docspace-plugin"
```

### Reference links

- Plugin examples: https://github.com/ONLYOFFICE/docspace-plugins
- DocSpace client plugin runtime: https://github.com/ONLYOFFICE/DocSpace-client/tree/master/packages/client/src/helpers/plugins
