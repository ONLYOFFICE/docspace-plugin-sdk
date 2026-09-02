// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

/**
 * What ONLYOFFICE Apps hands a React plugin component: the current selection, the
 * current user, and the clients the component reaches the portal with.
 *
 * These are the return types of the hooks in [Hooks](hooks.md) — a plugin rarely
 * needs to import them by hand, but they document what each hook gives back.
 *
 * @packageDocumentation
 */

import type { PluginActions } from "./actions";
import type { PluginAPIClient } from "./api";
import type { PluginSettingsClient } from "./settings";

/**
 * Metadata of the file, folder or room currently selected in the ONLYOFFICE Apps UI.
 * Returned by [`useCurrentFile`](hooks.md#usecurrentfile).
 */
export interface TCurrentFile {
  /** Numeric file/folder ID or string room ID. */
  id: number | string;
  /** Display name including extension, e.g. `"Report Q4.docx"`. */
  title: string;
  /**
   * File extension with the dot, e.g. `".docx"` — the spelling the portal
   * stores and [`FilesExst`](../enums/Files.md) uses, so it compares directly
   * against that enum. Present only for files.
   */
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
  /** `true` for ONLYOFFICE Apps administrators. */
  isAdmin: boolean;
  /** `true` for room administrators. */
  isRoomAdmin: boolean;
}

/**
 * The full runtime context injected into every React plugin component by ONLYOFFICE Apps.
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
