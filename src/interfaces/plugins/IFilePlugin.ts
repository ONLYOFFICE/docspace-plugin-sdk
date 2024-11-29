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
 * @example
 *
 * File compression utility with size validation
 *
 * ```typescript
 * const compressionPlugin: IFilePlugin = {
 *   fileItems: new Map([
 *     ["compress", {
 *       key: "compress",
 *       label: "Compress File",
 *       icon: "compress-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await compressSelectedFile();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "File Compressed",
 *               message: "Compression complete | Space saved | Ready to use"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Compression Failed",
 *               message: "Unable to compress file | Check file size"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   getFileItems() {
 *     return this.fileItems;
 *   },
 *   addFileItem(item) {
 *     this.fileItems.set(item.key, item);
 *   },
 *   updateFileItem(item) {
 *     this.fileItems.set(item.key, item);
 *   }
 * };
 * ```
 * 
 * @example
 *
 * File encryption manager with key validation
 *
 * ```typescript
 * const encryptionPlugin: IFilePlugin = {
 *   fileItems: new Map([
 *     ["encrypt", {
 *       key: "encrypt",
 *       label: "Encrypt File",
 *       icon: "encrypt-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await encryptSelectedFile();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "File Encrypted",
 *               message: "Encryption complete | Security applied | Ready to store"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Encryption Failed",
 *               message: "Unable to encrypt file | Check key status"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   getFileItems() {
 *     return this.fileItems;
 *   },
 *   addFileItem(item) {
 *     this.fileItems.set(item.key, item);
 *   },
 *   updateFileItem(item) {
 *     this.fileItems.set(item.key, item);
 *   }
 * };
 * ```
 */
export interface IFilePlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the FileItem objects.
   * A list for hooking interactions with files is generated based on this collection.
   */
  fileItems: Map<string, IFileItem>;

  /**
   * Add a new item for interactions with files.
   * @param item - The file item to add, containing key, label, icon, and onClick handler
   */
  addFileItem(item: IFileItem): void;

  /**
   * Get all the items for interactions with files.
   * @returns A Map containing all registered file items, where keys are item identifiers
   */
  getFileItems(): Map<string, IFileItem>;

  /**
   * Update an existing file interaction item.
   * @param item - The file item to update with new properties
   */
  updateFileItem(item: IFileItem): void;
}
