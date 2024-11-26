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
 * @category Checkbox Component
 *
 * Custom checkbox input.
 *
 * @param isChecked - Sets the checked state of the checkbox.
 *
 * @param onChange - Sets a function which is triggered whenever the checkbox input is clicked.
 *
 * @param label - Defines the checkbox input label.
 *
 * @param truncate - Specifies if the word wrapping is desabled or not.
 *
 * @param tabIndex - Defines the checkbox tab index.
 *
 * @param hasError - Specifies whether a notification will be sent if an error occurs.
 *
 * @param name - Defines the HTML "name" property.
 *
 * @param value - Defines the checkbox input value.
 *
 * @param isIndeterminate - Specifies whether the checkbox state will be displayed as a black rectangle in the checkbox when it is set to true.
 *
 * @param isDisabled - Specifies if the checkbox input is disabled.
 *
 * @param title - Defines the checkbox input title.
 */
export interface ICheckbox {
  isChecked: boolean;
  onChange: () => IMessage | void;
  label?: string;
  truncate?: boolean;
  tabIndex?: number;
  hasError?: boolean;
  name?: string;
  value?: string;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  title?: string;
}
