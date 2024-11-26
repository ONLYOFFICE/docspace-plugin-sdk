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

import {
  Devices,
  FilesExst,
  FilesType,
  Security,
  UsersType,
} from "../../enums";

import { IMessage } from "../utils";

/**
 * @Category Context menu Plugin
 *
 * Describes an item that will be embedded in the "Actions" item of the file context menu.
 *
 * @param key - The unique item identifier used by the service to recognize the item.
 * @param label - The item display name.
 * @param icon - The item display icon. The icon image must be uploaded to the "assets" folder.
 * Only the image name with the extension must be specified in this field. The required icon size is 16x16 px.
 * Otherwise, it will be compressed to this size.
 * @param onClick - A function that takes the file/folder/room id as an argument. This function can be asynchronous.
 * @param withActiveItem - Whether to add the action state to the item in the file list when the onClick event is triggered.
 * @param fileExt - The extensions of files where the current item will be displayed in the context menu.
 * It only works if the FilesType.Files is specified in the fileType parameter.
 * If this parameter is not specified, then the current context menu item will be displayed in any file extension.
 * @param fileType - The types of files where the current item will be displayed in the context menu.
 * Presently the following file types are available: room, file, folder, image, video.
 * If this parameter is not specified, then the current context menu item will be displayed in any file type.
 * @param usersTypes - The types of users who will see the current item in the context menu.
 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
 * If this parameter is not specified, then the current context menu item will be displayed for all user types.
 * @param devices - The types of devices where the current item will be displayed in the context menu.
 * At the moment the following device types are available: mobile, tablet, desktop.
 * If this parameter is not specified, then the current context menu item will be displayed in any device types.
 * @param security - The security parameters of the parent folder or room that will be checked.
 * If all the parameters are true, the current item will be displayed in the context menu.
 * If this parameter is undefined, it will be ignored.
 */
export interface IContextMenuItem {
  key: string;
  label: string;
  icon: string;
  onClick: (id: number) => Promise<IMessage> | IMessage | void;
  withActiveItem?: boolean;
  fileExt?: (FilesExst | string)[];
  fileType?: FilesType[];
  usersTypes?: UsersType[];
  devices?: Devices[];
  security?: Security[];
}
