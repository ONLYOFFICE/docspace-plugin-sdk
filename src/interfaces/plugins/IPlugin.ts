/*
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
 */

import { PluginLocale, PluginStatus } from "../../enums";

/**
 * The default plugin.
 * This interface must be implemented in each plugin because without the plugin status it will not be built in.
 *

 *
 * @example
 *
 * Every plugin class implements `IPlugin` (usually together with one or more
 * type-specific interfaces such as `IContextMenuPlugin`). DocSpace reads the
 * plugin status via `getStatus` and runs `onLoadCallback` when the plugin is
 * uploaded to the portal.
 *
 * ```typescript
 * import { type IPlugin, PluginStatus } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IPlugin {
 *   status: PluginStatus = PluginStatus.active;
 *
 *   onLoadCallback = async (): Promise<void> => {
 *     try {
 *       await initializeAnalyzer();
 *     } catch (error) {
 *       // Hide the plugin if it cannot be initialized
 *       this.status = PluginStatus.hide;
 *     }
 *   };
 *
 *   updateStatus = (status: PluginStatus): void => {
 *     this.status = status;
 *   };
 *
 *   getStatus = (): PluginStatus => {
 *     return this.status;
 *   };
 *
 *   setOnLoadCallback = (callback: () => Promise<void>): void => {
 *     this.onLoadCallback = callback;
 *   };
 * }
 * ```
 */
export interface IPlugin {
  /** The plugin status (active or hide) */
  status: PluginStatus;

  /** The plugin language */
  language?: PluginLocale;

  /** The method is called on the portal side when the portal language is changed. */
  setLanguage?: (language: PluginLocale) => void;

  /** The method is called on the portal side to get the plugin language. */
  getLanguage?: () => PluginLocale;

  /** Callback which will be executed when uploading the plugin to the portal */
  onLoadCallback: () => Promise<void>;

  /** Update the plugin status */
  updateStatus(status: PluginStatus): void;

  /** Get the current plugin status */
  getStatus(): PluginStatus;

  /** Sets the onLoadCallback variable to the plugin */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
