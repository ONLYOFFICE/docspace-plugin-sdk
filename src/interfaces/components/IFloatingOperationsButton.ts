/**
 * (c) Copyright Ascensio System SIA 2025
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

import { IMessage, TReturnMessage } from "../utils";

/**
 * @example
 * ```typescript
 * import {
 *   IFloatingOperationsButton,
 *   FloatingOperationType,
 *   Actions,
 *   IContextMenuItem,
 *   FilesType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 * 
 * // Create operations array
 * const operations = [
 *   {
 *     label: "Uploading file.pdf",        // Text displayed to user
 *     operation: FloatingOperationType.Upload,  // Operation type (determines icon)
 *     alert: false,                       // No error
 *     completed: false,                   // Not completed yet
 *     percent: 0,                         // Initial progress 0%
 *   }
 * ];
 * 
 * // Configure floating operations button
 * export const uploadButton: IFloatingOperationsButton = {
 *   operations,
 *   operationsCompleted: false,
 *   operationsAlert: false,
 *   showCancelButton: true,
 *   
 *   // Called when user clicks cancel button
 *   cancelOperation: () => {
 *     return {
 *       actions: [Actions.closeFloatingOperationsButton]
 *     };
 *   },
 *   
 *   // Called when button is initialized
 *   onLoad: (dispatchMessage) => {
 *     let progress = 0;
 *     
 *     // Simulate upload progress
 *     const interval = setInterval(() => {
 *       progress += 20;
 *       operations[0].percent = progress;
 *       
 *       // Send update to DocSpace
 *       dispatchMessage({
 *         actions: [Actions.updateFloatingOperationsButton],
 *         floatingOperationsButtonProps: {
 *           ...floatingOperationsButtonProps,
 *           operations,
 *           operationsCompleted: progress >= 100,
 *         },
 *       });
 *       
 *       if (progress >= 100) {
 *         clearInterval(interval);
 *       }
 *     }, 1000);
 *     
 *   },
 * };
 * 

/**
 * Types of operations for the floating progress button.
 * Determines the icon and visual representation of the operation.
 */
export enum FloatingOperationType {
  /** File download operation */
  Download = 'download',
  /** File conversion operation */
  Convert = 'convert',
  /** File copy operation */
  Copy = 'copy',
  /** File duplication operation */
  Duplicate = 'duplicate',
  /** Mark as read operation */
  MarkAsRead = 'markAsRead',
  /** Permanent deletion operation */
  DeletePermanently = 'deletePermanently',
  /** Export index operation */
  ExportIndex = 'exportIndex',
  /** File move operation */
  Move = 'move',
  /** Move to trash operation */
  Trash = 'trash',
  /** Other custom operation */
  Other = 'other',
  /** File upload operation */
  Upload = 'upload',
  /** Delete file version operation */
  DeleteVersionFile = 'deleteVersionFile',
  /** Backup operation */
  Backup = 'backup',
}

/**
 * Represents a single operation in the floating operations button.
 */
export interface IFloatingOperation {
  /** Text label displayed to the user describing the operation */
  label: string;
  /** Type of operation - determines the icon and visual representation */
  operation: FloatingOperationType;
  /** Error flag - if true, the operation is displayed with a warning/error state */
  alert: boolean;
  /** Completion flag - if true, the operation is marked as completed */
  completed: boolean;
  /** If undefined, will be displayed infinity loader. Progress percentage of the operation (0-100) */
  percent?: number;
}

/**
 * Configuration for the floating operations button.
 * Used to display progress of long-running operations (upload, conversion, backup, etc.)
 */
export interface IFloatingOperationsButton {
  /** Array of operations to display in the button */
  operations?: IFloatingOperation[];
  /** Flag indicating all operations are completed - if true, button shows "completed" status */
  operationsCompleted?: boolean;
  /** Flag indicating there are errors - if true, button is displayed with alert state */
  operationsAlert?: boolean;
  /** Whether to show the cancel button */
  showCancelButton?: boolean;
  /** 
   * Callback for canceling the operation.
   * Called when user clicks the cancel button.
   */
  cancelOperation?: () => TReturnMessage;
  /** 
   * Callback invoked when the button is initialized.
   * Receives dispatchMessage function to send progress updates.
   * Use dispatchMessage to update button state via Actions.updateFloatingOperationsButton.
   * @param dispatchMessage - Function to send messages to DocSpace
   */
  onLoad?: (dispatchMessage: (message: IMessage) => void) => TReturnMessage;
}
