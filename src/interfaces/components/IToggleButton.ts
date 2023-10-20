import { IMessage } from "../utils";
/**
 * Custom toggle button input.
 */
export interface IToggleButton {
  /**
   * Defines the toggle button label.
   */
  label?: string;

  /**
   * Specifies whether the toggle button is enabled.
   */
  isChecked: boolean;

  /**
   * Sets a function which is triggered whenever the toggle button is clicked.
   */
  onChange: () => IMessage | void;

  /**
   * Specifies whether the toggle button is disabled.
   */
  isDisabled?: boolean;

  /**
   * Defines the toggle button CSS style.
   */
  style?: any;
}
