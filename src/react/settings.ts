// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import type { ButtonGroup } from "../interfaces/components/Component";

export type { ButtonGroup };

/**
 * Client for persisting and retrieving plugin-specific settings.
 * Returned by [`usePluginSettings`](hooks.md#usepluginsettings).
 *
 * Settings are stored per-plugin on the server and are available to
 * all portal users who have the plugin enabled.
 *
 * @example
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginSettings } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { Components, ButtonSize } from "@onlyoffice/docspace-plugin-sdk";
 *
 * type Config = { apiKey: string };
 *
 * function SettingsPanel() {
 *   const settings = usePluginSettings();
 *   const [apiKey, setApiKey] = useState("");
 *   const [loaded, setLoaded] = useState(false);
 *
 *   useEffect(() => {
 *     settings.load<Config>().then((saved) => {
 *       if (saved) setApiKey(saved.apiKey);
 *       setLoaded(true);
 *     });
 *   }, []);
 *
 *   useEffect(() => {
 *     if (!loaded) return;
 *     settings.setSaveButton({
 *       component: Components.button,
 *       props: {
 *         label: "Save",
 *         size: ButtonSize.small,
 *         isDisabled: !apiKey.trim(),
 *         onClick: async () => { await settings.save({ apiKey }); },
 *       },
 *     });
 *   }, [apiKey, loaded]);
 *
 *   return <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />;
 * }
 * ```
 */
export interface PluginSettingsClient {
  /**
   * Load the plugin's persisted settings from the server.
   *
   * @typeParam T - Expected shape of the settings object.
   * @returns The parsed settings object, or `null` if no settings have been saved yet.
   *
   * @example
   * ```ts
   * const saved = await settings.load<{ apiKey: string }>();
   * if (saved) setApiKey(saved.apiKey);
   * ```
   */
  load<T = unknown>(): Promise<T | null>;

  /**
   * Persist plugin settings to the server.
   * After saving, DocSpace calls `setAdminPluginSettingsValue` on the plugin
   * class instance so any module-scope cache stays in sync.
   *
   * @param data - Plain JSON-serialisable object to store as plugin settings.
   *
   * @example
   * ```ts
   * await settings.save({ apiUrl: "https://example.com", apiKey: "secret" });
   * ```
   */
  save(data: Record<string, unknown>): Promise<void>;

  /**
   * Set or update the Save button rendered in the plugin settings dialog footer.
   * Call this inside a `useEffect` whenever the form values change to keep the
   * button's `isDisabled` state in sync with form validity.
   *
   * @param props - A `ButtonGroup` component descriptor from the DocSpace SDK.
   *
   * @example
   * ```ts
   * settings.setSaveButton({
   *   component: Components.button,
   *   props: { label: "Save", size: ButtonSize.small, isDisabled: !isValid },
   * });
   * ```
   */
  setSaveButton(props: ButtonGroup): void;
}
