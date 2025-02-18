/**
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
 *
 * @license
 */

import { IMessage } from "../utils";

/**
 * Custom checkbox.
 *
 * @category Checkbox
 *
 * @categoryDescription State
 *
 * Here is a description of the category State.
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
 * Privacy policy checkbox with submit button state control
 *
 * ```typescript
 * const privacyCheckbox: ICheckbox = {
 *   isChecked: false,
 *   label: "I agree to the Privacy Policy",
 *   onChange: () => {
 *     return {
 *       actions: [Actions.updateProps, Actions.updateContext],
 *       newProps: {
 *         isChecked: !privacyCheckbox.isChecked
 *       },
 *       contextProps: [{
 *         name: "submitButton",
 *         props: {
 *           isDisabled: !privacyCheckbox.isChecked
 *         }
 *       }]
 *     };
 *   },
 *   truncate: false,
 *   tabIndex: 1,
 *   hasError: false,
 *   name: "privacy-policy",
 *   value: "accepted",
 *   isIndeterminate: false,
 *   isDisabled: false,
 *   title: "Privacy Policy Agreement"
 * }
 * ```
 */
export interface ICheckbox {
  /**
   * Sets the checked state of the checkbox
   *
   * @category State
   */
  isChecked: boolean;

  /**
   * Defines the checkbox label
   *
   * @category Content
   */
  label?: string;

  /**
   * Sets a function which is triggered whenever the checkbox input is clicked
   *
   * @category Behavior
   */
  onChange: () => IMessage | void;

  /**
   * Specifies if the word wrapping is disabled or not
   *
   * @category Appearance
   */
  truncate?: boolean;

  /**
   * Defines the checkbox tab index
   *
   * @category Appearance
   */
  tabIndex?: number;

  /**
   * Specifies whether a notification will be sent if an error occurs
   *
   * @category State
   */
  hasError?: boolean;

  /**
   * Defines the HTML "name" property
   *
   * @category Content
   */
  name?: string;

  /**
   * Defines the checkbox input value
   *
   * @category State
   */
  value?: string;

  /**
   * Specifies whether the checkbox state will be displayed as a black rectangle in the checkbox when it is set to true
   *
   * @category State
   */
  isIndeterminate?: boolean;

  /**
   * Specifies if the checkbox input is disabled
   *
   * @category State
   */
  isDisabled?: boolean;

  /**
   * Defines the checkbox input title
   *
   * @category Appearance
   */
  title?: string;
}
