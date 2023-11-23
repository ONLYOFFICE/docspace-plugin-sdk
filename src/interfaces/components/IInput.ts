/*
* (c) Copyright Ascensio System SIA 2023
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
 * The supported input sizes.
 */
export const enum InputSize {
  base = "base",
  middle = "middle",
  big = "big",
  huge = "huge",
  large = "large",
}

/**
 * The input autocomplete feature.
 */
export const enum InputAutocomplete {
  on = "on",
  off = "off",
}

/**
 * The supported input types.
 */
export const enum InputType {
  text = "text",
  password = "password",
}

/**
 * Input field for single-line strings.
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
