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

import { Devices, FilesSecurity, Security, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * Describes an item that will be embedded in the file list.
 * The file item can be displayed as a file or a folder.
 *
 * <plugin-image src="file-icon.png" />
 *
 * @example
 *
 * 3D model viewer with format validation
 *
 * ```typescript
 * import { IFileItem, Actions, ToastType, Devices } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const modelViewer: IFileItem = {
 *   extension: ".obj",
 *   fileTypeName: "3D Model",
 *   fileRowIcon: "3d-model-32.svg",
 *   fileTileIcon: "3d-model-96.svg",
 *   devices: [Devices.desktop],
 *   onClick: async (file) => {
 *     try {
 *       await load3DModel(file.id);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "3D model loaded successfully"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to process the 3D model"
 *         }]
 *       };
 *     }
 *   }
 * }
 * ```
 *
 * @example
 *
 * Markdown content processor with error handling
 *
 * ```typescript
 * const markdownPreview: IFileItem = {
 *   extension: ".md",
 *   fileTypeName: "Markdown",
 *   fileRowIcon: "markdown-32.svg",
 *   onClick: async (file) => {
 *     try {
 *       const content = await fetchMarkdownContent(file.id);
 *       await saveMarkdown(file.id, content);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Markdown file processed"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to process the markdown file"
 *         }]
 *       };
 *     }
 *   }
 * }
 * ```
 *
 * @example
 *
 * Audio player with access restrictions
 *
 * ```typescript
 * const audioPlayer: IFileItem = {
 *   extension: ".mp3",
 *   fileTypeName: "Audio",
 *   fileRowIcon: "audio-32.svg",
 *   fileTileIcon: "audio-96.svg",
 *   usersType: [UsersType.docSpaceAdmin, UsersType.roomAdmin, UsersType.user],
 *   fileSecurity: [FilesSecurity.Read, FilesSecurity.Download],
 *   onClick: async (file) => {
 *     try {
 *       await playAudio(file.viewUrl);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: `Playing ${file.title}`
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to play the audio file"
 *         }]
 *       };
 *     }
 *   }
 * }
 * ```
 */
export interface IFileItem {
	/** The file extension. If several plugins have the same extension, the last plugin from this list is taken */
	extension: string;

	/**
	 * A function that takes the File object with the file data as an argument.
	 * This function can be asynchronous. It will be executed when the user clicks on a file with the required extension.
	 */
	onClick: (item: File) => Promise<IMessage> | Promise<void> | IMessage | void;

	/**
	 * The types of users who have the access to the current item.
	 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
	 * If this parameter is not specified, then the current item will be available for all user types.
	 */
	usersType?: UsersType[];

	/**
	 * The types of devices where the current item will be available.
	 * At the moment the following device types are available: mobile, tablet, desktop.
	 * If this parameter is not specified, then the current item will be available in any device types.
	 */
	devices?: Devices[];

	/** A file type which is displayed in the list (for example, Document/Folder) */
	fileTypeName?: string;

	/** A file icon which is displayed in the table format. The preferred icon size is 32x32 px */
	fileRowIcon?: string;

	/** A file icon which is displayed in the tile format. The preferred icon size is 96x96 px */
	fileTileIcon?: string;

	/** The security parameters of the file that will be checked. */
	fileSecurity?: FilesSecurity[];

	/** The security parameters of the parent folder or room that will be checked. */
	security?: Security[];
}

/**
 * Describes the file properties.
 *

 */
export interface File {
	/** The folder ID where the current file is located */
	folderId: number;

	/** The file extension */
	fileExst: string;

	/** The file ID */
	id: number;

	/** The root folder type of the current file */
	rootFolderType: number;

	/** The root folder ID of the current file */
	rootFolderId: number;

	/** The file title */
	title: string;

	/** The URL to open the current file in the viewer */
	viewUrl: string;

	/** The absolute URL where the source viewed or edited document is stored */
	webUrl: string;
}
