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

import { IInfoPanelItem } from "../items";

/**
 * The plugin that is embedded as a separate tab in the file info panel.
 *
 * @example
 *
 * Document metadata viewer with permission checks
 *
 * ```typescript
 * const documentInfoPanel: IInfoPanelPlugin = {
 *   infoPanelItems: new Map([
 *     ["doc-info", {
 *       key: "doc-info",
 *       label: "Document Info",
 *       icon: "info-icon.svg",
 *       onClick: async () => {
 *         try {
 *           const info = await getDocumentInfo();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Info Retrieved",
 *               message: "Document details | Data loaded | Panel updated"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Info Failed",
 *               message: "Unable to load info | Check permissions"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   getInfoPanelItems() {
 *     return this.infoPanelItems;
 *   },
 *   updateInfoPanelItem(item) {
 *     this.infoPanelItems.set(item.key, item);
 *   }
 * };
 * ```
 *
 * @example
 *
 * File statistics analyzer with visualization
 *
 * ```typescript
 * const analyticsPanel: IInfoPanelPlugin = {
 *   infoPanelItems: new Map([
 *     ["file-stats", {
 *       key: "file-stats",
 *       label: "File Analytics",
 *       icon: "analytics-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await loadFileAnalytics();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Analytics Loaded",
 *               message: "Stats calculated | Charts rendered | View ready"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Analytics Failed",
 *               message: "Unable to load stats | Check data source"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   getInfoPanelItems() {
 *     return this.infoPanelItems;
 *   },
 *   updateInfoPanelItem(item) {
 *     this.infoPanelItems.set(item.key, item);
 *   }
 * };
 * ```
 */
export interface IInfoPanelPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the InfoPanelItem objects.
   * A list for embedding into the info panel is generated based on this collection.
   */
  infoPanelItems: Map<string, IInfoPanelItem>;

  /** Add a new info panel item */
  addInfoPanelItem(item: IInfoPanelItem): void;

  /** Get all the info panel items */
  getInfoPanelItems(): Map<string, IInfoPanelItem>;

  /** Update the info panel item */
  updateInfoPanelItem(item: IInfoPanelItem): void;
}
