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
import { IComboBoxItem } from "./IComboBox";

/**
 * Modal dialog for creating certain item (file, folder, etc.).
 * The user gets the full access to the functionality but cannot control the layout.
 *
 * To display the dialog, return an [`IMessage`](../utils.md#imessage) with
 * [`Actions.showCreateDialogModal`](../../enums/Actions.md#showcreatedialogmodal) in `actions`
 * and pass the dialog configuration in `createDialogProps`.
 * Use [`Actions.updateCreateDialogModal`](../../enums/Actions.md#updatecreatedialogmodal)
 * to update an open dialog.
 *
 * <plugin-image src="createdialog.png" dark />
 *
 * @example
 *
 * Document creation dialog with multiple format options
 *
 * ```typescript
 * let format = "docx";
 *
 * const newDocumentDialog: ICreateDialog = {
 *   title: "Create New Document",
 *   startValue: "Untitled",
 *   visible: true,
 *   options: [
 *     {
 *       key: "docx",
 *       label: "Word Document",
 *       icon: "word.svg"
 *     },
 *     {
 *       key: "xlsx",
 *       label: "Excel Spreadsheet",
 *       icon: "excel.svg"
 *     },
 *     {
 *       key: "pptx",
 *       label: "PowerPoint Presentation",
 *       icon: "powerpoint.svg"
 *     }
 *   ],
 *   selectedOption: {
 *     key: "docx",
 *     label: "Word Document",
 *     icon: "word.svg"
 *   },
 *   onSelect: (option) => {
 *     format = option.key;
 *
 *     return {
 *       actions: [Actions.updateCreateDialogModal],
 *       createDialogProps: {
 *         ...newDocumentDialog,
 *         selectedOption: option,
 *         extension: option.key
 *       }
 *     };
 *   },
 *   onSave: async (e, value) => {
 *     // A throw here keeps the dialog open and hands the error to onError
 *     await createDocument(value, format);
 *
 *     // The dialog then closes by itself: isCloseAfterCreate defaults to true
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         title: `Document "${value}" created successfully`,
 *         type: ToastType.success
 *       }]
 *     };
 *   },
 *   onError: (error) => {
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         title: "Failed to create document. Please try again.",
 *         type: ToastType.error
 *       }]
 *     };
 *   },
 *   onCancel: (e) => {
 *     // Clean up any temporary state if needed
 *   },
 *   onClose: (e) => {
 *     // Additional cleanup or analytics
 *   },
 *   isCreateDialog: true,
 *   extension: "docx"
 * }
 * ```
 *
 * @example
 *
 * Name check that keeps the error text in the dialog
 *
 * ```typescript
 * const newDiagramDialog: ICreateDialog = {
 *   title: "Create diagram",
 *   startValue: "New diagram",
 *   visible: true,
 *   isCreateDialog: true,
 *   isAutoFocusOnError: true,
 *   extension: "drawio",
 *   onSave: async (e, value) => {
 *     if (!value.trim()) throw new Error("Enter a diagram name");
 *
 *     await drawIo.createNewFile(value);
 *   },
 *   onError: (error) => ({
 *     actions: [Actions.updateCreateDialogModal],
 *     createDialogProps: { ...newDiagramDialog, errorText: error.message }
 *   })
 * };
 * ```
 */
export interface ICreateDialog {
  /**
   * Defines the modal dialog title.
   */
  title: string;

  /**
   * Defines the modal dialog start value.
   */
  startValue: string;

  /**
   * Specifies if the modal dialog is visible or not.
   */
  visible: boolean;

  /**
   * Specifies if the create button is disabled.
   */
  isCreateDisabled?: boolean;

  /**
   * Specifies if the modal dialog should be closed after the create action.
   * @default true
   *
   * @remarks
   * Once [`onSave`](#onsave) resolves, the dialog closes whatever its message
   * sets, so an [`errorText`](#errortext) returned there disappears with it.
   * To keep the dialog open on a validation error, throw from `onSave` and
   * return the text from [`onError`](#onerror): the dialog is never closed on
   * that path. With `false`, the plugin closes the dialog itself with
   * [`Actions.updateCreateDialogModal`](../../enums/Actions.md#updatecreatedialogmodal)
   * and `visible: false`.
   */
  isCloseAfterCreate?: boolean;

  /**
   * Defines an array of the modal dialog options.
   */
  options?: IComboBoxItem[];

  /**
   * Defines the selected modal dialog option.
   */
  selectedOption?: IComboBoxItem;

  /**
   * Error text to display when validation fails or an error occurs.
   *
   * @remarks
   * Return it from [`onError`](#onerror) or [`onChange`](#onchange). Returned
   * from a successful [`onSave`](#onsave), it closes together with the dialog
   * unless [`isCloseAfterCreate`](#iscloseaftercreate) is `false`.
   */
  errorText?: string;

  /**
   * Sets a function which is triggered whenever the modal dialog option is selected.
   */
  onSelect?: (option: IComboBoxItem) => IMessage | void;

  /**
   * Sets a function which is triggered whenever the input value changes.
   */
  onChange?: (value: string) => IMessage | void;

  /**
   * Sets a function which is triggered whenever the data in the modal dialog is saved.
   */
  onSave?: (
    e: any,
    value: string
  ) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Sets a function which is triggered whenever an action in the modal dialog is canceled.
   */
  onCancel?: (e: any) => void;

  /**
   * Sets a function which is triggered whenever the modal dialog is closed.
   */
  onClose?: (e: any) => void;

  /**
   * Sets a function which is triggered whenever an error occurs during the onSave operation.
   *
   * @remarks
   * Runs when [`onSave`](#onsave) throws or rejects. The dialog stays open
   * whatever [`isCloseAfterCreate`](#iscloseaftercreate) is, so an
   * [`errorText`](#errortext) set by the returned message stays on screen.
   */
  onError?: (e: any) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Specifies if this modal dialog is for creating certain item (file, folder, etc.).
   */
  isCreateDialog: boolean;

  /**
   * Specifies if this modal dialog should automatically focus on the error input field when an error occurs during the onSave operation.
   */
  isAutoFocusOnError?: boolean;

  /**
   * Defines an extension of an item which will be created (file, folder, etc.).
   */
  extension?: string;
}
