// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

export type {
	TCurrentFile,
	TCurrentUser,
	PluginActions,
	PluginAPIClient,
	PluginSettingsClient,
	PluginRuntime,
} from "./types";

export {
	withPluginRuntime,
	usePluginRuntime,
	useCurrentFile,
	usePluginActions,
	usePluginAPI,
	useCurrentUser,
	usePluginSettings,
} from "./runtime";
