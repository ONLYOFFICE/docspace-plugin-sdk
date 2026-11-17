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

import type { ComponentType } from "react";

import { Devices, UserRole, UsersType } from "../../enums";
import { Section } from "../../enums/Section";

/**
 * Describes a widget at the top of the sidebar, under the logo — for example, a search box.
 * The sidebar of each section has one widget slot: if several plugins set a widget for a section,
 * the portal shows the first one, in the order of the plugin names. In a collapsed sidebar the widget
 * opens from its `icon`.
 *
 * Set by a plugin implementing [`IArticleWidgetPlugin`](../plugins/IArticleWidgetPlugin.md).
 * In the example, `/p/search-results` is the page of the plugin's
 * [`IArticleNavigationItem`](IArticleNavigationItem.md) with the `key` `search-results`.
 *
 * @example
 *
 * ```tsx
 * import { useSyncExternalStore } from "react";
 * import { SearchInput, InputSize } from "@onlyoffice/apps-ui-kit";
 * import { usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IArticleWidgetItem } from "@onlyoffice/docspace-plugin-sdk";
 *
 * let query = "";
 * const listeners = new Set<() => void>();
 * const setQuery = (value: string) => {
 *   query = value;
 *   listeners.forEach((listener) => listener());
 * };
 * const subscribe = (listener: () => void) => {
 *   listeners.add(listener);
 *   return () => {
 *     listeners.delete(listener);
 *   };
 * };
 * const getQuery = () => query;
 *
 * function SearchBox() {
 *   const { navigate } = usePluginActions();
 *   const value = useSyncExternalStore(subscribe, getQuery, getQuery);
 *
 *   return (
 *     <SearchInput
 *       size={InputSize.base}
 *       scale
 *       value={value}
 *       placeholder="Search"
 *       onChange={(next) => {
 *         setQuery(next);
 *         if (next.trim()) navigate("/p/search-results");
 *       }}
 *       onClearSearch={() => setQuery("")}
 *     />
 *   );
 * }
 *
 * const searchWidget: IArticleWidgetItem = { component: SearchBox, icon: "search.svg" };
 * ```
 */
export interface IArticleWidgetItem {
  /**
   * The React component rendered in the slot. It can use the hooks from
   * `@onlyoffice/docspace-plugin-sdk/react`. The component can be mounted anew at any time,
   * so keep the state that must persist, such as a search query, outside it.
   */
  component: ComponentType;

  /**
   * The icon shown in a collapsed sidebar; a click on it opens the widget in a dropdown.
   * The icon must be an SVG image with a `viewBox`, uploaded to the "assets" folder.
   * If omitted, the widget is hidden in a collapsed sidebar.
   */
  icon?: string;

  /**
   * The types of users who will see the widget.
   * If omitted, the widget is visible to all user types.
   */
  usersTypes?: (UserRole | UsersType)[];

  /**
   * The device types on which the widget is displayed.
   * If omitted, the widget is visible on all device types.
   */
  devices?: Devices[];

  /**
   * The sections in which the widget is displayed.
   * If omitted, the widget is visible in all sections.
   */
  appears?: Section[];

  /** The IDs of the users who will see the widget. Works like [`users`](IArticleNavigationItem.md#users). */
  users?: string[];

  /** The IDs of the groups whose members will see the widget. Works like [`groups`](IArticleNavigationItem.md#groups). */
  groups?: string[];
}
