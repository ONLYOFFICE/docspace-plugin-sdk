// @ts-check

/**
 * Section configuration for index page generation.
 *
 * @typedef {Object} Section
 * @property {string} docsDir - Path inside docs/ (output)
 * @property {string} title - Section title (H1 of the index page)
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
    docsDir: "interfaces/components",
    title: "Components",
    description:
      "UI components for building plugin interfaces — dialogs, buttons, inputs, and other visual elements. " +
      "Compose them with `IModalDialog`, `IBox`, or other layout containers; overlays such as dialogs, toasts " +
      "and selectors are displayed by returning an `IMessage` with the matching " +
      "[Actions](../../enums/Actions.md) value from an event handler.",
    usage: "",
    tableCaption: "The following components are available:"
  },
  {
    docsDir: "interfaces/items",
    title: "Items",
    description:
      "Plugin items that extend specific DocSpace UI locations — context menus, file rows, info panels, " +
      "profile menus, and navigation buttons.",
    usage:
      "Choose the item interface that matches the DocSpace UI area you want to extend with your plugin action. " +
      "Items are registered through the matching [plugin type interface](../plugins/index.md). " +
      "For example, a context menu plugin stores its `IContextMenuItem` objects in a `Map` " +
      "and returns them from the `getContextMenuItems()` method.",
    tableCaption: "Each plugin type has specific items described in this section:"
  },
  {
    docsDir: "interfaces/plugins",
    title: "Plugins",
    description:
      "Core plugin interfaces that define the contract for each plugin type supported by DocSpace. " +
      "Every plugin must implement `IPlugin` plus one or more type-specific interfaces.",
    usage:
      "Implement the interface that matches the DocSpace UI area you want to extend. " +
      "Each plugin type registers its UI entries as [items](../items/index.md) kept in a `Map`.",
    tableCaption: "Available plugin type interfaces:"
  },
  {
    docsDir: "interfaces/settings",
    title: "Settings",
    description:
      "Interfaces for configuring plugin settings displayed in the DocSpace admin and user settings panels.",
    usage:
      "Implement `ISettingsPlugin` and use `ISettings` to describe each configurable field.",
    tableCaption: "Settings interfaces:"
  },
  {
    docsDir: "enums",
    title: "Enums",
    description:
      "Enumerations for actions, component types, events, file types, security permissions, " +
      "room types and other SDK-wide constants.",
    usage:
      "Import and use these typed constants in place of raw strings throughout your plugin.",
    tableCaption: "Available enumerations:",
    tableHeaderName: "Enum"
  }
];
