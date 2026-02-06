/**
 * (c) Copyright Ascensio System SIA 2026
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
 * Defines button size options
 *
 * @category Button
 */
export const enum ButtonSize {
  /** Extra small button size */
  extraSmall = "extra-small",
  /** Small button size */
  small = "small",
  /** Normal button size */
  normal = "normal",
  /** Medium button size */
  medium = "medium",
}

/**
 * A component that is used for an action on a page.
 *
 * @category Button
 *
 * @categoryDescription Appearance
 *
 * Properties that control the visual appearance, size, and styling of the button.
 *
 * @categoryDescription Behavior
 *
 * Callback functions and event handlers for button interactions.
 *
 * @categoryDescription State Management
 *
 * Properties that control the button's loading, disabled, and interactive states.
 *
 * @example
 *
 * Primary save button with loading state and error handling
 *
 * ```typescript
 * const saveButton: IButton = {
 *   label: "Save Changes",
 *   size: ButtonSize.normal,
 *   onClick: async () => {
 *     try {
 *       await saveChanges();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Success",
 *           type: "success",
 *           message: "Changes saved successfully"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Error",
 *           type: "error",
 *           message: "Failed to save changes"
 *         }]
 *       };
 *     }
 *   },
 *   primary: true,
 *   scale: false,
 *   isLoading: false,
 *   isDisabled: false,
 *   withLoadingAfterClick: true,
 *   disableWhileRequestRunning: true
 * }
 * ```
 */

/**
 * @category Button
 */
export interface IButton {
  /**
   * Defines the button text
   *
   * @category Appearance
   */
  label: string;

  /**
   * Defines the button size. The normal size is equal to 36x40 px on the Desktop and Touchscreen devices.
   * Can be: "extraSmall", "small", "normal", "medium". The default value is "extraSmall"
   *
   * @category Appearance
   */
  size: ButtonSize;

  /**
   * Sets a function which specifies an action initiated upon clicking the button
   *
   * @category Behavior
   */
  onClick: () => Promise<IMessage> | IMessage | void;

  /**
   * Specifies if the button is primary or not. If the button is primary, it is colored blue
   *
   * @category Appearance
   */
  primary?: boolean;

  /**
   * Specifies if the button width will be scaled to 100% or not
   *
   * @category Appearance
   */
  scale?: boolean;

  /**
   * Specifies if the button will be displayed as a loader icon or not
   *
   * @category State Management
   */
  isLoading?: boolean;

  /**
   * Specifies if the button is disabled or not. The disabled button is blurred
   *
   * @category State Management
   */
  isDisabled?: boolean;

  /**
   * Specifies whether to set the "isLoading" state to the button after it is clicked until the action is completed
   *
   * @category State Management
   */
  withLoadingAfterClick?: boolean;

  /**
   * Specifies whether to set the "isDisabled" state for the button when the "withLoadingAfterClick" parameter is set to true,
   * and it is clicked either on the page or in the dialog box
   *
   * @category State Management
   */
  disableWhileRequestRunning?: boolean;

  /**
   * Defines the CSS class for styling the component.
   * Can be used to override or extend the default component styles.
   *
   * @category Appearance
   */
  className?: string;
}
