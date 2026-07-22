/**
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
 *
 * @license
 */

import { Devices, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * Describes an item that will be embedded in the More item of the main button menu. It is available only inside a room (folder) and is not available for the room list.
 *
 * Items are registered by a plugin implementing
 * [`IMainButtonPlugin`](../plugins/IMainButtonPlugin.md).
 *
 * <plugin-image src="main-button-plugin.png" width="400px" dark />
 *
 * @example
 *
 * PDF export functionality with progress feedback
 *
 * ```typescript
 * const exportToPdf: IMainButtonItem = {
 *   key: "export-pdf",
 *   label: "Export to PDF",
 *   icon: "pdf-icon.svg",
 *   onItemClick: async (folderId) => {
 *     try {
 *       const result = await exportFiles(folderId, "pdf");
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Files exported to PDF | Processing complete | Ready to download"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to export files | Check file permissions"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * File backup system with status notifications
 *
 * ```typescript
 * const backupFiles: IMainButtonItem = {
 *   key: "backup-files",
 *   label: "Backup Files",
 *   icon: "backup-icon.svg",
 *   onItemClick: async (folderId) => {
 *     try {
 *       const backup = await createBackup(folderId);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Backup created successfully | Files archived | Ready for storage"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to create backup | Check storage space"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 */
export interface IMainButtonItem {
	/**
	 * The unique item identifier used by the service to recognize the item
	 *
	 */
	key: string;

	/**
	 * The item display name
	 *
	 */
	label: string;

	/**
	 * The item display icon. The icon image must be uploaded to the assets folder.
	 * Only the image name with the extension must be specified in this field.
	 * The required icon size is 16x16 px. Otherwise, it will be compressed to this size.
	 *
	 */
	icon: string;

	/**
	 * A function that takes the folder/room id as an argument.
	 * This function can be asynchronous.
	 *
	 * @deprecated Use `onItemClick` instead to support both string and number IDs.
	 * This method will be removed in a future major version.
	 */
	onClick?: (id: number) => Promise<IMessage> | Promise<void> | IMessage | void;

	/**
	 * Callback invoked when the main button action is triggered.
	 * Supports both string and number identifiers.
	 *
	 * @param id The identifier of the current folder/room (string or number).
	 *
	 * @remarks
	 * This is the preferred method over the deprecated `onClick`.
	 */
	onItemClick?: (
		id: number | string
	) => Promise<IMessage> | Promise<void> | IMessage | void;

	/**
	 * The types of users who will see the current item in the main button menu.
	 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
	 * If this parameter is not specified, then the current main button item will be displayed for all user types.
	 */
	usersType?: UsersType[];

	/**
	 * The main button items that are added to the current item as a drop-down list.
	 * In this case, the `onItemClick` (and the deprecated `onClick`) event does not work.
	 *   */
	items?: IMainButtonItem[];

	/**
	 * The types of devices where the current item will be displayed in the main button menu.
	 * At the moment the following device types are available: mobile, tablet, desktop.
	 * If this parameter is not specified, then the current main button item will be displayed in any device types.
	 */
	devices?: Devices[];
}
