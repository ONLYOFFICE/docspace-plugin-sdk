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

import { Devices, FilesExst, FilesType, UsersType } from "../../enums";

/**
 * The separator item that is used to separate items in menus.
 *
 * Describes an item that will be embedded in the profile/main button/context menu.
 *
 * @deprecated
 *
 * @example
 *
 * Document operations separator with role restrictions
 *
 * ```typescript
 * const documentSeparator: ISeparatorItem = {
 *   key: "document-separator",
 *   isSeparator: true,
 *   FilesType: [FilesType.Files],
 *   FilesExst: [FilesExst.docx, FilesExst.pdf],
 *   userTypes: [UsersType.owner, UsersType.docSpaceAdmin],
 *   devices: [Devices.desktop]
 * }
 * ```
 *
 * @example
 *
 * Multi-device admin menu separator
 *
 * ```typescript
 * const adminSeparator: ISeparatorItem = {
 *   key: "admin-separator",
 *   isSeparator: true,
 *   userTypes: [UsersType.owner, UsersType.docSpaceAdmin],
 *   devices: [Devices.desktop, Devices.tablet]
 * }
 * ```
 *
 * @example
 *
 * Image operations separator with format filtering
 *
 * ```typescript
 * const imageSeparator: ISeparatorItem = {
 *   key: "image-separator",
 *   isSeparator: true,
 *   FilesType: [FilesType.Files],
 *   FilesExst: [
 *     FilesExst.jpeg,
 *     FilesExst.jpg,
 *     FilesExst.png,
 *     FilesExst.gif
 *   ]
 * }
 * ```
 */
interface ISeparatorItem {
  /** The unique item identifier used by the service to recognize the item */
  key: string;

  /** Specifies if the current item is a separator or not */
  isSeparator: true;

  /**
   * The extensions of files where the current item will be displayed.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current item will be displayed in any file extension.
   */
  FilesExst?: FilesExst[];

  /**
   * The types of files where the current item will be displayed.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current item will be displayed in any file type.
   */
  FilesType?: FilesType[];

  /**
   * The types of users who will see the current item.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current item will be displayed for all user types.
   */
  userTypes?: UsersType[];

  /**
   * The types of devices where the current item will be displayed.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current item will be displayed in any device types.
   */
  devices?: Devices[];
}
