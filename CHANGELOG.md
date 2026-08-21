# Change Log

## 3.0.0

## Deprecated

- **DEPRECATED** `body` in `IInfoPanelItem` — use `component` (React component) instead
- **DEPRECATED** `onLoad` in `IInfoPanelItem` — use a React component with `useEffect`
  for data loading instead
- **DEPRECATED** `settings` in `ISettings` — use `settingsComponent` (React component)
  instead
- **DEPRECATED** `onLoad` in `ISettings` — use a React component with `useEffect` for
  data loading instead
- **DEPRECATED** `dialogBody` in `IModalDialog` — use `dialogBodyComponent` (React
  component) instead
- **DEPRECATED** `dialogFooter` in `IModalDialog` — use `dialogBodyComponent` to render
  footer content within the component instead
- **DEPRECATED** `onLoad` in `IModalDialog` — use a React component with `useEffect` for
  data loading instead
- **DEPRECATED** `body` in `IArticleButtonItem` — use `component` (React component)
  instead
- **DEPRECATED** `onLoad` in `IArticleButtonItem` — use a React component with
  `useEffect` for data loading instead

## Added

- Bump `react` peer dependency to `>=19.0.0`
- Add `@onlyoffice/docspace-plugin-sdk/react` subpath with hooks for React plugin UI
- Add `useCurrentFile` hook — returns metadata of the currently selected file, folder or
  room
- Add `useCurrentUser` hook — returns the authenticated user's profile
- Add `usePluginActions` hook — provides `showToast`, `showModal`, `showSelector`,
  `navigate` and all other portal-side actions
- Add `usePluginAPI` hook — typed proxy for `GET`/`POST`/`PUT`/`DELETE` portal API calls
- Add `usePluginSettings` hook — load, save settings and control the Save button state
- Add `usePluginRuntime` hook — low-level access to the full `PluginRuntime` context
- Add `withPluginRuntime` HOC — used internally by the client to inject runtime into
  plugin components
- Add `component` prop to `IInfoPanelItem` — accepts a React component as an alternative
  to `body`
- Add `settingsComponent` prop to `ISettings` — accepts a React component as an
  alternative to `settings`
- Add `dialogBodyComponent` prop to `IModalDialog` — accepts a React component as an
  alternative to `dialogBody`
- Add `runtime: "module"` field support in `build-docspace-plugin` — emitted to
  `config.json` so the portal loads the bundle as an ES module
- Add IArticleNavigationPlugin, IArticleNavigationItem, Section enum — the item renders
  its plugin section page from a React component passed in `sectionComponent`
- Add `Actions.updateArticleNavigationItems` to refresh the article navigation
  items and the open plugin section
- Add `component` prop to `IArticleButtonItem` — accepts a React component as an
  alternative to `body`
- Add `updateArticleNavigationItems` to `PluginActions`, so a React section can redraw
  the sidebar after renaming its own navigation item
- Docs: the React API is generated as its own documentation section — `Hooks` and
  `Types` pages plus a section index, and a seventh sidebar group
- Sample: `samples/article-navigation` rewritten on Vite + React 19 and
  `@docspace/ui-kit`, replacing the Webpack + IBox version

## Changed

- Template: replaced Webpack 5 + ts-loader with **Vite 8** + `@vitejs/plugin-react`
- Template: upgraded TypeScript from 4.x to **5.6**, target changed from `es5` to
  `ES2017`
- Template: `moduleResolution` changed from `node` to `bundler`
- Template: added `jsx: react-jsx` (automatic JSX runtime, no manual `React` import
  needed)
- Template: added `react` and `react-dom ^19` as dependencies
- Template: React and SDK marked as `external` in Vite config — provided by the host at
  runtime, not bundled into `plugin.js`
- Template: CSS output renamed to `plugin.css` via `assetFileNames` in Vite rollup
  options
- Template: added `"runtime": "module"` field to `package.json`
- Template: upgraded prettier from 2.x to **3.x**
- Template: removed `window.Plugins` registration from generated `src/index.ts` — not
  needed for ES module plugins

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
