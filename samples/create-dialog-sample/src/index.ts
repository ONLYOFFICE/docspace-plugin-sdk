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
	IComboBoxItem,
	ICreateDialog,
	IMainButtonItem,
	IMainButtonPlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Create Dialog Sample Plugin
 *
 * Demonstrates how a plugin uses ICreateDialog to show the native
 * DocSpace "create item" modal from a main-button item.
 *
 * Flow
 * ────
 * 1. `onLoadCallback` registers one main-button item: "Create Plugin Folder".
 * 2. When the user clicks the item, `onItemClick` returns
 *    `Actions.showCreateDialogModal` with a fully-configured `ICreateDialog`.
 * 3. DocSpace renders its standard create-item dialog using those props.
 *    The user types a name, optionally picks a folder type from the combobox,
 *    then clicks "Create".
 * 4. `onSave` fires inside the plugin (still a live function, not serialised),
 *    and returns a success toast with the entered name and selected type.
 * 5. `onSelect` keeps `selectedOption` in sync so that `onSave` always
 *    reads the current type choice.
 *
 * Key ICreateDialog features demonstrated
 * ───────────────────────────────────────
 * - `title`          — dialog header.
 * - `startValue`     — pre-filled input text.
 * - `options`        — combobox items for the folder-type selector.
 * - `selectedOption` — currently highlighted option.
 * - `onSelect`       — called when the user changes the combobox selection.
 * - `onSave`         — async callback; returns IMessage to the host app.
 * - `onCancel`       — called when the user dismisses without saving.
 * - `isCreateDialog` — marks the dialog as a "create" variant (button
 *                      label becomes "Create" instead of "Save").
 */
class CreateDialogPlugin implements IPlugin, IMainButtonPlugin {
	// ─── IPlugin ────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addMainButtonItem(createFolderItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// ─── IMainButtonPlugin ───────────────────────────────────────────────────────

	mainButtonItems: Map<string, IMainButtonItem> = new Map();

	addMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};

	getMainButtonItems = (): Map<string, IMainButtonItem> => this.mainButtonItems;

	updateMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};
}

// ─── Folder-type options ──────────────────────────────────────────────────────

/**
 * Available folder/room types surfaced in the dialog combobox.
 * The `key` is an opaque string used by the plugin; DocSpace does not
 * interpret it — it is only passed back through `onSelect` / `onSave`.
 */
const folderTypeOptions: IComboBoxItem[] = [
	{ key: "private", label: "Private Folder" },
	{ key: "custom-room", label: "Custom Room" },
	{ key: "public-room", label: "Public Room" }
];

/** Tracks whichever option the user has currently selected. */
let selectedOption: IComboBoxItem = folderTypeOptions[0];

// ─── Create dialog props factory ──────────────────────────────────────────────

/**
 * Builds a fresh `ICreateDialog` object each time the main-button item is
 * clicked.  The dialog props include live function references (`onSave`,
 * `onSelect`, `onCancel`) so DocSpace can call them directly.
 */
function buildDialogProps(): ICreateDialog {
	return {
		title: "Create Plugin Folder",
		startValue: "My Plugin Folder",
		visible: true,
		isCreateDialog: true,
		options: folderTypeOptions,
		selectedOption,

		/**
		 * Called when the user picks a different folder type.
		 * Updates the module-level `selectedOption` so `onSave` sees the
		 * latest choice.  Returns void — the ComboBox manages its own
		 * display state.
		 */
		onSelect: (option: IComboBoxItem): void => {
			selectedOption = option;
		},

		/**
		 * Called when the user clicks the "Create" button.
		 * Shows a success toast that includes both the folder name (from the
		 * text input) and the currently selected folder type.
		 */
		onSave: async (_, value: string): Promise<IMessage> => {
			return {
				actions: [Actions.showToast],
				toastProps: [
					{
						type: ToastType.success,
						title: `"${value}" created as ${selectedOption.label}`
					}
				]
			};
		},

		/** Called when the user clicks "Cancel" or closes the dialog. */
		onCancel: (): void => {
			// Reset to the default selection for the next dialog open.
			selectedOption = folderTypeOptions[0];
		},

		onClose: (): void => {
			selectedOption = folderTypeOptions[0];
		}
	};
}

// ─── Main button item ─────────────────────────────────────────────────────────

/**
 * The single main-button entry registered by this plugin.
 *
 * Clicking it returns `showCreateDialogModal` so that DocSpace opens its
 * native create-item dialog populated with the `ICreateDialog` props
 * returned by `buildDialogProps()`.
 */
const createFolderItem: IMainButtonItem = {
	key: "create-dialog-sample-create-folder",
	label: "Sample: Create Plugin Folder",
	icon: "docspace-icon.svg",
	onItemClick: async (): Promise<IMessage> => {
		return {
			actions: [Actions.showCreateDialogModal],
			createDialogProps: buildDialogProps()
		};
	}
};

// ─── Plugin instance & registration ───────────────────────────────────────────

const plugin = new CreateDialogPlugin();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins = window.Plugins || {};
window.Plugins.CreateDialogPlugin = plugin;

export default plugin;
