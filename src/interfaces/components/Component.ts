/**
 * (c) Copyright Ascensio System SIA 2024
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
 *
 * @license
 */

import { Components } from "../../enums";

import { IBox } from "./IBox";
import { IButton } from "./IButton";
import { ICheckbox } from "./ICheckbox";
import { IComboBox } from "./IComboBox";
import { IFrame } from "./IFrame";
import { IImage } from "./IImage";
import { IInput } from "./IInput";
import { ILabel } from "./ILabel";
import { ISkeleton } from "./ISkeleton";
import { IText } from "./IText";
import { ITextArea } from "./ITextArea";
import { IToggleButton } from "./IToggleButton";

/**
 * Defines the box component.
 *
 * @category Box
 *
 * @example
 * ```typescript
 * import { IBox, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const box: IBox = {
 *   widthProp: "200px",
 *   paddingProp: "16px",
 *   displayProp: "flex",
 *   flexDirection: "column",
 *   alignItems: "center",
 *   borderProp: {
 *     color: "#333333",
 *     radius: "8px",
 *     style: "solid",
 *     width: "1px"
 *   },
 *   backgroundProp: "#f8f9f9"
 * };
 *
 * const boxGroup: Component = {
 *   component: Components.box,
 *   props: box,
 *   contextName: "container"
 * };
 * ```
 */
