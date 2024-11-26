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
 * Defines the available UI component types in the DocSpace plugin system.
 *
 * @remarks
 * - box: Container component for grouping other elements
 * - button: Interactive button element
 * - checkbox: Selectable checkbox input
 * - input: Text input field
 * - label: Text label for form elements
 * - text: Static text display
 * - textArea: Multi-line text input
 * - toggleButton: Switch-like button with two states
 * - img: Image display component
 * - iFrame: Embedded frame component
 * - comboBox: Dropdown selection input
 * - skeleton: Loading placeholder component
 */
export const enum Components {
  box = "box",
  button = "button",
  checkbox = "checkbox",
  input = "input",
  label = "label",
  text = "text",
  textArea = "textArea",
  toggleButton = "toggleButton",
  img = "img",
  iFrame = "iFrame",
  comboBox = "comboBox",
  skeleton = "skeleton",
}
