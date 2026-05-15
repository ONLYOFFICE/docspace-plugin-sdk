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

import type { ComponentType } from "react";

import { ButtonGroup, IBox } from "../components";

/**
 * Defines the administrator or owner settings block that is embedded in the modal window with the plugin description.
 *
 * @category Settings
 *
 * @example
 *
 * API key settings panel
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginSettings } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { Components, ButtonSize } from "@onlyoffice/docspace-plugin-sdk";
 *
 * type Config = { apiKey: string };
 *
 * function ApiKeySettings() {
 *   const settings = usePluginSettings();
 *   const [apiKey, setApiKey] = useState("");
 *
 *   useEffect(() => {
 *     settings.load<Config>().then((saved) => {
 *       if (saved) setApiKey(saved.apiKey);
 *     });
 *   }, []);
 *
 *   useEffect(() => {
 *     settings.setSaveButton({
 *       component: Components.button,
 *       props: {
 *         label: "Save",
 *         size: ButtonSize.small,
 *         isDisabled: !apiKey.trim(),
 *         onClick: async () => { await settings.save({ apiKey }); },
 *       },
 *     });
 *   }, [apiKey]);
 *
 *   return <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />;
 * }
 *
 * const apiKeySettings: ISettings = {
 *   settingsComponent: ApiKeySettings,
 * };
 * ```
 *
 * @example
 *
 * Settings panel with multiple fields
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginSettings } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { Components, ButtonSize } from "@onlyoffice/docspace-plugin-sdk";
 *
 * type Config = { apiUrl: string; apiKey: string };
 *
 * function ConnectionSettings() {
 *   const settings = usePluginSettings();
 *   const [apiUrl, setApiUrl] = useState("");
 *   const [apiKey, setApiKey] = useState("");
 *
 *   useEffect(() => {
 *     settings.load<Config>().then((saved) => {
 *       if (saved) { setApiUrl(saved.apiUrl); setApiKey(saved.apiKey); }
 *     });
 *   }, []);
 *
 *   useEffect(() => {
 *     settings.setSaveButton({
 *       component: Components.button,
 *       props: {
 *         label: "Save",
 *         size: ButtonSize.small,
 *         isDisabled: !apiUrl.trim() || !apiKey.trim(),
 *         onClick: async () => { await settings.save({ apiUrl, apiKey }); },
 *       },
 *     });
 *   }, [apiUrl, apiKey]);
 *
 *   return (
 *     <div>
 *       <input placeholder="API URL" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
 *       <input type="password" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
 *     </div>
 *   );
 * }
 *
 * const connectionSettings: ISettings = {
 *   settingsComponent: ConnectionSettings,
 * };
 * ```
 */
export interface ISettings {
  /**
   * Defines the administrator or owner settings rendered via the IBox component tree.
   * Use either `settings` or `settingsComponent`, not both.
   *
   * @deprecated Use `settingsComponent` instead — accepts a React component and supports hooks from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  settings?: IBox;

  /**
   * A React component rendered as the settings UI.
   * Use either `settingsComponent` or `settings`, not both.
   * The component can use `usePluginActions` and other hooks
   * from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  settingsComponent?: ComponentType;

  /** Defines the button to save the settings */
  saveButton?: ButtonGroup;

  /** Specifies if the settings block will be displayed as a loader icon or not */
  isLoading?: boolean;

  /**
   * Defines a function that is triggered whenever the settings block is loaded.
   * Returns a promise with the updated settings box and optional save button.
   *
   * @deprecated Use a React component via `settingsComponent` with `useEffect` for data loading instead.
   */
  onLoad?: () => Promise<{ settings: IBox; saveButton?: ButtonGroup }>;
}
