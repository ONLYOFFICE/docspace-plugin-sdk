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
	ButtonSize,
	Components,
	IBox,
	IButton,
	ICheckbox,
	IComboBox,
	IComboBoxItem,
	IIconButton,
	IImage,
	IFrame,
	IInput,
	ILabel,
	ILink,
	IMainButtonItem,
	IMainButtonPlugin,
	IMessage,
	IModalDialog,
	IPlugin,
	ISkeleton,
	IText,
	ITextArea,
	IToggleButton,
	InputSize,
	InputType,
	LinkTarget,
	LinkType,
	ModalDisplayType,
	PluginStatus,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * UI Components Sample Plugin
 *
 * A gallery of every DocSpace plugin UI component, opened as a modal dialog
 * from the main-button "More" submenu.  Use it as the reference for what
 * each component looks like and how to wire its interactive props.
 *
 * Sections inside the modal
 * -------------------------
 * 1. Text & Labels  - IText, ILabel, ILink
 * 2. Inputs         - IInput (text + password), ITextArea, IComboBox
 * 3. Controls       - IButton, IIconButton, ICheckbox, IToggleButton
 * 4. Media & Layout - IImage, IFrame, ISkeleton, nested IBox
 *
 * API patterns demonstrated
 * -------------------------
 * - `Actions.updateProps` - every interactive component mutates its own
 *   module-level object and returns the full spread as `newProps`, so
 *   DocSpace re-renders it with the latest state on every change.
 * - `Actions.showToast`   - buttons and action-type links fire toasts.
 * - `Actions.showModal`   - main-button item opens the gallery.
 * - `Actions.closeModal`  - footer button and the close icon dismiss it.
 * - `IModalDialog.onLoad` - body/footer are assembled when the dialog opens.
 */

// --- Mutable state -------------------------------------------------------------
//
// Each interactive component captures one of these variables in its handler
// closure.  The handler reads the variable for the latest value, flips/sets
// it, writes it back to the component object (so future spreads are correct),
// and returns it inside `newProps`.

let inputText = "Hello, World!";
let passwordText = "";
let textAreaText = "Line one\nLine two\nLine three";
let checkboxChecked = false;
let toggleChecked = true;

// --- Section 1 - Text & Labels ------------------------------------------------

/**
 * IText
 *
 * The fundamental text renderer.  All styling is done through props - there
 * is no inner HTML.
 *
 * Key props: text, fontSize, fontWeight, isBold, isItalic, color, lineHeight,
 * truncate, textAlign.
 */

/**
 * ILabel
 *
 * A semantic label element, typically placed above an input field.
 *
 * Key props: text, isRequired (adds *), error (red colour), isInline,
 * truncate, htmlFor.
 */

/**
 * ILink
 *
 * Renders either a navigating anchor (type: page) or a purely clickable
 * element (type: action).
 *
 * Key props: text, href, type (LinkType.page | LinkType.action),
 * target (LinkTarget.*), onClick, fontSize, color.
 *
 * Note: type "action" ignores href and fires onClick instead.
 */

const textSection: IBox = {
	displayProp: "flex",
	flexDirection: "column",
	children: [
		// -- Section heading ------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "Text & Labels",
				fontSize: "15px",
				isBold: true,
			} as IText,
		},
		// -- IText variants -------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IText — heading (fontSize: 18px, fontWeight: 700)",
				fontSize: "18px",
				fontWeight: "700",
			} as IText,
		},
		{
			component: Components.text,
			props: {
				text: "IText — body (fontSize: 14px, default weight)",
				fontSize: "14px",
			} as IText,
		},
		{
			component: Components.text,
			props: {
				text: "IText — secondary (color: #6d7b8d, isItalic: true)",
				fontSize: "13px",
				color: "#6d7b8d",
				isItalic: true,
			} as IText,
		},
		// -- ILabel variants ------------------------------------------------------
		{
			component: Components.label,
			props: {
				text: "ILabel — required field (isRequired: true)",
				isRequired: true,
			} as ILabel,
		},
		{
			component: Components.label,
			props: {
				text: "ILabel — optional field",
			} as ILabel,
		},
		// -- ILink variants -------------------------------------------------------
		{
			component: Components.link,
			props: {
				text: "ILink — page link (type: page, target: _blank)",
				href: "https://www.onlyoffice.com",
				type: LinkType.page,
				target: LinkTarget.blank,
				fontSize: "14px",
			} as ILink,
		},
		{
			component: Components.link,
			props: {
				text: "ILink — action link (type: action, onClick → showToast)",
				type: LinkType.action,
				fontSize: "14px",
				onClick: (): IMessage => ({
					actions: [Actions.showToast],
					toastProps: [{ type: ToastType.info, title: "Action link clicked" }],
				}),
			} as ILink,
		},
	],
};

