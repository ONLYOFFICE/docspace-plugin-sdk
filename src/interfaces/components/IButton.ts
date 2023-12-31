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

import { IMessage } from "../utils";

/**
 * Defines the button size options.
 */
export const enum ButtonSize {
  extraSmall = "extra-small",
  small = "small",
  normal = "normal",
  medium = "medium",
}

/**
 * A component that is used for an action on a page.
 */
export interface IButton {
  /**
   * Defines the button text.
   */
  label: string;

  /**
   * Defines the button size. The normal size is equal to 36x40 px on the Desktop and Touchcreen devices.
   * Can be: "extraSmall", "small", "normal", "medium". The default value is "extraSmall".
   */
  size: ButtonSize;

  /**
   * Sets a function which specifies an action initiated upon clicking the button.
   */
  onClick: () => Promise<IMessage> | IMessage | void;

  /**
   * Specifies if the button is primary or not. If the button is primary, it is colored blue.
   */
  primary?: boolean;

  /**
   * Specifies if the button width will be scaled to 100% or not.
   */
  scale?: boolean;

  /**
   * Specifies if the button will be displayed as a loader icon or not.
   */
  isLoading?: boolean;

  /**
   * Specifies if the button is disabled or not. The disabled button is blurred.
   */
  isDisabled?: boolean;

  /**
   * Specifies whether to set the "isLoading" state to the button after it is clicked until the action is completed.
   */
  withLoadingAfterClick?: boolean;

  /**
   * Specifies whether to set the "isDisabled" state for the button when the "withLoadingAfterClick" parameter is set to true,
   * and it is clicked either on the page or in the dialog box.
   */
  disableWhileRequestRunning?: boolean;
}
