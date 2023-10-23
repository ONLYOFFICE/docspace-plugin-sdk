/*
* (c) Copyright Ascensio System SIA 2023
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
 * The plugin that manages settings for the administrator or owner.
 */
export interface ISettingsPlugin {
  // userPluginSettings: ISettings | null;

  /**
   * Stores the administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  adminPluginSettings: ISettings | null;

  // setUserPluginSettings(settings: ISettings | null): void;

  // getUserPluginSettings(): ISettings | null;

  /**
   * Update the administator or owner plugin settings.
   *
   * @param settings Defines the administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  setAdminPluginSettings(settings: ISettings | null): void;

  /**
   * Get the administator or owner plugin settings.
   *
   * @returns The administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  getAdminPluginSettings(): ISettings | null;
}