// --- Section 2 - Inputs -------------------------------------------------------

/**
 * IInput - text variant
 *
 * A single-line text field.  onChange receives the current string value.
 *
 * Key props: value, onChange (value: string), size (InputSize.*),
 * type (InputType.*), placeholder, scale, isDisabled, hasError, hasWarning.
 *
 * updateProps pattern
 * -------------------
 * 1. Update the module-level variable (keeps future spreads correct).
 * 2. Write the new value back onto the component object itself.
 * 3. Return `{ actions: [Actions.updateProps], newProps: { ...obj, value } }`.
 *    DocSpace reads `newProps` and re-renders the component.
 */
const textInput: IInput = {
	value: inputText,
	size: InputSize.base,
	scale: true,
	placeholder: "Type something…",
	onChange: (value: string): IMessage => {
		inputText = value;
		textInput.value = value;
		return {
			actions: [Actions.updateProps],
			newProps: { ...textInput, value } as IInput,
		};
	},
};

/**
 * IInput - password variant
 *
 * type: InputType.password masks the entered characters.
 */
const passwordInput: IInput = {
	value: passwordText,
	size: InputSize.base,
	scale: true,
	type: InputType.password,
	placeholder: "Enter password…",
	onChange: (value: string): IMessage => {
		passwordText = value;
		passwordInput.value = value;
		return {
			actions: [Actions.updateProps],
			newProps: { ...passwordInput, value } as IInput,
		};
	},
};

/**
 * ITextArea
 *
 * Multi-line text field.  onChange receives the full current string.
 *
 * Key props: value, onChange (value: string), placeholder, heightTextArea,
 * isDisabled, isReadOnly, maxLength, fontSize.
 */
const textArea: ITextArea = {
	value: textAreaText,
	placeholder: "Multi-line text…",
	heightTextArea: 80,
	onChange: (value: string): IMessage => {
		textAreaText = value;
		textArea.value = value;
		return {
			actions: [Actions.updateProps],
			newProps: { ...textArea, value } as ITextArea,
		};
	},
};

/**
 * IComboBox
 *
 * A drop-down selector.  onSelect receives the chosen IComboBoxItem.
 *
 * Key props: options (IComboBoxItem[]), selectedOption, onSelect (item),
 * scaled, isDisabled, dropDownMaxHeight, directionX, directionY.
 *
 * IComboBoxItem shape: { key: string; label: string; icon?: string;
 *                        disabled?: boolean }
 */
const comboOptions: IComboBoxItem[] = [
	{ key: "opt-a", label: "Option A" },
	{ key: "opt-b", label: "Option B" },
	{ key: "opt-c", label: "Option C" },
];

const comboBox: IComboBox = {
	options: comboOptions,
	selectedOption: comboOptions[0],
	scaled: true,
	onSelect: (item: IComboBoxItem): IMessage => {
		comboBox.selectedOption = item;
		return {
			actions: [Actions.updateProps],
			newProps: { ...comboBox, selectedOption: item } as IComboBox,
		};
	},
};

const inputsSection: IBox = {
	displayProp: "flex",
	flexDirection: "column",
	children: [
		// -- Section heading ------------------------------------------------------
		{
			component: Components.text,
			props: { text: "Inputs", fontSize: "15px", isBold: true } as IText,
		},
		// -- IInput text ----------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IInput — text (onChange → updateProps)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.input, props: textInput },
		// -- IInput password ------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IInput — password (type: InputType.password)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.input, props: passwordInput },
		// -- ITextArea ------------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "ITextArea — multi-line (onChange → updateProps)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.textArea, props: textArea },
		// -- IComboBox ------------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IComboBox — dropdown (onSelect → updateProps)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.comboBox, props: comboBox },
	],
};

// --- Section 3 - Controls -----------------------------------------------------

/**
 * IButton
 *
 * A labelled push button.  onClick receives no arguments.
 *
 * Key props: label, size (ButtonSize.*), primary, scale, isDisabled,
 * isLoading, withLoadingAfterClick, disableWhileRequestRunning, onClick.
 */

/**
 * IIconButton
 *
 * A clickable icon without a text label.
 *
 * Key props: iconName (SVG path or asset name), iconHoverName, iconClickName,
 * size (number, px), isFill, isStroke, color, hoverColor, isDisabled, onClick.
 */
const iconButton: IIconButton = {
	iconName: "docspace-icon.svg",
	size: 24,
	isFill: true,
	onClick: (): IMessage => ({
		actions: [Actions.showToast],
		toastProps: [{ type: ToastType.success, title: "IIconButton clicked" }],
	}),
};

