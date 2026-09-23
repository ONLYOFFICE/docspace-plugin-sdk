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
 * The default plugin, implemented by every plugin class together with the
 * interfaces of the scopes it declares, such as
 * [`IContextMenuPlugin`](IContextMenuPlugin.md).
 *
 * Each time the portal loads the plugin it calls `setLanguage`,
 * [`setAPI`](IApiPlugin.md#setapi) for the `API` scope and `onLoadCallback`,
 * then reads `getStatus`: `active` registers the plugin's items and CSS.
 * For the `Settings` scope it then passes the stored settings to
 * [`setAdminPluginSettingsValue`](ISettingsPlugin.md#setadminpluginsettingsvalue)
 * and reads `getStatus` again. Switching the plugin back on repeats this on
 * the same instance; switching the interface language loads the plugin
 * afresh. A plugin that fails to load, or throws on the way, is reported to
 * the administrator in the plugin settings with the error's message.
 *
 * @example
 *
 * An unexpected initialization error is left to throw, so the administrator
 * sees its message; `PluginStatus.hide` is kept for a plugin not configured yet
 *
 * ```typescript
 * import { type IPlugin, PluginStatus, PluginLocale } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IPlugin {
 *   status: PluginStatus = PluginStatus.active;
 *   language: PluginLocale = PluginLocale.EN_US;
 *
 *   onLoadCallback = async (): Promise<void> => {
 *     await initializeAnalyzer();
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
 *   // Called by the portal right before every onLoadCallback
 *   setLanguage = (language: PluginLocale): void => {
 *     this.language = language;
 *   };
 *
 *   // Called by the portal to read the current plugin language
 *   getLanguage = (): PluginLocale => {
 *     return this.language;
 *   };
 *
 *   setOnLoadCallback = (callback: () => Promise<void>): void => {
 *     this.onLoadCallback = callback;
 *   };
 * }
 * ```
 */
export interface IPlugin {
  /**
   * The plugin status: [`active`](../../enums/Plugins.md#active) while the
   * plugin's items belong in the interface,
   * [`hide`](../../enums/Plugins.md#hide) while they do not.
   */
  status: PluginStatus;

  /** The plugin language */
  language?: PluginLocale;

  /**
   * The method is called on the portal side with the portal language, right
   * before every `onLoadCallback`.
   *
   * @remarks It is not a change notification: switching the interface
   * language loads the plugin afresh.
   */
  setLanguage?: (language: PluginLocale) => void;

  /**
   * The method is called on the portal side to get the plugin language, under
   * which the plugin list shows the manifest's `nameLocale` and
   * `descriptionLocale` — the interface language when it is not implemented.
   */
  getLanguage?: () => PluginLocale;

  /**
   * Callback the portal awaits each time it loads the plugin, before reading
   * the status and registering the items.
   *
   * @remarks A throw stops the plugin from registering anything and is
   * reported to the administrator in the plugin settings.
   */
  onLoadCallback: () => Promise<void>;

  /**
   * Update the plugin status.
   *
   * @remarks The portal does not watch the field: return
   * [`Actions.updateStatus`](../../enums/Actions.md#updatestatus) to apply a
   * status changed outside the moments listed on `getStatus`.
   */
  updateStatus(status: PluginStatus): void;

  /**
   * The method is called on the portal side to read the plugin status:
   * `active` registers the items and CSS, `hide` takes them back.
   *
   * @remarks Read after `onLoadCallback`, after the stored settings reach
   * [`setAdminPluginSettingsValue`](ISettingsPlugin.md#setadminpluginsettingsvalue),
   * after [`save`](../../react/settings.md#save) in the React settings client
   * and on every [`Actions.updateStatus`](../../enums/Actions.md#updatestatus).
   * The administrator's switch overrides it.
   */
  getStatus(): PluginStatus;

  /** Sets the onLoadCallback variable to the plugin */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
