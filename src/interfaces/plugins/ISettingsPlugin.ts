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

import { ISettings } from "../settings/ISettings";

/**
 * The plugin that manages settings for the administrator or owner.
 * The plugin that can interact with the settings panel.
 *
 * <plugin-image src="settings-block.png" width="400px" dark />
 *
 * @example
 *
 * The plugin class implements `ISettingsPlugin`: `adminPluginSettings` describes the
 * settings block (a webhook URL input and a save button) shown in the modal window
 * with the plugin description. DocSpace calls `getAdminPluginSettings` to render the
 * block and `setAdminPluginSettingsValue` to pass the saved value back to the plugin.
 *
 * ```typescript
 * import {
 *   type IInput,
 *   type ISettings,
 *   type ISettingsPlugin,
 *   Components,
 *   InputSize,
 *   ButtonSize,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements ISettingsPlugin {
 *   webhookUrlInput: IInput = {
 *     value: "",
 *     placeholder: "https://example.com/webhook",
 *     size: InputSize.base,
 *     scale: true,
 *     onChange: (value) => {
 *       this.webhookUrlInput.value = value;
 *       return {
 *         actions: [Actions.updateProps],
 *         newProps: { ...this.webhookUrlInput, value }
 *       };
 *     }
 *   };
 *
 *   adminPluginSettings: ISettings | null = {
 *     settings: {
 *       children: [
 *         {
 *           component: Components.label,
 *           props: { text: "Webhook URL", isRequired: true }
 *         },
 *         {
 *           component: Components.input,
 *           props: this.webhookUrlInput
 *         }
 *       ]
 *     },
 *     saveButton: {
 *       component: Components.button,
 *       props: {
 *         label: "Save",
 *         size: ButtonSize.normal,
 *         primary: true,
 *         onClick: () => ({
 *           actions: [Actions.saveSettings, Actions.showToast],
 *           settings: JSON.stringify({ webhookUrl: this.webhookUrlInput.value }),
 *           toastProps: [{ type: ToastType.success, title: "Settings saved" }]
 *         })
 *       }
 *     }
 *   };
 *
 *   setAdminPluginSettings = (settings: ISettings | null): void => {
 *     this.adminPluginSettings = settings;
 *   };
 *
 *   setAdminPluginSettingsValue = (settings: string | null): void => {
 *     if (!settings) return;
 *     const { webhookUrl } = JSON.parse(settings);
 *     this.webhookUrlInput.value = webhookUrl;
 *   };
 *
 *   getAdminPluginSettings = (): ISettings | null => {
 *     return this.adminPluginSettings;
 *   };
 * }
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
