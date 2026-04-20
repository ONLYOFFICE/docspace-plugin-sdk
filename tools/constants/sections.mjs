// @ts-check

/**
 * Section configuration for index page generation.
 * dirPath: path inside src/ (source) and docs/ (output)
 * sidebarPosition: controls order in sidebar
 */
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
			"Use these interfaces when constructing custom plugin UI with `IModalDialog`, `IBox`, or other layout containers.",
		tableCaption: "The following components are available:"
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
			"Choose the item interface that matches the DocSpace UI area you want to extend with your plugin action.",
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
			"All plugins must also implement the base `IPlugin` interface.",
		tableCaption: "Available plugin type interfaces:"
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
		tableCaption: "Available enumerations:"
	}
];
