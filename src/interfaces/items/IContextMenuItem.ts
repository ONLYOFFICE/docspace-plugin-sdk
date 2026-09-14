/**
 * (c) Copyright Ascensio System SIA 2026
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
  UsersType
} from "../../enums";

import { IMessage } from "../utils";

type GroupItem = {
  /**
   * The id of the selected entity (files/folders/rooms)
   */
  id: number | string;
  /**
   * The type of selected entity.
   * Can be used to recognize entities in a group of selected files/folders/rooms.
   */
  itemType: "file" | "folder" | "room";
};

/**
 * Describes an item that will be embedded in the context menu.
 *
 * Items are registered by a plugin implementing
 * [`IContextMenuPlugin`](../plugins/IContextMenuPlugin.md).
 *
 * <plugin-image src="context-menu-plugin.png" dark />
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
 *   onItemClick: async (fileId) => {
 *     try {
 *       const analysis = await analyzeFile(fileId);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Analysis completed successfully | Report generated | Ready to view"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to analyze file | Check file access"
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
 *   onItemClick: async (fileId) => {
 *     try {
 *       const shareInfo = await generateShareLink(fileId);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.success,
 *           title: "Link generated successfully | Ready to share | Copied to clipboard"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: ToastType.error,
 *           title: "Unable to generate share link | Check permissions"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Nested context menu items from previous examples
 *
 * ```typescript
 * const manageFile: IContextMenuItem = {
 *   key: "manage-file",
 *   label: "Manage File",
 *   icon: "manage-file-icon.svg",
 *   items: [
 *     shareFile,
 *     analyzeFile
 *  ]
 * };
 * ```
 *
 * @example
 *
 * Group action for multiple selected items
 *
 * ```typescript
 * const exportFiles: IContextMenuItem = {
 *   key: "export-files",
 *   label: "Export Selected",
 *   icon: "export-icon.svg",
 *   isGroupAction: true,
 *   fileType: [FilesType.file, FilesType.folder],
 *   onGroupClick: async (items) => {
 *     const count = items.length;
 *
 *     const filesIds = items
 *                   .filter((item) => item.itemType === "file")
 *                   .map((item) => item.id);
 *
 *     const foldersIds = items
 *                   .filter((item) => item.itemType === "folder")
 *                   .map((item) => item.id);
 *
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: `Exporting ${count} items...`
 *       }]
 *     };
 *   }
 * };
 * ```
 */

export interface IContextMenuItem {
  /**
   * The unique item identifier used by the service to recognize the item
   */
  key: string;

  /**
   * The item display name
   */
  label: string;

  /**
   * The item display icon. The icon image must be uploaded to the assets folder.
   * Only the image name with the extension must be specified in this field. The required icon size is 16x16 px.
   * Otherwise, it will be compressed to this size.
   */
  icon: string;

  /**
   * Callback invoked when the action is triggered for a single selected
   * file, folder, or room.
   *
   * @param id The identifier of the selected item (number only for backward compatibility).
   *
   * @remarks
   * This callback is executed only for single selection.
   * If `isGroupAction` is set to `true`, this callback will not be triggered.
   *
   * @deprecated Use `onItemClick` instead to support both string and number IDs.
   * This method will be removed in a future major version.
   */
  onClick?: (id: number) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Callback invoked when the action is triggered for a single selected
   * file, folder, or room. Supports both string and number identifiers.
   *
   * @param id The identifier of the selected item (string or number).
   *
   * @remarks
   * This callback is executed only for single selection.
   * If `isGroupAction` is set to `true`, this callback will not be triggered.
   * This is the preferred method over the deprecated `onClick`.
   */
  onItemClick?: (
    id: string | number
  ) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Callback invoked when the action is triggered for multiple selected
   * files, folders, or rooms.
   *
   * @param items The selected entities passed as an array of `GroupItem`.
   *
   * @remarks
   * Each `GroupItem` in `items` exposes the entity `id` (`number` or `string`)
   * and its `itemType` (`"file"`, `"folder"`, or `"room"`), so files, folders,
   * and rooms can be distinguished within the selection.
   *
   * To make the action appear in the group actions menu, set `isGroupAction` to `true`.
   * When `isGroupAction` is `true`, the action will not be shown for single selected items.
   */
  onGroupClick?: (
    items: GroupItem[]
  ) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Indicates whether this item should be displayed in the group actions
   * context menu when multiple files, folders, or rooms are selected.
   */
  isGroupAction?: boolean;

  /**
   * Whether to add the action state to the item in the file list when the
   * `onItemClick` (or the deprecated `onClick`) event is triggered.
   */
  withActiveItem?: boolean;

  /**
   * The extensions of files where the current item will be displayed in the context menu.
   * Specify each extension with the dot (`".md"`).
   * If this parameter is not specified, then the current context menu item will be displayed in any file extension.
   *
   * @remarks
   * Independent of `fileType`: it applies to every entity that has an
   * extension, images and videos included.
   */
  fileExt?: (FilesExst | string)[];

  /**
   * The types of files where the current item will be displayed in the context menu.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current context menu item will be displayed in any file type.
   *
   * @remarks
   * The five values are mutually exclusive here — an image is tested as
   * `image`, a video as `video` — so "any file" is
   * `[FilesType.file, FilesType.image, FilesType.video]`. The info panel reads
   * them differently: see [`IInfoPanelItem`](IInfoPanelItem.md).
   */
  fileType?: FilesType[];

  /**
   * Specifies elements as submenus.
   * If specified, `onItemClick` (and the deprecated `onClick`) on the parent will not work.
   * If none of the child elements are displayed, for example due to security or itemSecurity, the parent will also be hidden.
   * Max level of the menu is 2.
   */
  items?: Omit<IContextMenuItem, "items" | "placement">[];

  /**
   * The types of users who will see the current item in the context menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current context menu item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current item will be displayed in the context menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current context menu item will be displayed in any device types.
   */
  devices?: Devices[];

  /**
   * The security parameters of the parent folder or room that will be checked.
   * If all the parameters are true, the current item will be displayed in the context menu.
   * If this parameter is undefined, it will be ignored.
   */
  security?: Security[];

  /**
   * The security parameters of the file or folder or room that will be checked.
   * If all the parameters are true, the current item will be displayed in the context menu.
   * If this parameter is undefined, it will be ignored.
   */
  itemSecurity?: (FilesSecurity | Security)[];

  /**
   * Defines where the item appears in the context menu (top block only).
   * - `top` — inserted at the very beginning of the menu, before all other items in the top block.
   * - `topLast` — inserted at the end of the top block, just before the first separator.
   * - If not specified, the item is placed inside the "More Options" submenu (default behavior).
   *
   * Only applies to root-level items. Nested items (`items[]`) ignore this property.
   */
  placement?: "top" | "topLast";

  /**
   * The identifiers of specific files, folders, or rooms where this item will be displayed in the context menu.
   * If specified, the item is shown only for entities whose ID is included in this list.
   * If this parameter is not specified, the item will be displayed for all entities (subject to other filters).
   */
  itemId?: (number | string)[];
}
