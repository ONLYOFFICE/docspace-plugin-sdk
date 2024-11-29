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

import { IMessage } from "../utils";

/**
 * @category TextArea Component
 *
 * Custom textarea.
 *
 * @example
 *
 * JSON configuration editor with syntax validation
 *
 * ```typescript
 * const configEditor: ITextArea = {
 *   value: JSON.stringify({
 *     apiKey: "your-api-key",
 *     endpoint: "https://api.example.com",
 *     timeout: 5000
 *   }, null, 2),
 *   onChange: (value) => {
 *     try {
 *       JSON.parse(value);
 *       return {
 *         actions: [Actions.updateProps],
 *         newProps: {
 *           value,
 *           hasError: false
 *         }
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.updateProps, Actions.showToast],
 *         newProps: {
 *           value,
 *           hasError: true
 *         },
 *         toastProps: [{
 *           title: "Invalid JSON",
 *           type: "error",
 *           message: "Please check your JSON syntax"
 *         }]
 *       };
 *     }
 *   },
 *   placeholder: "Enter JSON configuration...",
 *   isJSONField: true,
 *   enableCopy: true,
 *   hasNumeration: true,
 *   heightTextArea: 300,
 *   fontSize: 14,
 *   copyInfoText: true
 * }
 * ```
 *
 * @example
 *
 * Character-limited comment box with dynamic validation
 *
 * ```typescript
 * const commentBox: ITextArea = {
 *   value: "",
 *   onChange: (value) => {
 *     const hasError = value.length > 500;
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         value,
 *         hasError
 *       }
 *     };
 *   },
 *   placeholder: "Add your comment (max 500 characters)",
 *   maxLength: 500,
 *   heightTextArea: "120px",
 *   isFullHeight: true,
 *   heightScale: true,
 *   fontSize: 16,
 *   name: "comment",
 *   tabIndex: 1
 * }
 * ```
 */
export interface ITextArea {
  /**
   * Defines the textarea value.
   */
  value: string;

  /**
   * Sets a function which is triggered whenever the textarea is changed.
   */
  onChange: (value: string) => IMessage | void;

  /**
   * Defines the textarea placeholder.
   */
  placeholder?: string;

  /**
   * Specifies whether the textarea is disabled.
   */
  isDisabled?: boolean;

  /**
   * Specifies whether the textarea displays the read-only content.
   */
  isReadOnly?: boolean;

  /**
   * Specifies whether to indicate that there is an error in the textarea.
   */
  hasError?: boolean;

  /**
   * Defines the maximum value length in the textarea.
   */
  maxLength?: number;

  /**
   * Defines the textarea HTML "name" property.
   */
  name?: string;

  /**
   * Defines the textarea HTML "tabindex" property.
   */
  tabIndex?: number;

  /**
   * Defines the textarea font size.
   */
  fontSize?: number;

  /**
   * Defines the textarea height.
   */
  heightTextArea?: number | string;

  /**
   * Specifies whether the textarea is prettified for JSON and the line numeration is added.
   */
  isJSONField?: boolean;

  /**
   * Specifies whether the "Copy" icon is displayed in the textarea.
   */
  enableCopy?: boolean;

  /**
   * Specifies whether the numeration is inserted into the textarea.
   */
  hasNumeration?: boolean;

  /**
   * Specifies whether the height of the textarea content is calculated depending on the number of lines.
   */
  isFullHeight?: boolean;

  /**
   * Specifies whether the textarea has a height scale.
   */
  heightScale?: boolean;

  /**
   * Specifies whether the toast / information text will be displayed when copying.
   */
  copyInfoText?: boolean;
}
