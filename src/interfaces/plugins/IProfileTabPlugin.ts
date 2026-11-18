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

import { IProfileTabItem } from "../items/IProfileTabItem";

/**
 * Describes a plugin that adds tabs to the profile page.
 * After changing a tab through `updateProfileTabItem`, return an
 * [`IMessage`](../utils.md#imessage) with
 * [`Actions.updateProfileTabItems`](../../enums/Actions.md#updateprofiletabitems) to redraw the page.
 */
export interface IProfileTabPlugin {
  /** The tabs, keyed by their `key`. */
  profileTabItems: Map<string, IProfileTabItem>;

  /**
   * Add a tab to the plugin's collection.
   * @param item - The tab to add
   */
  addProfileTabItem(item: IProfileTabItem): void;

  /**
   * Get all the tabs provided by the plugin.
   * @returns A Map containing all registered tabs
   */
  getProfileTabItems(): Map<string, IProfileTabItem>;

  /**
   * Update an existing tab in the plugin's collection.
   * @param item - The tab to update
   */
  updateProfileTabItem(item: IProfileTabItem): void;
}
