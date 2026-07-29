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
	SelectorType,
	TBaseSelector,
	TFilesSelector,
	TGroupsSelector,
	ToastType,
	TPeopleSelector,
	TRoomSelector
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Selector Sample Plugin
 *
 * Five context menu items demonstrating all DocSpace selector types:
 *
 * 1. "Base selector"  - a custom static list of items (no API calls).
 * 2. "File selector"  - browses files and folders via the DocSpace file API.
 * 3. "Room selector"  - browses rooms via the DocSpace rooms API.
 * 4. "Group selector" - lists user groups via the DocSpace groups API.
 * 5. "User selector"  - lists users/people via the DocSpace people API.
 *
 * Each selector closes on submit and shows a success toast.
 */
class SelectorSample implements IPlugin, IContextMenuPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addContextMenuItem(baseItem);
		this.addContextMenuItem(fileItem);
		this.addContextMenuItem(roomItem);
		this.addContextMenuItem(groupItem);
		this.addContextMenuItem(userItem);
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
 * 1. Base selector
 *
 * Opens a selector with a hard-coded list of three items.
 * This is the simplest selector type - no API calls, full control over content.
 *
 * Key API features demonstrated:
 * - `SelectorType.Base`      - custom item list managed entirely by the plugin.
 * - `items`                  - static array of `{ id, label }` objects.
 * - `isMultiSelect`          - allows choosing more than one item at once.
 * - `onSubmit`               - receives `selectedIds[]`, closes selector, shows toast.
 * - `onCancel`               - closes selector when Cancel is clicked.
 */
const baseItem: IContextMenuItem = {
	key: "selector-sample-base",
	label: "Sample: Base selector",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showSelector],
			selectorProps: {
				type: SelectorType.Base,
				props: {
					withHeader: true,
					headerProps: {
						label: "Base Selector",
						onCloseClick() {
							return { actions: [Actions.closeSelector] };
						}
					},
					submitButtonLabel: "Select",
					withCancelButton: true,
					cancelButtonLabel: "Cancel",
					isMultiSelect: true,
					items: [
						{ id: "option-a", label: "Option A" },
						{ id: "option-b", label: "Option B" },
						{ id: "option-c", label: "Option C" }
					],
					onSelect: ({ selectedId }) => ({
						actions: [Actions.showToast],
						toastProps: [{ type: ToastType.info, title: `Focused: ${selectedId}` }]
					}),
					onSubmit: ({ selectedIds }) => ({
						actions: [Actions.closeSelector, Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: `Selected: ${selectedIds.join(", ")}`
							}
						]
					}),
					onCancel: () => ({ actions: [Actions.closeSelector] }),
					onClose: () => ({ actions: [Actions.closeSelector] })
				} satisfies TBaseSelector
			}
		};
	}
};

/**
 * 2. File selector
 *
 * Opens the DocSpace file-and-folder browser.
 * The submit button is disabled while the user is at the root level.
 *
 * Key API features demonstrated:
 * - `SelectorType.Files`     - integrates with the live DocSpace file API.
 * - `withBreadCrumbs`        - shows a navigation trail.
 * - `withSearch`             - enables the search bar.
 * - `getIsDisabled`          - disables submit at the root (must navigate into a folder first).
 * - `onSubmit`               - receives `folderTitle`, closes selector, shows toast.
 */
const fileItem: IContextMenuItem = {
	key: "selector-sample-file",
	label: "Sample: File selector",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showSelector],
			selectorProps: {
				type: SelectorType.Files,
				props: {
					withHeader: true,
					headerProps: { label: "File Selector" },
					submitButtonLabel: "Choose",
					withCancelButton: true,
					cancelButtonLabel: "Cancel",
					currentFolderId: 5,
					withBreadCrumbs: true,
					withSearch: true,
					getIsDisabled: ({ isRoot }) => isRoot,
					onSelect: (id) => ({
						actions: [Actions.showToast],
						toastProps: [{ type: ToastType.info, title: `Navigated to: ${id}` }]
					}),
					onSubmit: ({ folderTitle }) => ({
						actions: [Actions.closeSelector, Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: `Folder chosen: ${folderTitle}`
							}
						]
					}),
					withFooterCheckbox: true,
					footerCheckboxLabel: "Include subfolders",
					onCancel: () => ({ actions: [Actions.closeSelector] }),
					onClose: () => ({ actions: [Actions.closeSelector] })
				} satisfies TFilesSelector
			}
		};
	}
};