type BoxGroup = {
  /** Defines the "box" component type */
  component: Components.box;
  /** Defines the box component properties */
  props: IBox;
  /** Defines the box component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the button component.
 *
 * @category Button
 *
 * @example
 * ```typescript
 * import { IButton, Components, Components, ButtonSize } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const button: IButton = {
 *   size: ButtonSize.normal,
 *   label: "Click me!",
 *   onClick: () => {
 *     console.log("Button clicked!");
 *   },
 * };
 *
 * const buttonGroup: Component = {
 *   component: Components.button,
 *   props: button,
 *   contextName: "button",
 * };
 * ```
 */
type ButtonGroup = {
  /** Defines the "button" component type */
  component: Components.button;
  /** Defines the button component properties */
  props: IButton;
  /** Defines the button component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the checkbox component.
 *
 * @category Checkbox
 *
 * @example
 * ```typescript
 * import { ICheckbox, Components, Component, Actions } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const checkbox: ICheckbox = {
 *   isChecked: false,
 *   label: "Enable notifications",
 *   onChange: () => {
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         isChecked: !checkbox.isChecked
 *       }
 *     };
 *   },
 *   truncate: false,
 *   tabIndex: 1,
 *   hasError: false,
 *   name: "notifications",
 *   value: "enabled",
 *   isDisabled: false,
 *   title: "Notification preferences"
 * };
 *
 * const checkboxGroup: Component = {
 *   component: Components.checkbox,
 *   props: checkbox,
 *   contextName: "notificationToggle"
 * };
 * ```
 */
type CheckboxGroup = {
  /** Defines the "checkbox" component type */
  component: Components.checkbox;
  /** Defines the checkbox component properties */
  props: ICheckbox;
  /** Defines the checkbox component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the combo box component.
 *
 * @category ComboBox
 *
 * @example
 * ```typescript
 * import { IComboBox, IComboBoxItem, Components, Component, Actions } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const comboBox: IComboBox = {
 *   options: [
 *     { key: "light", label: "Light Theme", icon: "theme-light.svg" },
 *     { key: "dark", label: "Dark Theme", icon: "theme-dark.svg" },
 *     { key: "system", label: "System Theme", icon: "theme-auto.svg" }
 *   ],
 *   selectedOption: { key: "light", label: "Light Theme", icon: "theme-light.svg" },
 *   onSelect: (item) => {},
 *   scaled: true,
 *   directionX: "right",
 *   directionY: "bottom",
 *   displayType: "default",
 *   modernView: true
 * };
 *
 * const comboBoxGroup: Component = {
 *   component: Components.comboBox,
 *   props: comboBox,
 *   contextName: "themeSelector"
 * };
 * ```
 */
type ComboBoxGroup = {
  /** Defines the "comboBox" component type */
  component: Components.comboBox;
  /** Defines the combo box component properties */
  props: IComboBox;
  /** Defines the combo box component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the iframe component.
 *
 * @category Frame
 *
 * @example
 * ```typescript
 * import { IFrame, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const iframe: IFrame = {
 *   src: "https://example.com/embedded-content",
 *   width: "100%",
 *   height: "500px",
 *   name: "content-frame",
 *   sandbox: "allow-scripts allow-same-origin",
 *   id: "content-iframe",
 *   style: {
 *     border: "1px solid #eceef1",
 *     borderRadius: "4px",
 *     backgroundColor: "#ffffff"
 *   }
 * };
 *
 * const iframeGroup: Component = {
 *   component: Components.iFrame,
 *   props: iframe,
 *   contextName: "embeddedContent"
 * };
 * ```
 */
type IFrameGroup = {
  /** Defines the "iFrame" component type */
  component: Components.iFrame;
  /** Defines the iFrame component properties */
  props: IFrame;
  /** Defines the iFrame component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the image component.
 *
 * @category Image
 *
 * @example
 * ```typescript
 * import { IImage, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const image: IImage = {
 *   src: "https://example.com/plugin-banner.png",
 *   alt: "Plugin Banner",
 *   width: "100%",
 *   height: "auto",
 *   name: "plugin-banner",
 *   id: "banner-image",
 *   style: {
 *     borderRadius: "8px",
 *     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
 *     maxWidth: "600px"
 *   }
 * };
 *
 * const imageGroup: Component = {
 *   component: Components.img,
 *   props: image,
 *   contextName: "bannerImage"
 * };
 * ```
 */
type ImageGroup = {
  /** Defines the "img" component type */
  component: Components.img;
  /** Defines the image component properties */
  props: IImage;
  /** Defines the image component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the input component.
 *
 * @category Input
 *
 * @example
 * ```typescript
 * import { IInput, Components, Component, Actions, InputSize } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const input: IInput = {
 *   value: "",
 *   onChange: (value) => {},
 *   placeholder: "Enter text...",
 *   size: InputSize.middle,
 *   name: "search-input",
 *   isAutoFocused: true,
 *   iconName: "search",
 *   iconSize: 16,
 *   scale: true,
 *   onIconClick: () => {
 *     console.log("Search icon clicked");
 *   }
 * };
 *
 * const inputGroup: Component = {
 *   component: Components.input,
 *   props: input,
 *   contextName: "searchInput"
 * };
 * ```
 */
type InputGroup = {
  /** Defines the "input" component type */
  component: Components.input;
  /** Defines the input component properties */
  props: IInput;
  /** Defines the input component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the label component.
 *
 * @category Label
 *
 * @example
 * ```typescript
 * import { ILabel, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const label: ILabel = {
 *   text: "Plugin Settings",
 *   isRequired: true,
 *   error: false,
 *   isInline: false,
 *   title: "Configure plugin settings",
 *   htmlFor: "settings-form",
 *   display: "block",
 *   truncate: true
 * };
 *
 * const labelGroup: Component = {
 *   component: Components.label,
 *   props: label,
 *   contextName: "settingsLabel"
 * };
 * ```
 */
type LabelGroup = {
  /** Defines the "label" component type */
  component: Components.label;
  /** Defines the label component properties */
  props: ILabel;
  /** Defines the label component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the skeleton component.
 *
 * @category Skeleton
 *
 * @example
 * ```typescript
 * import { ISkeleton, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const skeleton: ISkeleton = {
 *   width: "100%",
 *   height: "200px",
 *   borderRadius: "8px"
 * };
 *
 * const skeletonGroup: Component = {
 *   component: Components.skeleton,
 *   props: skeleton,
 *   contextName: "loadingState"
 * };
 * ```
 */
type SkeletonGroup = {
  /** Defines the "skeleton" component type */
  component: Components.skeleton;
  /** Defines the skeleton component properties */
  props: ISkeleton;
  /** Defines the skeleton component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the text component.
 *
 * @category Text
 *
 * @example
 * ```typescript
 * import { IText, Components, Component } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const text: IText = {
 *   text: "Welcome to DocSpace Plugin",
 *   fontSize: "18px",
 *   fontWeight: 500,
 *   lineHeight: "24px",
 *   color: "#333333",
 *   isBold: false,
 *   textAlign: "left",
 *   truncate: true,
 *   title: "Welcome to DocSpace Plugin"
 * };
 *
 * const textGroup: Component = {
 *   component: Components.text,
 *   props: text,
 *   contextName: "welcomeText"
 * };
 * ```
 */
type TextGroup = {
  /** Defines the "text" component type */
  component: Components.text;
  /** Defines the text component properties */
  props: IText;
  /** Defines the text component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the textarea component.
 *
 * @category TextArea
 *
 * @example
 * ```typescript
 * import { ITextArea, Components, Component, Actions } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const textarea: ITextArea = {
 *   value: "",
 *   onChange: (value) => {},
 *   placeholder: "Enter description...",
 *   heightTextArea: 150,
 *   fontSize: 14,
 *   isFullHeight: true,
 *   heightScale: true,
 *   maxLength: 1000,
 *   hasNumeration: false
 * };
 *
 * const textAreaGroup: Component = {
 *   component: Components.textArea,
 *   props: textarea,
 *   contextName: "descriptionEditor"
 * };
 * ```
 */
type TextAreaGroup = {
  /** Defines the "textArea" component type */
  component: Components.textArea;
  /** Defines the textarea component properties */
  props: ITextArea;
  /** Defines the textarea component context name that updates the component via React context */
  contextName?: string;
};

/**
 * Defines the toggle button component.
 *
 * @category ToggleButton
 *
 * @example
 * ```typescript
 * import { IToggleButton, Components, Component, Actions } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const toggleButton: IToggleButton = {
 *   label: "Auto-sync",
 *   isChecked: true,
 *   onChange: () => {},
 *   style: {
 *     backgroundColor: "#f8f9f9",
 *     padding: "8px 12px",
 *     borderRadius: "4px"
 *   }
 * };
 *
 * const toggleButtonGroup: Component = {
 *   component: Components.toggleButton,
 *   props: toggleButton,
 *   contextName: "syncToggle"
 * };
 * ```
 */
type ToggleButtonGroup = {
  /** Defines the "toggleButton" component type */
  component: Components.toggleButton;
  /** Defines the toggle button component properties */
  props: IToggleButton;
  /** Defines the toggle button component context name that updates the component via React context */
  contextName?: string;
};

/**
 * A component that is used to add components into Box.
 * Only components that are embedded into DOM can be wrapped (toast, modal dialog, etc. cannot be wrapped).
 *
 * @category Component
 *
 * @example
 * ```typescript
 * import {
 *   IBox,
 *   IText,
 *   IButton,
 *   ButtonSize,
 *   Components,
 *   Component,
 *   Actions
 *   IToast,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const title: IText = {
 *   text: "Plugin Settings",
 *   fontSize: "18px",
 *   fontWeight: 600,
 * };
 *
 * const button: IButton = {
 *   label: "Save Changes",
 *   onClick: () => {
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         title: "Success",
 *         type: ToastType.success,
 *       }]
 *     };
 *   },
 *   size: ButtonSize.normal,
 *   primary: true
 * };
 *
 * // Create a settings panel with text and button
 * const container: IBox = {
 *   paddingProp: "16px",
 *   backgroundProp: "#f8f9f9",
 *   children: [
 *     {
 *       component: Components.text,
 *       props: title
 *     },
 *     {
 *       component: Components.button,
 *       props: button
 *     }
 *   ]
 * };
 *
 * // Combine components into a layout
 * const settingsPanel: Component = {
 *   component: Components.box,
 *   props: container
 * };
 * ```
 */
type Component =
  | BoxGroup
  | ButtonGroup
  | CheckboxGroup
  | ComboBoxGroup
  | IFrameGroup
  | ImageGroup
  | InputGroup
  | LabelGroup
  | SkeletonGroup
  | TextGroup
  | TextAreaGroup
  | ToggleButtonGroup;

export {
  Component,
  BoxGroup,
  ButtonGroup,
  CheckboxGroup,
  ComboBoxGroup,
  IFrameGroup,
  ImageGroup,
  InputGroup,
  LabelGroup,
  SkeletonGroup,
  TextGroup,
  TextAreaGroup,
  ToggleButtonGroup,
};
