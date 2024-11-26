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
import { IPlugin } from "./IPlugin";

/**
 * @Category Profile menu Plugin
 *
 * Plugin for embedding items in the profile menu.
 * This interface must be implemented in each plugin that adds items to the profile menu.
 *
 * @param profileMenuItems - Collection of menu items where keys are from ProfileMenuItem objects
 * @method addProfileMenuItem - Adds a new item to the profile menu
 * @param item - The profile menu item to add
 * @method getProfileMenuItems - Retrieves all profile menu items
 * @returns Collection of menu items where keys are from ProfileMenuItem objects
 * @method updateProfileMenuItem - Updates an existing profile menu item
 * @param item - The profile menu item to update
 */
export interface IProfileMenuPlugin extends IPlugin {
  profileMenuItems: Map<string, IProfileMenuItem>;
  addProfileMenuItem(item: IProfileMenuItem): void;
  getProfileMenuItems(): Map<string, IProfileMenuItem>;
  updateProfileMenuItem(item: IProfileMenuItem): void;
}
