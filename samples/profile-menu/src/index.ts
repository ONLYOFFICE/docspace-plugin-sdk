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
	IMessage,
	IPlugin,
	IProfileMenuItem,
	IProfileMenuPlugin,
	PluginStatus,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Profile Menu Sample Plugin
 *
 * Two items demonstrating the core profile menu API:
 *
 * 1. "Sample: Account Info" - fires a success toast when clicked.
 * 2. "Sample: Quick Help"   - fires an info toast when clicked.
 */
class ProfileMenuSample implements IPlugin, IProfileMenuPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addProfileMenuItem(accountInfoItem);
		this.addProfileMenuItem(quickHelpItem);
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

	// --- IProfileMenuPlugin ------------------------------------------------------

	profileMenuItems: Map<string, IProfileMenuItem> = new Map();

	addProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};

	getProfileMenuItems = (): Map<string, IProfileMenuItem> => {
		return this.profileMenuItems;
	};

	updateProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. Account Info item
 *
 * A simple profile menu item.
 * Clicking it shows a success toast simulating account info retrieval.
 *
 * Key API features demonstrated:
 * - `key` - unique identifier used by the plugin system.
 * - `label` - text shown in the profile dropdown menu.
 * - `icon` - 16x16 px icon served from the plugin assets folder.
 * - `onClick` - async handler returning an IMessage with showToast action.
 */
const accountInfoItem: IProfileMenuItem = {
	key: "profile-menu-sample-account-info",
	label: "Sample: Account Info",
	icon: "docspace-icon.svg",
	onClick: async (): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.success,
				title: "Account info requested!",
			},
		],
	}),
};

/**
 * 2. Quick Help item
 *
 * A profile menu item that fires an info toast simulating a help overlay.
 *
 * Key API features demonstrated:
 * - `onClick` returning an IMessage with a ToastType.info notification.
 */
const quickHelpItem: IProfileMenuItem = {
	key: "profile-menu-sample-quick-help",
	label: "Sample: Quick Help",
	icon: "docspace-icon.svg",
	onClick: async (): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.info,
				title: "Quick help opened!",
			},
		],
	}),
};

// --- Plugin registration -------------------------------------------------------

const plugin = new ProfileMenuSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.ProfileMenuSample = plugin || {};

export default plugin;
