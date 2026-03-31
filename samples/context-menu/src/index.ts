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
	FilesExst,
	FilesType,
	IContextMenuItem,
	IContextMenuPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk"

/**
 * Context Menu Sample Plugin
 *
 * Demonstrates the four main patterns for adding items to the DocSpace context menu:
 *
 * 1. Basic item    — visible on all file types, pinned to the top of the menu.
 * 2. Filtered item — visible only on Office documents (.docx, .xlsx, .pptx).
 * 3. Submenu       — a parent item with nested child items (max 2 levels).
 * 4. Group action  — appears in the toolbar when multiple items are selected.
 */
class ContextMenuSample implements IPlugin, IContextMenuPlugin {
	// ─── IPlugin ────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		// Register all context menu items when the plugin is loaded.
		this.addContextMenuItem(basicItem)
		this.addContextMenuItem(filteredItem)
		this.addContextMenuItem(submenuItem)
		this.addContextMenuItem(groupItem)
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status
	};

	getStatus = (): PluginStatus => {
		return this.status
	};

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback
	};

	// ─── IContextMenuPlugin ─────────────────────────────────────────────────────

	contextMenuItems: Map<string, IContextMenuItem> = new Map();

	addContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item)
	};

	getContextMenuItems = (): Map<string, IContextMenuItem> => {
		return this.contextMenuItems
	};

	getContextMenuItemsKeys = (): string[] => {
		return Array.from(this.contextMenuItems.keys())
	};

	updateContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item)
	};
}

// ─── Item Definitions ─────────────────────────────────────────────────────────

/**
 * 1. Basic item
 *
 * Appears at the very top of the context menu for any file, folder, or room.
 * Clicking it shows a success toast with the selected item's ID.
 *
 * Key API features demonstrated:
 * - `placement: "top"` — pins the item above the default "More Options" submenu.
 * - `onItemClick`      — preferred single-selection callback (supports string | number IDs).
 */
const basicItem: IContextMenuItem = {
	key: "context-menu-sample-basic",
	label: "Sample: Basic action",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (id: string | number): Promise<IMessage> => {
		return {
			actions: [Actions.showToast],
			toastProps: [
				{
					type: ToastType.success,
					title: `Basic action triggered for item: ${id}`
				}
			]
		}
	}
}

/**
 * 2. Filtered item
 *
 * Appears only when right-clicking on Office documents (.docx, .xlsx, .pptx).
 * Any other file type or extension will not show this item.
 *
 * Key API features demonstrated:
 * - `fileType`  — restricts visibility to the "file" entity type.
 * - `fileExt`   — further restricts to specific file extensions.
 */
const filteredItem: IContextMenuItem = {
	key: "context-menu-sample-filtered",
	label: "Sample: Office document action",
	icon: "icon.svg",
	fileType: [FilesType.file],
	fileExt: [FilesExst.docx, FilesExst.xlsx, FilesExst.pptx],
	onItemClick: async (id: string | number): Promise<IMessage> => {
		return {
			actions: [Actions.showToast],
			toastProps: [
				{
					type: ToastType.info,
					title: `Office document action triggered for file: ${id}`
				}
			]
		}
	}
}

/**
 * 3. Submenu
 *
 * A parent item that expands into two child actions.
 * The parent itself has no click handler — interaction happens on the children.
 *
 * Key API features demonstrated:
 * - `items` — array of child IContextMenuItems (max 2 levels deep).
 *   Note: child items cannot use `items` or `placement` themselves.
 */
const submenuItem: IContextMenuItem = {
	key: "context-menu-sample-submenu",
	label: "Sample: Submenu",
	icon: "docspace-icon.svg",
	items: [
		{
			key: "context-menu-sample-submenu-pdf",
			label: "Export as PDF",
			icon: "icon.svg",
			onItemClick: async (id: string | number): Promise<IMessage> => {
				return {
					actions: [Actions.showToast],
					toastProps: [
						{
							type: ToastType.success,
							title: `Exporting item ${id} as PDF…`
						}
					]
				}
			}
		},
		{
			key: "context-menu-sample-submenu-zip",
			label: "Export as ZIP",
			icon: "docspace-icon.svg",
			onItemClick: async (id: string | number): Promise<IMessage> => {
				return {
					actions: [Actions.showToast],
					toastProps: [
						{
							type: ToastType.success,
							title: `Exporting item ${id} as ZIP…`
						}
					]
				}
			}
		}
	]
}

/**
 * 4. Group action
 *
 * Appears in the bulk-action toolbar when two or more items are selected.
 * Receives the full list of selected items and returns a summary toast.
 *
 * Key API features demonstrated:
 * - `isGroupAction: true` — hides the item in single-selection menus and shows
 *   it in the group-action toolbar instead.
 * - `onGroupClick`        — receives a GroupItem[] with id and itemType for each
 *   selected file, folder, or room.
 * - `fileType`            — limits scope to files and folders (rooms excluded).
 */
const groupItem: IContextMenuItem = {
	key: "context-menu-sample-group",
	label: "Sample: Group action",
	icon: "docspace-icon.svg",
	isGroupAction: true,
	fileType: [FilesType.file, FilesType.folder],
	onGroupClick: async (items): Promise<IMessage> => {
		const fileCount = items.filter((i) => i.itemType === "file").length
		const folderCount = items.filter((i) => i.itemType === "folder").length

		return {
			actions: [Actions.showToast],
			toastProps: [
				{
					type: ToastType.success,
					title: `Group action: ${fileCount} file(s) and ${folderCount} folder(s) selected`
				}
			]
		}
	}
}

// ─── Plugin registration ───────────────────────────────────────────────────────

const plugin = new ContextMenuSample()

declare global {
	interface Window {
		Plugins: any
	}
}

window.Plugins.ContextMenuSample = plugin || {}

export default plugin
