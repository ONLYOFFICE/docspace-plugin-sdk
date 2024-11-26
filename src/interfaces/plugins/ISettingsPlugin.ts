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

import { ISettings } from "../settings/ISettings";

/**
 * @Category Settings Plugin
 *
 * The plugin that manages settings for the administrator or owner.
 *
 * @param adminPluginSettings - The administrator or owner settings block that is embedded in the modal window with the plugin description.
 *
 * @method setAdminPluginSettings - Update the administrator or owner plugin settings.
 * @param settings - Defines the administrator or owner settings block that is embedded in the modal window with the plugin description.
 *
 * @method setAdminPluginSettingsValue - Transfer the administrator or owner plugin settings to all the portal users. It functions on the DocSpace side.
 * @param settings - Defines a parameter that is used to save and transfer the administrator or owner plugin settings to all the portal users.
 *
 * @method getAdminPluginSettings - Get the administrator or owner plugin settings.
 * @returns The administrator or owner settings block that is embedded in the modal window with the plugin description.
 */
export interface ISettingsPlugin {
  adminPluginSettings: ISettings | null;
  setAdminPluginSettings(settings: ISettings | null): void;
  setAdminPluginSettingsValue(settings: string | null): void;
  getAdminPluginSettings(): ISettings | null;
}
