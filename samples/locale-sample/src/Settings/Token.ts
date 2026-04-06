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
	BoxGroup,
	Components,
	IBox,
	IInput,
	IMessage,
	IText,
	InputGroup,
	InputSize,
	InputType,
	TextGroup,
} from "@onlyoffice/docspace-plugin-sdk";

import { i18n } from "../i18n";
import { saveButtonProps } from "./Button";

/**
 * Token input change handler.
 * Stores the entered value and re-enables the Save button.
 */
const onChange = (value: string): IMessage => {
	tokenInput.value = value;

	return {
		actions: [Actions.updateProps, Actions.updateContext],
		newProps: tokenInput,
		contextProps: [
			{
				name: "saveButton",
				props: { ...saveButtonProps, isDisabled: false },
			},
		],
	};
};

/** Mutable input state — value is updated by `onChange`. */
export const tokenInput: IInput = {
	value: "",
	onChange,
	scale: true,
	size: InputSize.base,
	type: InputType.text,
};

const tokenInputGroup: InputGroup = {
	component: Components.input,
	props: tokenInput,
};

const inputBox: IBox = {
	widthProp: "100%",
	children: [tokenInputGroup],
};

/** Mutable text state — updated by `onLoad` when language changes. */
export const tokenLabelText: IText = {
	text: i18n.t("settings.apiToken"),
	fontWeight: 600,
	fontSize: "13px",
	lineHeight: "20px",
	noSelect: true,
};

const tokenLabelGroup: TextGroup = {
	component: Components.text,
	props: tokenLabelText,
};

const tokenLabelBox: IBox = {
	marginProp: "0 0 4px",
	children: [tokenLabelGroup],
};

/** Full token field: label + input, stacked vertically. */
export const tokenFieldGroup: BoxGroup = {
	component: Components.box,
	props: {
		displayProp: "flex",
		flexDirection: "column",
		marginProp: "0 0 8px",
		children: [
			{ component: Components.box, props: tokenLabelBox },
			{ component: Components.box, props: inputBox },
		],
	},
};
