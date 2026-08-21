// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// The context is created in this module. The plugin SDK is shimmed by the
// client so that the plugin bundle uses the host's copy of this module —
// provider and consumer therefore share the same context reference.

/**
 * React hooks for plugin components rendered inside the DocSpace application tree.
 *
 * A plugin component is passed to the SDK through one of the `*Component` props —
 * [`IInfoPanelItem.component`](../interfaces/items/IInfoPanelItem.md#component),
 * [`IArticleButtonItem.component`](../interfaces/items/IArticleButtonItem.md#component),
 * [`IArticleNavigationItem.sectionComponent`](../interfaces/items/IArticleNavigationItem.md#sectioncomponent),
 * [`IModalDialog.dialogBodyComponent`](../interfaces/components/IModalDialog.md#dialogbodycomponent)
 * or [`ISettings.settingsComponent`](../interfaces/settings/ISettings.md#settingscomponent).
 * DocSpace renders it with the plugin runtime in context, and these hooks read
 * that context.
 *
 * The hooks are published from the `@onlyoffice/docspace-plugin-sdk/react`
 * subpath, which requires `react` 19 or later as a peer dependency:
 *
 * ```tsx
 * import { useCurrentFile, usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * ```
 *
 * :::info Bundling
 * `react`, `react/jsx-runtime`, `@onlyoffice/docspace-plugin-sdk` and
 * `@onlyoffice/docspace-plugin-sdk/react` must stay **external** in the plugin
 * bundle — DocSpace supplies its own copies at load time. A plugin that bundles
 * its own React gets a second React instance with its own context objects, and
 * every hook below then throws. The generated plugin template already lists
 * these four specifiers in `build.rollupOptions.external`. The same rule applies
 * to any UI library shared with the host, `@docspace/ui-kit` included.
 * :::
 *
 * @packageDocumentation
 */

import React, { createContext, useContext } from "react";

import type {
  PluginRuntime,
  TCurrentFile,
  PluginActions,
  PluginAPIClient,
  PluginSettingsClient,
  TCurrentUser,
} from "./types";

/**
 * The context that carries the plugin runtime from the DocSpace client into the
 * plugin component tree.
 *
 * @remarks
 * **Internal.** Plugin authors never touch it — the client provides it through
 * `withPluginRuntime`, and the hooks below read it.
 *
 * @internal
 */
export const LocalRuntimeContext = createContext<PluginRuntime | null>(null);

/**
 * Wraps a plugin component so that the DocSpace client can inject the
 * [`PluginRuntime`](types.md#pluginruntime) via a prop.
 *
 * @remarks
 * This is an **internal** helper used by the DocSpace client — plugin authors
 * do not need to call it. It is exported so that the client can import it from
 * the shimmed copy of the SDK that the plugin bundle also uses, ensuring that
 * both sides share the same React context reference.
 *
 * @param Component - The plugin component to wrap.
 * @returns A new component that accepts a `runtime` prop and provides it to
 *   all descendants via {@link LocalRuntimeContext}.
 *
 * @internal
 */
export function withPluginRuntime(Component: React.ComponentType) {
  function WithRuntime({ runtime }: { runtime: PluginRuntime }) {
    return React.createElement(
      LocalRuntimeContext.Provider,
      { value: runtime },
      React.createElement(Component, null),
    );
  }
  WithRuntime.displayName = `WithRuntime(${Component.displayName ?? Component.name ?? "Component"})`;
  return WithRuntime;
}

/**
 * Returns the full [`PluginRuntime`](types.md#pluginruntime) context for the current plugin component.
 *
 * @remarks
 * Prefer the focused hooks ([`useCurrentFile`](#usecurrentfile), [`usePluginActions`](#usepluginactions),
 * etc.) when you only need a single slice of the runtime — they are more
 * readable and produce narrower TypeScript types.
 *
 * @throws {Error} When called outside a plugin component rendered by DocSpace.
 *
 * @example
 * ```tsx
 * import { usePluginRuntime } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * function MyComponent() {
 *   const { currentFile, currentUser, actions, api, settings } = usePluginRuntime();
 *   // …
 * }
 * ```
 */
export function usePluginRuntime(): PluginRuntime {
  const ctx = useContext(LocalRuntimeContext);
  if (!ctx)
    throw new Error(
      "usePluginRuntime must be used inside a plugin component rendered by DocSpace",
    );
  return ctx;
}

/**
 * Returns metadata of the file, folder or room currently selected in the
 * DocSpace UI, or `null` when nothing is selected.
 *
 * @example
 * ```tsx
 * import { useCurrentFile } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * function InfoPanel() {
 *   const file = useCurrentFile();
 *
 *   if (!file) return <p>No file selected.</p>;
 *
 *   return (
 *     <div>
 *       <p>{file.title}</p>
 *       {file.fileExst && <p>Extension: {file.fileExst}</p>}
 *       {file.isRoom  && <p>Room type: {file.roomType}</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCurrentFile(): TCurrentFile | null {
  return usePluginRuntime().currentFile;
}

/**
 * Returns all portal-side UI actions available to the plugin.
 *
 * @example
 * ```tsx
 * import { usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { ToastType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function MyPanel() {
 *   const { showToast, showModal, closeModal } = usePluginActions();
 *
 *   return (
 *     <>
 *       <button onClick={() => showToast({ type: ToastType.success, title: "Done!" })}>
 *         Toast
 *       </button>
 *       <button onClick={() => showModal({ dialogHeader: "Info", dialogBodyComponent: Details, onClose: closeModal })}>
 *         Open modal
 *       </button>
 *     </>
 *   );
 * }
 * ```
 */
export function usePluginActions(): PluginActions {
  return usePluginRuntime().actions;
}

/**
 * Returns a typed HTTP client scoped to the current portal.
 * Authentication is applied automatically — no credentials need to be handled
 * by the plugin. Paths are relative to the API base URL, e.g. `"/files/@my"`.
 *
 * @example
 * ```tsx
 * import { usePluginAPI } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * function RoomList() {
 *   const api = usePluginAPI();
 *   const [rooms, setRooms] = useState([]);
 *
 *   useEffect(() => {
 *     api.get("/files/rooms").then((res) => setRooms(res.response));
 *   }, []);
 *
 *   return <ul>{rooms.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;
 * }
 * ```
 */
export function usePluginAPI(): PluginAPIClient {
  return usePluginRuntime().api;
}

/**
 * Returns the profile of the user currently authenticated in the portal,
 * or `null` while the profile is loading.
 *
 * @example
 * ```tsx
 * import { useCurrentUser } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * function UserBadge() {
 *   const user = useCurrentUser();
 *   if (!user) return null;
 *
 *   return (
 *     <p>
 *       {user.displayName}
 *       {user.isAdmin && " (Admin)"}
 *     </p>
 *   );
 * }
 * ```
 */
export function useCurrentUser(): TCurrentUser | null {
  return usePluginRuntime().currentUser;
}

/**
 * Returns the client for loading, saving and controlling the Save button of
 * the plugin settings dialog.
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
export function usePluginSettings(): PluginSettingsClient {
  return usePluginRuntime().settings;
}
