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
	Components,
	Devices,
	FilesType,
	IBox,
	IInfoPanelItem,
	IInfoPanelPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Info Panel Sample Plugin
 *
 * Four tabs demonstrating the core info panel API:
 *
 * 1. "Sample"       - visible for any file or folder; uses subMenu.onClick for a toast.
 * 2. "Image info"   - visible only for image files; uses onLoad to populate the body
 *                     asynchronously after the tab is opened.
 * 3. "Beta"         - visible for any file or folder; demonstrates a second tab with
 *                     distinct body content (no onLoad).
 * 4. "File details" - visible only for files (not folders); demonstrates filesType
 *                     filtering without onLoad.
 */
class InfoPanelSample implements IPlugin, IInfoPanelPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addInfoPanelItem(generalItem);
		this.addInfoPanelItem(imageItem);
		this.addInfoPanelItem(betaItem);
		this.addInfoPanelItem(fileOnlyItem);
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

	// --- IInfoPanelPlugin --------------------------------------------------------

	infoPanelItems: Map<string, IInfoPanelItem> = new Map();

	addInfoPanelItem = (item: IInfoPanelItem): void => {
		this.infoPanelItems.set(item.key, item);
	};

	getInfoPanelItems = (): Map<string, IInfoPanelItem> => {
		return this.infoPanelItems;
	};

	updateInfoPanelItem = (item: IInfoPanelItem): void => {
		this.infoPanelItems.set(item.key, item);
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. General tab
 *
 * Shown for any selected file or folder.
 * subMenu.onClick fires a success toast with the selected item ID.
 */
const generalItem: IInfoPanelItem = {
	key: "info-panel-sample-general",
	subMenu: {
		name: "Sample",
		onClick: async (id: number): Promise<IMessage> => {
			console.log(`Sample tab clicked for item with ID ${id}`);
			return {
				actions: [Actions.showToast],
				toastProps: [{ type: ToastType.success, title: `Tab opened` }]
			};
		}
	},
	body: {
		widthProp: "100%",
		paddingProp: "12px 16px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			{
				component: Components.text,
				props: { text: "Plugin info panel", isBold: true }
			},
			{ component: Components.text, props: { text: "Visible for any file or folder." } }
		]
	},
	devices: [Devices.desktop]
};

/**
 * 2. Image tab
 *
 * Shown only for image files.
 *
 * Demonstrates onLoad: the body initially shows a placeholder; after the tab is
 * opened DocSpace calls onLoad and replaces the body with the returned value.
 * Use this pattern for async data fetching (API calls, metadata loading, etc.).
 */
const imageItem: IInfoPanelItem = {
	key: "info-panel-sample-image",
	subMenu: {
		name: "Image info"
	},
	// Placeholder shown before onLoad resolves.
	body: {
		widthProp: "100%",
		paddingProp: "12px 16px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			{ component: Components.text, props: { text: "Loading info panel view" } }
		]
	},
	onLoad: async (): Promise<{ body: IBox }> => {
		// Simulate an async operation (e.g. fetching image metadata from an API).
		await new Promise((resolve) => setTimeout(resolve, 600));

		return {
			body: {
				widthProp: "100%",
				paddingProp: "12px 16px",
				displayProp: "flex",
				flexDirection: "column",
				children: [
					{
						component: Components.text,
						props: { text: "Image file", isBold: true }
					},
					{
						component: Components.text,
						props: { text: "Loaded asynchronously via onLoad." }
					}
				]
			}
		};
	},
	filesType: [FilesType.image],
	devices: [Devices.desktop]
};

/**
 * 3. Beta tab
 *
 * Shown for any selected file or folder.
 * Demonstrates a second always-visible tab.
 */
const betaItem: IInfoPanelItem = {
	key: "info-panel-sample-beta",
	subMenu: {
		name: "Beta"
	},
	body: {
		widthProp: "100%",
		paddingProp: "12px 16px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			{
				component: Components.text,
				props: { text: "Beta tab body", isBold: true }
			},
			{
				component: Components.text,
				props: { text: "Content unique to the Beta tab." }
			}
		]
	},
	devices: [Devices.desktop]
};

/**
 * 4. File-only tab
 *
 * Shown only for file selections (not folders).
 * Demonstrates filesType filtering without onLoad.
 */
const fileOnlyItem: IInfoPanelItem = {
	key: "info-panel-sample-file-only",
	subMenu: {
		name: "File details"
	},
	body: {
		widthProp: "100%",
		paddingProp: "12px 16px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			{
				component: Components.text,
				props: { text: "File-only tab", isBold: true }
			},
			{
				component: Components.text,
				props: { text: "Visible only for files, not folders." }
			}
		]
	},
	filesType: [FilesType.file],
	devices: [Devices.desktop]
};

// --- Plugin registration -------------------------------------------------------

const plugin = new InfoPanelSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.InfoPanelSample = plugin || {};

export default plugin;
