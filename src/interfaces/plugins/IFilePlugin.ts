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

import { IFileItem } from "../items";

/**
 * The plugin that can interact with the file list.
 *
 * @example
 *
 * The plugin class implements `IFilePlugin` and registers a handler for the ".drawio"
 * extension in the constructor. ONLYOFFICE Apps calls `getFileItems` to hook the plugin into
 * the file list: files with the registered extension get the custom icon, and clicking
 * them triggers the item's `onClick`.
 *
 * ```typescript
 * import {
 *   type IFileItem,
 *   type IFilePlugin,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IFilePlugin {
 *   fileItems: Map<string, IFileItem> = new Map();
 *
 *   constructor() {
 *     this.addFileItem({
 *       extension: ".drawio",
 *       fileTypeName: "Diagram",
 *       fileRowIcon: "diagram-32.svg",
 *       fileTileIcon: "diagram-96.svg",
 *       onClick: async (file) => {
 *         await openDiagramEditor(file.id);
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: `Opening ${file.title}`
 *           }]
 *         };
 *       }
 *     });
 *   }
 *
 *   addFileItem = (item: IFileItem): void => {
 *     this.fileItems.set(item.extension, item);
 *   };
 *
 *   getFileItems = (): Map<string, IFileItem> => {
 *     return this.fileItems;
 *   };
 *
 *   updateFileItem = (item: IFileItem): void => {
 *     this.fileItems.set(item.extension, item);
 *   };
 * }
 * ```
 */
export interface IFilePlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the FileItem objects.
   * A list for hooking interactions with files is generated based on this collection.
   */
  fileItems: Map<string, IFileItem>;

  /**
   * Add a new item for interactions with files.
   * @param item - The file item to add, containing the file extension, onClick handler, and optional display and access options
   */
  addFileItem(item: IFileItem): void;

  /**
   * Get all the items for interactions with files.
   * @returns A Map containing all registered file items, where keys are item identifiers
   */
  getFileItems(): Map<string, IFileItem>;

  /**
   * Update an existing file interaction item.
   * @param item - The file item to update with new properties
   */
  updateFileItem(item: IFileItem): void;
}
