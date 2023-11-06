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
