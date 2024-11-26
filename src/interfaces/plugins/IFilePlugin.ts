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

import { IFileItem } from "../items";

/**
 * @Category File Plugin
 *
 * The plugin that can interact with the file list.
 *
 * @param fileItems - Stores a collection of elements where the keys are the key parameters from the FileItem objects.
 * A list for hooking interactions with files is generated based on this collection.
 *
 * @method addFileItem - Add a new item for interactions with files.
 * @param item - Defines an item for interactions with files.
 *
 * @method getFileItems - Get all the items for interactions with files.
 * @returns A collection of elements where the keys are the key parameters from the FileItem objects.
 *
 * @method updateFileItem - Update the item for interactions with files.
 * @param item - Defines an item for interactions with files.
 */
export interface IFilePlugin {
  fileItems: Map<string, IFileItem>;
  addFileItem(item: IFileItem): void;
  getFileItems(): Map<string, IFileItem>;
  updateFileItem(item: IFileItem): void;
}
