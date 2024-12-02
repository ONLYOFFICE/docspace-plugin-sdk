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
 * @module Plugins/MainButton
 */

import { IMainButtonItem } from "../items";

/**
 * The plugin that can add items to the main button menu.
 *
 * @example
 *
 * PDF export functionality with progress feedback
 *
 * ```typescript
 * const exportPlugin: IMainButtonPlugin = {
 *   mainButtonItems: new Map([
 *     ["export-pdf", {
 *       key: "export-pdf",
 *       label: "Export to PDF",
 *       icon: "pdf-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await exportToPdf();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Export Complete",
 *               message: "PDF created | File saved | Ready to download"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Export Failed",
 *               message: "Unable to export | Check document status"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addMainButtonItem(item) {
 *     this.mainButtonItems.set(item.key, item);
 *   },
 *   getMainButtonItems() {
 *     return this.mainButtonItems;
 *   },
 *   updateMainButtonItem(item) {
 *     this.mainButtonItems.set(item.key, item);
 *   }
 * };
 * ```
 *
 * @example
 *
 * Batch document processor with status notifications
 *
 * ```typescript
 * const batchPlugin: IMainButtonPlugin = {
 *   mainButtonItems: new Map([
 *     ["batch-process", {
 *       key: "batch-process",
 *       label: "Batch Process",
 *       icon: "batch-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await processBatch();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Batch Complete",
 *               message: "Files processed | Results saved | View summary"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Batch Failed",
 *               message: "Processing error | Check file list"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addMainButtonItem(item) {
 *     this.mainButtonItems.set(item.key, item);
 *   },
 *   getMainButtonItems() {
 *     return this.mainButtonItems;
 *   },
 *   updateMainButtonItem(item) {
 *     this.mainButtonItems.set(item.key, item);
 *   }
 * };
 * ```
 */
export interface IMainButtonPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the MainButtonItem objects.
   * A list of main button menu items is generated based on this collection.
   */
  mainButtonItems: Map<string, IMainButtonItem>;

  /**
   * Add a new item to the main button menu.
   * @param item - The main button item to add, containing key, label, icon, and onClick handler
   */
  addMainButtonItem(item: IMainButtonItem): void;

  /**
   * Get all registered main button menu items.
   * @returns A Map containing all registered main button items, where keys are item identifiers
   */
  getMainButtonItems(): Map<string, IMainButtonItem>;

  /**
   * Update an existing main button menu item.
   * @param item - The main button item to update with new properties
   */
  updateMainButtonItem(item: IMainButtonItem): void;
}
