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
  /** Modal dialog displayed in the center of the screen */
  modal = "modal",
  /** Modal dialog displayed as a side panel */
  aside = "aside",
}

/**
 * @category Modal Dialog Component
 *
 * Modal dialog.
 *
 * @example
 * ```typescript
 * // Example 1: File preview modal
 * const filePreviewModal: IModalDialog = {
 *   displayType: ModalDisplayType.modal,
 *   dialogHeader: "Document Preview",
 *   dialogBody: {
 *     children: [
 *       {
 *         component: "iframe",
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
 *         component: "button",
 *         props: {
 *           label: "Download",
 *           onClick: () => {
 *             return {
 *               actions: [Actions.downloadFile],
 *               fileUrl: "https://example.com/download/doc.pdf"
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
 *             title: "Success",
 *             type: "success",
 *             message: "Document loaded successfully"
 *           }]
 *         };
 *       }
 *     }
 *   ],
 *   onClose: () => {
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         visible: false
 *       }
 *     };
 *   },
 *   onLoad: async () => {
 *     const documentDetails = await fetchDocumentDetails();
 *     return {
 *       newDialogHeader: `Preview: ${documentDetails.name}`,
 *       newDialogBody: {
 *         children: [
 *           {
 *             component: "iframe",
 *             props: {
 *               src: documentDetails.previewUrl,
 *               width: "100%",
 *               height: "600px"
 *             }
 *           }
 *         ]
 *       },
 *       newDialogFooter: {
 *         children: [
 *           {
 *             component: "button",
 *             props: {
 *               label: "Download",
 *               onClick: () => ({
 *                 actions: [Actions.downloadFile],
 *                 fileUrl: documentDetails.downloadUrl
 *               })
 *             }
 *           }
 *         ]
 *       }
 *     };
 *   }
 * }
 *
 * // Example 2: Settings panel
 * const settingsPanel: IModalDialog = {
 *   displayType: ModalDisplayType.aside,
 *   dialogHeader: "Plugin Settings",
 *   dialogBody: {
 *     children: [
 *       {
 *         component: "input",
 *         props: {
 *           label: "API Key",
 *           type: "password",
 *           value: "",
 *           onChange: (value) => ({
 *             actions: [Actions.updateProps],
 *             newProps: { value }
 *           })
 *         }
 *       }
 *     ]
 *   },
 *   autoMaxWidth: false,
 *   autoMaxHeight: true,
 *   withFooterBorder: true,
 *   fullScreen: false,
 *   onClose: () => ({
 *     actions: [Actions.updateProps],
 *     newProps: { visible: false }
 *   }),
 *   onLoad: async () => {
 *     const settings = await loadSettings();
 *     return {
 *       newDialogBody: {
 *         children: [
 *           {
 *             component: "input",
 *             props: {
 *               label: "API Key",
 *               type: "password",
 *               value: settings.apiKey
 *             }
 *           }
 *         ]
 *       }
 *     };
 *   }
 * }
 * ```
 */
export interface IModalDialog {
  /** Defines the modal dialog display type */
  displayType: ModalDisplayType;

  /** Defines the modal dialog header */
  dialogHeader?: string;

  /** Defines the modal dialog body */
  dialogBody: IBox;

  /** Defines the modal dialog footer */
  dialogFooter?: IBox;

  /** Specifies whether the "max-width: auto" property is set */
  autoMaxWidth?: boolean;

  /** Specifies whether the "max-height: auto" property is set */
  autoMaxHeight?: boolean;

  /** Specifies whether the border betweeen the body and footer is displayed */
  withFooterBorder?: boolean;

  /** Specifies whether to display the modal dialog body in the full screen mode without paddings */
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

  /** Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked */
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
