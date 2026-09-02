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

import { IInfoPanelItem } from "../items";

/**
 * The plugin that is embedded as a separate tab in the file info panel.
 *
 * @example
 *
 * The plugin class implements `IInfoPanelPlugin` and registers a "Document Info" tab
 * in the constructor. ONLYOFFICE Apps calls `getInfoPanelItems` to embed the tabs into the
 * file info panel; the tab UI is described by the item's `body` box.
 *
 * ```typescript
 * import {
 *   type IInfoPanelItem,
 *   type IInfoPanelPlugin,
 *   Components,
 *   Actions,
 *   ToastType,
 *   FilesType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IInfoPanelPlugin {
 *   infoPanelItems: Map<string, IInfoPanelItem> = new Map();
 *
 *   constructor() {
 *     this.addInfoPanelItem({
 *       key: "doc-info",
 *       subMenu: {
 *         name: "Document Info",
 *         onClick: async (id) => {
 *           try {
 *             await getDocumentInfo(id);
 *           } catch (error) {
 *             return {
 *               actions: [Actions.showToast],
 *               toastProps: [{
 *                 type: ToastType.error,
 *                 title: "Unable to load the document info"
 *               }]
 *             };
 *           }
 *         }
 *       },
 *       body: {
 *         children: [
 *           {
 *             component: Components.text,
 *             props: { text: "Document details will be displayed here" }
 *           }
 *         ]
 *       },
 *       filesType: [FilesType.file]
 *     });
 *   }
 *
 *   addInfoPanelItem = (item: IInfoPanelItem): void => {
 *     this.infoPanelItems.set(item.key, item);
 *   };
 *
 *   getInfoPanelItems = (): Map<string, IInfoPanelItem> => {
 *     return this.infoPanelItems;
 *   };
 *
 *   updateInfoPanelItem = (item: IInfoPanelItem): void => {
 *     this.infoPanelItems.set(item.key, item);
 *   };
 * }
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
