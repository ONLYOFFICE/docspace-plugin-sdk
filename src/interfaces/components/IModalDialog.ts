/**
 * (c) Copyright Ascensio System SIA 2026
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
import { IBox } from "./IBox";

/**
 * Modal dialog.
 *
 * To display the dialog, return an [`IMessage`](../utils.md#imessage) with
 * [`Actions.showModal`](../../enums/Actions.md#showmodal) in `actions`
 * and pass the dialog configuration in `modalDialogProps`.
 * Use [`Actions.closeModal`](../../enums/Actions.md#closemodal) to close it.
 *
 * <plugin-image src="modal-dialog.png" />
 *
 * @example
 *
 * Interactive document preview modal with dynamic content loading
 *
 * ```typescript
 * import {
 *   IModalDialog,
 *   ModalDisplayType,
 *   Components,
 *   ButtonSize,
 *   Actions,
 *   ToastType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const filePreviewModal: IModalDialog = {
 *   displayType: ModalDisplayType.modal,
 *   dialogHeader: "Document Preview",
 *   dialogBody: {
 *     children: [
 *       {
 *         component: Components.iFrame,
 *         props: {
 *           src: "https://example.com/preview/doc.pdf",
 *           width: "100%",
 *           height: "600px"
 *         }
 *       }
 *     ]
 *   },
 *   dialogFooter: {
 *     children: [
 *       {
 *         component: Components.button,
 *         props: {
 *           label: "Close",
 *           size: ButtonSize.normal,
 *           onClick: () => {
 *             return {
 *               actions: [Actions.closeModal]
 *             };
 *           }
 *         }
 *       }
 *     ]
 *   },
 *   autoMaxWidth: true,
 *   autoMaxHeight: true,
 *   withFooterBorder: true,
 *   fullScreen: false,
 *   eventListeners: [
 *     {
 *       name: "documentLoaded",
 *       onAction: async () => {
 *         return {
 *           actions: [Actions.showToast],
 *           toastProps: [{
 *             type: ToastType.success,
 *             title: "Document loaded successfully"
 *           }]
 *         };
 *       }
 *     }
 *   ],
 *   onClose: () => {
 *     return {
 *       actions: [Actions.closeModal]
 *     };
 *   },
 *   onLoad: async () => {
 *     const documentDetails = await fetchDocumentDetails();
 *     return {
 *       newDialogHeader: `Preview: ${documentDetails.name}`,
 *       newDialogBody: {
 *         children: [
 *           {
 *             component: Components.iFrame,
 *             props: {
 *               src: documentDetails.previewUrl,
 *               width: "100%",
 *               height: "600px"
 *             }
 *           }
 *         ]
 *       }
 *     };
 *   }
 * }
 * ```
 *
 * @example
 *
 * Side panel settings dialog with API key configuration
 *
 * ```typescript
 * const apiKeyInput: IInput = {
 *   value: "",
 *   type: InputType.password,
 *   placeholder: "Enter your API key",
 *   onChange: (value) => ({
 *     actions: [Actions.updateProps],
 *     newProps: { ...apiKeyInput, value }
 *   })
 * };
 *
 * const settingsPanel: IModalDialog = {
 *   displayType: ModalDisplayType.aside,
 *   dialogHeader: "Plugin Settings",
 *   dialogBody: {
 *     children: [
 *       {
 *         component: Components.label,
 *         props: { text: "API Key" }
 *       },
 *       {
 *         component: Components.input,
 *         props: apiKeyInput
 *       }
 *     ]
 *   },
 *   autoMaxWidth: false,
 *   autoMaxHeight: true,
 *   withFooterBorder: true,
 *   fullScreen: false,
 *   onClose: () => ({
 *     actions: [Actions.closeModal]
 *   }),
 *   onLoad: async () => {
 *     const settings = await loadSettings();
 *     return {
 *       newDialogBody: {
 *         children: [
 *           {
 *             component: Components.label,
 *             props: { text: "API Key" }
 *           },
 *           {
 *             component: Components.input,
 *             props: { ...apiKeyInput, value: settings.apiKey }
 *           }
 *         ]
 *       }
 *     };
 *   }
 * }
 * ```
 *
 * @remarks
 * **Important:** `dialogBody` and `dialogFooter` are rendered in separate contexts.
 * Components in `dialogFooter` cannot update components in `dialogBody` using
 * `Actions.updateContext`, and vice versa.
 */
export interface IModalDialog {
  /** Defines the modal dialog display type
   *

   */
  displayType: ModalDisplayType;

  /** Defines the modal dialog header
   *

   */
  dialogHeader?: string;

  /** Defines the modal dialog body
   *

   */
  dialogBody: IBox;

  /** Defines the modal dialog footer
   *

   */
  dialogFooter?: IBox;

  /** Specifies whether the "max-width: auto" property is set
   *

   */
  autoMaxWidth?: boolean;

  /** Specifies whether the "max-height: auto" property is set
   *

   */
  autoMaxHeight?: boolean;

  /** Specifies whether the modal dialog body has no paddings
   *

   */
  withoutBodyPadding?: boolean;

  /** Specifies whether the modal dialog header has no bottom margins
   *

   */
  withoutHeaderMargin?: boolean;

  /** Specifies whether the border betweeen the body and footer is displayed
   *

   */
  withFooterBorder?: boolean;

  /** Specifies whether to display the modal dialog body in the full screen mode without paddings
   *

   */
  fullScreen?: boolean;

  /**
   * Defines the event listeners.
   *

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

  /** Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked
   *

   */
  onClose: () => Promise<IMessage> | IMessage | Promise<void> | void;

  /**
   * Sets a function which is triggered whenever the modal dialog is loaded.
   *

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

/**
 * The supported modal dialog types.
 *

 */
export const enum ModalDisplayType {
  /** Modal dialog displayed in the center of the screen */
  modal = "modal",
  /** Modal dialog displayed as a side panel */
  aside = "aside",
}