/**
 * 3. Room selector
 *
 * Opens the DocSpace room browser.
 *
 * Key API features demonstrated:
 * - `SelectorType.Room`      - integrates with the live DocSpace rooms API.
 * - `withSearch`             - enables the search bar.
 * - `onSubmit`               - receives `selectedIds[]` (room IDs), shows toast.
 */
const roomItem: IContextMenuItem = {
	key: "selector-sample-room",
	label: "Sample: Room selector",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showSelector],
			selectorProps: {
				type: SelectorType.Room,
				props: {
					withHeader: true,
					headerProps: { label: "Room Selector" },
					submitButtonLabel: "Open",
					withCancelButton: true,
					cancelButtonLabel: "Cancel",
					withSearch: true,
					onSubmit: (selectedIds) => ({
						actions: [Actions.closeSelector, Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: `Rooms selected: ${selectedIds.length}`
							}
						]
					}),
					onCancel: () => ({ actions: [Actions.closeSelector] }),
					onClose: () => ({ actions: [Actions.closeSelector] })
				} satisfies TRoomSelector
			}
		};
	}
};

/**
 * 4. Group selector
 *
 * Opens the DocSpace group browser.
 * This selector type has a minimal API - only a header and onSubmit are needed.
 *
 * Key API features demonstrated:
 * - `SelectorType.Groups`    - integrates with the live DocSpace groups API.
 * - `onSubmit`               - receives `selectedIds[]` (group IDs), shows toast.
 */
const groupItem: IContextMenuItem = {
	key: "selector-sample-group",
	label: "Sample: Group selector",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showSelector],
			selectorProps: {
				type: SelectorType.Groups,
				props: {
					withHeader: true,
					headerProps: { label: "Group Selector" },
					onSubmit: ({ selectedIds }) => ({
						actions: [Actions.closeSelector, Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: `Groups selected: ${selectedIds.length}`
							}
						]
					}),
					onClose: () => ({ actions: [Actions.closeSelector] })
				} satisfies TGroupsSelector
			}
		};
	}
};

/**
 * 5. User (People) selector
 *
 * Opens the DocSpace user browser with multi-select enabled.
 *
 * Key API features demonstrated:
 * - `SelectorType.People`    - integrates with the live DocSpace people API.
 * - `isMultiSelect`          - allows selecting multiple users at once.
 * - `withGroups`             - includes groups alongside individual users.
 * - `onSubmit`               - receives `selectedIds[]` (user IDs), shows toast.
 */
const userItem: IContextMenuItem = {
	key: "selector-sample-user",
	label: "Sample: User selector",
	icon: "docspace-icon.svg",
	placement: "top",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showSelector],
			selectorProps: {
				type: SelectorType.People,
				props: {
					withHeader: true,
					headerProps: { label: "User Selector" },
					submitButtonLabel: "Invite",
					withCancelButton: true,
					cancelButtonLabel: "Cancel",
					isMultiSelect: true,
					withGroups: true,
					onSubmit: ({ selectedIds }) => ({
						actions: [Actions.closeSelector, Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: `Users selected: ${selectedIds.length}`
							}
						]
					}),
					onCancel: () => ({ actions: [Actions.closeSelector] }),
					onClose: () => ({ actions: [Actions.closeSelector] })
				} satisfies TPeopleSelector
			}
		};
	}
};

// --- Plugin registration -------------------------------------------------------

const plugin = new SelectorSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.SelectorSample = plugin || {};

export default plugin;
