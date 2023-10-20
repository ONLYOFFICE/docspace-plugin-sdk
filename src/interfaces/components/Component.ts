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
 */
type BoxGroup = {
  /**
   * Defines the "box" component type.
   */
  component: Components.box;

  /**
   * Defines the box component properties.
   */
  props: IBox;

  /**
   * Defines the box component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the button component.
 */
type ButtonGroup = {
  /**
   * Defines the "button" component type.
   */
  component: Components.button;

  /**
   * Defines the button component properties.
   */
  props: IButton;

  /**
   * Defines the button component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the checkbox component.
 */
type CheckboxGroup = {
  /**
   * Defines the "checkbox" component type.
   */
  component: Components.checkbox;

  /**
   * Defines the checkbox component properties.
   */
  props: ICheckbox;

  /**
   * Defines the checkbox component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the combo box component.
 */
type ComboBoxGroup = {
  /**
   * Defines the "comboBox" component type.
   */
  component: Components.comboBox;

  /**
   * Defines the combo box component properties.
   */
  props: IComboBox;

  /**
   * Defines the combo box component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the iFrame component.
 */
type IFrameGroup = {
  /**
   * Defines the "iFrame" component type.
   */
  component: Components.iFrame;

  /**
   * Defines the iFrame component properties.
   */
  props: IFrame;

  /**
   * Defines the iFrame component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the image component.
 */
type ImageGroup = {
  /**
   * Defines the "img" component type.
   */
  component: Components.img;

  /**
   * Defines the image component properties.
   */
  props: IImage;

  /**
   * Defines the image component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the input component.
 */
type InputGroup = {
  /**
   * Defines the "input" component type.
   */
  component: Components.input;

  /**
   * Defines the input component properties.
   */
  props: IInput;

  /**
   * Defines the input component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the label component.
 */
type LabelGroup = {
  /**
   * Defines the "label" component type.
   */
  component: Components.label;

  /**
   * Defines the label component properties.
   */
  props: ILabel;

  /**
   * Defines the label component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the skeleton component.
 */
type SkeletonGroup = {
  /**
   * Defines the "skeleton" component type.
   */
  component: Components.skeleton;

  /**
   * Defines the skeleton component properties.
   */
  props: ISkeleton;

  /**
   * Defines the skeleton component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the text component.
 */
type TextGroup = {
  /**
   * Defines the "text" component type.
   */
  component: Components.text;

  /**
   * Defines the text component properties.
   */
  props: IText;

  /**
   * Defines the text component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the textarea component.
 */
type TextAreaGroup = {
  /**
   * Defines the "textArea" component type.
   */
  component: Components.textArea;

  /**
   * Defines the textarea component properties.
   */
  props: ITextArea;

  /**
   * Defines the textarea component context name that updates the component via React context.
   */
  contextName?: string;
};

/**
 * Defines the toggle button component.
 */
type ToggleButtonGroup = {
  /**
   * Defines the "toggleButton" type.
   */
  component: Components.toggleButton;

  /**
   * Defines the toggle button properties.
   */
  props: IToggleButton;

  /**
   * Defines the toggle button context name that updates the component via React context.
   */
  contextName?: string;
};

/**
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
