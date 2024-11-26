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
 * @Category Event listener Plugin
 *
 * Describes an item that allows the plugin to respond to the built-in DocSpace events (creating a room/file, etc.).
 * Each event can have several listeners. When the event is activated, the dialog cannot be hooked.
 *
 * @param key - The unique item identifier used by the service to recognize the item.
 * @param eventType - The event type which will be executed.
 * Presently the following events are available: CREATE, RENAME, ROOM_CREATE, ROOM_EDIT, CHANGE_COLUMN, CHANGE_USER_TYPE, CREATE_PLUGIN_FILE.
 * @param eventHandler - A function that will be executed when the event is triggered.
 * This function can be asynchronous.
 * After the event is executed, only updating the items or displaying toast is possible, other actions are blocked.
 * @param usersTypes - The types of users who have the access to the current item.
 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
 * If this parameter is not specified, then the current item will be available for all user types.
 * @param devices - The types of devices where the current item will be available.
 * At the moment the following device types are available: mobile, tablet, desktop.
 * If this parameter is not specified, then the current item will be available in any device types.
 */
export interface IEventListenerItem {
  key: string;
  eventType: Events;
  eventHandler: () => Promise<IMessage> | IMessage | void;
  usersTypes?: UsersType[];
  devices?: Devices[];
}
