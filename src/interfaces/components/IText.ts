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

/**
 * @category Text Component
 *
 * Plain text.
 *
 * @example
 *
 * Bold centered heading with custom typography
 *
 * ```typescript
 * const heading: IText = {
 *   text: "Document Management",
 *   fontSize: "24px",
 *   fontWeight: 600,
 *   lineHeight: "32px",
 *   color: "#333333",
 *   isBold: true,
 *   noSelect: true,
 *   textAlign: "center"
 * }
 * ```
 *
 * @example
 *
 * Truncated description with hover tooltip
 *
 * ```typescript
 * const description: IText = {
 *   text: "This is a long description that will be truncated if it exceeds the container width...",
 *   fontSize: "14px",
 *   lineHeight: "20px",
 *   color: "#666666",
 *   truncate: true,
 *   title: "Full description shown on hover"
 * }
 * ```
 *
 * @example
 *
 * Inline processing status with custom styling
 *
 * ```typescript
 * const status: IText = {
 *   text: "Processing",
 *   fontSize: "12px",
 *   isInline: true,
 *   isItalic: true,
 *   color: "#0066cc",
 *   display: "inline-flex",
 *   fontWeight: 500
 * }
 * ```
 */
export interface IText {
  /** Defines the text */
  text: string;

  /** Defines the text title */
  title?: string;

  /** Defines the text font size */
  fontSize?: string;

  /** Defines the text font weight */
  fontWeight?: string | number;

  /** Specifies whether the word wrapping is set */
  truncate?: boolean;

  /** Specifies whether the text font weight is set to bold */
  isBold?: boolean;

  /** Specifies whether the text style is set to italic */
  isItalic?: boolean;

  /** Specifies whether the "display: inline-block" property is set */
  isInline?: boolean;

  /** Specifies whether the "text-align" property is set */
  textAlign?: string;

  /** Specifies whether the text selection is disabled */
  noSelect?: boolean;

  /** Specifies whether the "display" property is set */
  display?: string;

  /** Defines the text line height */
  lineHeight?: string;

  /** Defines the text color */
  color?: string;
}
