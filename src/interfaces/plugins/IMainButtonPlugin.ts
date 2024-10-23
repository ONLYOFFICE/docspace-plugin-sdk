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

import { IMainButtonItem } from "../items";
/**
 * The plugin that is embedded in the main button.
 */
export interface IMainButtonPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the MainButtonItem objects.
   * A list for embedding into the main button menu is generated based on this collection.
   */
  mainButtonItems: Map<string, IMainButtonItem>;

  /**
   * Add a new main button item.
   *
   * @param item Defines a main button item.
   */
  addMainButtonItem(item: IMainButtonItem): void;

  /**
   * Get all the main button items.
   *
   * @returns A collection of elements where the keys are the key parameters from the MainButtonItem objects.
   */
  getMainButtonItems(): Map<string, IMainButtonItem>;

  /**
   * Update the main button item.
   *
   * @param item Defines a new main button item.
   */
  updateMainButtonItem(item: IMainButtonItem): void;
}
