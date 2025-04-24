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

import { IProfileMenuItem } from "../items";

/**
 * Plugin for embedding items in the profile menu.
 * This interface must be implemented in each plugin that adds items to the profile menu.
 *
 * @category ProfileMenuPlugin
 *
 * @example
 *
 * User preferences manager with error handling
 *
 * ```typescript
 * const settingsPlugin: IProfileMenuPlugin = {
 *   profileMenuItems: new Map([
 *     ["user-settings", {
 *       key: "user-settings",
 *       label: "User Settings",
 *       icon: "settings-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await loadUserSettings();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Settings Loaded",
 *               message: "Preferences loaded | Options ready | Panel opened"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Settings Failed",
 *               message: "Unable to load settings | Check permissions"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addProfileMenuItem(item) {
 *     this.profileMenuItems.set(item.key, item);
 *   },
 *   getProfileMenuItems() {
 *     return this.profileMenuItems;
 *   }
 * };
 * ```
 *
 * @example
 *
 * Interactive user profile viewer
 *
 * ```typescript
 * const profilePlugin: IProfileMenuPlugin = {
 *   profileMenuItems: new Map([
 *     ["user-profile", {
 *       key: "user-profile",
 *       label: "View Profile",
 *       icon: "profile-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await loadUserProfile();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Profile Loaded",
 *               message: "Data retrieved | Profile ready | View updated"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Profile Failed",
 *               message: "Unable to load profile | Check connection"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   addProfileMenuItem(item) {
 *     this.profileMenuItems.set(item.key, item);
 *   },
 *   getProfileMenuItems() {
 *     return this.profileMenuItems;
 *   }
 * };
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
