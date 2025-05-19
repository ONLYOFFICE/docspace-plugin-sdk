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

/**
 * Defines the supported room/folder security parameters.
 */
export const enum Security {
  /** Permission to copy files and folders */
  Copy = "Copy",

  /** Permission to copy sharing links */
  CopySharedLink = "CopySharedLink",

  /** Permission to copy items to other locations */
  CopyTo = "CopyTo",

  /** Permission to create new files and folders */
  Create = "Create",

  /** Permission to delete items */
  Delete = "Delete",

  /** Permission to download files */
  Download = "Download",

  /** Permission to create duplicates of items */
  Duplicate = "Duplicate",

  /** Permission to modify access rights */
  EditAccess = "EditAccess",

  /** Permission to modify room settings */
  EditRoom = "EditRoom",

  /** Permission to move items */
  Move = "Move",

  /** Permission to move items to other locations */
  MoveTo = "MoveTo",

  /** Permission to mute notifications */
  Mute = "Mute",

  /** Permission to pin items */
  Pin = "Pin",

  /** Permission to view and read content */
  Read = "Read",

  /** Permission to rename items */
  Rename = "Rename",

  /** Permission to convert files to other formats */
  Convert = "Convert",

  /** Permission to apply custom filters */
  CustomFilter = "CustomFilter",

  /** Permission to edit files */
  Edit = "Edit",

  /** Permission to view and edit file history */
  EditHistory = "EditHistory",

  /** Permission to read file history */
  ReadHistory = "ReadHistory",

  /** Permission to fill forms */
  FillForms = "FillForms",

  /** Permission to lock/unlock files */
  Lock = "Lock",

  /** Permission to review documents */
  Review = "Review",

  /** Permission to submit forms to gallery */
  SubmitToFormGallery = "SubmitToFormGallery",

  /** Permission to stop form filling process */
  StopFilling = "StopFilling",

  /** Permission to reset form filling */
  ResetFilling = "ResetFilling",

  /** Permission to edit forms */
  EditForm = "EditForm",

  /** Permission to comment on files */
  Comment = "Comment",

  /** Permission to create rooms from existing content */
  CreateRoomFrom = "CreateRoomFrom",

  /** Permission to copy links to files */
  CopyLink = "CopyLink",

  /** Permission to embed content */
  Embed = "Embed",
}
