// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

export { Events } from "../enums/Events";
export { Actions } from "../enums/Actions";
export { FilesExst, FilesType, FilesSecurity } from "../enums/Files";
export { PluginStatus } from "../enums/Plugins";
export { RoomsType } from "../enums/Rooms";
export { Security } from "../enums/Security";
export { UsersType } from "../enums/UsersType";
export { Devices } from "../enums/Devices";

export type {
	TCurrentFile,
	TCurrentUser,
	ToastProps,
	ModalDialogContent,
	ModalDialogOptions,
	PluginActions,
	PluginAPIClient,
	PluginRuntime
} from "./types";

export type { InfoPanelItem, ContextMenuItem } from "./items";

export type { PluginDefinition } from "./plugin";
export { definePlugin } from "./plugin";

export {
	withPluginRuntime,
	usePluginRuntime,
	useCurrentFile,
	usePluginActions,
	usePluginAPI,
	useCurrentUser
} from "./runtime";
