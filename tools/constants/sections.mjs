// @ts-check

/**
 * Section configuration for index page generation.
 *
 * @typedef {Object} Section
 * @property {string} srcDir - Path inside src/ (source)
 * @property {string} docsDir - Path inside docs/ (output)
 * @property {string} title - Section title (H1 of the index page)
 * @property {number} sidebarPosition - Controls order in sidebar
 * @property {string} description - Intro paragraph of the index page
 * @property {string} usage - "When to use" paragraph of the index page
 * @property {string} tableCaption - Line rendered right before the overview table
 * @property {string} [tableHeaderName] - First column header (defaults to "Interface")
 * @property {string} [tableExtraColumn] - Header of an optional extra column
 * @property {Record<string, string>} [tableExtraValues] - Extra column values keyed by file name
 */

/** @type {Section[]} */
export const SECTIONS = [
	{
		srcDir: "interfaces/components",
		docsDir: "interfaces/components",
		title: "Components",
		sidebarPosition: 1,
		description:
			"UI components for building plugin interfaces — dialogs, buttons, inputs, and other visual elements " +
			"rendered inside DocSpace modals and panels.",
		usage:
			"Use these interfaces when constructing custom plugin UI with `IModalDialog`, `IBox`, or other layout containers. " +
			"Dialogs, toasts, selectors and other overlays are displayed by returning an `IMessage` " +
			"with the matching [Actions](../../enums/Actions.md) value from an event handler.",
		tableCaption: "The following components are available:",
		tableExtraColumn: "When to use",
		tableExtraValues: {
			Component: "Add a child component to a Box layout.",
			IBox: "Group and lay out child components.",
			IButton: "Trigger an action from a dialog or settings form.",
			ICheckbox: "Binary yes/no input.",
			IComboBox: "Select one value from a dropdown list.",
			ICreateDialog: "Create a file or folder with a name prompt.",
			IFloatingOperationsButton: "Show progress of long-running operations.",
			IFrame: "Embed an external website or custom UI.",
			IIconButton: "Compact action button with an icon.",
			IImage: "Display an external image.",
			IInput: "Single-line text input.",
			ILabel: "Caption a form field.",
			ILink: "Navigational or action link.",
			IMediaViewer: "Show custom content in the media viewer.",
			IModalDialog: "Show a custom modal window.",
			ISkeleton: "Placeholder while content is loading.",
			IText: "Static text block.",
			ITextArea: "Multi-line text input.",
			IToast: "Brief success/error notification.",
			IToggleButton: "On/off switch.",
			Selector: "Pick files, rooms, users, or groups."
		}
	},
	{
		srcDir: "interfaces/items",
		docsDir: "interfaces/items",
		title: "Items",
		sidebarPosition: 2,
		description:
			"Plugin items that extend specific DocSpace UI locations — context menus, file rows, info panels, " +
			"toolbars and profile menus.",
		usage:
			"Choose the item interface that matches the DocSpace UI area you want to extend with your plugin action. " +
			"Items are registered through the matching [plugin type interface](../plugins/index.md). " +
			"For example, a context menu plugin stores its `IContextMenuItem` objects in a `Map` " +
			"and returns them from the `getContextMenuItems()` method.",
		tableCaption: "Each plugin type has specific items described in this section:",
		tableExtraColumn: "When to use",
		tableExtraValues: {
			IContextMenuItem: "Embed a custom action in the file/folder context menu.",
			IInfoPanelItem: "Add a custom tab to the file info panel on the right side.",
			IMainButtonItem: "Add a sub-action to the main **More** button inside a room.",
			IProfileMenuItem: "Add a link or action to the user profile dropdown.",
			IFileItem: "Handle clicks on files of a specific extension.",
			IEventListenerItem:
				"React to built-in DocSpace events (file created, room opened, etc.).",
			IArticleButtonItem: "Add a button to the left navigation bar."
		}
	},
	{
		srcDir: "interfaces/plugins",
		docsDir: "interfaces/plugins",
		title: "Plugins",
		sidebarPosition: 3,
		description:
			"Core plugin interfaces that define the contract for each plugin type supported by DocSpace. " +
			"Every plugin must implement `IPlugin` plus one or more type-specific interfaces.",
		usage:
			"Implement the interface that matches the DocSpace UI area you want to extend. " +
			"All plugins must also implement the base `IPlugin` interface. " +
			"Each plugin type registers its UI entries as [items](../items/index.md) kept in a `Map`.",
		tableCaption: "Available plugin type interfaces:",
		tableExtraColumn: "When to use",
		tableExtraValues: {
			IApiPlugin: "Make requests to the portal REST API.",
			IArticleButtonPlugin: "Add buttons to the left sidebar.",
			IContextMenuPlugin: "Add actions to the file/room context menu.",
			IEventListenerPlugin: "React to portal events.",
			IFilePlugin: "Handle files of specific extensions.",
			IInfoPanelPlugin: "Add tabs to the info panel.",
			IMainButtonPlugin: "Add actions to the main button menu.",
			IPlugin: "Base contract — implement in every plugin.",
			IPostMessagePlugin: "Handle postMessage events from embedded iframes.",
			IProfileMenuPlugin: "Add items to the profile menu.",
			ISettingsPlugin: "Provide admin or user settings UI."
		}
	},
	{
		srcDir: "interfaces/settings",
		docsDir: "interfaces/settings",
		title: "Settings",
		sidebarPosition: 4,
		description:
			"Interfaces for configuring plugin settings displayed in the DocSpace admin and user settings panels.",
		usage:
			"Implement `ISettingsPlugin` and use `ISettings` to describe each configurable field.",
		tableCaption: "Settings interfaces:"
	},
	{
		srcDir: "enums",
		docsDir: "enums",
		title: "Enums",
		sidebarPosition: 5,
		description:
			"Enumerations for actions, component types, events, file types, security permissions, " +
			"room types and other SDK-wide constants.",
		usage:
			"Import and use these typed constants in place of raw strings throughout your plugin.",
		tableCaption: "Available enumerations:",
		tableHeaderName: "Enum"
	}
];
