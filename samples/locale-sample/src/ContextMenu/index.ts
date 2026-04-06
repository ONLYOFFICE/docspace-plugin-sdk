/*
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
 */

import {
	Actions,
	Devices,
	FilesType,
	IContextMenuItem,
	IMessage,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

import { i18n } from "../i18n";

const onItemClick = async (id: string | number): Promise<IMessage> => ({
	actions: [Actions.showToast],
	toastProps: [{ type: ToastType.success, title: `Action triggered for item: ${id}` }],
});

/**
 * Factory: creates the context menu item with the current locale labels.
 * Called once at startup and again every time `setLanguage` fires.
 */
export const createContextMenuItem = (): IContextMenuItem => ({
	key: "locale-sample-context-menu",
	label: i18n.t("contextMenuItem.label"),
	icon: "docspace-icon.svg",
	placement: "top",
	fileType: [FilesType.file, FilesType.folder],
	devices: [Devices.desktop, Devices.mobile, Devices.tablet],
	items: [
		{
			key: "locale-sample-context-menu-sub",
			label: i18n.t("contextMenuItem.subLabel"),
			icon: "docspace-icon.svg",
			onItemClick,
		},
	],
});

/** Initial instance — replaced on every language change via `updateContextMenuItem`. */
export const contextMenuItem: IContextMenuItem = createContextMenuItem();
