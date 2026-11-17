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

import { IArticleWidgetItem } from "../items/IArticleWidgetItem";

/**
 * Describes a plugin that adds a widget to the top of the sidebar. A plugin has one widget.
 * After changing it through `setArticleWidgetItem`, return an
 * [`IMessage`](../utils.md#imessage) with
 * [`Actions.updateArticleWidgetItem`](../../enums/Actions.md#updatearticlewidgetitem) to redraw the sidebar.
 *
 * @example
 *
 * ```typescript
 * import {
 *   type IArticleWidgetItem,
 *   type IArticleWidgetPlugin,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IArticleWidgetPlugin {
 *   articleWidgetItem: IArticleWidgetItem | null = null;
 *
 *   setArticleWidgetItem = (item: IArticleWidgetItem | null): void => {
 *     this.articleWidgetItem = item;
 *   };
 *
 *   getArticleWidgetItem = (): IArticleWidgetItem | null => {
 *     return this.articleWidgetItem;
 *   };
 * }
 * ```
 */
export interface IArticleWidgetPlugin {
  /** The widget, or `null` when the plugin shows none. */
  articleWidgetItem: IArticleWidgetItem | null;

  /** Set the widget, or clear it with `null`. */
  setArticleWidgetItem(item: IArticleWidgetItem | null): void;

  /** Get the widget. */
  getArticleWidgetItem(): IArticleWidgetItem | null;
}
