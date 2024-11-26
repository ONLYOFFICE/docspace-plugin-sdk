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
 * @category Toggle Button Component
 *
 * Custom toggle button input.
 *
 * @param label - Defines the toggle button label.
 *
 * @param isChecked - Specifies whether the toggle button is enabled.
 *
 * @param onChange - Sets a function which is triggered whenever the toggle button is clicked.
 *
 * @param isDisabled - Specifies whether the toggle button is disabled.
 *
 * @param style - Defines the toggle button CSS style.
 */
export interface IToggleButton {
  label?: string;
  isChecked: boolean;
  onChange: () => IMessage | void;
  isDisabled?: boolean;
  style?: any;
}
