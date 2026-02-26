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

import { Devices, UsersType } from "../../enums";
import { IBox } from "../components/IBox";

/**
 * Describes a button item that will be embedded in the article sidebar.
 * Article button items are displayed as custom plugin components above the DevTools section.
 * Maximum 5 items can be displayed at once.
 *
 * @category ArticleButtonItem
 *
 * @example
 *
 * Article button item with custom component
 *
 * ```typescript
 * const notificationItem: IArticleButtonItem = {
 *   key: "notifications-item",
 *   body: {
 *     component: Components.box,
 *     props: {
 *       children: [
 *         {
 *           component: Components.button,
 *           props: {
 *             label: "Notifications",
 *             onClick: async () => {
 *               // Handle click
 *             }
 *           }
 *         }
 *       ]
 *     }
 *   },
 *   usersTypes: [UsersType.owner, UsersType.docSpaceAdmin]
 * };
 * ```
 *
 * @example
 *
 * Plugin settings access button item with onLoad
 *
 * ```typescript
 * const settingsItem: IArticleButtonItem = {
 *   key: "plugin-settings-item",
 *   body: {
 *     component: Components.skeleton,
 *     props: { width: "100%", height: "32px" }
 *   },
 *   onLoad: async () => {
 *     return {
 *       body: {
 *         component: Components.button,
 *         props: {
 *           label: "Settings",
 *           onClick: async () => { }
 *         }
 *       }
 *     };
 *   },
 *   usersTypes: [UsersType.owner, UsersType.docSpaceAdmin],
 *   devices: [Devices.desktop, Devices.tablet]
 * };
 * ```
 */

export interface IArticleButtonItem {
  /**
   * The unique item identifier used by the service to recognize the item
   */
  key: string;

  /**
   * The body of the article button item. This is the main content that will be displayed.
   * Recommended size: 32x32 pixels to fit properly in the article sidebar.
   */
  body: IBox;

  /**
   * A function that is executed after the article button item is loaded.
   * It returns a new body. If this functionality is not needed, the old body value is returned.
   */
  onLoad?: () => Promise<{ body: IBox }>;

  /**
   * The types of users who will see the current button item in the article.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current button item will be displayed.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the item will be displayed on all device types.
   */
  devices?: Devices[];
}
