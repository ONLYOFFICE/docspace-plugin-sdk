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

import { IArticleNavigationItem } from "../items/IArticleNavigationItem";

/**
 * Describes a plugin that adds navigation items to the article sidebar.
 * Each registered item appears as a first-class navigation entry (icon + label)
 * alongside built-in sections like Rooms and Documents.
 * Clicking the item navigates to a dedicated plugin section page
 * where the item's `section` content is rendered.
 *
 * @category ArticleNavigationPlugin
 *
 * @example
 *
 * Plugin with an article navigation item
 *
 * ```typescript
 * class MyPlugin implements IPlugin, IArticleNavigationPlugin {
 *   articleNavigationItems: Map<string, IArticleNavigationItem> = new Map();
 *
 *   addArticleNavigationItem = (item: IArticleNavigationItem): void => {
 *     this.articleNavigationItems.set(item.key, item);
 *   };
 *
 *   getArticleNavigationItems = (): Map<string, IArticleNavigationItem> => {
 *     return this.articleNavigationItems;
 *   };
 *
 *   updateArticleNavigationItem = (item: IArticleNavigationItem): void => {
 *     this.articleNavigationItems.set(item.key, item);
 *   };
 * }
 * ```
 */

export interface IArticleNavigationPlugin {
	/**
	 * Stores a collection of navigation items where the keys are the `key` values
	 * from the IArticleNavigationItem objects.
	 */
	articleNavigationItems: Map<string, IArticleNavigationItem>;

	/**
	 * Add a new navigation item to the plugin's collection.
	 * @param item - The navigation item to add
	 */
	addArticleNavigationItem(item: IArticleNavigationItem): void;

	/**
	 * Get all the navigation items provided by the plugin.
	 * @returns A Map containing all registered navigation items
	 */
	getArticleNavigationItems(): Map<string, IArticleNavigationItem>;

	/**
	 * Update an existing navigation item in the plugin's collection.
	 * Dispatch the "Actions.updateArticleNavigationItems" action afterwards to apply it.
	 * @param item - The navigation item to update
	 */
	updateArticleNavigationItem(item: IArticleNavigationItem): void;
}
