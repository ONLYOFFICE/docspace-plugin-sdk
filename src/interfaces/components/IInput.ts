/**
 * (c) Copyright Ascensio System SIA 2025
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

import { IMessage } from "../utils";

/**
 * The supported input sizes.
 *
 * @category Input
 */
export const enum InputSize {
  /**
   * Base size of the input field.
   */
  base = "base",
  /**
   * Middle size of the input field.
   */
  middle = "middle",
  /**
   * Big size of the input field.
   */
  big = "big",
  /**
   * Huge size of the input field.
   */
  huge = "huge",
  /**
   * Large size of the input field.
   */
  large = "large",
}

/**
 * The input autocomplete feature.
 *
 * @category Input
 */
export const enum InputAutocomplete {
  /**
   * Autocomplete is enabled.
   */
  on = "on",
  /**
   * Autocomplete is disabled.
   */
  off = "off",
}

/**
 * The supported input types.
 *
 * @category Input
 */
export const enum InputType {
  /**
   * Text input type.
   */
  text = "text",
  /**
   * Password input type.
   */
  password = "password",
}

/**
 * Input field for single-line strings.
 *
 * @category Input
 *
 * @categoryDescription State
 *
 * Here is a description of the category State.
 *
 * @categoryDescription Content
 *
 * Here is a description of the category Content.
 *
 * @categoryDescription Appearance
 *
 * Here is a description of the category Appearance.
 *
 * @categoryDescription Behavior
 *
 * Here is a description of the category Behavior.
 *
 * @example
 *
 * Search input with icon and hover effects
 *
 * ```typescript
 * const searchInput: IInput = {
 *   value: "",
 *   onChange: (value) => {
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         value
 *       }
 *     };
 *   },
 *   placeholder: "Search documents...",
 *   size: InputSize.middle,
 *   iconName: "search",
 *   iconSize: 16,
 *   iconColor: "#666666",
 *   hoverColor: "#333333",
 *   isIconFill: true,
 * }
 * ```
 *
 * @example
 *
 * Password input with validation and error handling
 *
 * ```typescript
 * const passwordInput: IInput = {
 *   value: "",
 *   type: InputType.password,
 *   onChange: (value) => {
 *     const hasError = value.length < 8;
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         value,
 *         hasError
 *       }
 *     };
 *   },
 *   onBlur: (value) => {
 *     if (value.length < 8) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Validation Error",
 *           type: "error",
 *           message: "Password must be at least 8 characters long"
 *         }]
 *       };
 *     }
 *   },
 *   placeholder: "Enter password",
 *   name: "password",
 *   autoComplete: InputAutocomplete.off,
 *   size: InputSize.big,
 *   isAutoFocused: true,
 *   hasError: false,
 *   maxLength: "32"
 * }
 * ```
 */
export interface IInput {
  /**
   * Defines the input value.
   *
   * @category Content
   */
  value: string;

  /**
   * Sets a function which is triggered whenever the input value is changed.
   * It is required when the input is not read-only.
   * The changed input value is passed to the function, which passes it back in the "value" parameter.
   *
   * @category Behavior
   */
  onChange: (value: string) => IMessage | void;

  /**
   * Defines the input HTML "name" property.
   *
   * @category Content
   */
  name?: string;

  /**
   * Defines the input placeholder text.
   *
   * @category Content
   */
  placeholder?: string;

  /**
   * Defines the default maximum length of the input value.
   *
   * @category Appearance
   */
  maxLength?: string;

  /**
   * Defines the input size.
   *
   * @category Appearance
   */
  size?: InputSize;

  /**
   * Specifies whether to focus the input field when initially rendered.
   *
   * @category sState
   */
  isAutoFocused?: boolean;

  /**
   * Specifies whether the input field displays the read-only content.
   *
   * @category State
   */
  isReadOnly?: boolean;

  /**
   * Specifies whether to indicate that there is an error in the input field.
   *
   * @category State
   */
  hasError?: boolean;

  /**
   * Specifies whether to indicate that there is a warning in the input field.
   *
   * @category State
   */
  hasWarning?: boolean;

  /**
   * Specifies if the input field is scaled or not.
   *
   * @category Appearance
   */
  scale?: boolean;

  /**
   * Defines the input HTML "autocomplete" property.
   *
   * @category Appearance
   */
  autoComplete?: InputAutocomplete;

  /**
   * Defines the input HTML "tabindex" property.
   *
   * @category Appearance
   */
  tabIndex?: number;

  /**
   * Defines the input text mask.
   *
   * @category Content
   */
  mask?: [];

  /**
   * Specifies that the field cannot be used (e.g the user is not authorized, or the changes are not saved).
   *
   * @category State
   */
  isDisabled?: boolean;

  /**
   * The input field type.
   *
   * @category Appearance
   */
  type?: InputType;

  /**
   * Specifies whether the characters are allowed to be added or deleted without changing the positions of the existing characters.
   *
   * @category Behavior
   */
  keepCharPositions?: boolean;

  /**
   * Sets a function which is triggered whenever the input field is blurred.
   *
   * @category Behavior
   */
  onBlur?: (value: string) => IMessage | void;

  /**
   * Sets a function which is triggered whenever the input field is focused.
   *
   * @category Behavior
   */
  onFocus?: (value: string) => IMessage | void;

  /**
   * Defines the input field components.
   *
   * @category Content
   */
  children?: Node[] | Node;

  /**
   * Defines the input icon size.
   *
   * @category Appearance
   */
  iconSize?: number;

  /**
   * Defines the path to the input icon.
   *
   * @category Appearance
   */
  iconName?: string;

  /**
   * Specifies if the icon fill is needed or not.
   *
   * @category Appearance
   */
  isIconFill?: boolean;

  /**
   * Defines the input icon color.
   *
   * @category Appearance
   */
  iconColor?: string;

  /**
   * Defines the icon color on hover action.
   *
   * @category Appearance
   */
  hoverColor?: string;

  /**
   * Defines the class name of the icon button.
   *
   * @category Appearance
   */
  iconButtonClassName?: string;

  /**
   * Sets a function which is triggered whenever the input icon is clicked.
   *
   * @category Behavior
   */
  onIconClick?: () => void;
}
