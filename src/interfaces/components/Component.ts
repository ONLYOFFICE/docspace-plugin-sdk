/*
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
 * @category Box Component
 *
 * Defines the box component.
 *
 * @param component - Defines the "box" component type.
 *
 * @param props - Defines the box component properties.
 *
 * @param contextName - Defines the box component context name that updates the component via React context.
 */
type BoxGroup = {
  component: Components.box;
  props: IBox;
  contextName?: string;
};

/**
 * @category Button Component
 *
 * @param component - Defines the "button" component type.
 *
 * @param props - Defines the button component properties.
 *
 * @param contextName - Defines the button component context name that updates the component via React context.
 */
type ButtonGroup = {
  component: Components.button;
  props: IButton;
  contextName?: string;
};

/**
 * @category Checkbox Component
 *
 * @param component - Defines the "checkbox" component type.
 *
 * @param props - Defines the checkbox component properties.
 *
 * @param contextName - Defines the checkbox component context name that updates the component via React context.
 */
type CheckboxGroup = {
  component: Components.checkbox;
  props: ICheckbox;
  contextName?: string;
};

/**
 * @category ComboBox Component
 *
 * @param component - Defines the "comboBox" component type.
 *
 * @param props - Defines the combo box component properties.
 *
 * @param contextName - Defines the combo box component context name that updates the component via React context.
 */
type ComboBoxGroup = {
  component: Components.comboBox;
  props: IComboBox;
  contextName?: string;
};

/**
 * @category IFrame Component
 *
 * @param component - Defines the "iFrame" component type.
 *
 * @param props - Defines the iFrame component properties.
 *
 * @param contextName - Defines the iFrame component context name that updates the component via React context.
 */
type IFrameGroup = {
  component: Components.iFrame;
  props: IFrame;
  contextName?: string;
};

/**
 * @category Image Component
 *
 * @param component - Defines the "img" component type.
 *
 * @param props - Defines the image component properties.
 *
 * @param contextName - Defines the image component context name that updates the component via React context.
 */
type ImageGroup = {
  component: Components.img;
  props: IImage;
  contextName?: string;
};

/**
 * @category Input Component
 *
 * @param component - Defines the "input" component type.
 *
 * @param props - Defines the input component properties.
 *
 * @param contextName - Defines the input component context name that updates the component via React context.
 */
type InputGroup = {
  component: Components.input;
  props: IInput;
  contextName?: string;
};

/**
 * @category Label Component
 *
 * @param component - Defines the "label" component type.
 *
 * @param props - Defines the label component properties.
 *
 * @param contextName - Defines the label component context name that updates the component via React context.
 */
type LabelGroup = {
  component: Components.label;
  props: ILabel;
  contextName?: string;
};

/**
 * @category Skeleton Component
 *
 * @param component - Defines the "skeleton" component type.
 *
 * @param props - Defines the skeleton component properties.
 *
 * @param contextName - Defines the skeleton component context name that updates the component via React context.
 */
type SkeletonGroup = {
  component: Components.skeleton;
  props: ISkeleton;
  contextName?: string;
};

/**
 * @category Text Component
 *
 * @param component - Defines the "text" component type.
 *
 * @param props - Defines the text component properties.
 *
 * @param contextName - Defines the text component context name that updates the component via React context.
 */
type TextGroup = {
  component: Components.text;
  props: IText;
  contextName?: string;
};

/**
 * @category TextArea Component
 *
 * Defines the textarea component.
 *
 * @param component - Defines the "textArea" component type.
 *
 * @param props - Defines the textarea component properties.
 *
 * @param contextName - Defines the textarea component context name that updates the component via React context.
 */
type TextAreaGroup = {
  component: Components.textArea;
  props: ITextArea;
  contextName?: string;
};

/**
 * @category ToggleButton Component
 *
 * @param component - Defines the "toggleButton" component type.
 *
 * @param props - Defines the toggle button component properties.
 *
 * @param contextName - Defines the toggle button component context name that updates the component via React context.
 */
type ToggleButtonGroup = {
  component: Components.toggleButton;
  props: IToggleButton;
  contextName?: string;
};

/**
 * @category Component
 *
 * A component that is used to add components into Box.
 * Only components that are embedded into DOM can be wrapped (toast, modal dialog, etc. cannot be wrapped).
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
