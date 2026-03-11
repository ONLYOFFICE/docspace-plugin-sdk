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
import { IBox } from './IBox'


/**
 * A component that displays an interactive icon button with hover and click states.
 *
 * @category IconButton
 *
 * @categoryDescription Appearance
 *
 * Controls the visual presentation of the icon button including size, colors, and icon states.
 *
 * @categoryDescription Behavior
 *
 * Defines the interactive behavior and event handling of the icon button.
 *
 * @categoryDescription State Management
 *
 * Manages the button's state including disabled, loading, and clickable states.
 *
 * @example
 *
 * Simple icon button with click handler
 *
 * ```typescript
 * const deleteButton: IIconButton = {
 *   iconName: delete.svg",
 *   size: 20,
 *   color: "#333333",
 *   hoverColor: "#FF0000",
 *   onClick: async () => {
 *     try {
 *       await deleteItem();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Success",
 *           type: "success",
 *           message: "Item deleted successfully"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Error",
 *           type: "error",
 *           message: "Failed to delete item"
 *         }]
 *       };
 *     }
 *   },
 *   isDisabled: false,
 *   title: "Delete item"
 * }
 * ```
 *
 * @example
 *
 * Icon button with custom content (iframe with external URL)
 *
 * ```typescript
 * const iframeButton: IIconButton = {
 *   iconName: "embed.svg",
 *   size: 24,
 *   customContent: {
 *       widthProp: "24px",
 *       heightProp: "24px",
 *       children: [
 *         {
 *           component: Components.iFrame,
 *           props: {
 *             src: "https://example.com/widget",
 *             width: "24px",
 *             height: "24px"
 *           }
 *         }
 *       ]
 *   },
 *   onClick: () => {
 *     console.log("Iframe button clicked");
 *   }
 * }
 * ```
 *
 * @example
 *
 * Icon button with custom content (iframe with dynamic content via ID)
 *
 * ```typescript
 * // Define the icon button with iframe ID
 * const customIframeButton: IIconButton = {
 *   iconName: "circle.svg",
 *   size: 32,
 *   customContent: {
 *       widthProp: "32px",
 *       heightProp: "32px",
 *       overflowProp: "hidden",
 *       children: [
 *         {
 *           component: Components.iFrame,
 *           props: {
 *             id: "custom-icon-iframe",
 *             width: "32px",
 *             height: "32px"
 *           }
 *         }
 *       ]
 *   }
 * };
 *
 * // Fill iframe with custom content by ID
 * function fillIframeById(id: string, callback: (iframe: HTMLIFrameElement) => void) {
 *   const iframe = window.parent.document.getElementById(id) as HTMLIFrameElement;
 *   if (!iframe) {
 *     setTimeout(() => fillIframeById(id, callback), 200);
 *     return;
 *   }
 *   callback(iframe);
 * }
 *
 * fillIframeById("custom-icon-iframe", (iframe) => {
 *   const doc = iframe.contentWindow!.document;
 *   
 *   // Add styles
 *   const style = doc.createElement("style");
 *   style.textContent = `
 *     body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100%; }
 *   `;
 *   doc.head.appendChild(style);
 *   
 *   // Create custom element
 *   const circle = doc.createElement("div");
 *   circle.style.width = "24px";
 *   circle.style.height = "24px";
 *   circle.style.borderRadius = "50%";
 *   circle.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
 *   doc.body.appendChild(circle);
 * });
 * ```
 */
export interface IIconButton {
  /**
   * Icon name with extension
   *
   * @category Appearance
   */
  iconName?: string;

  /**
   * Icon name with extension for hover state
   *
   * @category Appearance
   */
  iconHoverName?: string;

  /**
   * Icon name with extension for click state
   *
   * @category Appearance
   */
  iconClickName?: string;

  /**
   * Icon color. Can be "accent" or any CSS color value
   *
   * @category Appearance
   */
  color?: "accent" | string;

  /**
   * Icon color on hover action
   *
   * @category Appearance
   */
  hoverColor?: "accent" | string;

  /**
   * Icon color on click action
   *
   * @category Appearance
   */
  clickColor?: "accent" | string;

  /**
   * Button height and width value. Can be a number (pixels)
   *
   * @category Appearance
   */
  size?: number;

  /**
   * Determines if icon fill is needed
   *
   * @category Appearance
   */
  isFill?: boolean;

  /**
   * Determines if icon stroke is needed
   *
   * @category Appearance
   */
  isStroke?: boolean;

  /**
   * Sets the button to present a disabled state
   *
   * @category State Management
   */
  isDisabled?: boolean;

  /**
   * Sets cursor value to indicate clickability
   *
   * @category State Management
   */
  isClickable?: boolean;

  /**
   * Sets a button callback function triggered when the button is clicked
   *
   * @category Behavior
   */
  onClick?: () => TReturnMessage;

  /**
   * Sets component id
   *
   * @category Appearance
   */
  id?: string;

  /**
   * Data when user hover on icon (tooltip text)
   *
   * @category Appearance
   */
  title?: string;

  /**
   * Tooltip id for advanced tooltip configuration
   *
   * @category Appearance
   */
  tooltipId?: string;

  /**
   * Tooltip content text
   *
   * @category Appearance
   */
  tooltipContent?: string;

  /**
   * Defines the CSS class for styling the component.
   * Can be used to override or extend the default component styles.
   *
   * @category Appearance
   */
  className?: string;

  /**
   * Custom content to display instead of the default icon.
   * Accepts IBox props to create custom visual elements using components like iframe, text, or nested boxes.
   *
   * @category Behavior
   */
  iconNode?: IBox;
}
