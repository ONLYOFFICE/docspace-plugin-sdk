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

import { PluginStatus } from "../../enums";

/**
 * @Category Plugin
 *
 * The default plugin.
 * This interface must be implemented in each plugin because without the plugin status it will not be built in.
 *
 * @param status - The plugin status (active or hide).
 * @param onLoadCallback - Callback which will be executed when uploading the plugin to the portal.
 * @method updateStatus - Update the plugin status.
 * @param status - A new plugin status (active or hide).
 * @method getStatus - Get the current plugin status.
 * @returns The current plugin status.
 * @method setOnLoadCallback - Sets the onLoadCallback variable to the plugin.
 * @param callback - Callback which will be executed when uploading the plugin to the portal.
 */
export interface IPlugin {
  status: PluginStatus;
  onLoadCallback: () => Promise<void>;
  updateStatus(status: PluginStatus): void;
  getStatus(): PluginStatus;
  setOnLoadCallback(callback: () => Promise<void>): void;
}
