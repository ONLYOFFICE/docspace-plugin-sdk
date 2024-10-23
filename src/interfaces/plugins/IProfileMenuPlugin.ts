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

import { IProfileMenuItem } from "../items";
/**
 * The plugin that is embedded in the profile menu.
 */
export interface IProfileMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ProfileMenuItem objects.
   * A list for embedding into the profile menu is generated based on this collection.
   */
  profileMenuItems: Map<string, IProfileMenuItem>;

  /**
   * Add a new profile menu item.
   *
   * @param item Defines a profile menu item.
   */
  addProfileMenuItem(item: IProfileMenuItem): void;

  /**
   * Get all the profile menu items.
   *
   * @returns A collection of elements where the keys are the key parameters from the ProfileMenuItem objects.
   */
  getProfileMenuItems(): Map<string, IProfileMenuItem>;

  /**
   * Update the profile menu item.
   *
   * @param item Defines a new profile menu item.
   */
  updateProfileMenuItem(item: IProfileMenuItem): void;
}
