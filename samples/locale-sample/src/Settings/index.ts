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
	BoxGroup,
	Components,
	IBox,
	ISettings,
	TextGroup,
} from "@onlyoffice/docspace-plugin-sdk";

import plugin from "../index";
import { i18n } from "../i18n";
import { tokenFieldGroup, tokenLabelText } from "./Token";
import { saveButtonGroup, saveButtonProps } from "./Button";

/** Mutable description text props - updated by `onLoad` when language changes. */
const descriptionProps = {
	text: i18n.t("settings.description"),
	color: "#A3A9AE",
	fontSize: "12px",
	fontWeight: 400 as const,
	lineHeight: "16px",
};

const descriptionText: TextGroup = {
	component: Components.text,
	props: descriptionProps,
};

const descriptionGroup: BoxGroup = {
	component: Components.box,
	props: { children: [descriptionText] },
};

const settingsBox: IBox = {
	displayProp: "flex",
	flexDirection: "column",
	children: [tokenFieldGroup, descriptionGroup],
};

/**
 * Admin settings block registered with the portal.
 *
 * `onLoad` is called each time the settings dialog opens. It refreshes all
 * translated labels so that they match the current portal language even if
 * `setLanguage` ran after the initial module load.
 */
export const adminSettings: ISettings = {
	settings: settingsBox,
	saveButton: saveButtonGroup,
	onLoad: async () => {
		descriptionProps.text = i18n.t("settings.description");
		tokenLabelText.text = i18n.t("settings.apiToken");
		saveButtonProps.label = i18n.t("settings.saveButton");

		plugin.setAdminPluginSettings({ ...adminSettings });

		return { settings: settingsBox };
	},
};
