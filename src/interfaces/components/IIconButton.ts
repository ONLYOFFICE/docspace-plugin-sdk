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

import { TReturnMessage } from "../utils";


/**
 * A component that displays an interactive icon button with hover and click states.
 *
 * <plugin-image src="iconbutton.png" dark />
 *
 * @example
 *
 * Simple icon button with click handler
 *
 * ```typescript
 * const deleteButton: IIconButton = {
 *   iconName: "delete.svg",
 *   size: 20,
 *   color: "#333333",
 *   hoverColor: "#FF0000",
 *   onClick: async () => {
 *     try {
 *       await deleteItem();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Item deleted successfully",
 *           type: ToastType.success
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Failed to delete item",
 *           type: ToastType.error
 *         }]
 *       };
 *     }
 *   },
 *   isDisabled: false,
 *   title: "Delete item"
 * }
 * ```
 *
 *
 */
export interface IIconButton {
  /**
   * Icon name with extension
   */
  iconName?: string;

  /**
   * Icon name with extension for hover state
   */
  iconHoverName?: string;

  /**
   * Icon name with extension for click state
   */
  iconClickName?: string;

  /**
   * Icon color. Can be "accent" or any CSS color value
   */
  color?: "accent" | string;

  /**
   * Icon color on hover action
   */
  hoverColor?: "accent" | string;

  /**
   * Icon color on click action
   */
  clickColor?: "accent" | string;

  /**
   * Button height and width value. Can be a number (pixels)
   */
  size?: number;

  /**
   * Determines if icon fill is needed
   */
  isFill?: boolean;

  /**
   * Determines if icon stroke is needed
   */
  isStroke?: boolean;

  /**
   * Sets the button to present a disabled state
   */
  isDisabled?: boolean;

  /**
   * Sets cursor value to indicate clickability
   */
  isClickable?: boolean;

  /**
   * Sets a button callback function triggered when the button is clicked
   */
  onClick?: () => TReturnMessage;

  /**
   * Sets component id
   */
  id?: string;

  /**
   * Data when user hover on icon (tooltip text)
   */
  title?: string;

  /**
   * Tooltip id for advanced tooltip configuration
   */
  tooltipId?: string;

  /**
   * Tooltip content text
   */
  tooltipContent?: string;

  /**
   * Defines the CSS class for styling the component.
   * Can be used to override or extend the default component styles.
   */
  className?: string;
}
