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

import { ButtonGroup, IBox } from "../components";

/**
 * @module Plugins
 *
 * @category Settings Plugin
 *
 * Defines the administrator or owner settings block that is embedded in the modal window with the plugin description.
 *
 * @example
 *
 * Theme customization settings with color picker
 *
 * ```typescript
 * const themeSettings: ISettings = {
 *   settings: {
 *     type: "box",
 *     children: [
 *       {
 *         type: "colorPicker",
 *         id: "primary-color",
 *         label: "Primary Color",
 *         value: "#007BFF",
 *         onChange: (color) => updateThemeColor(color)
 *       },
 *       {
 *         type: "toggle",
 *         id: "dark-mode",
 *         label: "Dark Mode",
 *         value: false,
 *         onChange: (enabled) => toggleDarkMode(enabled)
 *       }
 *     ]
 *   },
 *   saveButton: {
 *     type: "button",
 *     label: "Save Theme",
 *     onClick: async () => {
 *       try {
 *         await saveThemeSettings();
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: "success",
 *             title: "Theme Updated",
 *             message: "Theme settings saved | Changes applied | Refresh to see updates"
 *           }]
 *         };
 *       } catch (error) {
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: "error",
 *             title: "Save Failed",
 *             message: "Unable to save theme | Check your changes"
 *           }]
 *         };
 *       }
 *     }
 *   },
 *   isLoading: false,
 *   onLoad: async () => {
 *     const savedSettings = await loadThemeSettings();
 *     return {
 *       settings: {
 *         type: "box",
 *         children: [
 *           {
 *             type: "colorPicker",
 *             id: "primary-color",
 *             label: "Primary Color",
 *             value: savedSettings.primaryColor
 *           },
 *           {
 *             type: "toggle",
 *             id: "dark-mode",
 *             label: "Dark Mode",
 *             value: savedSettings.darkMode
 *           }
 *         ]
 *       }
 *     };
 *   }
 * };
 * ```
 *
 * @example
 *
 * Language configuration settings with validation
 *
 * ```typescript
 * const languageSettings: ISettings = {
 *   settings: {
 *     type: "box",
 *     children: [
 *       {
 *         type: "select",
 *         id: "default-language",
 *         label: "Default Language",
 *         options: [
 *           { value: "en", label: "English" },
 *           { value: "es", label: "Spanish" },
 *           { value: "fr", label: "French" }
 *         ],
 *         value: "en",
 *         onChange: (lang) => updateDefaultLanguage(lang)
 *       },
 *       {
 *         type: "toggle",
 *         id: "auto-detect",
 *         label: "Auto-detect User Language",
 *         value: true,
 *         onChange: (enabled) => toggleAutoDetect(enabled)
 *       }
 *     ]
 *   },
 *   saveButton: {
 *     type: "button",
 *     label: "Save Language Settings",
 *     onClick: async () => {
 *       try {
 *         await saveLanguageSettings();
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: "success",
 *             title: "Language Updated",
 *             message: "Language settings saved | Changes applied | Refresh to see updates"
 *           }]
 *         };
 *       } catch (error) {
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: "error",
 *             title: "Save Failed",
 *             message: "Unable to save language settings | Check your changes"
 *           }]
 *         };
 *       }
 *     }
 *   },
 *   isLoading: false,
 *   onLoad: async () => {
 *     const savedSettings = await loadLanguageSettings();
 *     return {
 *       settings: {
 *         type: "box",
 *         children: [
 *           {
 *             type: "select",
 *             id: "default-language",
 *             label: "Default Language",
 *             options: [
 *               { value: "en", label: "English" },
 *               { value: "es", label: "Spanish" },
 *               { value: "fr", label: "French" }
 *             ],
 *             value: savedSettings.defaultLanguage
 *           },
 *           {
 *             type: "toggle",
 *             id: "auto-detect",
 *             label: "Auto-detect User Language",
 *             value: savedSettings.autoDetect
 *           }
 *         ]
 *       }
 *     };
 *   }
 * };
 * ```
 */
export interface ISettings {
  /** Defines the administrator or owner settings */
  settings: IBox;

  /** Defines the button to save the settings */
  saveButton: ButtonGroup;

  /** Specifies if the settings block will be displayed as a loader icon or not */
  isLoading?: boolean;

  /**
   * Defines a function that is triggered whenever the settings block is loaded.
   * Returns a promise with the updated settings box and optional save button.
   */
  onLoad?: () => Promise<{ settings: IBox; saveButton?: ButtonGroup }>;
}
