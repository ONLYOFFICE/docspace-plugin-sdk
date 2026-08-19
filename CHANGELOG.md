# Change Log

## 3.0.0

## Added

- Add IArticleNavigationPlugin, IArticleNavigationItem, Section enum
- Add `Actions.updateArticleNavigationItems` to refresh the article navigation
  items and the open plugin section

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
