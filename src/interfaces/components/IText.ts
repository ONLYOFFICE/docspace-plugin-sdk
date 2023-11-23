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

/**
 * Plain text.
 */
export interface IText {
  /**
   * Defines the text.
   */
  text: string;

  /**
   * Defines the text title.
   */
  title?: string;

  /**
   * Defines the text font size.
   */
  fontSize?: string;

  /**
   * Defines the text font weight.
   */
  fontWeight?: string | number;

  /**
   * Specifies whether the word wrapping is set.
   */
  truncate?: boolean;

  /**
   * Specifies whether the text font weight is set to bold.
   */
  isBold?: boolean;

  /**
   * Specifies whether the text style is set to italic.
   */
  isItalic?: boolean;

  /**
   * Specifies whether the "display: inline-block" property is set.
   */
  isInline?: boolean;

  /**
   * Specifies whether the "text-align" property is set.
   */
  textAlign?: string;

  /**
   * Specifies whether the text selection is disabled.
   */
  noSelect?: boolean;

  /**
   * Specifies whether the "display" property is set.
   */
  display?: string;

  /**
   * Defines the text line height.
   */
  lineHeight?: string;

  /**
   * Defines the text color.
   */
  color?: string;
}
