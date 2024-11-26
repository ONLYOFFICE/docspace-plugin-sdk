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
 * @param color - Defines the border color of the element area.
 *
 * @param radius - Defines the border radius of the element area.
 *
 * @param style - Defines the border style of the element area.
 *
 * @param width - Defines the border width of the element area.
 */
export interface IBorderProp {
  color: string;
  radius: string;
  style: string;
  width: string;
}

/**
 * @category Box Component
 *
 * A container that lays out its contents in one direction.
 * Box provides general CSS capabilities like flexbox layout, paddings, background color, border, and animation.
 *
 * @param widthProp - Defines the border width of the element area.
 *
 * @param paddingProp - Defines the padding area of all four sides of the element.
 * This is a shorthand for "padding-top", "padding-right", "padding-bottom", and "padding-left".
 *
 * @param displayProp - Specifies whether the element is treated as a block or inline element and also determines the layout used for its children, such as flow layout, grid or flex.
 *
 * @param flexDirection - Sets how the flex items are placed in the flex container defining the main axis (column or row) and the direction (normal or reversed).
 *
 * @param alignItems - Sets the "alignSelf" value on all direct children as a group. In flexbox, it controls the alignment of items on the cross-axis.
 * In grid layout, it controls the alignment of items on the block axis within their grid area.
 *
 * @param borderProp - Defines the element border. It sets the values of border width, border style, and border color.
 *
 * @param alignContent - Defines the distribution of space between and around content items along the flexbox cross-axis or the grid block axis.
 *
 * @param alignSelf - Overrides a grid or flex item "alignItems" value. In grid, it aligns the item inside the grid area. In flexbox, it aligns the item on the cross-axis.
 *
 * @param backgroundProp - Defines all background style properties at once, such as color, image, origin and size, or repeat method.
 *
 * @param flexBasis - Defines the initial main size of the flex item. It sets the size of the content box unless otherwise set with "box-sizing".
 *
 * @param flexProp - Defines how the flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for "flex-grow", "flex-shrink", and "flex-basis".
 *
 * @param flexWrap - Defines whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
 *
 * @param gridArea - Defines a shorthand property for "grid-row-start", "grid-column-start", "grid-row-end", and "grid-column-end", specifying the size of the grid item and location within the grid
 * by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area.
 *
 * @param heightProp - Defines the border height of the element area.
 *
 * @param justifyContent - Defines how the browser distributes space between and around content items along the main axis of a flex container, and the inline axis of a grid container.
 *
 * @param justifyItems - Defines the default "justifySelf" for all items of the box, giving them all a default way of justifying each box along the appropriate axis.
 *
 * @param justifySelf - Defines the way the box is justified inside its alignment container along the appropriate axis.
 *
 * @param marginProp - Defines the margin area on all four sides of an element. It is a shorthand for "margin-top", "margin-right", "margin-bottom", and "margin-left".
 *
 * @param overflowProp - Specifies what to do when the element content is too big to fit in its block formatting context.
 *
 * @param textAlign - Defines the horizontal alignment of a block element or table-cell box. This means it works like "vertical-align" but in the horizontal direction.
 *
 * @param children - Defines the box components.
 */
export interface IBox {
  widthProp?: string;
  paddingProp?: string;
  displayProp?: string;
  flexDirection?: string;
  alignItems?: string;
  borderProp?: string | IBorderProp;
  alignContent?: string;
  alignSelf?: string;
  backgroundProp?: string;
  flexBasis?: string;
  flexProp?: string;
  flexWrap?: string;
  gridArea?: string;
  heightProp?: string;
  justifyContent?: string;
  justifyItems?: string;
  justifySelf?: string;
  marginProp?: string;
  overflowProp?: string;
  textAlign?: string;
  children?: Component[];
}
