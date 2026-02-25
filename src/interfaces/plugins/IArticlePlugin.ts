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

import { IArticleItem } from "../items/IArticleItem";

/**
 * Describes a plugin that adds custom items to the article sidebar.
 * Article items appear as custom plugin components above the DevTools section.
 * Maximum 5 items can be displayed across all plugins.
 *
 * @category ArticlePlugin
 *
 * @example
 *
 * Plugin with article items
 *
 * ```typescript
 * class MyPlugin implements IPlugin, IArticlePlugin {
 *   articleItems: Map<string, IArticleItem> = new Map();
 *
 *   addArticleItem = (item: IArticleItem): void => {
 *     this.articleItems.set(item.key, item);
 *   };
 *
 *   getArticleItems = () => {
 *     return this.articleItems;
 *   };
 *
 *   updateArticleItem = (item: IArticleItem): void => {
 *     this.articleItems.set(item.key, item);
 *   };
 * }
 * ```
 */

export interface IArticlePlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ArticleItem objects.
   * A list for article items is generated based on this collection.
   */
  articleItems: Map<string, IArticleItem>;

  /**
   * Add a new article item to the plugin's collection.
   * @param item - The article item to add
   */
  addArticleItem(item: IArticleItem): void;

  /**
   * Get all the article items provided by the plugin.
   * Each item will be displayed as a custom component in the article sidebar.
   * @returns A Map containing all registered article items, where keys are item identifiers
   */
  getArticleItems(): Map<string, IArticleItem>;

  /**
   * Update an existing article item in the plugin's collection.
   * @param item - The article item to update with new properties
   */
  updateArticleItem(item: IArticleItem): void;
}
