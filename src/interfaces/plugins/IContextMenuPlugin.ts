import { IContextMenuItem } from "../items";
/**
 * The plugin that is embedded in the context menu of files, folders, rooms, images, video (audio).
 */
export interface IContextMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ContextMenuItem objects.
   * A list for embedding into the context menu is generated based on this collection.
   */
  contextMenuItems: Map<string, IContextMenuItem>;

  /**
   * Add a new context menu item.
   *
   * @param item Defines a context menu item.
   */
  addContextMenuItem(item: IContextMenuItem): void;

  /**
   * Get all the context menu items.
   *
   * @returns A collection of elements where the keys are the key parameters from the ContextMenuItem objects.
   */
  getContextMenuItems(): Map<string, IContextMenuItem>;

  /**
   * Get all the keys of the context menu items.
   *
   * @returns An array with the keys of the context menu items.
   */
  getContextMenuItemsKeys(): string[];

  /**
   * Update the context menu item.
   *
   * @param item Defines a new context menu item.
   */
  updateContextMenuItem(item: IContextMenuItem): void;
}
