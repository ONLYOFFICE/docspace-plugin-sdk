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

/**
 * Describes a tab the plugin adds to the profile page, after the portal's own tabs.
 * Tabs go in the order of the plugin names.
 * The tab opens at `/profile/p/<key>`, so its key never clashes with a portal tab. The portal draws
 * the tab bar; everything under it is the component.
 *
 * Set by a plugin implementing [`IProfileTabPlugin`](../plugins/IProfileTabPlugin.md).
 *
 * @example
 *
 * ```tsx
 * import { useCurrentUser } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IProfileTabItem } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function CalendarSync() {
 *   const user = useCurrentUser();
 *
 *   return <p>Calendar sync for {user?.displayName}</p>;
 * }
 *
 * const calendarTab: IProfileTabItem = {
 *   key: "calendar-sync",
 *   label: "Calendar",
 *   component: CalendarSync,
 * };
 * ```
 */
export interface IProfileTabItem {
  /**
   * The unique item identifier, across all the installed plugins. It is also the last segment
   * of the tab address, `/profile/p/<key>`, so use letters, digits and hyphens.
   */
  key: string;

  /** The tab name. */
  label: string;

  /**
   * The React component rendered under the tab bar. It can use the hooks from
   * `@onlyoffice/docspace-plugin-sdk/react` and owns its own loading state.
   */
  component: ComponentType;

  /**
   * The types of users who will see the tab.
   * If omitted, the tab is visible to all user types.
   */
  usersTypes?: (UserRole | UsersType)[];

  /**
   * The device types on which the tab is displayed.
   * If omitted, the tab is visible on all device types.
   */
  devices?: Devices[];

  /** The IDs of the users who will see the tab. Works like [`users`](IArticleNavigationItem.md#users). */
  users?: string[];

  /** The IDs of the groups whose members will see the tab. Works like [`groups`](IArticleNavigationItem.md#groups). */
  groups?: string[];
}
