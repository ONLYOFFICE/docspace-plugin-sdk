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
	IApiPlugin,
	IMessage,
	IPlugin,
	IProfileMenuItem,
	IProfileMenuPlugin,
	PluginStatus,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * API Sample Plugin
 *
 * Demonstrates how a plugin uses IApiPlugin to build an authenticated
 * URL and call the DocSpace REST API from the same origin — no explicit
 * auth token is required because the browser sends session cookies
 * automatically when `credentials: "include"` is set.
 *
 * Flow
 * ────
 * 1. The host application calls `setAPI(origin, proxy, prefix)` before
 *    `onLoadCallback` runs (because the plugin scope includes "API").
 * 2. `onLoadCallback` calls `createAPIUrl()` to assemble the base URL
 *    from the three parts and then registers a profile-menu item.
 * 3. When the user clicks "Create Room", the plugin posts to
 *    `{apiURL}/files/rooms` and shows a toast with the new room's title.
 *
 * URL assembly example
 * ────────────────────
 *   origin = "https://docspace.example.com"
 *   proxy  = ""          (empty — no additional proxy segment)
 *   prefix = "/api/2.0"
 *   → apiURL = "https://docspace.example.com/api/2.0"
 */
class Apiplugin implements IPlugin, IApiPlugin, IProfileMenuPlugin {
	// ─── IPlugin ────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.createAPIUrl();
		this.addProfileMenuItem(createRoomItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// ─── IApiPlugin ──────────────────────────────────────────────────────────────

	origin = "";
	proxy = "";
	prefix = "";

	/**
	 * Assembled base URL used for every API call.
	 * Populated by `createAPIUrl()` inside `onLoadCallback`.
	 */
	apiURL = "";

	/**
	 * Builds `apiURL` by concatenating origin, proxy, and prefix while
	 * normalising leading/trailing slashes so no double-slash appears.
	 *
	 *   origin = "https://docspace.example.com/"
	 *   proxy  = "/api"          → "api"
	 *   prefix = "/2.0"          → "2.0"
	 *   apiURL = "https://docspace.example.com/api/2.0"
	 */
	createAPIUrl = (): void => {
		const api = this.getAPI();
		this.apiURL = api.origin.replace(/\/+$/, "");

		for (const part of [api.proxy, api.prefix]) {
			if (!part) continue;
			const trimmed = part.trim().replace(/^\/+/, "");
			this.apiURL += this.apiURL.endsWith("/") ? trimmed : `/${trimmed}`;
		}
	};

	setOrigin = (origin: string): void => {
		this.origin = origin;
	};
	setProxy = (proxy: string): void => {
		this.proxy = proxy;
	};
	setPrefix = (prefix: string): void => {
		this.prefix = prefix;
	};

	getOrigin = (): string => this.origin;
	getProxy = (): string => this.proxy;
	getPrefix = (): string => this.prefix;

	setAPI = (origin: string, proxy: string, prefix: string): void => {
		this.origin = origin;
		this.proxy = proxy;
		this.prefix = prefix;
	};

	getAPI = (): { origin: string; proxy: string; prefix: string } => ({
		origin: this.origin,
		proxy: this.proxy,
		prefix: this.prefix,
	});

	// ─── IProfileMenuPlugin ──────────────────────────────────────────────────────

	profileMenuItems: Map<string, IProfileMenuItem> = new Map();

	addProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};

	getProfileMenuItems = (): Map<string, IProfileMenuItem> =>
		this.profileMenuItems;

	updateProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};
}

// ─── Plugin instance ──────────────────────────────────────────────────────────

const plugin = new Apiplugin();

// ─── Profile menu item: Create Room ──────────────────────────────────────────

/**
 * Sends `POST {apiURL}/files/rooms` and shows the new room's title in a toast.
 *
 * Key API features demonstrated:
 * - `plugin.apiURL` — assembled by `createAPIUrl()` from IApiPlugin values.
 * - `credentials: "include"` — the browser sends session cookies automatically,
 *   so no explicit Bearer token is needed for same-origin calls.
 * - The request body follows the DocSpace API contract: `title` + `roomType`.
 * - Error handling returns a toast with type `error`.
 */
const createRoomItem: IProfileMenuItem = {
	key: "api-sample-create-room",
	label: "Sample: Create Room",
	icon: "docspace-icon.svg",
	onClick: async (): Promise<IMessage> => {
		try {
			const response = await fetch(`${plugin.apiURL}/files/rooms`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ title: "Plugin-created Room", roomType: 2 }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const data = await response.json();
			const title: string =
				(data?.response?.title as string | undefined) ?? "Room";

			return {
				actions: [Actions.showToast],
				toastProps: [
					{ type: ToastType.success, title: `Room created: "${title}"` },
				],
			};
		} catch {
			return {
				actions: [Actions.showToast],
				toastProps: [{ type: ToastType.error, title: "Failed to create room" }],
			};
		}
	},
};

// ─── Plugin registration ───────────────────────────────────────────────────────

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins = window.Plugins || {};
window.Plugins.Apiplugin = plugin;

export default plugin;
