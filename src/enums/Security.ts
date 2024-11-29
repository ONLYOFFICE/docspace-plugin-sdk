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
 * @module
 *
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
}
