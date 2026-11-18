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

import { IProfileFieldItem } from "../items/IProfileFieldItem";

/**
 * Describes a plugin that adds rows to the profile card.
 * After changing a row through `updateProfileFieldItem`, return an
 * [`IMessage`](../utils.md#imessage) with
 * [`Actions.updateProfileFieldItems`](../../enums/Actions.md#updateprofilefielditems) to redraw the card.
 */
export interface IProfileFieldPlugin {
  /** The rows, keyed by their `key`. */
  profileFieldItems: Map<string, IProfileFieldItem>;

  /**
   * Add a row to the plugin's collection.
   * @param item - The row to add
   */
  addProfileFieldItem(item: IProfileFieldItem): void;

  /**
   * Get all the rows provided by the plugin.
   * @returns A Map containing all registered rows
   */
  getProfileFieldItems(): Map<string, IProfileFieldItem>;

  /**
   * Update an existing row in the plugin's collection.
   * @param item - The row to update
   */
  updateProfileFieldItem(item: IProfileFieldItem): void;
}
