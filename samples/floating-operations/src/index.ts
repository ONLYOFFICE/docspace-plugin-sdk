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
	FilesType,
	FloatingOperationType,
	IContextMenuItem,
	IContextMenuPlugin,
	IFloatingOperation,
	IFloatingOperationsButton,
	IMessage,
	IPlugin,
	PluginStatus,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Floating Operations Plugin
 *
 * Demonstrates IFloatingOperationsButton - a floating action button that
 * tracks the progress of long-running operations (uploads, conversions, etc.).
 *
 * Flow
 * ----
 * 1. `onLoadCallback` registers one context-menu item: "Sample: Upload with progress".
 * 2. Clicking the item on a file triggers `addFloatingOperationsButton`, which
 *    shows the floating button with one Upload operation.
 * 3. `onLoad` is called immediately and starts a progress interval:
 *    progress increments by 10% every 200 ms (10 steps ~2 s total).
 *    Each tick calls `dispatchMessage` with `updateFloatingOperationsButton`.
 * 4. When progress reaches 100 %, the interval is cleared, `operationsCompleted`
 *    is set to `true`, and the button reflects the completed state.
 * 5. While an upload is in progress, clicking the context-menu item again is a
 *    no-op - the plugin guards against double-starts.
 * 6. The cancel button (visible because `showCancelButton: true` and there is
 *    exactly one operation) calls `cancelOperation`, which clears the interval
 *    and returns `removeFloatingOperationsButton`.
 * 7. Each row in the operations panel has a close icon; clicking it calls
 *    `onCancelOperationFromList`, which removes the operation from the list
 *    and returns `updateFloatingOperationsButton`.
 *
 * Key IFloatingOperationsButton features demonstrated
 * ----------------------------------------------------
 * - `id`                        - unique button identifier.
 * - `operations`                - array of IFloatingOperation items.
 * - `operationsCompleted`       - signals all operations are done.
 * - `showCancelButton`          - shows the "x" cancel button (single-op only).
 * - `cancelOperation`           - removes the entire button.
 * - `onCancelOperationFromList` - removes one operation from the list.
 * - `onLoad`                    - starts the progress timer via dispatchMessage.
 */
class FloatingOperationsPlugin implements IPlugin, IContextMenuPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addContextMenuItem(uploadItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// --- IContextMenuPlugin -----------------------------------------------------

	contextMenuItems: Map<string, IContextMenuItem> = new Map();

	addContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};

	getContextMenuItems = (): Map<string, IContextMenuItem> =>
		this.contextMenuItems;

	getContextMenuItemsKeys = (): string[] =>
		Array.from(this.contextMenuItems.keys());

	updateContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};
}

// --- Operation template --------------------------------------------------------

const initialOperation: IFloatingOperation = {
	id: "floating-operations-upload-doc",
	label: "Uploading document.pdf",
	operation: FloatingOperationType.Upload,
	alert: false,
	completed: false,
	percent: 0,
	icon: "docspace-icon.svg",
};

// --- Upload-in-progress guard --------------------------------------------------

/** Prevents a second upload from starting while one is already running. */
let isUploading = false;

/** Reference to the active interval so it can be cancelled at any time. */
let intervalId: ReturnType<typeof setInterval> | null = null;

// --- Floating operations button ------------------------------------------------

const uploadButton: IFloatingOperationsButton = {
	id: "floating-operations-button",
	operationsCompleted: false,
	operationsAlert: false,
	showCancelButton: true,

	/**
	 * Called when the user clicks the global cancel ("x") button.
	 * Clears the progress interval and removes the floating button entirely.
	 */
	cancelOperation: (): IMessage => {
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		}
		isUploading = false;

		return {
			actions: [Actions.removeFloatingOperationsButton],
			floatingOperationsButtonPropsId: uploadButton.id,
		};
	},

	/**
	 * Called when the user closes a single operation from the list.
	 * Removes that operation and updates the floating button.
	 */
	onCancelOperationFromList: (id: string): IMessage => {
		const filtered = (uploadButton.operations ?? []).filter(
			(op) => op.id !== id,
		);

		uploadButton.operations = filtered;

		return {
			actions: [Actions.updateFloatingOperationsButton],
			floatingOperationsButtonProps: uploadButton,
		};
	},

	/**
	 * Starts the progress timer.
	 * Increments by 10% every 200 ms - 10 steps ~2 seconds total.
	 */
	onLoad: (dispatchMessage: (message: IMessage) => void): void => {
		let progress = 0;
		isUploading = true;

		intervalId = setInterval(() => {
			progress = Math.min(progress + 10, 100);

			const operations = (uploadButton.operations ?? []).map((op) => ({
				...op,
				percent: progress,
				completed: progress >= 100,
			}));

			uploadButton.operations = operations;
			uploadButton.operationsCompleted = progress >= 100;

			dispatchMessage({
				actions: [Actions.updateFloatingOperationsButton],
				floatingOperationsButtonProps: uploadButton,
			});

			if (progress >= 100) {
				if (intervalId !== null) {
					clearInterval(intervalId);
					intervalId = null;
				}
				isUploading = false;
			}
		}, 200);
	},
};

// --- Context menu item --------------------------------------------------------

const uploadItem: IContextMenuItem = {
	key: "floating-operations-upload",
	label: "Sample: Upload with progress",
	icon: "docspace-icon.svg",
	placement: "top",
	fileType: [FilesType.file],

	onItemClick: (_id: string | number): IMessage | void => {
		// Guard: do not start a second upload while one is already in progress.
		if (isUploading) {
			return;
		}

		// Reset the button state for a fresh upload.
		uploadButton.operations = [{ ...initialOperation }];
		uploadButton.operationsCompleted = false;
		uploadButton.operationsAlert = false;

		return {
			actions: [Actions.addFloatingOperationsButton],
			floatingOperationsButtonProps: uploadButton,
		};
	},
};

// --- Plugin registration -------------------------------------------------------

const plugin = new FloatingOperationsPlugin();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins = window.Plugins || {};
window.Plugins.FloatingOperationsPlugin = plugin;

export default plugin;
