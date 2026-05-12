// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import type React from "react";

import type { FilesExst, FilesType, FilesSecurity } from "../enums/Files";
import type { Security } from "../enums/Security";
import type { UsersType } from "../enums/UsersType";
import type { Devices } from "../enums/Devices";
import type { PluginRuntime, TCurrentFile } from "./types";

export interface InfoPanelItem {
	key: string;
	label: string;
	icon?: string;
	component: React.ComponentType;
	isHeaderVisible?: boolean;
	fileType?: FilesType[];
	fileExt?: (FilesExst | string)[];
	usersTypes?: UsersType[];
	devices?: Devices[];
}

export interface ContextMenuItem {
	key: string;
	label: string;
	icon?: string;
	onClick?(runtime: PluginRuntime, files: TCurrentFile[]): void | Promise<void>;
	isGroupAction?: boolean;
	items?: Omit<ContextMenuItem, "items" | "placement">[];
	filesType?: FilesType[];
	filesExsts?: (FilesExst | string)[];
	usersTypes?: UsersType[];
	devices?: Devices[];
	security?: Security[];
	itemSecurity?: (FilesSecurity | Security)[];
	placement?: "top" | "topLast";
}
