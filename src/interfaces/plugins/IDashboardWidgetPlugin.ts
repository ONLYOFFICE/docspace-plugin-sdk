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

import { IDashboardWidgetItem } from "../items/IDashboardWidgetItem";

/**
 * Describes a plugin that adds widgets to the Home page.
 * After changing a widget through `updateDashboardWidgetItem`, return an
 * [`IMessage`](../utils.md#imessage) with
 * [`Actions.updateDashboardWidgetItems`](../../enums/Actions.md#updatedashboardwidgetitems) to redraw the page.
 */
export interface IDashboardWidgetPlugin {
  /** The widgets, keyed by their `key`. */
  dashboardWidgetItems: Map<string, IDashboardWidgetItem>;

  /**
   * Add a widget to the plugin's collection.
   * @param item - The widget to add
   */
  addDashboardWidgetItem(item: IDashboardWidgetItem): void;

  /**
   * Get all the widgets provided by the plugin.
   * @returns A Map containing all registered widgets
   */
  getDashboardWidgetItems(): Map<string, IDashboardWidgetItem>;

  /**
   * Update an existing widget in the plugin's collection.
   * @param item - The widget to update
   */
  updateDashboardWidgetItem(item: IDashboardWidgetItem): void;
}
