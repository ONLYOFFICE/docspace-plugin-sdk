// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

/**
 * Types describing the runtime that DocSpace injects into a React plugin component:
 * the current selection, the current user, the portal-side actions, the API client
 * and the settings client.
 *
 * These are the return types of the hooks in [Hooks](hooks.md) — a plugin rarely
 * needs to import them by hand, but they document what each hook gives back.
 *
 * @packageDocumentation
 */

import type { IToast } from "../interfaces/components/IToast";
import type {
  IModalDialog,
  ModalDisplayType,
} from "../interfaces/components/IModalDialog";
import type { TSelector } from "../interfaces/components/Selector";
import type { IMediaViewer } from "../interfaces/components/IMediaViewer";
import type { IFloatingOperationsButton } from "../interfaces/components/IFloatingOperationsButton";
import type { ButtonGroup } from "../interfaces/components/Component";

export type { IToast, IModalDialog, ModalDisplayType, TSelector, IMediaViewer, IFloatingOperationsButton, ButtonGroup };

/**
 * Metadata of the file, folder or room currently selected in the DocSpace UI.
 * Returned by [`useCurrentFile`](hooks.md#usecurrentfile).
 */
export interface TCurrentFile {
  /** Numeric file/folder ID or string room ID. */
  id: number | string;
  /** Display name including extension, e.g. `"Report Q4.docx"`. */
  title: string;
  /** File extension without the dot, e.g. `"docx"`. Present only for files. */
  fileExst?: string;
  /** `true` when the selection is a folder (not a room). */
  isFolder?: boolean;
  /** `true` when the selection is a room. */
  isRoom?: boolean;
  /** Room type identifier, e.g. `"CustomRoom"`. Present only for rooms. */
  roomType?: string;
}

/**
 * Profile of the user currently authenticated in the portal.
 * Returned by [`useCurrentUser`](hooks.md#usecurrentuser).
 */
export interface TCurrentUser {
  /** Internal user GUID. */
  id: string;
  /** Full display name, e.g. `"Jane Smith"`. */
  displayName: string;
  /** Email address. */
  email: string;
  /** `true` for the portal owner account. */
  isOwner: boolean;
  /** `true` for DocSpace administrators. */
  isAdmin: boolean;
  /** `true` for room administrators. */
  isRoomAdmin: boolean;
}

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

/**
 * Portal-side actions available to a React plugin component.
 * Returned by [`usePluginActions`](hooks.md#usepluginactions).
 *
 * @example
 * ```tsx
 * function MyPanel() {
 *   const { showToast, showModal, closeModal } = usePluginActions();
 *
 *   return (
 *     <button onClick={() => showToast({ type: ToastType.success, title: "Done!" })}>
 *       Notify
 *     </button>
 *   );
 * }
 * ```
 */
export interface PluginActions {
  /**
   * Display a toast notification.
   *
   * @example
   * ```ts
   * showToast({ type: ToastType.success, title: "File uploaded" });
   * showToast({ type: ToastType.error, title: "Upload failed" });
   * ```
   */
  showToast(props: IToast): void;

  /**
   * Open a modal dialog. Pass a React component via `dialogBodyComponent`
   * or a legacy `IBox` tree via `dialogBody`.
   *
   * @example
   * ```ts
   * showModal({
   *   dialogHeader: "File details",
   *   dialogBodyComponent: DetailsModal,
   *   autoMaxWidth: true,
   *   onClose: () => closeModal(),
   * });
   * ```
   */
  showModal(props: IModalDialog): void;

  /** Close the currently open modal dialog. */
  closeModal(): void;

  /**
   * Open a file/room/user selector dialog.
   *
   * @example
   * ```ts
   * showSelector({
   *   selectorType: SelectorType.Files,
   *   onSelect: (items) => console.log(items),
   *   onCancel: () => closeSelector(),
   * });
   * ```
   */
  showSelector(props: TSelector): void;

  /** Close the currently open selector dialog. */
  closeSelector(): void;

  /**
   * Navigate to a DocSpace route.
   *
   * @param path - Absolute portal path, e.g. `"/rooms/shared"`.
   *
   * @example
   * ```ts
   * navigate("/rooms/shared");
   * ```
   */
  navigate(path: string): void;

