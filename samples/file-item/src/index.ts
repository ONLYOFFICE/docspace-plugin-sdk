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
	File,
	IFileItem,
	IFilePlugin,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * File Item Sample Plugin
 *
 * Two items demonstrating the core file item API:
 *
 * 1. ".pdf"  handler - overrides the click action for every PDF file.
 *             Shows a success toast with the file title.
 *             Sets a custom type label ("Sample: PDF") and row/tile icons.
 *
 * 2. ".xlsx" handler - same pattern for spreadsheet files.
 *             Custom type label "Sample: Spreadsheet".
 */
class FileItemSample implements IPlugin, IFilePlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addFileItem(pdfItem);
		this.addFileItem(xlsxItem);
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

	// --- IFilePlugin ----------------------------------------------------------

	fileItems: Map<string, IFileItem> = new Map();

	addFileItem = (item: IFileItem): void => {
		this.fileItems.set(item.extension, item);
	};

	getFileItems = (): Map<string, IFileItem> => {
		return this.fileItems;
	};

	updateFileItem = (item: IFileItem): void => {
		this.fileItems.set(item.extension, item);
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. PDF handler
 *
 * Intercepts clicks on every .pdf file in the file list.
 * Shows a success toast with the file title and ID.
 *
 * Key API features demonstrated:
 * - `extension`     - the file extension to intercept.
 * - `onClick`       - receives the `File` object; returns an IMessage.
 * - `fileTypeName`  - custom label shown in the "Type" column.
 * - `fileRowIcon`   - 32 x 32 px icon for the table (row) view.
 * - `fileTileIcon`  - 96 x 96 px icon for the tile view.
 */
const pdfItem: IFileItem = {
	extension: ".pdf",
	fileTypeName: "Sample: PDF",
	fileRowIcon: "docspace-icon.svg",
	fileTileIcon: "docspace-icon.svg",
	onClick: async (file: File): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.success,
				title: `PDF file opened: ${file.title}`
			}
		]
	})
};

/**
 * 2. Spreadsheet handler
 *
 * Intercepts clicks on every .xlsx file in the file list.
 *
 * Key API features demonstrated:
 * - Same structure as the PDF handler, but for `.xlsx`.
 * - Demonstrates that multiple extensions can be registered simultaneously.
 */
const xlsxItem: IFileItem = {
	extension: ".xlsx",
	fileTypeName: "Sample: Spreadsheet",
	fileRowIcon: "docspace-icon.svg",
	fileTileIcon: "docspace-icon.svg",
	onClick: async (file: File): Promise<IMessage> => ({
		actions: [Actions.showToast],
		toastProps: [
			{
				type: ToastType.success,
				title: `Spreadsheet file opened: ${file.title}`
			}
		]
	})
};

// --- Plugin registration -------------------------------------------------------

const plugin = new FileItemSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.FileItemSample = plugin || {};

export default plugin;
