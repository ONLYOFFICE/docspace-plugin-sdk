/*
* (c) Copyright Ascensio System SIA 2023
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
 * Describes the file properties.
 */
export interface File {
  /**
   * Defines the folder ID where the current file is located.
   */
  folderId: number;

  /**
   * Defines the file extension.
   */
  fileExst: string;

  /**
   * Defines the file ID.
   */
  id: number;

  /**
   * Defines the root folder type of the current file.
   */
  rootFolderType: number;

  /**
   * Defines the root folder ID of the current file.
   */
  rootFolderId: number;

  /**
   * Defines the file title.
   */
  title: string;

  /**
   * Defines the URL to open the current file in the viewer.
   */
  viewUrl: string;

  /**
   * Defines the absolute URL where the source viewed or edited document is stored.
   */
  webUrl: string;
}

/**
 * Describes an item that allows the plugin to control clicking on the specified file type.
 * It does not work with the files that already have some actions.
 */
export interface IFileItem {
  /**
   * Defines the file extension. If several plugins have the same extension, the last plugin from this list is taken.
   */
  extension: string;

  /**
   * Defines a function that takes the File object with the file data as an argument.
   * This function can be asynchronous. It will be executed when the user clicks on a file with the required extension.
   */
  onClick: (item: File) => Promise<IMessage> | IMessage | void;

  /**
   * Defines the types of users who have the access to the current item.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current item will be available for all user types.
   */
  usersType?: UsersType[];

  /**
   * Defines the types of devices where the current item will be available.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current item will be available in any device types.
   */
  devices?: Devices[];

  /**
   * Defines a file type which is displayed in the list (for example, Document/Folder).
   */
  fileTypeName?: string;

  /**
   * Defines a file icon which is displayed in the table format. The preferred icon size is 32x32 px.
   */
  fileRowIcon?: string;

  /**
   * Defines a file icon which is displayed in the tile format. The preferred icon size is 96x96 px.	s
   */
  fileTileIcon?: string;
}
