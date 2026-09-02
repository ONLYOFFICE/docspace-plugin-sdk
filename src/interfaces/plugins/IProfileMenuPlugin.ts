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

import { IProfileMenuItem } from "../items";

/**
 * Plugin for embedding items in the profile menu.
 * This interface must be implemented in each plugin that adds items to the profile menu.
 *
 * @example
 *
 * The plugin class implements `IProfileMenuPlugin` and registers a "User Settings"
 * entry in the constructor. ONLYOFFICE Apps calls `getProfileMenuItems` to embed the items
 * into the user profile dropdown.
 *
 * ```typescript
 * import {
 *   type IProfileMenuItem,
 *   type IProfileMenuPlugin,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IProfileMenuPlugin {
 *   profileMenuItems: Map<string, IProfileMenuItem> = new Map();
 *
 *   constructor() {
 *     this.addProfileMenuItem({
 *       key: "user-settings",
 *       label: "User Settings",
 *       icon: "settings-icon.svg",
 *       onClick: async () => {
 *         await loadUserSettings();
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: "User settings loaded"
 *           }]
 *         };
 *       }
 *     });
 *   }
 *
 *   addProfileMenuItem = (item: IProfileMenuItem): void => {
 *     this.profileMenuItems.set(item.key, item);
 *   };
 *
 *   getProfileMenuItems = (): Map<string, IProfileMenuItem> => {
 *     return this.profileMenuItems;
 *   };
 *
 *   updateProfileMenuItem = (item: IProfileMenuItem): void => {
 *     this.profileMenuItems.set(item.key, item);
 *   };
 * }
 * ```
 */
export interface IProfileMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ProfileMenuItem objects.
   * A list for hooking interactions with profile menu is generated based on this collection.
   */
  profileMenuItems: Map<string, IProfileMenuItem>;

  /** Add a new profile menu item */
  addProfileMenuItem(item: IProfileMenuItem): void;

  /** Get all the profile menu items */
  getProfileMenuItems(): Map<string, IProfileMenuItem>;

  /** Updates an existing profile menu item */
  updateProfileMenuItem(item: IProfileMenuItem): void;
}
