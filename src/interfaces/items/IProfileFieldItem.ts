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
 * Describes a row the plugin adds to the card at the top of the profile page, after the portal's
 * own rows. Like them, the row shows the label on the left and the component on the right; on a phone
 * the label sits above the component. The component can show a value, a link or a button.
 * Rows go in the order of the plugin names.
 *
 * Set by a plugin implementing [`IProfileFieldPlugin`](../plugins/IProfileFieldPlugin.md).
 *
 * @example
 *
 * ```tsx
 * import { Button, ButtonSize } from "@onlyoffice/apps-ui-kit";
 * import { usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IProfileFieldItem, ToastType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function ConnectTelegram() {
 *   const { showToast } = usePluginActions();
 *
 *   return (
 *     <Button
 *       size={ButtonSize.extraSmall}
 *       label="Connect"
 *       onClick={() => showToast({ type: ToastType.success, title: "Connected" })}
 *     />
 *   );
 * }
 *
 * const telegramField: IProfileFieldItem = {
 *   key: "telegram",
 *   label: "Telegram",
 *   component: ConnectTelegram,
 * };
 * ```
 */
export interface IProfileFieldItem {
  /** The unique item identifier, across all the installed plugins. */
  key: string;

  /** The row label. If omitted, the row has no label. */
  label?: string;

  /**
   * The React component rendered as the row value. It can use the hooks from
   * `@onlyoffice/docspace-plugin-sdk/react`; [`useCurrentUser`](../../react/hooks.md#usecurrentuser)
   * returns the profile owner.
   */
  component: ComponentType;

  /**
   * The types of users who will see the row.
   * If omitted, the row is visible to all user types.
   */
  usersTypes?: (UserRole | UsersType)[];

  /**
   * The device types on which the row is displayed.
   * If omitted, the row is visible on all device types.
   */
  devices?: Devices[];

  /** The IDs of the users who will see the row. Works like [`users`](IArticleNavigationItem.md#users). */
  users?: string[];

  /** The IDs of the groups whose members will see the row. Works like [`groups`](IArticleNavigationItem.md#groups). */
  groups?: string[];
}
