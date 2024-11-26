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
 * @category Input Component
 *
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
 * @category Input Component
 *
 * The input autocomplete feature.
 */
export const enum InputAutocomplete {
  on = "on",
  off = "off",
}

/**
 * @category Input Component
 *
 * The supported input types.
 */
export const enum InputType {
  text = "text",
  password = "password",
}

/**
 * @category Input Component
 *
 * Input field for single-line strings.
 *
 * @param value - Defines the input value.
 *
 * @param onChange - Sets a function which is triggered whenever the input value is changed.
 * It is required when the input is not read-only.
 * The changed input value is passed to the function, which passes it back in the "value" parameter.
 *
 * @param name - Defines the input HTML "name" property.
 *
 * @param placeholder - Defines the input placeholder text.
 *
 * @param maxLength - Defines the default maximum length of the input value.
 *
 * @param size - Defines the input size.
 *
 * @param isAutoFocused - Specifies whether to focus the input field when initially rendered.
 *
 * @param isReadOnly - Specifies whether the input field displays the read-only content.
 *
 * @param hasError - Specifies whether to indicate that there is an error in the input field.
 *
 * @param hasWarning - Specifies whether to indicate that there is a warning in the input field.
 *
 * @param scale - Specifies if the input field is scaled or not.
 *
 * @param autoComplete - Defines the input HTML "autocomplete" property.
 *
 * @param tabIndex - Defines the input HTML "tabindex" property.
 *
 * @param mask - Defines the input text mask.
 *
 * @param isDisabled - Specifies that the field cannot be used (e.g the user is not authorized, or the changes are not saved).
 *
 * @param type - The input field type.
 *
 * @param keepCharPositions - Specifies whether the characters are allowed to be added or deleted without changing the positions of the existing characters.
 *
 * @param onBlur - Sets a function which is triggered whenever the input field is blurred.
 *
 * @param onFocus - Sets a function which is triggered whenever the input field is focused.
 *
 * @param children - Defines the input field components.
 *
 * @param iconSize - Defines the input icon size.
 *
 * @param iconName - Defines the path to the input icon.
 *
 * @param isIconFill - Specifies if the icon fill is needed or not.
 *
 * @param iconColor - Defines the input icon color.
 *
 * @param hoverColor - Defines the icon color on hover action.
 *
 * @param iconButtonClassName - Defines the class name of the icon button.
 *
 * @param onIconClick - Sets a function which is triggered whenever the input icon is clicked.
 */
export interface IInput {
  value: string;
  onChange: (value: string) => IMessage | void;
  name?: string;
  placeholder?: string;
  maxLength?: string;
  size?: InputSize;
  isAutoFocused?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  scale?: boolean;
  autoComplete?: InputAutocomplete;
  tabIndex?: number;
  mask?: [];
  isDisabled?: boolean;
  type?: InputType;
  keepCharPositions?: boolean;
  onBlur?: (value: string) => IMessage | void;
  onFocus?: (value: string) => IMessage | void;
  children?: Node[] | Node;
  iconSize?: number;
  iconName?: string;
  isIconFill?: boolean;
  iconColor?: string;
  hoverColor?: string;
  iconButtonClassName?: string;
  onIconClick?: () => void;
}
