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

import { Component } from "./Component";

/**
 * @category Box Component
 *
 * Defines the border properties for a box element.
 *
 * @example
 * ```typescript
 * const borderProps: IBorderProp = {
 *   color: "blue",
 *   radius: "10px",
 *   style: "solid",
 *   width: "2px"
 * }
 * ```
 */
export interface IBorderProp {
  /** Defines the border color of the element area */
  color: string;

  /** Defines the border radius of the element area */
  radius: string;

  /** Defines the border style of the element area */
  style: string;

  /** Defines the border width of the element area */
  width: string;
}

/**
 * @category Box Component
 *
 * A container that lays out its contents in one direction.
 * Box provides general CSS capabilities like flexbox layout, paddings, background color, border, and animation.
 *
 * @example
 * ```typescript
 * const newInputProps: IInput = {
 *   value: "",
 *   onChange: () => {},
 *   scale: true,
 *   placeholder: "",
 * }
 *
 * const inputComponent: InputGroup = {
 *   component: Components.input,
 *   props: newInputProps,
 * }
 *
 * const inputBox: IBox = {
 *   widthProp: "100px",
 *   paddingProp: "10px",
 *   displayProp: "flex",
 *   flexDirection: "row",
 *   alignItems: "center",
 *   borderProp: {
 *     color: "blue",
 *     radius: "10px",
 *     style: "solid",
 *     width: "2px"
 *   },
 *   alignContent: "center",
 *   alignSelf: "center",
 *   backgroundProp: "linear-gradient(to right, #ff0000, #00ff00)",
 *   flexBasis: "50%",
 *   flexProp: "1",
 *   flexWrap: "wrap",
 *   children: inputComponent
 * }
 * ```
 */
export interface IBox {
  /** Defines the border width of the element area */
  widthProp?: string;

  /**
   * Defines the padding area of all four sides of the element.
   * This is a shorthand for "padding-top", "padding-right", "padding-bottom", and "padding-left"
   */
  paddingProp?: string;

  /**
   * Specifies whether the element is treated as a block or inline element and also determines the layout
   * used for its children, such as flow layout, grid or flex
   */
  displayProp?: string;

  /**
   * Sets how the flex items are placed in the flex container defining the main axis (column or row)
   * and the direction (normal or reversed)
   */
  flexDirection?: string;

  /**
   * Sets the "alignSelf" value on all direct children as a group. In flexbox, it controls the alignment
   * of items on the cross-axis. In grid layout, it controls the alignment of items on the block axis
   * within their grid area
   */
  alignItems?: string;

  /** Defines the element border. It sets the values of border width, border style, and border color */
  borderProp?: string | IBorderProp;

  /**
   * Defines the distribution of space between and around content items along the flexbox cross-axis
   * or the grid block axis
   */
  alignContent?: string;

  /**
   * Overrides a grid or flex item "alignItems" value. In grid, it aligns the item inside the grid area.
   * In flexbox, it aligns the item on the cross-axis
   */
  alignSelf?: string;

  /** Defines all background style properties at once, such as color, image, origin and size, or repeat method */
  backgroundProp?: string;

  /**
   * Defines the initial main size of the flex item. It sets the size of the content box unless
   * otherwise set with "box-sizing"
   */
  flexBasis?: string;

  /**
   * Defines how the flex item will grow or shrink to fit the space available in its flex container.
   * It is a shorthand for "flex-grow", "flex-shrink", and "flex-basis"
   */
  flexProp?: string;

  /**
   * Defines whether flex items are forced onto one line or can wrap onto multiple lines.
   * If wrapping is allowed, it sets the direction that lines are stacked
   */
  flexWrap?: string;

  /**
   * Defines a shorthand property for "grid-row-start", "grid-column-start", "grid-row-end",
   * and "grid-column-end", specifying the size of the grid item and location within the grid
   */
  gridArea?: string;

  /** Defines the border height of the element area */
  heightProp?: string;

  /**
   * Defines how the browser distributes space between and around content items along the main axis
   * of a flex container, and the inline axis of a grid container
   */
  justifyContent?: string;

  /**
   * Defines the default "justifySelf" for all items of the box, giving them all a default way
   * of justifying each box along the appropriate axis
   */
  justifyItems?: string;

  /** Defines the way the box is justified inside its alignment container along the appropriate axis */
  justifySelf?: string;

  /**
   * Defines the margin area on all four sides of an element. It is a shorthand for "margin-top",
   * "margin-right", "margin-bottom", and "margin-left"
   */
  marginProp?: string;

  /** Specifies what to do when the element content is too big to fit in its block formatting context */
  overflowProp?: string;

  /** Defines the horizontal alignment of a block element or table-cell box */
  textAlignProp?: string;

  /** The child components to render within this box */
  children?: Component;
}
