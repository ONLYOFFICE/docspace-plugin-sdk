/**
 * (c) Copyright Ascensio System SIA 2025
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

import {
  Devices,
  FilesExst,
  FilesType,
  FilesSecurity,
  Security,
  UsersType,
} from "../../enums";

import { IMessage } from "../utils";

/**
 * Describes an item that will be embedded in the context menu.
 *
 * @category ContextMenuItem
 *
 * @example
 *
 * File analysis with progress reporting
 *
 * ```typescript
 * const analyzeFile: IContextMenuItem = {
 *   key: "analyze-file",
 *   label: "Analyze File",
 *   icon: "analysis-icon.svg",
 *   onClick: async (fileId) => {
 *     try {
 *       const analysis = await analyzeFile(fileId);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "File Analysis Complete",
 *           message: "Analysis completed successfully | Report generated | Ready to view"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Analysis Failed",
 *           message: "Unable to analyze file | Check file access"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Secure file sharing with clipboard integration
 *
 * ```typescript
 * const shareFile: IContextMenuItem = {
 *   key: "share-file",
 *   label: "Share File",
 *   icon: "share-icon.svg",
 *   onClick: async (fileId) => {
 *     try {
 *       const shareInfo = await generateShareLink(fileId);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Share Link Generated",
 *           message: "Link generated successfully | Ready to share | Copied to clipboard"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Share Failed",
 *           message: "Unable to generate share link | Check permissions"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 */
export interface IContextMenuItem {
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
   * The item display icon. The icon image must be uploaded to the "assets" folder.
   * Only the image name with the extension must be specified in this field. The required icon size is 16x16 px.
   * Otherwise, it will be compressed to this size.
   *
   */
  icon: string;

  /**
   * A function that takes the file/folder/room id as an argument. This function can be asynchronous
   *
   */
  onClick: (id: number) => Promise<IMessage> | IMessage | void;

  /**
   * Whether to add the action state to the item in the file list when the onClick event is triggered
   *
   */
  withActiveItem?: boolean;

  /**
   * The extensions of files where the current item will be displayed in the context menu.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current context menu item will be displayed in any file extension.
   *
   */
  fileExt?: (FilesExst | string)[];

  /**
   * The types of files where the current item will be displayed in the context menu.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current context menu item will be displayed in any file type.
   *
   */
  fileType?: FilesType[];

  /**
   * The types of users who will see the current item in the context menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current context menu item will be displayed for all user types.
   *
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current item will be displayed in the context menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current context menu item will be displayed in any device types.
   *
   */
  devices?: Devices[];

  /**
   * The security parameters of the parent folder or room that will be checked.
   * If all the parameters are true, the current item will be displayed in the context menu.
   * If this parameter is undefined, it will be ignored.
   *
   */
  security?: Security[];

  /**
   * The security parameters of the file or folder or room that will be checked.
   * If all the parameters are true, the current item will be displayed in the context menu.
   * If this parameter is undefined, it will be ignored.
   *
   */
  itemSecurity?: (FilesSecurity | Security)[];
}
