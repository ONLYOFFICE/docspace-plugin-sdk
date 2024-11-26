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
 * @Category Event listener Plugin
 *
 * The plugin that is given the access to the portal events.
 *
 * @param eventListenerItems - Stores a collection of elements where the keys are the key parameters from the EventListenerItem objects.
 * A list of event listeners is generated based on this collection.
 *
 * @method addEventListenerItem - Add a new event listener item.
 * @param item - Defines an event listener item.
 *
 * @method getEventListenerItems - Get all the event listener items.
 * @returns A collection of elements where the keys are the key parameters from the EventListenerItem objects.
 */
export interface IEventListenerPlugin {
  eventListenerItems: Map<string, IEventListenerItem>;
  addEventListenerItem(item: IEventListenerItem): void;
  getEventListenerItems(): Map<string, IEventListenerItem>;
}
