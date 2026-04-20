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

import { IArticleButtonItem } from "../items/IArticleButtonItem";

/**
 * Describes a plugin that adds custom button items to the article sidebar.
 * Article button items appear as custom plugin components above the DevTools section.
 * Maximum 5 items can be displayed across all plugins.
 *
 * @example
 *
 * Plugin with article button items
 *
 * ```typescript
 * class MyPlugin implements IPlugin, IArticleButtonPlugin {
 *   articleButtonItems: Map<string, IArticleButtonItem> = new Map();
 *
 *   addArticleButtonItem = (item: IArticleButtonItem): void => {
 *     this.articleButtonItems.set(item.key, item);
 *   };
 *
 *   getArticleButtonItems = () => {
 *     return this.articleButtonItems;
 *   };
 *
 *   updateArticleButtonItem = (item: IArticleButtonItem): void => {
 *     this.articleButtonItems.set(item.key, item);
 *   };
 * }
 * ```
 */

export interface IArticleButtonPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ArticleButtonItem objects.
   * A list for article button items is generated based on this collection.
   */
  articleButtonItems: Map<string, IArticleButtonItem>;

  /**
   * Add a new article button item to the plugin's collection.
   * @param item - The article button item to add
   */
  addArticleButtonItem(item: IArticleButtonItem): void;

  /**
   * Get all the article button items provided by the plugin.
   * Each item will be displayed as a custom component in the article sidebar.
   * @returns A Map containing all registered article button items, where keys are item identifiers
   */
  getArticleButtonItems(): Map<string, IArticleButtonItem>;

  /**
   * Update an existing article button item in the plugin's collection.
   * @param item - The article button item to update with new properties
   */
  updateArticleButtonItem(item: IArticleButtonItem): void;
}
