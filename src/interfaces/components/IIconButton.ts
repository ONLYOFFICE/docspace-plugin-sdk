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
import { BoxGroup, Component, IFrameGroup } from './Component'

/**
 * Defines icon size options
 *
 * @category IconButton
 */
export const enum IconSize {
  /** Base icon size (15px) */
  base = "base",
  /** Middle icon size (15px) */
  middle = "middle",
  /** Large icon size (15px) */
  large = "large",
}

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
 *   iconName: "/assets/delete.svg",
 *   iconHoverName: "/assets/delete-hover.svg",
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
 * Icon button with custom content (iframe)
 *
 * ```typescript
 * const iframeButton: IIconButton = {
 *   iconName: "/assets/embed.svg",
 *   size: 24,
 *   customContent: {
 *     component: Components.iFrame,
 *     props: {
 *       src: "https://example.com/widget",
 *       width: "300px",
 *       height: "200px",
 *       sandbox: "allow-scripts allow-same-origin"
 *     }
 *   },
 *   onClick: () => {
 *     console.log("Iframe button clicked");
 *   }
 * }
 * ```
 *
 * @example
 *
 * Icon button with custom content (div with components)
 *
 * ```typescript
 * const customButton: IIconButton = {
 *   iconName: "/assets/info.svg",
 *   size: 24,
 *   customContent: {
 *     component: Components.box,
 *     props: {
 *       widthProp: "250px",
 *       paddingProp: "12px",
 *       backgroundProp: "#ffffff",
 *       borderProp: "1px solid #eceef1",
 *       children: [
 *         {
 *           component: Components.text,
 *           props: {
 *             text: "Custom tooltip content",
 *             fontSize: "14px"
 *           }
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
export interface IIconButton {
  /**
   * Icon name or path to the icon file
   *
   * @category Appearance
   */
  iconName?: string;

  /**
   * Icon name or path for hover state
   *
   * @category Appearance
   */
  iconHoverName?: string;

  /**
   * Icon name or path for click state
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
   * Button height and width value. Can be a number (pixels) or IconSize enum value
   *
   * @category Appearance
   */
  size?: number | IconSize;

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
  onClick?: () => Promise<IMessage> | IMessage | void;

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
   * Custom content to display when the icon button is interacted with.
   * Can be an iframe (IFrame) or a custom div container (IBox) with nested components.
   * This allows embedding external content or creating custom tooltips/popovers.
   *
   * @category Behavior
   *
   * @example
   * ```typescript
   * // Iframe example
   * customContent: {
   *   component: Components.iFrame,
   *   props: {
   *     src: "https://example.com/widget",
   *     width: "400px",
   *     height: "300px"
   *   }
   * }
   *
   * // Custom div with components
   * customContent: {
   *   component: Components.box,
   *   props: {
   *     paddingProp: "16px",
   *     children: [
   *       { component: Components.text, props: { text: "Info" } }
   *     ]
   *   }
   * }
   * ```
   */
  customContent?: BoxGroup;
}
