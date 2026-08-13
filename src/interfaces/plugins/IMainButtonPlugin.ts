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

import { IMainButtonItem } from "../items";

/**
 * The plugin that can add items to the main button menu.
 *
 * @example
 *
 * The plugin class implements `IMainButtonPlugin` and registers an "Export to PDF"
 * action in the constructor. DocSpace calls `getMainButtonItems` to embed the items
 * into the **More** section of the main button menu inside a room.
 *
 * ```typescript
 * import {
 *   type IMainButtonItem,
 *   type IMainButtonPlugin,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IMainButtonPlugin {
 *   mainButtonItems: Map<string, IMainButtonItem> = new Map();
 *
 *   constructor() {
 *     this.addMainButtonItem({
 *       key: "export-pdf",
 *       label: "Export to PDF",
 *       icon: "pdf-icon.svg",
 *       onItemClick: async (id) => {
 *         await exportToPdf(id);
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: "PDF created"
 *           }]
 *         };
 *       }
 *     });
 *   }
 *
 *   addMainButtonItem = (item: IMainButtonItem): void => {
 *     this.mainButtonItems.set(item.key, item);
 *   };
 *
 *   getMainButtonItems = (): Map<string, IMainButtonItem> => {
 *     return this.mainButtonItems;
 *   };
 *
 *   updateMainButtonItem = (item: IMainButtonItem): void => {
 *     this.mainButtonItems.set(item.key, item);
 *   };
 * }
 * ```
 */
export interface IMainButtonPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the MainButtonItem objects.
   * A list of main button menu items is generated based on this collection.
   */
  mainButtonItems: Map<string, IMainButtonItem>;

  /**
   * Add a new item to the main button menu.
   * @param item - The main button item to add, containing key, label, icon, and onClick handler
   */
  addMainButtonItem(item: IMainButtonItem): void;

  /**
   * Get all registered main button menu items.
   * @returns A Map containing all registered main button items, where keys are item identifiers
   */
  getMainButtonItems(): Map<string, IMainButtonItem>;

  /**
   * Update an existing main button menu item.
   * @param item - The main button item to update with new properties
   */
  updateMainButtonItem(item: IMainButtonItem): void;
}
