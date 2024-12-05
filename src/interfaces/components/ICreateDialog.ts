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
import { IComboBoxItem } from "./IComboBox";

/**
 * Modal dialog for creating certain item (file, folder, etc.).
 * The user gets the full access to the functionality but cannot control the layout.
 *
 * @example
 *
 * Document creation dialog with multiple format options
 *
 * ```typescript
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
 *     return {
 *       actions: [Actions.updateProps],
 *       newProps: {
 *         selectedOption: option,
 *         extension: option.key
 *       }
 *     };
 *   },
 *   onSave: async (e, value) => {
 *     try {
 *       // Create the document
 *       await createDocument(value, selectedOption.key);
 *
 *       return {
 *         actions: [Actions.updateProps, Actions.showToast],
 *         newProps: {
 *           visible: false
 *         },
 *         toastProps: [{
 *           title: "Success",
 *           type: "success",
 *           message: `Document "${value}" created successfully`
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           title: "Error",
 *           type: "error",
 *           message: "Failed to create document. Please try again."
 *         }]
 *       };
 *     }
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
   * Defines an array of the modal dialog options.
   */
  options?: IComboBoxItem[];

  /**
   * Defines the selected modal dialog option.
   */
  selectedOption?: IComboBoxItem;

  /**
   * Sets a function which is triggered whenever the modal dialog option is selected.
   */
  onSelect?: (option: IComboBoxItem) => IMessage | void;

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
   * Specifies if this modal dialog is for creating certain item (file, folder, etc.).
   */
  isCreateDialog: boolean;

  /**
   * Defines an extension of an item which will be created (file, folder, etc.).
   */
  extension?: string;
}
