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

import { IContextMenuItem } from "../items";

/**
 * @module Plugins
 *
 * @category Context menu Plugin
 *
 * The plugin that is embedded in the context menu of files, folders, rooms, images, video (audio).
 *
 * @example
 *
 * Document sharing and export menu with status feedback
 *
 * ```typescript
 * const documentActions: IContextMenuPlugin = {
 *   contextMenuItems: new Map([
 *     ["doc-share", {
 *       key: "doc-share",
 *       label: "Share Document",
 *       icon: "share-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await initiateDocumentSharing();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Share Ready",
 *               message: "Share dialog opened | Recipients ready | Set permissions"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Share Failed",
 *               message: "Unable to share | Check document status"
 *             }]
 *           };
 *         }
 *       }
 *     }],
 *     ["doc-export", {
 *       key: "doc-export",
 *       label: "Export Document",
 *       icon: "export-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await prepareDocumentExport();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Export Ready",
 *               message: "Format selected | Options set | Choose destination"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Export Failed",
 *               message: "Unable to export | Verify format support"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addContextMenuItem(item) {
 *     this.contextMenuItems.set(item.key, item);
 *   },
 *   getContextMenuItems() {
 *     return this.contextMenuItems;
 *   },
 *   getContextMenuItemsKeys() {
 *     return Array.from(this.contextMenuItems.keys());
 *   },
 *   updateContextMenuItem(item) {
 *     if (this.contextMenuItems.has(item.key)) {
 *       this.contextMenuItems.set(item.key, item);
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * File compression and encryption tools
 *
 * ```typescript
 * const fileOperations: IContextMenuPlugin = {
 *   contextMenuItems: new Map([
 *     ["file-compress", {
 *       key: "file-compress",
 *       label: "Compress File",
 *       icon: "compress-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await initiateFileCompression();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Compression Started",
 *               message: "File processing | Size reducing | Please wait"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Compression Failed",
 *               message: "Unable to compress | Check file size"
 *             }]
 *           };
 *         }
 *       }
 *     }],
 *     ["file-encrypt", {
 *       key: "file-encrypt",
 *       label: "Encrypt File",
 *       icon: "encrypt-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await initiateFileEncryption();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Encryption Ready",
 *               message: "Key generated | File secured | Access protected"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Encryption Failed",
 *               message: "Unable to encrypt | Check key management"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addContextMenuItem(item) {
 *     this.contextMenuItems.set(item.key, item);
 *   },
 *   getContextMenuItems() {
 *     return this.contextMenuItems;
 *   },
 *   getContextMenuItemsKeys() {
 *     return Array.from(this.contextMenuItems.keys());
 *   },
 *   updateContextMenuItem(item) {
 *     if (this.contextMenuItems.has(item.key)) {
 *       this.contextMenuItems.set(item.key, item);
 *     }
 *   }
 * };
 * ```
 */
export interface IContextMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ContextMenuItem objects.
   * A list for embedding into the context menu is generated based on this collection.
   */
  contextMenuItems: Map<string, IContextMenuItem>;

  /**
   * Add a new context menu item.
   * @param item - The context menu item to add, containing key, label, icon, and onClick handler
   */
  addContextMenuItem(item: IContextMenuItem): void;

  /**
   * Get all the context menu items.
   * @returns A Map containing all registered context menu items, where keys are item identifiers
   */
  getContextMenuItems(): Map<string, IContextMenuItem>;

  /**
   * Get all the keys of the context menu items.
   * @returns An array containing all registered context menu item keys
   */
  getContextMenuItemsKeys(): string[];

  /**
   * Update an existing context menu item.
   * @param item - The context menu item to update with new properties
   */
  updateContextMenuItem(item: IContextMenuItem): void;
}
