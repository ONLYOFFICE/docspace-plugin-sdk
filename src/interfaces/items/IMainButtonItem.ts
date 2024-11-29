/*
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
 */

import { Devices, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * @Category Main Button Plugin
 * 
 * Describes an item that will be embedded in the main button menu.
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
 *   onClick: async (fileIds) => {
 *     try {
 *       const result = await exportFiles(fileIds, "pdf");
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Export Complete",
 *           message: "Files exported to PDF | Processing complete | Ready to download"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Export Failed",
 *           message: "Unable to export files | Check file permissions"
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
 *   onClick: async (fileIds) => {
 *     try {
 *       const backup = await createBackup(fileIds);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Backup Complete",
 *           message: "Backup created successfully | Files archived | Ready for storage"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Backup Failed",
 *           message: "Unable to create backup | Check storage space"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 */
export interface IMainButtonItem {
  /** The unique item identifier used by the service to recognize the item */
  key: string;

  /** The item display name */
  label: string;

  /**
   * The item display icon. The icon image must be uploaded to the assets folder.
   * Only the image name with the extension must be specified in this field.
   * The required icon size is 16x16 px. Otherwise, it will be compressed to this size.
   */
  icon: string;

  /**
   * A function that takes the file/folder/room id as an argument.
   * This function can be asynchronous.
   */
  onClick?: (id: number) => Promise<IMessage> | IMessage | void;

  /**
   * The types of users who will see the current item in the main button menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current main button item will be displayed for all user types.
   */
  usersType?: UsersType[];

  /**
   * The main button items that are added to the current item as a drop-down list.
   * In this case, the onClick event does not work.
   */
  items?: IMainButtonItem[];

  /**
   * The types of devices where the current item will be displayed in the main button menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current main button item will be displayed in any device types.
   */
  devices?: Devices[];
}
