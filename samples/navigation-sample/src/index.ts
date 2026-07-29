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
	IContextMenuItem,
	IContextMenuPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Navigation Sample Plugin
 *
 * Demonstrates the two navigation-related actions in the DocSpace plugin API:
 *
 * 1. "Navigate to Shared with me" - uses Actions.navigate to programmatically
 *    redirect the user to a different portal section. Chains Actions.showToast
 *    to confirm arrival, illustrating that subsequent actions fire after navigation.
 *
 * 2. "Open Info Panel"             - uses Actions.openInfoPanel to open the
 *    right-side info panel and activate a specific built-in tab (Details).
 */
class NavigationSample implements IPlugin, IContextMenuPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addContextMenuItem(navigateItem);
		this.addContextMenuItem(openInfoPanelItem);
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

	// --- IContextMenuPlugin ------------------------------------------------------

	contextMenuItems: Map<string, IContextMenuItem> = new Map();

	addContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};

	getContextMenuItems = (): Map<string, IContextMenuItem> => {
		return this.contextMenuItems;
	};

	getContextMenuItemsKeys = (): string[] => {
		return Array.from(this.contextMenuItems.keys());
	};

	updateContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. Navigate to Shared with me
 *
 * Appears at the top of the context menu for any file, folder, or room.
 * Clicking it navigates the portal to the "Shared with me" section and then
 * fires a success toast confirming the navigation.
 *
 * Key API features demonstrated:
 * - `Actions.navigate`   - navigates to the given `navigatePath`.
 * - `Actions.showToast`  - chained after navigate; fires once navigation
 *                          is triggered (shows the chained-action pattern).
 * - `placement: "top"`   - pins the item above the default "More Options" submenu.
 */
const navigateItem: IContextMenuItem = {
	key: "navigation-sample-navigate",
	label: "Sample: Navigate to Shared with me",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (_id: string | number): Promise<IMessage> => {
		return {
			actions: [Actions.navigate, Actions.showToast],
			navigatePath: "/shared-with-me/filter?folder=4",
			toastProps: [
				{
					type: ToastType.success,
					title: "Navigating to Shared with me…"
				}
			]
		};
	}
};

/**
 * 2. Open Info Panel (Details tab)
 *
 * Appears at the top of the context menu for any file, folder, or room.
 * Clicking it programmatically opens the right-side info panel and activates
 * the built-in "Details" tab.
 *
 * Key API features demonstrated:
 * - `Actions.openInfoPanel` - opens the info panel.
 * - `infoPanelTab`          - selects which tab to activate.
 *   Accepted built-in values: "info_details", "info_history",
 *   "info_members", "info_share".
 *   Any other string activates a custom plugin tab by that key.
 */
const openInfoPanelItem: IContextMenuItem = {
	key: "navigation-sample-open-panel",
	label: "Sample: Open Info Panel",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (_id: string | number): Promise<IMessage> => {
		return {
			actions: [Actions.openInfoPanel],
			infoPanelTab: "info_details"
		};
	}
};

// --- Plugin registration -------------------------------------------------------

const plugin = new NavigationSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.NavigationSample = plugin || {};

export default plugin;
