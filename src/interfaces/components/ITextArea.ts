import { IMessage } from "../utils";
/**
 * Custom textarea.
 */
export interface ITextArea {
  /**
   * Defines the textarea value.
   */
  value: string;

  /**
   * Sets a function which is triggered whenever the textarea is changed.
   */
  onChange: (value: string) => IMessage | void;

  /**
   * Defines the textarea placeholder.
   */
  placeholder?: string;

  /**
   * Specifies whether the textarea is disabled.
   */
  isDisabled?: boolean;

  /**
   * Specifies whether the textarea displays the read-only content.
   */
  isReadOnly?: boolean;

  /**
   * Specifies whether to indicate that there is an error in the textarea.
   */
  hasError?: boolean;

  /**
   * Defines the maximum value length in the textarea.
   */
  maxLength?: number;

  /**
   * Defines the textarea HTML "name" property.
   */
  name?: string;

  /**
   * Defines the textarea HTML "tabindex" property.
   */
  tabIndex?: number;

  /**
   * Defines the textarea font size.
   */
  fontSize?: number;

  /**
   * Defines the textarea height.
   */
  heightTextArea?: number;

  /**
   * Specifies whether the textarea is prettified for JSON and the line numeration is added.
   */
  isJSONField?: boolean;

  /**
   * Specifies whether the "Copy" icon is displayed in the textarea.
   */
  enableCopy?: boolean;

  /**
   * Specifies whether the numeration is inserted into the textarea.
   */
  hasNumeration?: boolean;

  /**
   * Specifies whether the height of the textarea content is calculated depending on the number of lines.
   */
  isFullHeight?: boolean;

  /**
   * Specifies whether the textarea has a height scale.
   */
  heightScale?: boolean;

  /**
   * Specifies whether the toast / information text will be displayed when copying.
   */
  copyInfoText?: boolean;
}
