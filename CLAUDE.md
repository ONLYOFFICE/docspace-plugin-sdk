# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # Compile TypeScript → dist/ (React pass, then root pass)
npm run docs           # Generate TypeDoc markdown docs (full pipeline)
npm run docs:sync      # Generate docs + sync to external location
```

There are no test or lint commands — TypeScript compiler (`tsc`) is the primary correctness check. Run `npm run build` to verify types compile cleanly.

`build` runs two `tsc` projects into the same `dist/`: `tsconfig.react.json` (`src/react`, which the root project excludes) and then `tsconfig.json` (everything else). The React pass must run first, and the two configs must keep identical `compilerOptions` — a difference leaves `dist/` half CommonJS and half something else, depending on which pass ran last.

## Architecture

This is `@onlyoffice/docspace-plugin-sdk` — a TypeScript type-definition package, a small React runtime, and a CLI scaffolding tool for building plugins in ONLYOFFICE Apps.

**The package ships three things:**

1. **Types/interfaces** (`src/` → `dist/`) — imported by plugin developers from the package root
2. **React runtime** (`src/react/` → `dist/react/`) — the `@onlyoffice/docspace-plugin-sdk/react` subpath export: hooks that reach the portal from inside a plugin's own React components
3. **CLI tools** (`npx/`) — `create-plugin` and `build-plugin` binaries (`create-docspace-plugin` / `build-docspace-plugin` are deprecated aliases to the same scripts)

### Type hierarchy

All plugin types extend from `IPlugin` (base interface). Each plugin type corresponds to a UI extension point:

| Interface                  | Extension point                          |
| -------------------------- | ---------------------------------------- |
| `IContextMenuPlugin`       | Right-click context menu                 |
| `IInfoPanelPlugin`         | File details sidebar                     |
| `IMainButtonPlugin`        | Main toolbar button                      |
| `IProfileMenuPlugin`       | User profile dropdown                    |
| `IFilePlugin`              | File-level actions                       |
| `IApiPlugin`               | Backend communication                    |
| `ISettingsPlugin`          | Admin settings block                     |
| `IEventListenerPlugin`     | Portal event subscriptions               |
| `IPostMessagePlugin`       | Cross-frame messaging                    |
| `IArticleButtonPlugin`     | Article panel button                     |
| `IArticleNavigationPlugin` | Sidebar navigation entry + its full page |

Each plugin type contains `*Item` interfaces (e.g., `IContextMenuItem`, `IInfoPanelItem`) which accept content in one of two forms:

- **UI components** — the SDK's declarative descriptors: `IButton`, `IInput`, `IBox`, `IModalDialog`, etc.
- **React components** — the `component` prop (`dialogBodyComponent` in `IModalDialog`), rendered by the client inside its own React tree

`component` is the current form. The declarative `body` (`IInfoPanelItem`, `IArticleButtonItem`), `settings` (`ISettings`), `content` (`IMediaViewer`), `dialogBody`/`dialogFooter` (`IModalDialog`) and the `onLoad` callbacks are deprecated in favour of it — data loading moves into a `useEffect` in the component. `IArticleNavigationItem.component` is React-only: it has no declarative form.

### React runtime (`/react`)

`src/react/` is the only stateful part of the package — it owns the context through which a plugin's components talk to the portal. Exports:

- `withPluginRuntime` — HOC wrapping a component that the client renders outside the portal's provider tree
- `usePluginRuntime`, `useCurrentFile`, `useCurrentUser`, `usePluginActions`, `usePluginAPI`, `usePluginSettings`
- `PluginAPIClient` (`request` plus `get`/`post`/`put`/`patch`/`delete`), `PluginApiError`, the `isPluginApiError` guard
- Types: `PluginRuntime`, `PluginActions`, `PluginSettingsClient`, `TCurrentFile`, `TCurrentUser`

`react` is an **optional** peer dependency (`>=19.0.0`) — plugins that use no React components never install it.

### Source layout

- `src/interfaces/plugins/` — one file per plugin type
- `src/interfaces/components/` — UI component interfaces
- `src/interfaces/items/` — item interfaces that link plugins to components
- `src/interfaces/settings/` — admin settings configuration
- `src/interfaces/utils/` — messaging types (`IMessage`, `IPostMessage`)
- `src/enums/` — constants constraining component/plugin behavior (`Actions`, `Events`, `Components`, `Files`, `Rooms`, `Section`, `Security`, etc.)
- `src/react/` — React runtime: `hooks`, `runtime`, `actions`, `api`, `settings`
- `src/index.ts` — barrel re-export of everything public (root entry; `src/react/index.ts` is the `/react` entry)
- `npx/` — CLI source (Inquirer.js prompts, template cloning, build tools)
- `template/` — boilerplate used by `create-plugin`
- `samples/` — working plugins, one per scope; `samples/article-navigation` is the reference React + `@docspace/ui-kit` build
- `tools/` — documentation pipeline scripts (TypeDoc post-processing for Docusaurus)

### Docs pipeline

Documentation is generated from JSDoc comments by TypeDoc + post-processing scripts in `tools/` (`npm run docs`). The full pipeline description, TypeDoc configuration rationale, output structure, and JSDoc writing conventions live in [docs-generation.md](docs-generation.md). The invariants of the generated output (page skeleton, tables, sidebar shape) are enforced by the `docs-style` skill (`.claude/skills/docs-style/`) — consult it before changing anything in `tools/`, `typedoc.config.mjs`, or public JSDoc.

### Key constraints

- Targets ES5 / CommonJS output (see `tsconfig.json`, `tsconfig.react.json`)
- Minimum ONLYOFFICE Apps version: 4.0.0 (enforced by SDK version 3.0.0). `build-plugin` reads it from the **installed SDK's** `package.json` field `minPortalVersion` and writes it into the plugin's `config.json` under the key `minDocSpaceVersion`. A plugin author cannot set it.
- Package manager: npm (`package-lock.json`) — CI installs with `npm ci`
- **The DocSpace name survives only where something outside this repo reads it**, and those spellings must not be "fixed": the package name `@onlyoffice/docspace-plugin-sdk` and its `/react` subpath, the external `@docspace/ui-kit` and `@onlyoffice/docspace-api-sdk`, the `minDocSpaceVersion` key inside a generated `config.json` (the portal reads it through `WebPluginDto`), the `UsersType` member `docSpaceAdmin` and its value `"DocSpaceAdmin"` (sent by the portal), the `github.com/ONLYOFFICE/docspace-*` URLs and the `docspace/plugins-sdk/usage-sdk` docs-site paths. Everything else says ONLYOFFICE Apps.

---

## Plugin development rules (for code generation)

This section applies when helping users **write plugins** that consume this SDK.

### Mandatory TypeScript rules

- Always import types from `@onlyoffice/docspace-plugin-sdk` — never redefine interfaces that exist in the SDK
- Import hooks from `@onlyoffice/docspace-plugin-sdk/react`, never from the root
- Use enums, never raw strings: `Actions.showToast`, not `"show-toast"`; `PluginStatus.Active`, not `"active"`
- Every plugin class must implement `IPlugin` at minimum; additional scope interfaces are additive
- Item callbacks must return an `IMessage` object with an `actions` array
- Prefer `component` over the deprecated `body`/`content`/`settings`/`dialogBody` props, and `useEffect` over `onLoad`

```typescript
// Correct callback return
onClick: () => ({
  actions: [Actions.showToast],
  toastProps: [{ type: ToastType.success, title: "Done" }],
});
```

### Plugin registration pattern

A plugin built as an ES module (`"runtime": "module"` in `package.json` — the template default since SDK 3.0) is registered by its **default export**. The client fetches `plugin.js`, rewrites its bare import specifiers to the portal's own copies, imports it and takes `default`; a module with no default export is rejected.

```typescript
const plugin = new MyPlugin();

