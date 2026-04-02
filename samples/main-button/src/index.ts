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
	IMainButtonItem,
	IMainButtonPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Main Button Sample Plugin
 *
 * Two items demonstrating the core main button API:
 *
 * 1. "Quick Action"      — a simple top-level item that fires a success toast
 *                          with the current folder ID.
 * 2. "Generate Report"   — a top-level item with two sub-items:
 *    - "PDF Report"      — fires a success toast with the folder ID.
 *    - "CSV Report"      — fires a success toast with the folder ID.
 */
class MainButtonSample implements IPlugin, IMainButtonPlugin {
	// ─── IPlugin ────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addMainButtonItem(quickItem);
		this.addMainButtonItem(reportItem);
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

	// ─── IMainButtonPlugin ───────────────────────────────────────────────────────

	mainButtonItems: Map<string, IMainButtonItem> = new Map();

	addMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};

	getMainButtonItems = (): Map<string, IMainButtonItem> => {
		return this.mainButtonItems;
	};

	updateMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};
}

// ─── Item definitions ─────────────────────────────────────────────────────────

/**
 * 1. Quick Action
 *
 * A simple main button item with no sub-items.
 * Clicking it shows a success toast with the current folder ID.
 *
 * Key API features demonstrated:
 * - `onItemClick` — preferred callback (supports string | number IDs).
 */
const quickItem: IMainButtonItem = {
	key: "main-button-sample-quick",
	label: "Sample: Quick Action",
	icon: "docspace-icon.svg",
	onItemClick: async (id: number | string): Promise<IMessage> => {
		return {
			actions: [Actions.showToast],
			toastProps: [
				{
					type: ToastType.success,
					title: `Quick action triggered for folder: ${id}`
				}
			]
		};
	}
};

/**
 * 2. Generate Report
 *
 * A main button item with two nested sub-items.
 * The parent has no onItemClick — interaction happens on the children.
 *
 * Key API features demonstrated:
 * - `items` — array of child IMainButtonItems (no further nesting).
 *   Each child uses onItemClick to handle the click.
 */
const reportItem: IMainButtonItem = {
	key: "main-button-sample-report",
	label: "Sample: Generate Report",
	icon: "docspace-icon.svg",
	items: [
		{
			key: "main-button-sample-report-pdf",
			label: "PDF Report",
			icon: "docspace-icon.svg",
			onItemClick: async (id: number | string): Promise<IMessage> => {
				return {
					actions: [Actions.showToast],
					toastProps: [
						{
							type: ToastType.success,
							title: `PDF report generated for folder: ${id}`
						}
					]
				};
			}
		},
		{
			key: "main-button-sample-report-csv",
			label: "CSV Report",
			icon: "docspace-icon.svg",
			onItemClick: async (id: number | string): Promise<IMessage> => {
				return {
					actions: [Actions.showToast],
					toastProps: [
						{
							type: ToastType.success,
							title: `CSV report generated for folder: ${id}`
						}
					]
				};
			}
		}
	]
};

// ─── Plugin registration ───────────────────────────────────────────────────────

const plugin = new MainButtonSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.MainButtonSample = plugin || {};

export default plugin;
