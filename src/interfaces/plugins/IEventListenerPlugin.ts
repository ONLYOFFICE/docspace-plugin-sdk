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

import { IEventListenerItem } from "../items";

/**
 * The plugin that is given the access to the portal events.
 *
 * @example
 *
 * The plugin class implements `IEventListenerPlugin` and registers a listener for
 * the room creation event in the constructor. ONLYOFFICE Apps calls `getEventListenerItems`
 * to subscribe the handlers to the portal events.
 *
 * ```typescript
 * import {
 *   type IEventListenerItem,
 *   type IEventListenerPlugin,
 *   Events,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IEventListenerPlugin {
 *   eventListenerItems: Map<string, IEventListenerItem> = new Map();
 *
 *   constructor() {
 *     this.addEventListenerItem({
 *       key: "room-create-listener",
 *       eventType: Events.ROOM_CREATE,
 *       eventHandler: () => {
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: "A new room has been created"
 *           }]
 *         };
 *       }
 *     });
 *   }
 *
 *   addEventListenerItem = (item: IEventListenerItem): void => {
 *     this.eventListenerItems.set(item.key, item);
 *   };
 *
 *   getEventListenerItems = (): Map<string, IEventListenerItem> => {
 *     return this.eventListenerItems;
 *   };
 * }
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
   * @param item - The event listener item to add, containing key, eventType, and eventHandler
   */
  addEventListenerItem(item: IEventListenerItem): void;

  /**
   * Get all registered event listener items.
   * @returns A Map containing all registered event listener items, where keys are item identifiers
   */
  getEventListenerItems(): Map<string, IEventListenerItem>;
}
