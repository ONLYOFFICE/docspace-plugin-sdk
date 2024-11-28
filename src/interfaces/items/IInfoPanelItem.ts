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
import { FilesExst, FilesType } from "../../enums/Files";
import { IBox } from "../components";
import { IMessage } from "../utils";

/**
 * @Category Info panel Plugin
 *
 * Describes the item submenu.
 */
export interface IInfoPanelSubMenu {
  /** The tab display name */
  name: string;

  /**
   * A function that takes the file/folder/room id as an argument.
   * This function can be asynchronous. It will be executed when clicking on the tab.
   */
  onClick?: (id: number) => Promise<IMessage> | IMessage | void;
}

/**
 * @Category Info panel Plugin
 *
 * Describes an item that will be embedded in the info panel.
 * It is available only inside a room (folder) and is not available for the room list.
 *
 * @example
 * ```typescript
 * // Example 1: AI Document Analysis
 * const documentAnalysis: IInfoPanelItem = {
 *   key: "ai-analysis",
 *   title: "AI Analysis",
 *   icon: "ai-icon.svg",
 *   onClick: async (id) => {
 *     try {
 *       const analysis = await analyzeDocument(id);
 *       await exportAnalysis(id, analysis);
 *
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Document Analysis Complete",
 *           message: "Analysis completed | Report generated | Export finished"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Analysis failed",
 *           message: "Unable to analyze document | Check file format"
 *         }]
 *       };
 *     }
 *   }
 * }
 *
 * // Example 2: Image Metadata Viewer
 * const imageMetadata: IInfoPanelItem = {
 *   key: "image-metadata",
 *   title: "Image Info",
 *   icon: "image-info.svg",
 *   onClick: async (id) => {
 *     try {
 *       const metadata = await getImageMetadata(id);
 *       await copyToClipboard(metadata);
 *
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Image Information",
 *           message: "Metadata retrieved | Details copied | Ready to use"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to load metadata",
 *           message: "Unable to read image info | Check file access"
 *         }]
 *       };
 *     }
 *   },
 *   filesType: [FilesType.Files],
 *   filesExsts: [
 *     FilesExst.jpeg,
 *     FilesExst.jpg,
 *     FilesExst.png,
 *     FilesExst.gif,
 *     FilesExst.bmp
 *   ]
 * }
 * ```
 */
export interface IInfoPanelItem {
  /** The unique item identifier used by the service to recognize the item */
  key: string;

  /** The item submenu */
  subMenu: IInfoPanelSubMenu;

  /** The tab UI of the info panel */
  body: IBox;

  /**
   * A function that is executed after opening a tab.
   * It returns a new body. If this functionality is not needed, the old body value is returned.
   */
  onLoad: () => Promise<{ body: IBox }>;

  /**
   * The types of files where the current item will be displayed in the info panel.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current info panel item will be displayed in any file type.
   */
  filesType?: FilesType[];

  /**
   * The extensions of files where the current item will be displayed in the info panel.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current info panel item will be displayed in any file extension.
   */
  filesExsts?: (FilesExst | string)[];

  /**
   * The types of users who will see the current item in the info panel.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current info panel item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current item will be displayed in the info panel.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current info panel item will be displayed in any device types.
   */
  devices?: Devices[];
}
