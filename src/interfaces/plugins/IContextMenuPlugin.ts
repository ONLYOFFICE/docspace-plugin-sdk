/**
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @license
 */

import { IContextMenuItem } from "../items";

/**
 * The plugin that is embedded in the context menu of files, folders, rooms, images, video (audio).
 *
 * @example
 *
 * The plugin class implements `IContextMenuPlugin` and registers a "Share Document"
 * item in the constructor. DocSpace calls `getContextMenuItems` to embed the items
 * into the context menu.
 *
 * ```typescript
 * import {
 *   type IContextMenuItem,
 *   type IContextMenuPlugin,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IContextMenuPlugin {
 *   contextMenuItems: Map<string, IContextMenuItem> = new Map();
 *
 *   constructor() {
 *     this.addContextMenuItem({
 *       key: "doc-share",
 *       label: "Share Document",
 *       icon: "share-icon.svg",
 *       onItemClick: async (id) => {
 *         await initiateDocumentSharing(id);
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: "Share dialog opened"
 *           }]
 *         };
 *       }
 *     });
 *   }
 *
 *   addContextMenuItem = (item: IContextMenuItem): void => {
 *     this.contextMenuItems.set(item.key, item);
 *   };
 *
 *   getContextMenuItems = (): Map<string, IContextMenuItem> => {
 *     return this.contextMenuItems;
 *   };
 *
 *   getContextMenuItemsKeys = (): string[] => {
 *     return Array.from(this.contextMenuItems.keys());
 *   };
 *
 *   updateContextMenuItem = (item: IContextMenuItem): void => {
 *     this.contextMenuItems.set(item.key, item);
 *   };
 * }
 * ```
 */
export interface IContextMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ContextMenuItem objects.
   * A list for embedding into the context menu is generated based on this collection.
   */
  contextMenuItems: Map<string, IContextMenuItem>;

  /**
   * Add a new context menu item.
   * @param item - The context menu item to add, containing key, label, icon, and onClick handler
   */
  addContextMenuItem(item: IContextMenuItem): void;

  /**
   * Get all the context menu items.
   * @returns A Map containing all registered context menu items, where keys are item identifiers
   */
  getContextMenuItems(): Map<string, IContextMenuItem>;

  /**
   * Get all the keys of the context menu items.
   * @returns An array containing all registered context menu item keys
   */
  getContextMenuItemsKeys(): string[];

  /**
   * Update an existing context menu item.
   * @param item - The context menu item to update with new properties
   */
  updateContextMenuItem(item: IContextMenuItem): void;
}
