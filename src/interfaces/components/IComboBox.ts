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
 * @category ComboBox Component
 *
 * Custom combo box option.
 *
 * @param key - Defines the combo box option key.
 *
 * @param label - Defines the combo box option label.
 *
 * @param icon - Defines the combo box option icon.
 *
 * @param disabled - Specifies if the combo box option is disabled or not.
 */
export interface IComboBoxItem {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * @category ComboBox Component
 *
 * Custom combo box input.
 *
 * @param options - Defines the combo box options.
 *
 * @param selectedOption - Defines the combo box selected option.
 *
 * @param onSelect - Sets a function which is triggered whenever the combo box is selected.
 *
 * @param scaled - Specifies that the combo box is scaled by its parent.
 *
 * @param directionX - Defines the position of the combo box in the X direction.
 *
 * @param directionY - Defines the position of the combo box in the Y direction.
 *
 * @param displayType - Defines the combo box display type.
 *
 * @param dropDownMaxHeight - Defines the maximum height of the dropdown list.
 *
 * @param showDisabledItems - Specifies if the disabled combo box options will be displayed or not when "displayType !== toggle".
 *
 * @param withBackdrop - Specifies whether the combo box contains a backdrop.
 *
 * @param isDisabled - Specifies if the combo box is disabled or not.
 *
 * @param noBorder - Specifies whether to display the combo box without borders.
 *
 * @param opened - Specifies whether to open the combo box.
 *
 * @param scaledOptions - Specifies whether the combo box options are scaled by the combo box button.
 *
 * @param onToggle - Sets a function which is triggered whenever the combo box is clicked when "displayType == toggle".
 *
 * @param modernView - Specifies whether to display the combo box in the modern view.
 */
export interface IComboBox {
  options: IComboBoxItem[];
  selectedOption: IComboBoxItem;
  onSelect?: (item: IComboBoxItem) => IMessage | void;
  scaled?: boolean;
  directionX?: "left" | "right";
  directionY?: "bottom" | "top" | "both";
  displayType?: "default" | "toggle";
  dropDownMaxHeight?: number;
  showDisabledItems?: boolean;
  withBackdrop?: boolean;
  isDisabled?: boolean;
  noBorder?: boolean;
  opened?: boolean;
  scaledOptions?: boolean;
  onToggle?: () => IMessage | void;
  modernView?: boolean;
}
