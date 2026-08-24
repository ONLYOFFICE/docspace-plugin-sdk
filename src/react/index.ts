// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

export type { TCurrentFile, TCurrentUser, PluginRuntime } from "./runtime";
export type { PluginActions } from "./actions";
export type { PluginSettingsClient } from "./settings";
export type {
  PluginAPIClient,
  PluginApiMethod,
  PluginApiOptions,
  PluginApiRequest,
  PluginApiError,
} from "./api";

export { isPluginApiError } from "./api";

export {
  withPluginRuntime,
  usePluginRuntime,
  useCurrentFile,
  usePluginActions,
  usePluginAPI,
  useCurrentUser,
  usePluginSettings,
} from "./hooks";
