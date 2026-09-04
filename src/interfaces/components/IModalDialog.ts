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

import type { ComponentType } from "react";

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
 * <plugin-image src="modal-dialog.png" dark />
 *
 * :::info
 * `dialogBody` and `dialogFooter` are rendered in separate contexts.
 * Components in `dialogFooter` cannot update components in `dialogBody` using
 * `Actions.updateContext`, and vice versa.
 * :::
 *
 * @example
 *
 * Document preview modal with a React component
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginActions, useCurrentFile } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IModalDialog, ModalDisplayType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function PreviewBody() {
 *   const file = useCurrentFile();
 *   const { closeModal } = usePluginActions();
 *   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 *
 *   useEffect(() => {
 *     if (!file) return;
 *     fetchPreviewUrl(file.id).then(setPreviewUrl);
 *   }, [file?.id]);
 *
 *   return (
 *     <div>
 *       {previewUrl
 *         ? <iframe src={previewUrl} width="100%" height="500px" />
 *         : <p>Loading preview...</p>}
 *       <button onClick={closeModal}>Close</button>
 *     </div>
 *   );
 * }
 *
 * const previewModal: IModalDialog = {
 *   displayType: ModalDisplayType.modal,
 *   dialogHeader: "Document Preview",
 *   dialogBodyComponent: PreviewBody,
 *   autoMaxWidth: true,
 *   autoMaxHeight: true,
 * };
 * ```
 *
 * @example
 *
 * Side panel that lists the files in the current user's folder via API
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginAPI, usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IModalDialog, ModalDisplayType, ToastType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * type FileEntry = { id: number; title: string; fileExst?: string };
 *
 * function FilesListPanel() {
 *   const api = usePluginAPI();
 *   const { closeModal, showToast } = usePluginActions();
 *   const [files, setFiles] = useState<FileEntry[]>([]);
 *
 *   useEffect(() => {
 *     api.get<{ files: FileEntry[] }>("/files/@my").then((folder) => {
 *       setFiles(folder.files);
 *     });
 *   }, []);
 *
 *   const handleSelect = (file: FileEntry) => {
 *     showToast({ type: ToastType.success, title: `Selected: ${file.title}` });
 *     closeModal();
 *   };
 *
 *   return (
 *     <ul>
 *       {files.map((f) => (
 *         <li key={f.id} onClick={() => handleSelect(f)} style={{ cursor: "pointer" }}>
 *           {f.title}{f.fileExst ? `.${f.fileExst}` : ""}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * const filesPanel: IModalDialog = {
 *   displayType: ModalDisplayType.aside,
 *   dialogHeader: "My Files",
 *   dialogBodyComponent: FilesListPanel,
 *   autoMaxHeight: true,
 * };
 * ```
 */
export interface IModalDialog {
  /** Defines the modal dialog display type
   */
  displayType?: ModalDisplayType;

  /** Defines the modal dialog header
   */
  dialogHeader?: string;

  /**
   * Defines the modal dialog body rendered via the IBox component tree.
   * Use either `dialogBody` or `dialogBodyComponent`, not both.
   *
   * @deprecated Use `dialogBodyComponent` instead — accepts a React component and supports hooks from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  dialogBody?: IBox;

  /**
   * A React component rendered as the modal dialog body.
   * Use either `dialogBodyComponent` or `dialogBody`, not both.
   * The component can use `usePluginActions` and other hooks
   * from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  dialogBodyComponent?: ComponentType;

  /**
   * Defines the modal dialog footer rendered via the IBox component tree.
   *
   * @deprecated Use `dialogBodyComponent` to render footer content within the component instead.
   */
  dialogFooter?: IBox;

  /** Specifies whether the "max-width: auto" property is set
   */
  autoMaxWidth?: boolean;

  /** Specifies whether the "max-height: auto" property is set
   */
  autoMaxHeight?: boolean;

  /** Specifies whether the modal dialog body has no paddings
   */
  withoutBodyPadding?: boolean;

  /** Specifies whether the modal dialog header has no bottom margins
   */
  withoutHeaderMargin?: boolean;

  /** Specifies whether the border betweeen the body and footer is displayed
   */
  withFooterBorder?: boolean;

  /** Specifies whether to display the modal dialog body in the full screen mode without paddings
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

  /** Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked
   */
  onClose?: () => Promise<IMessage> | IMessage | Promise<void> | void;

  /**
   * Sets a function which is triggered whenever the modal dialog is loaded.
   *
   * @deprecated Use a React component via `dialogBodyComponent` with `useEffect` for data loading instead.
   */
  onLoad?: () => Promise<{
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
 */
export enum ModalDisplayType {
  /** Modal dialog displayed in the center of the screen */
  modal = "modal",
  /** Modal dialog displayed as a side panel */
  aside = "aside",
}
