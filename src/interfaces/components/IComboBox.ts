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
 * Custom combo box option.
 *
 * @example
 *
 * Basic language option with icon
 *
 * ```typescript
 * const languageOption: IComboBoxItem = {
 *   key: "en-US",
 *   label: "English (US)",
 *   icon: "language-en.svg",
 *   disabled: false
 * }
 * ```
 *
 * @category ComboBox
 *
 * @categoryDescription Content
 *
 * Here is a description of the category Content.
 *
 * @categoryDescription State
 *
 * Here is a description of the category State.
 */
export interface IComboBoxItem {
  /**
   * Unique identifier for the option
   *
   * @category Options
   */
  key: string;

  /**
   * Display text for the option
   *
   * @category Content
   */
  label: string;

  /**
   * Optional icon for the option
   *
   * @category Content
   */
  icon?: string;

  /**
   * Specifies if the combo box option is disabled or not
   *
   * @category State
   */
  disabled?: boolean;
}

/**
 * Custom combo box input.
 *
 * @example
 *
 * Multi-language selector with toast notifications
 *
 * ```typescript
 * const languageSelector: IComboBox = {
 *   options: [
 *     {
 *       key: "en-US",
 *       label: "English (US)",
 *       icon: "language-en.svg"
 *     },
 *     {
 *       key: "es-ES",
 *       label: "Español",
 *       icon: "language-es.svg"
 *     },
 *     {
 *       key: "fr-FR",
 *       label: "Français",
 *       icon: "language-fr.svg",
 *       disabled: true
 *     }
 *   ],
 *   selectedOption: {
 *     key: "en-US",
 *     label: "English (US)",
 *     icon: "language-en.svg"
 *   },
 *   onSelect: (item) => {
 *     return {
 *       actions: [Actions.updateProps, Actions.showToast],
 *       newProps: {
 *         selectedOption: item
 *       },
 *       toastProps: [{
 *         title: "Language Changed",
 *         type: "success",
 *         message: `Interface language changed to ${item.label}`
 *       }]
 *     };
 *   },
 *   scaled: true,
 *   directionX: "right",
 *   directionY: "bottom",
 *   displayType: "default",
 *   dropDownMaxHeight: 300,
 *   showDisabledItems: true,
 *   withBackdrop: true,
 *   isDisabled: false,
 *   noBorder: false,
 *   opened: false,
 *   scaledOptions: true,
 *   modernView: true
 * }
 * ```
 *
 * @category ComboBox
 *
 * @categoryDescription Options
 *
 * Here is a description of the category Options.
 *
 * @categoryDescription State
 *
 * Here is a description of the category State.
 *
 * @categoryDescription Behavior
 *
 * Here is a description of the category Behavior.
 */
export interface IComboBox {
  /**
   * Defines the combo box options
   *
   * @category Options
   */
  options: IComboBoxItem[];

  /**
   * Defines the combo box selected option
   *
   * @category State
   */
  selectedOption: IComboBoxItem;

  /**
   * Sets a function which is triggered whenever the combo box is selected
   *
   * @category Behavior
   */
  onSelect?: (item: IComboBoxItem) => IMessage | void;

  /**
   * Specifies that the combo box is scaled by its parent
   *
   * @category Appearance
   */
  scaled?: boolean;

  /**
   * Defines the position of the combo box in the X direction
   *
   * @category Appearance
   */
  directionX?: "left" | "right";

  /**
   * Defines the position of the combo box in the Y direction
   *
   * @category Appearance
   */
  directionY?: "bottom" | "top" | "both";

  /**
   * Defines the combo box display type
   *
   * @category Appearance
   */
  displayType?: "default" | "toggle";

  /**
   * Specifies whether to display the combo box in the modern view
   *
   * @category Appearance
   */
  modernView?: boolean;

  /**
   * Specifies if the combo box is disabled or not
   *
   * @category State
   */
  isDisabled?: boolean;

  /**
   * Whether to show disabled combo box options
   *
   * @category State
   */
  showDisabledItems?: boolean;

  /**
   * Specifies whether to open the combo box
   *
   * @category State
   */
  opened?: boolean;

  /**
   * Specifies whether the combo box options are scaled by the combo box button
   *
   * @category Appearance
   */
  scaledOptions?: boolean;

  /**
   * Sets a function which is triggered whenever the combo box is clicked when "displayType == toggle"
   *
   * @category Behavior
   */
  onToggle?: () => IMessage | void;

  /**
   * Specifies whether to display the combo box without borders
   *
   * @category Appearance
   */
  noBorder?: boolean;

  /**
   * Specifies whether the combo box contains a backdrop
   *
   * @category Appearance
   */
  withBackdrop?: boolean;

  /**
   * Defines the maximum height of the dropdown list
   *
   * @category Appearance
   */
  dropDownMaxHeight?: number;
}
