/**
 * (c) Copyright Ascensio System SIA 2025
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

/**
 * Custom toggle button input for binary state controls.
 *
 * @category ToggleButton
 *
 * @categoryDescription State
 *
 * Here is a description of the category State.
 *
 * @categoryDescription Content
 *
 * Here is a description of the category Content.
 *
 * @categoryDescription Appearance
 *
 * Here is a description of the category Appearance.
 *
 * @categoryDescription Behavior
 *
 * Here is a description of the category Behavior.
 *
 * @example
 *
 * Theme switcher with custom margin
 *
 * ```typescript
 * const darkModeToggle: IToggleButton = {
 *   label: "Dark Mode",
 *   isChecked: false,
 *   onChange: () => {
 *     return {
 *       actions: [Actions.updateProps, Actions.updateTheme],
 *       newProps: {
 *         isChecked: true
 *       },
 *       theme: "dark"
 *     };
 *   },
 *   style: {
 *     marginLeft: "16px"
 *   }
 * }
 * ```
 *
 * @example
 *
 * Permission-aware notification settings
 *
 * ```typescript
 * const notificationsToggle: IToggleButton = {
 *   label: "Enable Notifications",
 *   isChecked: true,
 *   isDisabled: !hasNotificationPermission,
 *   onChange: () => {
 *     return {
 *       actions: [Actions.updateProps, Actions.showToast],
 *       newProps: {
 *         isChecked: false
 *       },
 *       toastProps: [{
 *         type: "info",
 *         title: "Notifications disabled",
 *         timeout: 3000
 *       }]
 *     };
 *   }
 * }
 * ```
 *
 * @example
 *
 * Styled auto-save control with custom background
 *
 * ```typescript
 * const autoSaveToggle: IToggleButton = {
 *   label: "Auto-save",
 *   isChecked: true,
 *   onChange: () => {
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         isChecked: false
 *       }
 *     };
 *   },
 *   style: {
 *     backgroundColor: "#f5f5f5",
 *     padding: "8px",
 *     borderRadius: "4px"
 *   }
 * }
 * ```
 */
export interface IToggleButton {
  /** Defines the toggle button label
   *
   * @category Content
   */
  label?: string;

  /** Specifies whether the toggle button is enabled
   *
   * @category State
   */
  isChecked: boolean;

  /** Sets a function which is triggered whenever the toggle button is clicked
   *
   * @category Behavior
   */
  onChange: () => IMessage | void;

  /** Specifies whether the toggle button is disabled
   *
   * @category State
   */
  isDisabled?: boolean;

  /** Defines the toggle button CSS style
   *
   * @category Appearance
   */
  style?: any;
}
