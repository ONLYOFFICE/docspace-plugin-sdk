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
 * @param text - Defines the text.
 *
 * @param title - Defines the text title.
 *
 * @param fontSize - Defines the text font size.
 *
 * @param fontWeight - Defines the text font weight.
 *
 * @param truncate - Specifies whether the word wrapping is set.
 *
 * @param isBold - Specifies whether the text font weight is set to bold.
 *
 * @param isItalic - Specifies whether the text style is set to italic.
 *
 * @param isInline - Specifies whether the "display: inline-block" property is set.
 *
 * @param textAlign - Specifies whether the "text-align" property is set.
 *
 * @param noSelect - Specifies whether the text selection is disabled.
 *
 * @param display - Specifies whether the "display" property is set.
 *
 * @param lineHeight - Defines the text line height.
 *
 * @param color - Defines the text color.
 */
export interface IText {
  text: string;
  title?: string;
  fontSize?: string;
  fontWeight?: string | number;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  textAlign?: string;
  noSelect?: boolean;
  display?: string;
  lineHeight?: string;
  color?: string;
}
