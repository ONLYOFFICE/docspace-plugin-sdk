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
 * Describes the item submenu.
 */
export interface IInfoPanelSubMenu {
  /**
   * Defines the tab display name.
   */
  name: string;

  /**
   * Defines a function that takes the file/folder/room id as an argument.
   * This function can be asynchronous. It will be executed when clicking on the tab.
   */
  onClick?: (id: number) => Promise<IMessage> | IMessage | void;
}

/**
 * Describes an item that will be embedded in the file info panel as a separate tab.
 */
export interface IInfoPanelItem {
  /**
   * Defines the unique item identifier used by the service to recognize the item.
   */
  key: string;

  /**
   * Defines the item submenu.
   */
  subMenu: IInfoPanelSubMenu;

  /**
   * Defines the tab UI of the info panel.
   */
  body: IBox;

  /**
   * Defines a function that is executed after opening a tab.
   * It returns a new body. If this functionality is not needed, the old body value is returned.
   */
  onLoad: () => Promise<{ body: IBox }>;

  /**
   * Defines the types of files where the current item will be displayed in the info panel.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current info panel item will be displayed in any file type.
   */
  filesType?: FilesType[];

  /**
   * Defines the extensions of files where the current item will be displayed in the info panel.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current info panel item will be displayed in any file extension.
   */
  filesExsts?: (FilesExst | string)[];

  /**
   * Defines the types of users who will see the current item in the info panel.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current info panel item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * Defines the types of devices where the current item will be displayed in the info panel.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current info panel item will be displayed in any device types.
   */
  devices?: Devices[];
}
