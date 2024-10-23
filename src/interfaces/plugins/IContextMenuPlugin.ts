/*
* (c) Copyright Ascensio System SIA 2024
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
*/

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
