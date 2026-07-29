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
	ButtonGroup,
	ButtonSize,
	Components,
	IButton,
	IMessage,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

import { i18n } from "../i18n";
import { tokenInput } from "./Token";

/**
 * Save button click handler.
 * Persists the token value, shows a success toast, and disables the button.
 */
const onClick = async (): Promise<IMessage> => ({
	actions: [
		Actions.showToast,
		Actions.updateProps,
		Actions.saveSettings,
	],
	toastProps: [{ type: ToastType.success, title: i18n.t("settings.tokenSaved") }],
	newProps: { ...saveButtonProps, isDisabled: true },
	settings: tokenInput.value,
});

/** Mutable button props - label is updated by `onLoad` when language changes. */
export const saveButtonProps: IButton = {
	onClick,
	size: ButtonSize.normal,
	label: i18n.t("settings.saveButton"),
	scale: false,
	primary: true,
	isDisabled: true,
	withLoadingAfterClick: true,
};

export const saveButtonGroup: ButtonGroup = {
	component: Components.button,
	props: saveButtonProps,
	contextName: "saveButton",
};
