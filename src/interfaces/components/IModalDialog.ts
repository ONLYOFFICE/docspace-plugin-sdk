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
 * The supported modal dialog types.
 *
 * @category ModalDialog
 */
export enum ModalDisplayType {
  /** Modal dialog displayed in the center of the screen */
  modal = "modal",
  /** Modal dialog displayed as a side panel */
  aside = "aside",
}

/**
 * Modal dialog.
 *
 * @category ModalDialog
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
 * Document preview modal with React component
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginActions, useCurrentFile } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * function PreviewBody() {
 *   const file = useCurrentFile();
 *   const { closeModal, showToast } = usePluginActions();
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
 * Side panel that lists files in the current user's folder via API
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePluginAPI, usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * type FileEntry = { id: number; title: string; fileExst?: string };
 *
 * function FilesListPanel() {
 *   const api = usePluginAPI();
 *   const { closeModal, showToast } = usePluginActions();
 *   const [files, setFiles] = useState<FileEntry[]>([]);
 *
 *   useEffect(() => {
 *     api.get<{ response: { files: FileEntry[] } }>("/files/@my").then((res) => {
 *       setFiles(res.response.files);
 *     });
 *   }, []);
 *
 *   const handleSelect = (file: FileEntry) => {
 *     showToast({ type: "success", title: `Selected: ${file.title}` });
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
   *
   * @category Appearance
   */
  displayType?: ModalDisplayType;

  /** Defines the modal dialog header
   *
   * @category Content
   */
  dialogHeader?: string;

  /**
   * Defines the modal dialog body rendered via the IBox component tree.
   * Use either `dialogBody` or `dialogBodyComponent`, not both.
   *
   * @category Content
   * @deprecated Use `dialogBodyComponent` instead — accepts a React component and supports hooks from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  dialogBody?: IBox;

  /**
   * A React component rendered as the modal dialog body.
   * Use either `dialogBodyComponent` or `dialogBody`, not both.
   * The component can use `usePluginActions` and other hooks
   * from `@onlyoffice/docspace-plugin-sdk/react`.
   *
   * @category Content
   */
  dialogBodyComponent?: ComponentType;

  /**
   * Defines the modal dialog footer rendered via the IBox component tree.
   *
   * @category Content
   * @deprecated Use `dialogBodyComponent` to render footer content within the component instead.
   */
  dialogFooter?: IBox;

  /** Specifies whether the "max-width: auto" property is set
   *
   * @category Appearance
   */
  autoMaxWidth?: boolean;

  /** Specifies whether the "max-height: auto" property is set
   *
   * @category Appearance
   */
  autoMaxHeight?: boolean;

  /** Specifies whether the modal dialog body has no paddings
   *
   * @category Appearance
   */
  withoutBodyPadding?: boolean;

  /** Specifies whether the modal dialog header has no bottom margins
   *
   * @category Appearance
   */
  withoutHeaderMargin?: boolean;

  /** Specifies whether the border betweeen the body and footer is displayed
   *
   * @category Appearance
   */
  withFooterBorder?: boolean;

  /** Specifies whether to display the modal dialog body in the full screen mode without paddings
   *
   * @category Appearance
   */
  fullScreen?: boolean;

  /**
   * Defines the event listeners.
   *
   * @category Behavior
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
   * @category Behavior
   */
  onClose?: () => Promise<IMessage> | IMessage | Promise<void> | void;

  /**
   * Sets a function which is triggered whenever the modal dialog is loaded.
   *
   * @category Behavior
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
