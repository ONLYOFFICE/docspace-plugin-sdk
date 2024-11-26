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
 * @Category Main button Plugin
 *
 * The plugin that is embedded in the main button.
 *
 * @param mainButtonItems - Stores a collection of elements where the keys are the key parameters from the MainButtonItem objects.
 * A list for embedding into the main button menu is generated based on this collection.
 *
 * @method addMainButtonItem - Add a new main button item.
 * @param item - Defines a main button item.
 *
 * @method getMainButtonItems - Get all the main button items.
 * @returns A collection of elements where the keys are the key parameters from the MainButtonItem objects.
 *
 * @method updateMainButtonItem - Update the main button item.
 * @param item - Defines a new main button item.
 */
export interface IMainButtonPlugin {
  mainButtonItems: Map<string, IMainButtonItem>;
  addMainButtonItem(item: IMainButtonItem): void;
  getMainButtonItems(): Map<string, IMainButtonItem>;
  updateMainButtonItem(item: IMainButtonItem): void;
}
