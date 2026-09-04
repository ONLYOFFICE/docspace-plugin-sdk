# Change Log

## 3.0.0

## Deprecated

- **DEPRECATED** `body` in `IInfoPanelItem` and `IArticleButtonItem`, `settings` in
  `ISettings`, `content` in `IMediaViewer`, `dialogBody` and `dialogFooter` in
  `IModalDialog` — use `component` (`dialogBodyComponent` in `IModalDialog`)
- **DEPRECATED** `onLoad` in `IInfoPanelItem`, `IArticleButtonItem`, `IMediaViewer`,
  `ISettings`, `IModalDialog` — load data with `useEffect` in the component

## Added

- Add `@onlyoffice/docspace-plugin-sdk/react` subpath — modules `api`, `actions`,
  `settings`, `runtime`, `hooks`
- Add hooks `useCurrentFile`, `useCurrentUser`, `usePluginActions`, `usePluginAPI`,
  `usePluginSettings`, `usePluginRuntime` and the `withPluginRuntime` HOC
- Add `component` prop to `IInfoPanelItem`, `IArticleButtonItem`, `IMediaViewer`,
  `ISettings` and `dialogBodyComponent` to `IModalDialog`
- Add `IArticleNavigationPlugin`, `IArticleNavigationItem`, `Section` enum
- Add `PluginAPIClient` — `request` plus `get`, `post`, `put`, `patch`, `delete`, body
  on `delete`, `headers` and `AbortSignal` options, the portal's `response` wrapper
  unwrapped (`{ total, items }` for lists), `..` and absolute paths refused
- Add `PluginApiError` and the `isPluginApiError` guard — `status`, portal message,
  failed `request`, error body in `details`
- Add to `PluginActions`: `showCreateDialog`, `updateSelector`, a tab argument for
  `openInfoPanel` and the `update*Items` family
- Add `Actions.updateArticleButtonItems` and `Actions.updateArticleNavigationItems`
- Add `runtime: "module"` support in `build-docspace-plugin`, written to `config.json`
- Bump `react` peer dependency to `>=19.0.0`
- Docs: separate React API section
- Sample: `samples/article-navigation` rewritten on Vite + React 19 and
  `@docspace/ui-kit`

## Changed

- Raise `minDocSpaceVersion` to 4.0.0 — plugins built with this SDK need the module
  runtime and the React entry the portal supplies from 4.0.0 on
- Template: Vite 8 + `@vitejs/plugin-react` instead of Webpack 5 + ts-loader, CSS
  output renamed to `plugin.css`
- Template: TypeScript 5.6, target `ES2017`, `moduleResolution: bundler`,
  `jsx: react-jsx`, prettier 3.x
- Template: `react` and `react-dom ^19` added as dependencies; react, react-dom, the
  SDK React subpath and `@docspace/ui-kit` marked `external` — the SDK root stays
  bundled
- Template: `"runtime": "module"` added to `package.json`, `window.Plugins`
  registration dropped from `src/index.ts`
- Packaging: `.npmignore` denylist replaced with a `files` allowlist — `dist`, `npx`,
  `template`
- Packaging: the React `tsc` pass runs before the root pass, so `dist` keeps the
  CommonJS emit the package declares

## 2.1.1

## Added

- Add markdown documentation generation with TypeDoc
- Add LLM instructions for DocSpace Plugin SDK development

## 2.1.0

## Changed

- Remove type: "module" from package.json
- Update webpack config in template (add "..." to minimizer array to save default
  minimizers)
- Convert const enums to regular enums
- Add Promise<void> return type to plugin methods 'onClick' (IFileItem, IInfoPanelItem,
  IMainButtonItem, IProfileMenuItem)
- onLoad prop optional in IInfoPanelItem
- Update template
- onClick prop optional in IContextMenuItem
- Switch from yarn to npm in npx create-docspace-plugin
- **DEPRECATED** onClick in IContextMenuItem now deprecated in favor of onItemClick
- **DEPRECATED** onClick in IMainButtonItem now deprecated in favor of onItemClick

## Added

- Add `onItemClick` callback to IContextMenuItem to support both string and number
  identifiers
- Add `onItemClick` callback to IMainButtonItem to support both string and number
  identifiers
- Add PluginLocale enum to Plugins enums
- Add language, setLanguage, getLanguage prop to IPlugin
- Add isHeaderVisible prop to IInfoPanelItem
- Add Support CSS files
- Add prop className to components (IBox, IButton, ICheckbox, IComboBox, IFrame, IImage,
  IInput, ILabel, ISkeleton, IText, ITextArea, IToggleButton)
- Add prop id to component IBox
- Add onGroupClick, isGroupAction props to IContextMenuItem
- Add items prop to IContextMenuItem
- Add selector components (Base, Files, Groups, People, Room), enums (SelectorType,
  RoomSearchArea, RoomsType) and actions (showSelector, updateSelector, closeSelector)
- Add floating operations button component with progress tracking functionality and
  actions (addFloatingOperationsButton, updateFloatingOperationsButton,
  removeFloatingOperationsButton)
- Add IPostMessagePlugin, IPostMessageCallbackMessage util
- Add actions navigate, openInfoPanel
- Add IArticleButtonPlugin, IArticleButtonItem
- Add IconButton component
- Add ILink component
- Add IMediaViewer component, actions (showMediaViewer, updateMediaViewer,
  closeMediaViewer)
- Add placement prop to IContextMenuItem
- Add `itemId` prop to IContextMenuItem
- Add plugin samples

## Fixed

- Fix onClick id type in IMainButtonItem, IContextMenuItem

## 2.0.0

## Changed

- Separate security for file in another enum FilesSecurity

## Added

- Add fileSecurity, security props to IFileItem
- Add withoutBodyPadding and withoutHeaderMargin properties to IModalDialog
- Add updateCreateDialogModal action
- Add isAutoFocusOnError, errorText, onError, onChange, isCloseAfterCreate,
  isCreateDisabled properties to ICreateDialog
- Add itemSecurity to IContextMenuItem

## 1.1.1

## Added

- Update security for file

## 1.1.0

## Added

- Add typedoc

## Fixed

- change ITextArea prop 'heightTextArea' for string or number
- fix npx template with double setAdminPluginSettings

## 1.0.0

## Added

- csp settings
- room and folder security
- source code documentation
- update template creation

## Fixed

- fix template name validation

## 0.0.2

## Added

- ContextMenuItem: add new param for loading state in row

## Changed

- FileItem: Separate file icon to file Row Icon and file Tile Icon
- Samples: update for new version, fix bugs
- Template: change regex for plugin name. Now accept only lower case name

## 0.0.1

## Added

- first release
