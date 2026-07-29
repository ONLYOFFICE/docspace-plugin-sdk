/*
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
 */

import {
	Actions,
	Events,
	IEventListenerItem,
	IEventListenerPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Event Listener Sample Plugin
 *
 * Two items demonstrating the core event listener API:
 *
 * 1. "Create Listener"      - fires an info toast when a file or folder is created.
 * 2. "Room Create Listener" - fires a success toast when a room is created.
 */
class EventListenerSample implements IPlugin, IEventListenerPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addEventListenerItem(createListenerItem);
		this.addEventListenerItem(roomCreateListenerItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => {
		return this.status;
	};

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// --- IEventListenerPlugin ----------------------------------------------------

	eventListenerItems: Map<string, IEventListenerItem> = new Map();

	addEventListenerItem = (item: IEventListenerItem): void => {
		this.eventListenerItems.set(item.key, item);
	};

	getEventListenerItems = (): Map<string, IEventListenerItem> => {
		return this.eventListenerItems;
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. Create Listener
 *
 * Fires every time the portal's native "create" DOM event is dispatched
 * (e.g. when the user creates a new file or folder via the UI).
 *
 * Key API features demonstrated:
 * - `eventType` set to `Events.CREATE` - subscribes to the "create" window event.
 * - `eventHandler` returning an IMessage with a ToastType.info notification.
 */
const createListenerItem: IEventListenerItem = {
	key: "event-listener-sample-create",
	eventType: Events.CREATE,
	eventHandler: async (): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.info,
				title: "File created!",
			},
		],
	}),
};

/**
 * 2. Room Create Listener
 *
 * Fires every time the portal's native "create_room" DOM event is dispatched
 * (e.g. when the user opens the Create Room dialog).
 *
 * Key API features demonstrated:
 * - `eventType` set to `Events.ROOM_CREATE` - subscribes to the "create_room" window event.
 * - `eventHandler` returning an IMessage with a ToastType.success notification.
 */
const roomCreateListenerItem: IEventListenerItem = {
	key: "event-listener-sample-room-create",
	eventType: Events.ROOM_CREATE,
	eventHandler: async (): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.success,
				title: "Room created!",
			},
		],
	}),
};

// --- Plugin registration -------------------------------------------------------

const plugin = new EventListenerSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.EventListenerSample = plugin || {};

export default plugin;