  /** Open the info panel if it is currently closed. */
  openInfoPanel(): void;

  /** Open the media viewer for a file. */
  showMediaViewer(props: IMediaViewer): void;

  /** Close the currently open media viewer. */
  closeMediaViewer(): void;

  /** Update the currently open media viewer. */
  updateMediaViewer(props: IMediaViewer): void;

  /** Add a floating operations button with optional progress tracking. */
  addFloatingOperationsButton(props: IFloatingOperationsButton): void;

  /** Remove a floating operations button by its ID. */
  removeFloatingOperationsButton(id: string): void;

  /** Update an existing floating operations button. */
  updateFloatingOperationsButton(props: IFloatingOperationsButton): void;

  /**
   * Redraw the article navigation items in the sidebar.
   * Call it after mutating an item through
   * `IArticleNavigationPlugin.updateArticleNavigationItem` so the new `label`
   * or `icon` reaches the sidebar.
   *
   * @example
   * ```ts
   * plugin.updateArticleNavigationItem({ ...item, label: "Reports (3)" });
   * updateArticleNavigationItems();
   * ```
   */
  updateArticleNavigationItems(): void;
}

/**
 * Typed HTTP client scoped to the current portal.
 * All requests are proxied through DocSpace — authentication is applied
 * automatically, no credentials need to be handled by the plugin.
 * The base URL already includes the API prefix, so paths are relative to it,
 * e.g. `"/files/@my"` not `"/api/2.0/files/@my"`.
 * Returned by [`usePluginAPI`](hooks.md#usepluginapi).
 *
 * @example
 * ```tsx
 * type FilesResponse = { files: { id: number; title: string }[] };
 *
 * function FileList() {
 *   const api = usePluginAPI();
 *   const [files, setFiles] = useState<FilesResponse["files"]>([]);
 *
 *   useEffect(() => {
 *     api.get<FilesResponse>("/files/@my").then((res) => setFiles(res.files));
 *   }, []);
 *
 *   return <ul>{files.map((f) => <li key={f.id}>{f.title}</li>)}</ul>;
 * }
 * ```
 */
export interface PluginAPIClient {
  /**
   * Send a GET request to the portal API.
   *
   * @typeParam T - Expected response type.
   * @param path - API path relative to the base URL, e.g. `"/files/@my"`.
   * @param params - Optional query string parameters.
   *
   * @example
   * ```ts
   * const data = await api.get<{ response: Room[] }>("/files/rooms");
   * ```
   */
  get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T>;

  /**
   * Send a POST request to the portal API.
   *
   * @typeParam T - Expected response type.
   * @param path - API path relative to the base URL.
   * @param body - Request body (JSON-serialisable).
   *
   * @example
   * ```ts
   * const folder = await api.post<Folder>("/files/folder", { title: "New Folder" });
   * ```
   */
  post<T = unknown>(path: string, body?: unknown): Promise<T>;

  /**
   * Send a PUT request to the portal API.
   *
   * @typeParam T - Expected response type.
   */
  put<T = unknown>(path: string, body?: unknown): Promise<T>;

  /**
   * Send a DELETE request to the portal API.
   *
   * @typeParam T - Expected response type.
   */
  delete<T = unknown>(path: string): Promise<T>;
}

/**
 * The full runtime context injected into every React plugin component by DocSpace.
 * Access it directly via [`usePluginRuntime`](hooks.md#usepluginruntime) or use the focused hooks
 * ([`useCurrentFile`](hooks.md#usecurrentfile), [`usePluginActions`](hooks.md#usepluginactions), etc.) for better readability.
 */
export interface PluginRuntime {
  /** The file, folder or room currently selected in the portal UI. `null` when nothing is selected. */
  currentFile: TCurrentFile | null;
  /** The authenticated portal user. `null` while the user profile is loading. */
  currentUser: TCurrentUser | null;
  /** Portal-side UI actions (toasts, modals, navigation, …). */
  actions: PluginActions;
  /** Typed HTTP client scoped to the current portal. */
  api: PluginAPIClient;
  /** Client for persisting and retrieving plugin settings. */
  settings: PluginSettingsClient;
}
