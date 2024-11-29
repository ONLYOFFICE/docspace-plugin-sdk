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

import { IMessage } from "../utils";

/**
 * @module Components
 *
 * @category Input Component
 *
 * The supported input sizes.
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
 * @module Components
 * @category Input Component
 *
 * The input autocomplete feature.
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
 * @module Components
 * @category Input Component
 *
 * The supported input types.
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
 * @module Components
 * @category Input Component
 *
 * Input field for single-line strings.
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
   */
  value: string;

  /**
   * Sets a function which is triggered whenever the input value is changed.
   * It is required when the input is not read-only.
   * The changed input value is passed to the function, which passes it back in the "value" parameter.
   */
  onChange: (value: string) => IMessage | void;

  /**
   * Defines the input HTML "name" property.
   */
  name?: string;

  /**
   * Defines the input placeholder text.
   */
  placeholder?: string;

  /**
   * Defines the default maximum length of the input value.
   */
  maxLength?: string;

  /**
   * Defines the input size.
   */
  size?: InputSize;

  /**
   * Specifies whether to focus the input field when initially rendered.
   */
  isAutoFocused?: boolean;

  /**
   * Specifies whether the input field displays the read-only content.
   */
  isReadOnly?: boolean;

  /**
   * Specifies whether to indicate that there is an error in the input field.
   */
  hasError?: boolean;

  /**
   * Specifies whether to indicate that there is a warning in the input field.
   */
  hasWarning?: boolean;

  /**
   * Specifies if the input field is scaled or not.
   */
  scale?: boolean;

  /**
   * Defines the input HTML "autocomplete" property.
   */
  autoComplete?: InputAutocomplete;

  /**
   * Defines the input HTML "tabindex" property.
   */
  tabIndex?: number;

  /**
   * Defines the input text mask.
   */
  mask?: [];

  /**
   * Specifies that the field cannot be used (e.g the user is not authorized, or the changes are not saved).
   */
  isDisabled?: boolean;

  /**
   * The input field type.
   */
  type?: InputType;

  /**
   * Specifies whether the characters are allowed to be added or deleted without changing the positions of the existing characters.
   */
  keepCharPositions?: boolean;

  /**
   * Sets a function which is triggered whenever the input field is blurred.
   */
  onBlur?: (value: string) => IMessage | void;

  /**
   * Sets a function which is triggered whenever the input field is focused.
   */
  onFocus?: (value: string) => IMessage | void;

  /**
   * Defines the input field components.
   */
  children?: Node[] | Node;

  /**
   * Defines the input icon size.
   */
  iconSize?: number;

  /**
   * Defines the path to the input icon.
   */
  iconName?: string;

  /**
   * Specifies if the icon fill is needed or not.
   */
  isIconFill?: boolean;

  /**
   * Defines the input icon color.
   */
  iconColor?: string;

  /**
   * Defines the icon color on hover action.
   */
  hoverColor?: string;

  /**
   * Defines the class name of the icon button.
   */
  iconButtonClassName?: string;

  /**
   * Sets a function which is triggered whenever the input icon is clicked.
   */
  onIconClick?: () => void;
}