export default plugin;
```

Only pre-3.0 plugins built without `runtime: "module"` still register on `window.Plugins`, keyed by `pluginName`:

```typescript
window.Plugins.PluginName = plugin || {};
```

### React pages and the UI kit

React components are rendered inside the ONLYOFFICE Apps application tree, so they can use the portal theme and the [`@docspace/ui-kit`](https://github.com/ONLYOFFICE/docspace-ui-kit-react) components — **provided the bundle leaves the shared modules external** and lets the client supply them:

```javascript
external: [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "@onlyoffice/docspace-plugin-sdk/react",
  /^@docspace\/ui-kit(\/.*)?$/,
];
```

The SDK **root** stays bundled — string enums and types, no module state. Only the React entry, which owns the runtime context, has to be shared. A second React arrives with its own contexts and every SDK hook throws; a second ui-kit fails more quietly, reading an empty theme context and rendering light and left-to-right whatever the portal is set to.

### Generated plugin project structure

After `npx create-plugin`, the plugin project looks like:

```
my-plugin/
├── src/index.ts          # Plugin implementation — exported as default
├── assets/               # Icons (16×16px SVG/PNG; 20×20 for article navigation items)
├── dist/                 # Build output: plugin.js (ESM), plugin.css, plugin.zip
├── vite.config.ts
├── tsconfig.json
└── package.json          # "scopes" array matching implemented interfaces + "runtime": "module"
```

Build command inside a plugin project:

```bash
npm run build   # runs: vite build && npx build-plugin → dist/plugin.zip
```

`build-plugin` zips `dist/plugin.js`, `dist/plugin.css` (skipped when empty), `assets/` and a generated `config.json`. It requires `dist/plugin.js` to exist.

`npx create-plugin` must be run **outside** the SDK repository directory, otherwise it errors with "could not determine executable to run".

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

// Redraw a changed item list (one action per scope)
{ actions: [Actions.updateArticleNavigationItems] }

// Multiple actions can be combined in one return
{ actions: [Actions.showToast, Actions.closeModal], toastProps: [...] }
```

Inside a React component the same actions are methods on `usePluginActions()` instead of a returned `IMessage`.

### Version compatibility

- **SDK 3.0+** — template moved from Webpack 5 to Vite 8 + `@vitejs/plugin-react`, plugins ship as ES modules (`"runtime": "module"`) registered by default export, React 19 is an optional peer dependency, and `component` supersedes the declarative `body`/`onLoad` props. Requires ONLYOFFICE Apps 4.0.0.
- **SDK 2.0+** — replaced `node scripts/createZip.js` with `npx build-docspace-plugin`.

Plugin `package.json` build script by SDK generation:

```json
"build": "vite build && npx build-plugin"      // 3.x
"build": "webpack && npx build-docspace-plugin"         // 2.x
```

### Reference links

- Plugin examples: https://github.com/ONLYOFFICE/docspace-plugins
- React + ui-kit reference build: [samples/article-navigation](samples/article-navigation)
- ONLYOFFICE Apps client plugin runtime: https://github.com/ONLYOFFICE/DocSpace-client/tree/master/packages/client/src/helpers/plugins
- ONLYOFFICE Apps UI kit: https://github.com/ONLYOFFICE/docspace-ui-kit-react
