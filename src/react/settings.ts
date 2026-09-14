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
 *   const [apiKey, setApiKey] = useState(() => settings.load<Config>()?.apiKey ?? "");
 *   const [savedKey, setSavedKey] = useState(apiKey);
 *
 *   useEffect(() => {
 *     settings.setSaveButton({
 *       component: Components.button,
 *       props: {
 *         label: "Save",
 *         size: ButtonSize.small,
 *         // disabled until the user changes something valid
 *         isDisabled: apiKey === savedKey || !apiKey.trim(),
 *         onClick: async () => {
 *           await settings.save({ apiKey });
 *           setSavedKey(apiKey);
 *         },
 *       },
 *     });
 *   }, [apiKey, savedKey]);
 *
 *   return <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />;
 * }
 * ```
 */
export interface PluginSettingsClient {
  /**
   * Read the plugin's persisted settings. The portal already holds them by the
   * time a plugin component renders, so this reads them synchronously and
   * suits a lazy `useState` initialiser.
   *
   * @typeParam T - Expected shape of the settings object.
   * @returns The parsed settings object, or `null` when nothing has been saved
   *   yet or the stored value is not valid JSON.
   *
   * @example
   * ```ts
   * const saved = settings.load<{ apiKey: string }>();
   * if (saved) setApiKey(saved.apiKey);
   * ```
   */
  load<T = unknown>(): T | null;

  /**
   * Persist plugin settings to the server.
   * After saving, ONLYOFFICE Apps calls `setAdminPluginSettingsValue` on the plugin
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
   * Set or update the Save button rendered in the plugin settings panel footer.
   * Call this inside a `useEffect` whenever the form values change, and gate
   * `isDisabled` on what the user has changed rather than on validity alone —
   * the portal cannot tell a touched form from an untouched one, so a button
   * gated on validity is already active over a form nobody has edited.
   *
   * @param props - A `ButtonGroup` component descriptor from the ONLYOFFICE Apps SDK.
   *
   * @example
   * ```ts
   * settings.setSaveButton({
   *   component: Components.button,
   *   props: { label: "Save", size: ButtonSize.small, isDisabled: !isDirty || !isValid },
   * });
   * ```
   */
  setSaveButton(props: ButtonGroup): void;
}
