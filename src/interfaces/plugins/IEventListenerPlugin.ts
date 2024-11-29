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

import { IEventListenerItem } from "../items";

/**
 * @module Plugins
 *
 * @category Event listener Plugin
 *
 * The plugin that is given the access to the portal events.
 *
 * @example
 *
 * Room activity monitor with permission checks
 *
 * ```typescript
 * const roomListener: IEventListenerPlugin = {
 *   eventListenerItems: new Map([
 *     ["room-activity", {
 *       key: "room-activity",
 *       event: Events.ROOM_CREATE,
 *       onEvent: async (data) => {
 *         try {
 *           await logRoomActivity(data);
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Room Created",
 *               message: "Room initialized | Settings applied | Ready to use"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Room Creation Failed",
 *               message: "Unable to create room | Check permissions"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addEventListenerItem(item) {
 *     this.eventListenerItems.set(item.key, item);
 *   },
 *   getEventListenerItems() {
 *     return this.eventListenerItems;
 *   }
 * };
 * ```
 *
 * @example
 *
 * File operations tracker with history logging
 *
 * ```typescript
 * const fileMonitor: IEventListenerPlugin = {
 *   eventListenerItems: new Map([
 *     ["file-rename", {
 *       key: "file-rename",
 *       event: Events.RENAME,
 *       onEvent: async (data) => {
 *         try {
 *           await trackFileRename(data);
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "File Renamed",
 *               message: "Name updated | Records modified | History logged"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Rename Failed",
 *               message: "Unable to rename | Check file status"
 *             }]
 *           };
 *         }
 *       }
 *     }],
 *     ["file-delete", {
 *       key: "file-delete",
 *       event: Events.DELETE,
 *       onEvent: async (data) => {
 *         try {
 *           await handleFileDeletion(data);
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "File Deleted",
 *               message: "File removed | Space cleared | Records updated"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Deletion Failed",
 *               message: "Unable to delete | Check file access"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addEventListenerItem(item) {
 *     this.eventListenerItems.set(item.key, item);
 *   },
 *   getEventListenerItems() {
 *     return this.eventListenerItems;
 *   }
 * };
 * ```
 */
export interface IEventListenerPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the EventListenerItem objects.
   * A list of event listeners is generated based on this collection.
   */
  eventListenerItems: Map<string, IEventListenerItem>;

  /**
   * Add a new event listener item to the collection.
   * @param item - The event listener item to add, containing key, event type, and onEvent handler
   */
  addEventListenerItem(item: IEventListenerItem): void;

  /**
   * Get all registered event listener items.
   * @returns A Map containing all registered event listener items, where keys are item identifiers
   */
  getEventListenerItems(): Map<string, IEventListenerItem>;
}