/**
 * ICheckbox
 *
 * A boolean checkbox.  onChange receives NO arguments - read and negate the
 * component object's own isChecked from the closure.
 *
 * Key props: isChecked, label, onChange (), isDisabled, isIndeterminate,
 * truncate, hasError.
 */
const checkbox: ICheckbox = {
	label: "ICheckbox — toggle me (onChange → updateProps)",
	isChecked: checkboxChecked,
	onChange: (): IMessage => {
		checkboxChecked = !checkboxChecked;
		checkbox.isChecked = checkboxChecked;
		return {
			actions: [Actions.updateProps],
			newProps: { ...checkbox, isChecked: checkboxChecked } as ICheckbox,
		};
	},
};

/**
 * IToggleButton
 *
 * An on/off toggle switch.  onChange receives NO arguments - same closure
 * pattern as ICheckbox.
 *
 * Key props: isChecked, label, onChange (), isDisabled.
 */
const toggleButton: IToggleButton = {
	label: "IToggleButton — toggle me (onChange → updateProps)",
	isChecked: toggleChecked,
	onChange: (): IMessage => {
		toggleChecked = !toggleChecked;
		toggleButton.isChecked = toggleChecked;
		return {
			actions: [Actions.updateProps],
			newProps: { ...toggleButton, isChecked: toggleChecked } as IToggleButton,
		};
	},
};

const controlsSection: IBox = {
	displayProp: "flex",
	flexDirection: "column",
	children: [
		// -- Section heading ------------------------------------------------------
		{
			component: Components.text,
			props: { text: "Controls", fontSize: "15px", isBold: true } as IText,
		},
		// -- IButton row ----------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IButton — primary / secondary / disabled (onClick → showToast)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{
			component: Components.box,
			props: {
				displayProp: "flex",
				flexDirection: "row",
				children: [
					{
						component: Components.button,
						props: {
							label: "Primary",
							size: ButtonSize.normal,
							primary: true,
							onClick: (): IMessage => ({
								actions: [Actions.showToast],
								toastProps: [
									{ type: ToastType.success, title: "Primary button clicked" },
								],
							}),
						} as IButton,
					},
					{
						component: Components.button,
						props: {
							label: "Secondary",
							size: ButtonSize.normal,
							primary: false,
							onClick: (): IMessage => ({
								actions: [Actions.showToast],
								toastProps: [
									{ type: ToastType.info, title: "Secondary button clicked" },
								],
							}),
						} as IButton,
					},
					{
						component: Components.button,
						props: {
							label: "Disabled",
							size: ButtonSize.normal,
							primary: false,
							isDisabled: true,
							onClick: (): void => {},
						} as IButton,
					},
				],
			} as IBox,
		},
		// -- IIconButton ----------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IIconButton — icon-only button (onClick → showToast)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.iconButton, props: iconButton },
		// -- ICheckbox ------------------------------------------------------------
		{ component: Components.checkbox, props: checkbox },
		// -- IToggleButton --------------------------------------------------------
		{ component: Components.toggleButton, props: toggleButton },
	],
};

// --- Section 4 - Media & Layout -----------------------------------------------

/**
 * IImage
 *
 * Renders an <img> element.  In the DocSpace plugin context, relative asset
 * paths like "docspace-icon.svg" are resolved to the plugin's assets
 * directory at runtime.
 *
 * Key props: src, alt (required), width, height, style, className.
 */
const image: IImage = {
	src: "docspace-icon.svg",
	alt: "Plugin icon",
	width: "48px",
	height: "48px",
};

/**
 * IFrame
 *
 * Embeds an <iframe>.  Useful for showing external dashboards, maps, or any
 * third-party UI inside a plugin panel or modal.
 *
 * Key props: src, width, height, sandbox, name, id.
 *
 * Note: use the sandbox attribute to restrict iframe capabilities for safety.
 */
const frame: IFrame = {
	src: "about:blank",
	width: "100%",
	height: "64px",
	sandbox: "allow-scripts allow-same-origin",
};

/**
 * ISkeleton
 *
 * A loading-state placeholder rectangle.  width and height are required.
 *
 * Key props: width, height, borderRadius, className.
 *
 * Typical usage: render a skeleton in onLoad's initial body, then replace
 * it with the real content once async data arrives.
 */
const skeleton: ISkeleton = {
	width: "100%",
	height: "20px",
	borderRadius: "4px",
};

/**
 * IBox - nested layout
 *
 * IBox is the only layout primitive available to plugins.  It maps to a
 * styled <div> and supports a subset of CSS flexbox props.
 *
 * Key props: displayProp, flexDirection, alignItems, justifyContent,
 * flexProp (flex shorthand), widthProp, heightProp, paddingProp,
 * marginProp, backgroundProp, borderProp (string | IBorderProp),
 * overflowProp, children.
 */
