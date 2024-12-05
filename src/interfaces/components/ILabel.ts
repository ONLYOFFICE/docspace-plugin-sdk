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
 * Field name in the form.
 *
 * @example
 *
 * Required field label with inline display
 *
 * ```typescript
 * const emailLabel: ILabel = {
 *   text: "Email Address",
 *   isRequired: true,
 *   error: false,
 *   isInline: true,
 *   title: "Enter your email address",
 *   htmlFor: "email-input",
 *   display: "flex"
 * }
 * ```
 *
 * @example
 *
 * Error state label with truncation and block display
 *
 * ```typescript
 * const longFieldLabel: ILabel = {
 *   text: "Document Processing Configuration Settings",
 *   isRequired: false,
 *   error: true,
 *   truncate: true,
 *   title: "Configure document processing settings",
 *   htmlFor: "doc-settings",
 *   display: "block"
 * }
 * ```
 */
export interface ILabel {
  /** Defines the element text */
  text: string;

  /** Specifies whether the field to which the label is attached is required */
  isRequired?: boolean;

  /** Specifies whether the field to which the label is attached is incorrect */
  error?: boolean;

  /** Specifies whether the "display: inline-block" property is set */
  isInline?: boolean;

  /** Defines the label title */
  title?: string;

  /** Specifies whether the word wrapping is disabled */
  truncate?: boolean;

  /** Defines the field ID to which the label is attached */
  htmlFor?: string;

  /** Specifies whether the "display" property is set */
  display?: string;
}
