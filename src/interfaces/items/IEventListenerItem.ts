/*
 * (c) Copyright Ascensio System SIA 2024
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
 */

import { Devices, Events, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * @Category Event Listener Plugin
 * 
 * Describes an event listener that will be registered with the service.
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
 *           type: "success",
 *           title: "Room Categorized Successfully",
 *           message: "Room categorized successfully | Category: New Category | Status: Success"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "warning",
 *           title: "Room Categorization Skipped",
 *           message: "Error occurred during categorization | Status: Failed"
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
 *       return {
 *         actions: [Actions.updateItems],
 *         itemList: await getUpdatedFileList()
 *       };
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
 *         type: "info",
 *         title: "Column Layout Updated",
 *         message: "Column layout updated successfully | New layout applied"
 *       }]
 *     };
 *   },
 *   devices: [Devices.desktop, Devices.tablet]
 * }
 * ```
 */
export interface IEventListenerItem {
  /** The unique item identifier used by the service to recognize the item */
  key: string;

  /** 
   * The event type which will be executed.
   * Presently the following events are available: CREATE, RENAME, ROOM_CREATE, ROOM_EDIT, CHANGE_COLUMN, CHANGE_USER_TYPE, CREATE_PLUGIN_FILE.
   */
  eventType: Events;

  /**
   * A function that will be executed when the event is triggered.
   * This function can be asynchronous.
   * After the event is executed, only updating the items or displaying toast is possible, other actions are blocked.
   */
  eventHandler: () => Promise<IMessage> | IMessage | void;

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