const nestedBoxDemo: IBox = {
	displayProp: "flex",
	flexDirection: "row",
	borderProp: "1px solid #e0e0e0",
	paddingProp: "8px",
	children: [
		{
			component: Components.box,
			props: {
				displayProp: "flex",
				flexDirection: "column",
				flexProp: "1",
				paddingProp: "0 8px 0 0",
				children: [
					{
						component: Components.text,
						props: {
							text: "Left column",
							fontSize: "12px",
							isBold: true,
						} as IText,
					},
					{
						component: Components.text,
						props: {
							text: "flexProp: 1\nflexDirection: column",
							fontSize: "11px",
							color: "#6d7b8d",
						} as IText,
					},
				],
			} as IBox,
		},
		{
			component: Components.box,
			props: {
				displayProp: "flex",
				flexDirection: "column",
				flexProp: "1",
				paddingProp: "0 0 0 8px",
				children: [
					{
						component: Components.text,
						props: {
							text: "Right column",
							fontSize: "12px",
							isBold: true,
						} as IText,
					},
					{
						component: Components.text,
						props: {
							text: "borderProp on parent\npaddingProp on each child",
							fontSize: "11px",
							color: "#6d7b8d",
						} as IText,
					},
				],
			} as IBox,
		},
	],
};

const mediaSection: IBox = {
	displayProp: "flex",
	flexDirection: "column",
	children: [
		// -- Section heading ------------------------------------------------------
		{
			component: Components.text,
			props: { text: "Media & Layout", fontSize: "15px", isBold: true } as IText,
		},
		// -- IImage ---------------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: 'IImage — inline image (src: asset path, width/height in px)',
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.img, props: image },
		// -- IFrame ---------------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IFrame — embedded iframe (src, width, height, sandbox)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.iFrame, props: frame },
		// -- ISkeleton ------------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "ISkeleton — loading placeholder (width, height, borderRadius)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.skeleton, props: skeleton },
		// -- IBox layout ----------------------------------------------------------
		{
			component: Components.text,
			props: {
				text: "IBox — nested flex layout (row with two column children)",
				fontSize: "12px",
				color: "#6d7b8d",
			} as IText,
		},
		{ component: Components.box, props: nestedBoxDemo },
	],
};

// --- Modal dialog -------------------------------------------------------------

const galleryFooter: IBox = {
	children: [
		{
			component: Components.button,
			props: {
				label: "Close",
				size: ButtonSize.normal,
				primary: false,
				scale: true,
				onClick: (): IMessage => ({ actions: [Actions.closeModal] }),
			} as IButton,
		},
	],
};

const galleryDialog: IModalDialog = {
	displayType: ModalDisplayType.modal,
	dialogHeader: "Plugin Component Gallery",

	/** Placeholder - overwritten by onLoad before the dialog is shown. */
	dialogBody: { children: [] },

	withFooterBorder: true,

	onClose: (): IMessage => ({ actions: [Actions.closeModal] }),

	/**
	 * onLoad assembles the full body from the module-level section boxes.
	 * Because each interactive component object is mutated in place by its
	 * updateProps handler, re-opening the modal after interactions will
	 * display the latest state.
	 */
	onLoad: async () => ({
		newDialogHeader: "Plugin Component Gallery",
		newDialogBody: {
			displayProp: "flex",
			flexDirection: "column",
			overflowProp: "auto",
			children: [
				{ component: Components.box, props: textSection },
				{ component: Components.box, props: inputsSection },
				{ component: Components.box, props: controlsSection },
				{ component: Components.box, props: mediaSection },
			],
		} as IBox,
		newDialogFooter: galleryFooter,
	}),
};

// --- Main button item ---------------------------------------------------------

/**
 * The single entry point for this plugin.
 * Opens the gallery dialog when clicked from the main-button "More" submenu.
 */
const galleryItem: IMainButtonItem = {
	key: "ui-components-sample-gallery",
	label: "Sample: Component Gallery",
	icon: "docspace-icon.svg",
	onItemClick: (): IMessage => ({
		actions: [Actions.showModal],
		modalDialogProps: galleryDialog,
	}),
};

// --- Plugin class -------------------------------------------------------------

class UiComponentsSample implements IPlugin, IMainButtonPlugin {
	// -- IPlugin --------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addMainButtonItem(galleryItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// -- IMainButtonPlugin ----------------------------------------------------

	mainButtonItems: Map<string, IMainButtonItem> = new Map();

	addMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};

	getMainButtonItems = (): Map<string, IMainButtonItem> => this.mainButtonItems;

	updateMainButtonItem = (item: IMainButtonItem): void => {
		this.mainButtonItems.set(item.key, item);
	};
}

// --- Registration -------------------------------------------------------------

const plugin = new UiComponentsSample();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins.UiComponentsSample = plugin;

export default plugin;
