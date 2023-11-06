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

import { PluginStatus } from "../../enums";
/**
 * The default plugin.
 *
 * This interface must be implemented in each plugin because without the plugin status it will not be built in.
 */
export interface IPlugin {
  /**
   * Stores the plugin status (active or hide).
   */
  status: PluginStatus;

  /**
   * Stores callback which will be executed when uploading the plugin to the portal.
   */
  onLoadCallback: () => Promise<void>;

  /**
   * Update the plugin status.
   *
   * @param status Defines a new plugin status (active or hide).
   */
  updateStatus(status: PluginStatus): void;

  /**
   * Get the current plugin status.
   *
   * @returns The current plugin status.
   */
  getStatus(): PluginStatus;

  /**
   * Sets the onLoadCallback variable to the plugin.
   *
   * @param callback Defines callback which will be executed when uploading the plugin to the portal.
   */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
