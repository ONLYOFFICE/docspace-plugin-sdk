/**
 * (c) Copyright Ascensio System SIA 2024
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
 * Describes the file properties.
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

/**
 * Describes an item that will be embedded in the file list.
 * The file item can be displayed as a file or a folder.
 *
 * @example
 *
 * 3D model viewer with format validation
 *
 * ```typescript
 * const modelViewer: IFileItem = {
 *   key: "3d-model",
 *   extensions: [".obj", ".stl", ".fbx"],
 *   onClick: async (file) => {
 *     try {
 *       const modelData = await load3DModel(file.id);
 *       await downloadModel(file.id);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "3D Model Info",
 *           message: "Model loaded successfully | Rendering started | Processing complete"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to load 3D model",
 *           message: "Unable to process 3D model | Check file format"
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
 *   key: "markdown",
 *   extensions: [".md", ".markdown"],
 *   onClick: async (file) => {
 *     try {
 *       const content = await fetchMarkdownContent(file.id);
 *       await saveMarkdown(file.id, content);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Markdown File Processed",
 *           message: "File processed successfully | Content saved | Ready to view"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to process markdown",
 *           message: "Unable to process markdown file | Check file format"
 *         }]
 *       };
 *     }
 *   }
 * }
 * ```
 *
 * @example
 *
 * Interactive audio player with metadata support
 *
 * ```typescript
 * const audioPlayer: IFileItem = {
 *   key: "audio-player",
 *   extensions: [".mp3", ".wav", ".ogg"],
 *   onClick: async (file) => {
 *     try {
 *       const audioMetadata = await getAudioMetadata(file.id);
 *       await playAudio(file.id);
 *       return {
 *         actions: [Actions.showToast, Actions.updateContext],
 *         toastProps: [{
 *           type: "success",
 *           title: "Audio Playback",
 *           message: "Audio file loaded | Playback started | Ready to stream"
 *         }],
 *         contextProps: [{
 *           name: "audio-player",
 *           props: {
 *             isPlaying: true,
 *             currentTime: 0
 *           }
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to play audio file",
 *           message: "Unable to play audio file | Check file format"
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
  onClick: (item: File) => Promise<IMessage> | IMessage | void;

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
}
