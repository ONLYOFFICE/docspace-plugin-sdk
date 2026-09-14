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

import { Devices, Events, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * Describes an event listener that reacts to portal events.
 *
 * Items are registered by a plugin implementing
 * [`IEventListenerPlugin`](../plugins/IEventListenerPlugin.md).
 *
 * @example
 *
 * Automatic room categorization with role-based access
 *
 * ```typescript
 * const roomCategorizer: IEventListenerItem = {
 *   key: "auto-categorize-room",
 *   eventType: Events.ROOM_CREATE,
 *   eventHandler: async () => {
 *     try {
 *       await categorizationService.processNewRoom();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Room categorized successfully | Category: New Category | Status: Success"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.warning,
 *           title: "Error occurred during categorization | Status: Failed"
 *         }]
 *       };
 *     }
 *   },
 *   usersTypes: [UsersType.docSpaceAdmin, UsersType.roomAdmin],
 *   devices: [Devices.desktop]
 * }
 * ```
 *
 * @example
 *
 * File rename audit logging with permission control
 *
 * ```typescript
 * const fileRenameTracker: IEventListenerItem = {
 *   key: "file-rename-tracker",
 *   eventType: Events.RENAME,
 *   eventHandler: async () => {
 *     try {
 *       await auditService.logFileRename();
 *
 *       // The plugin has already updated its own items; ask the portal
 *       // to re-read the collection.
 *       return { actions: [Actions.updateContextMenuItems] };
 *     } catch (error) {
 *       console.error("Failed to log file rename:", error);
 *     }
 *   },
 *   usersTypes: [
 *     UsersType.owner,
 *     UsersType.docSpaceAdmin,
 *     UsersType.roomAdmin,
 *     UsersType.collaborator
 *   ]
 * }
 * ```
 *
 * @example
 *
 * Device-aware column layout change notification
 *
 * ```typescript
 * const columnChangeNotifier: IEventListenerItem = {
 *   key: "column-change-notifier",
 *   eventType: Events.CHANGE_COLUMN,
 *   eventHandler: () => {
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.info,
 *         title: "Column layout updated successfully | New layout applied"
 *       }]
 *     };
 *   },
 *   devices: [Devices.desktop, Devices.tablet]
 * }
 * ```
 */
export interface IEventListenerItem {
  /**
   * The unique item identifier used by the service to recognize the item
   */
  key: string;

  /**
   * The event type which will be executed.
   * Presently the following events are available: CREATE, RENAME, ROOM_CREATE, ROOM_EDIT, CHANGE_COLUMN, CHANGE_USER_TYPE, CREATE_PLUGIN_FILE.
   */
  eventType: Events;

  /**
   * A function that will be executed when the event is triggered.
   * This function can be asynchronous.
   *
   * @remarks
   * The returned message goes through the same dispatcher as any other
   * class-side callback, so every action is honoured. Prefer item updates and
   * toasts: the event fires over a dialog the portal has just opened.
   */
  eventHandler: () => Promise<IMessage> |  Promise<void> | IMessage | void;

  /**
   * The types of users who have the access to the current item.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current item will be available for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current item will be available.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current item will be available in any device types.
   */
  devices?: Devices[];
}
