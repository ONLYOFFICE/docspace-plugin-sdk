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

/**
 * Defines the available security permissions for rooms and folders in DocSpace.
 *
 * @remarks
 * File and content operations:
 * - Copy: Permission to copy files and folders
 * - CopyTo: Permission to copy items to other locations
 * - Create: Permission to create new files and folders
 * - Delete: Permission to delete items
 * - Download: Permission to download files
 * - Duplicate: Permission to create duplicates of items
 * - Move: Permission to move items
 * - MoveTo: Permission to move items to other locations
 * - Read: Permission to view and read content
 * - Rename: Permission to rename items
 *
 * Sharing and access control:
 * - CopySharedLink: Permission to copy sharing links
 * - EditAccess: Permission to modify access rights
 * - EditRoom: Permission to modify room settings
 *
 * Additional features:
 * - Mute: Permission to mute notifications
 * - Pin: Permission to pin items
 */
export const enum Security {
  Copy = "Copy",
  CopySharedLink = "CopySharedLink",
  CopyTo = "CopyTo",
  Create = "Create",
  Delete = "Delete",
  Download = "Download",
  Duplicate = "Duplicate",
  EditAccess = "EditAccess",
  EditRoom = "EditRoom",
  Move = "Move",
  MoveTo = "MoveTo",
  Mute = "Mute",
  Pin = "Pin",
  Read = "Read",
  Rename = "Rename",
}
