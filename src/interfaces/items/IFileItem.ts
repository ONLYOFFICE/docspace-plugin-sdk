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

import { Devices, Security, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * @Category File Plugin
 *
 * Describes the file properties.
 *
 * @param folderId - The folder ID where the current file is located.
 * @param fileExst - The file extension.
 * @param id - The file ID.
 * @param rootFolderType - The root folder type of the current file.
 * @param rootFolderId - The root folder ID of the current file.
 * @param title - The file title.
 * @param viewUrl - The URL to open the current file in the viewer.
 * @param webUrl - The absolute URL where the source viewed or edited document is stored.
 */
export interface File {
  folderId: number;
  fileExst: string;
  id: number;
  rootFolderType: number;
  rootFolderId: number;
  title: string;
  viewUrl: string;
  webUrl: string;
}

/**
 * @Category File Plugin
 *
 * Describes an item that allows the plugin to control clicking on the specified file type.
 * It does not work with the files that already have some actions.
 *
 * @param extension - The file extension. If several plugins have the same extension, the last plugin from this list is taken.
 * @param onClick - A function that takes the File object with the file data as an argument.
 * This function can be asynchronous. It will be executed when the user clicks on a file with the required extension.
 * @param usersType - The types of users who have the access to the current item.
 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
 * If this parameter is not specified, then the current item will be available for all user types.
 * @param devices - The types of devices where the current item will be available.
 * At the moment the following device types are available: mobile, tablet, desktop.
 * If this parameter is not specified, then the current item will be available in any device types.
 * @param fileTypeName - A file type which is displayed in the list (for example, Document/Folder).
 * @param fileRowIcon - A file icon which is displayed in the table format. The preferred icon size is 32x32 px.
 * @param fileTileIcon - A file icon which is displayed in the tile format. The preferred icon size is 96x96 px.
 */
export interface IFileItem {
  extension: string;
  onClick: (item: File) => Promise<IMessage> | IMessage | void;
  usersType?: UsersType[];
  devices?: Devices[];
  // security?: Security[];
  fileTypeName?: string;
  fileRowIcon?: string;
  fileTileIcon?: string;
}
