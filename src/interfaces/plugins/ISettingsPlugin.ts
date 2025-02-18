/**
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
 *
 * @license
 */

import { ISettings } from "../settings/ISettings";

/**
 * The plugin that manages settings for the administrator or owner.
 * The plugin that can interact with the settings panel.
 *
 * @category SettingsPlugin
 *
 * @example
 *
 * Theme customization settings with error handling
 *
 * ```typescript
 * const themeSettings: ISettingsPlugin = {
 *   adminPluginSettings: new Map([
 *     ["theme", {
 *       key: "theme",
 *       label: "Theme Settings",
 *       icon: "theme-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await loadThemeSettings();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Theme Settings",
 *               message: "Preferences loaded | Colors ready | Panel opened"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Settings Failed",
 *               message: "Unable to load theme | Check configuration"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   setAdminPluginSettings(settings) {
 *     this.adminPluginSettings = settings;
 *   },
 *   setAdminPluginSettingsValue(settings) {
 *     try {
 *       this.adminPluginSettings.set("theme", settings);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Setting Updated",
 *           message: "Value saved | Config updated | Changes applied"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Update Failed",
 *           message: "Unable to save setting | Check value format"
 *         }]
 *       };
 *     }
 *   },
 *   getAdminPluginSettings() {
 *     return this.adminPluginSettings;
 *   }
 * };
 * ```
 *
 * @example
 *
 * Multi-language support configuration
 *
 * ```typescript
 * const languageSettings: ISettingsPlugin = {
 *   adminPluginSettings: new Map([
 *     ["language", {
 *       key: "language",
 *       label: "Language Settings",
 *       icon: "language-icon.svg",
 *       onClick: async () => {
 *         try {
 *           await loadLanguageOptions();
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "success",
 *               title: "Language Options",
 *               message: "Languages loaded | List ready | Choose option"
 *             }]
 *           };
 *         } catch (error) {
 *           return {
 *             actions: [Actions.showToast],
 *             toastProps: [{
 *               type: "error",
 *               title: "Options Failed",
 *               message: "Unable to load languages | Check connection"
 *             }]
 *           };
 *         }
 *       }
 *     }]
 *   ]),
 *   setAdminPluginSettings(settings) {
 *     this.adminPluginSettings = settings;
 *   },
 *   setAdminPluginSettingsValue(settings) {
 *     try {
 *       this.adminPluginSettings.set("language", settings);
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Language Changed",
 *           message: "Language updated | UI translated | Ready to use"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Change Failed",
 *           message: "Unable to change language | Try again"
 *         }]
 *       };
 *     }
 *   },
 *   getAdminPluginSettings() {
 *     return this.adminPluginSettings;
 *   }
 * };
 * ```
 */
export interface ISettingsPlugin {
  /** The administrator or owner settings block that is embedded in the modal window with the plugin description */
  adminPluginSettings: ISettings | null;

  /** Update the administrator or owner plugin settings */
  setAdminPluginSettings(settings: ISettings | null): void;

  /** Transfer the administrator or owner plugin settings to all the portal users. It functions on the DocSpace side */
  setAdminPluginSettingsValue(settings: string | null): void;

  /** Get the administrator or owner plugin settings */
  getAdminPluginSettings(): ISettings | null;
}
