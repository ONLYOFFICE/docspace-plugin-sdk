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
 * @category Modal Dialog Component
 *
 * The supported modal dialog types.
 */
export const enum ModalDisplayType {
  modal = "modal",
  aside = "aside",
}

/**
 * @category Modal Dialog Component
 *
 * Modal dialog.
 *
 * @param displayType - Defines the modal dialog display type.
 *
 * @param dialogHeader - Defines the modal dialog header.
 *
 * @param dialogBody - Defines the modal dialog body.
 *
 * @param dialogFooter - Defines the modal dialog footer.
 *
 * @param autoMaxWidth - Specifies whether the "max-width: auto" property is set.
 *
 * @param autoMaxHeight - Specifies whether the "max-height: auto" property is set.
 *
 * @param withFooterBorder - Specifies whether the border betweeen the body and footer is displayed.
 *
 * @param fullScreen - Specifies whether to display the modal dialog body in the full screen mode without paddings.
 *
 * @param eventListeners - Defines the event listeners. Each listener has a name and an onAction function.
 *
 * @param onClose - Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked.
 *
 * @param onLoad - Sets a function which is triggered whenever the modal dialog is loaded. Returns an object with optional new dialog header, body, and footer.
 */
export interface IModalDialog {
  displayType: ModalDisplayType;
  dialogHeader?: string;
  dialogBody: IBox;
  dialogFooter?: IBox;
  autoMaxWidth?: boolean;
  autoMaxHeight?: boolean;
  withFooterBorder?: boolean;
  fullScreen?: boolean;
  eventListeners?: {
    name: string;
    onAction: () => Promise<IMessage> | IMessage | Promise<void> | void;
  }[];
  onClose: () => Promise<IMessage> | IMessage | Promise<void> | void;
  onLoad: () => Promise<{
    newDialogHeader?: string;
    newDialogBody: IBox;
    newDialogFooter?: IBox;
  }>;
}
