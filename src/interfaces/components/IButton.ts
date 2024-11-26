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
 * @category Button Component
 *
 * @param extraSmall - Extra small button size
 * @param small - Small button size
 * @param normal - Normal button size
 * @param medium - Medium button size
 */
export const enum ButtonSize {
  extraSmall = "extra-small",
  small = "small",
  normal = "normal",
  medium = "medium",
}

/**
 * @category Button Component
 *
 * A component that is used for an action on a page.
 *
 * @param label - Defines the button text.
 *
 * @param size - Defines the button size. The normal size is equal to 36x40 px on the Desktop and Touchcreen devices.
 * Can be: "extraSmall", "small", "normal", "medium". The default value is "extraSmall".
 *
 * @param onClick - Sets a function which specifies an action initiated upon clicking the button.
 *
 * @param primary - Specifies if the button is primary or not. If the button is primary, it is colored blue.
 *
 * @param scale - Specifies if the button width will be scaled to 100% or not.
 *
 * @param isLoading - Specifies if the button will be displayed as a loader icon or not.
 *
 * @param isDisabled - Specifies if the button is disabled or not. The disabled button is blurred.
 *
 * @param withLoadingAfterClick - Specifies whether to set the "isLoading" state to the button after it is clicked until the action is completed.
 *
 * @param disableWhileRequestRunning - Specifies whether to set the "isDisabled" state for the button when the "withLoadingAfterClick" parameter is set to true,
 * and it is clicked either on the page or in the dialog box.
 */
export interface IButton {
  label: string;
  size: ButtonSize;
  onClick: () => Promise<IMessage> | IMessage | void;
  primary?: boolean;
  scale?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  withLoadingAfterClick?: boolean;
  disableWhileRequestRunning?: boolean;
}
