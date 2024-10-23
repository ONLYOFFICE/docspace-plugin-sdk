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
import { IBox } from "./IBox";

/**
 * The supported modal dialog types.
 */
export const enum ModalDisplayType {
  modal = "modal",
  aside = "aside",
}

/**
 * Modal dialog.
 */
export interface IModalDialog {
  /**
   * Defines the modal dialog display type.
   */
  displayType: ModalDisplayType;

  /**
   * Defines the modal dialog header.
   */
  dialogHeader?: string;

  /**
   * Defines the modal dialog body.
   */
  dialogBody: IBox;

  /**
   * Defines the modal dialog footer.
   */
  dialogFooter?: IBox;

  /**
   * Specifies whether the "max-width: auto" property is set.
   */
  autoMaxWidth?: boolean;

  /**
   * Specifies whether the "max-height: auto" property is set.
   */
  autoMaxHeight?: boolean;

  /**
   * Specifies whether the border betweeen the body and footer is displayed.
   */
  withFooterBorder?: boolean;

  /**
   * Specifies whether to display the modal dialog body in the full screen mode without paddings.
   */
  fullScreen?: boolean;

  /**
   * Defines the event listeners.
   */
  eventListeners?: {
    /**
     * Defines the event listener name.
     */
    name: string;

    /**
     * Sets a function which is triggered whenever the event listener is processed.
     */
    onAction: () => Promise<IMessage> | IMessage | Promise<void> | void;
  }[];

  /**
   * Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked.
   */
  onClose: () => Promise<IMessage> | IMessage | Promise<void> | void;

  /**
   * Sets a function which is triggered whenever the modal dialog is loaded.
   */
  onLoad: () => Promise<{
    /**
     * Defines a new modal dialog header.
     */
    newDialogHeader?: string;

    /**
     * Defines a new modal dialog body.
     */
    newDialogBody: IBox;

    /**
     * Defines a new modal dialog footer.
     */
    newDialogFooter?: IBox;
  }>;
}
