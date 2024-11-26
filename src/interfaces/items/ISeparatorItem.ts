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

import { Devices, FilesExst, FilesType, UsersType } from "../../enums";

/**
 * Describes an item that will be embedded in the profile/main button/context menu.
 *
 * @param key - The unique item identifier used by the service to recognize the item.
 * @param isSeparator - Specifies if the current item is a separator or not.
 * @param FilesExst - The extensions of files where the current item will be displayed.
 * It only works if the FilesType.Files is specified in the fileType parameter.
 * If this parameter is not specified, then the current item will be displayed in any file extension.
 * @param FilesType - The types of files where the current item will be displayed.
 * Presently the following file types are available: room, file, folder, image, video.
 * If this parameter is not specified, then the current item will be displayed in any file type.
 * @param userTypes - The types of users who will see the current item.
 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
 * If this parameter is not specified, then the current item will be displayed for all user types.
 * @param devices - The types of devices where the current item will be displayed.
 * At the moment the following device types are available: mobile, tablet, desktop.
 * If this parameter is not specified, then the current item will be displayed in any device types.
 *
 * @deprecated
 */
interface ISeparatorItem {
  key: string;
  isSeparator: true;
  FilesExst?: FilesExst[];
  FilesType?: FilesType[];
  userTypes?: UsersType[];
  devices?: Devices[];
}
