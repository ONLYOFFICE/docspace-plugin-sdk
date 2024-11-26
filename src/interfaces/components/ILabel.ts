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
 * @category Label Component
 *
 * Field name in the form.
 *
 * @param text - Defines the element text.
 *
 * @param isRequired - Specifies whether the field to which the label is attached is required.
 *
 * @param error - Specifies whether the field to which the label is attached is incorrect.
 *
 * @param isInline - Specifies whether the "display: inline-block" property is set.
 *
 * @param title - Defines the label title.
 *
 * @param truncate - Specifies whether the word wrapping is disabled.
 *
 * @param htmlFor - Defines the field ID to which the label is attached.
 *
 * @param display - Specifies whether the "display" property is set.
 */
export interface ILabel {
  text: string;
  isRequired?: boolean;
  error?: boolean;
  isInline?: boolean;
  title?: string;
  truncate?: boolean;
  htmlFor?: string;
  display?: string;
}
