import { IMessage } from "../utils";

/**
 * Custom checkbox input.
 */
export interface ICheckbox {
  /**
   * Sets the checked state of the checkbox.
   */
  isChecked: boolean;

  /**
   * Sets a function which is triggered whenever the checkbox input is clicked.
   */
  onChange: () => IMessage | void;

  /**
   * Defines the checkbox input label.
   */
  label?: string;

  /**
   * Specifies if the word wrapping is desabled or not.
   */
  truncate?: boolean;

  /**
   * Defines the checkbox tab index.
   */
  tabIndex?: number;

  /**
   * Specifies whether a notification will be sent if an error occurs.
   */
  hasError?: boolean;

  /**
   * Defines the HTML "name" property.
   */
  name?: string;

  /**
   * Defines the checkbox input value.
   */
  value?: string;

  /**
   * Specifies whether the checkbox state will be displayed as a black rectangle in the checkbox when it is set to true.
   */
  isIndeterminate?: boolean;

  /**
   * Specifies if the checkbox input is disabled.
   */
  isDisabled?: boolean;

  /**
   * Defines the checkbox input title.
   */
  title?: string;
}
