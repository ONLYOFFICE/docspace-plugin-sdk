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
 * Configuration for the floating operations button.
 * Used to display progress of long-running operations (upload, conversion, backup, etc.)
 * The button appears as a floating action button in the bottom-right corner of DocSpace.
 * 
 * @category FloatingOperations
 * 
 * @categoryDescription Operations
 * 
 * Properties related to managing and displaying operation items in the floating button.
 * 
 * @categoryDescription State
 * 
 * Properties that control the current state and appearance of the floating operations button.
 * 
 * @categoryDescription Behavior
 * 
 * Callback functions and lifecycle events for handling user interactions and button lifecycle.
 * 
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
 * // Example: File upload with progress tracking
 * export const uploadButton: IFloatingOperationsButton = {
 *   operations: [
 *     {
 *       label: "Uploading document.pdf",
 *       operation: FloatingOperationType.Upload,
 *       alert: false,
 *       completed: false,
 *       percent: 0,
 *       icon: "upload.svg", // Custom icon from assets folder
 *     },
 *     {
 *       label: "Converting image.jpg",
 *       operation: FloatingOperationType.Convert,
 *       alert: false,
 *       completed: false,
 *       percent: 0,
 *     }
 *   ],
 *   operationsCompleted: false,
 *   operationsAlert: false,
 *   showCancelButton: true,
 *   
 *   // Handle cancel button click
 *   cancelOperation: () => {
 *     // Stop upload and close button
 *     return {
 *       actions: [Actions.closeFloatingOperationsButton]
 *     };
 *   },
 *   
 *   // Handle closing individual operation from list
 *   onCancelOperationFromList: (operation) => {
 *     const filteredOps = uploadButton.operations?.filter(
 *       (op) => op.operation !== operation
 *     ) ?? [];
 *     
 *     uploadButton.operations = filteredOps;
 *     
 *     return {
 *       actions: [Actions.updateFloatingOperationsButton],
 *       floatingOperationsButtonProps: uploadButton,
 *     };
 *   },
 *   
 *   // Initialize and track progress
 *   onLoad: (dispatchMessage) => {
 *     let progress = 0;
 *     
 *     const interval = setInterval(() => {
 *       progress += 5;
 *       
 *       const operations = uploadButton.operations?.map((op) => ({
 *         ...op,
 *         percent: progress,
 *         completed: progress >= 100,
 *       })) ?? [];
 *       
 *       dispatchMessage({
 *         actions: [Actions.updateFloatingOperationsButton],
 *         floatingOperationsButtonProps: {
 *           ...uploadButton,
 *           operations,
 *           operationsCompleted: progress >= 100,
 *         },
 *       });
 *       
 *       if (progress >= 100) {
 *         clearInterval(interval);
 *       }
 *     }, 200);
 *   },
 *   
 *   // Cleanup when button is closed
 *   onClose: () => {
 *     console.log("Operations button closed");
 *     return {};
 *   },
 * };
 * 
 * // Context menu item to trigger the button
 * export const uploadMenuItem: IContextMenuItem = {
 *   key: "upload-files",
 *   label: "Upload with progress",
 *   icon: "upload.svg",
 *   fileType: [FilesType.file],
 *   onClick: () => ({
 *     actions: [Actions.showFloatingOperationsButton],
 *     floatingOperationsButtonProps: uploadButton,
 *   }),
 * };
 * ```
 */
export interface IFloatingOperationsButton {
  /** 
   * Array of operations to display in the button.
   * Each operation shows as a separate row with its own progress indicator.
   * Update this array and call Actions.updateFloatingOperationsButton to refresh the UI.
   * 
   * @category Operations
   */
  operations?: IFloatingOperation[];

  /** 
   * Flag indicating all operations are completed.
   * When true, the button shows a green checkmark and "completed" status.
   * User can then dismiss the button or review completed operations.
   * 
   * @category State
   */
  operationsCompleted?: boolean;

  /** 
   * Flag indicating there are errors in any operation.
   * When true, the button is displayed with red alert state to draw attention.
   * User can expand to see which operations failed.
   * 
   * @category State
   */
  operationsAlert?: boolean;

  /** 
   * Whether to show the cancel button in the operations panel.
   * When true, displays an "X" button allowing user to cancel all operations.
   * Set to false for operations that cannot be interrupted.
   * 
   * @category State
   */
  showCancelButton?: boolean;

  /** 
   * Callback for canceling all operations.
   * Called when user clicks the cancel button in the operations panel.
   * Typically returns Actions.closeFloatingOperationsButton to hide the button.
   * 
   * @category Behavior
   */
  cancelOperation?: () => TReturnMessage;

  /**
   * Callback for closing a single completed operation from the list.
   * Called when user clicks the close icon next to an individual operation.
   * @param operation - The operation type identifier to remove from the list
   * @returns Message with Actions.updateFloatingOperationsButton and updated operations array
   * 
   * @category Behavior
   */
  onCancelOperationFromList?: (operation: string) => TReturnMessage;

  /** 
   * Callback invoked when the button is first displayed.
   * Use this to start your operation and track progress.
   * Call dispatchMessage with Actions.updateFloatingOperationsButton to update progress.
   * @param dispatchMessage - Function to send progress updates to DocSpace
   * 
   * @category Behavior
   */
  onLoad?: (dispatchMessage: (message: IMessage) => void) => TReturnMessage;

  /**
   * Callback invoked when the button is closed or dismissed.
   * Use this for cleanup (clearing intervals, canceling requests, etc.).
   * Called automatically when user dismisses the button or all operations complete.
   * 
   * @category Behavior
   */
  onClose?: () => TReturnMessage;
}


/**
 * Determines the icon and visual representation of the operation.
 * 
 * @category FloatingOperations
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
 * Each operation displays as a row with icon, label, and progress indicator.
 * 
 * @category FloatingOperations
 * 
 * @categoryDescription Content
 * 
 * Properties that define the operation's display content and identification.
 * 
 * @categoryDescription State
 * 
 * Properties that control the operation's current state and progress.
 * 
 * @categoryDescription Appearance
 * 
 * Properties that customize the visual representation of the operation.
 */
export interface IFloatingOperation {
  /** 
   * Text label displayed to the user describing the operation.
   * Example: "Uploading document.pdf" or "Converting 5 files"
   * 
   * @category Content
   */
  label: string;

  /** 
   * Type of operation - determines the default icon and visual representation.
   * Use predefined types (Upload, Convert, etc.) or "Other" for custom operations.
   * 
   * @category Content
   */
  operation: FloatingOperationType;

  /** 
   * Error flag - if true, the operation is displayed with a warning/error state.
   * Shows red icon and allows user to see what went wrong.
   * 
   * @category State
   */
  alert: boolean;

  /** 
   * Completion flag - if true, the operation is marked as completed.
   * Shows checkmark icon and allows user to dismiss the operation.
   * 
   * @category State
   */
  completed: boolean;

  /** 
   * Progress percentage of the operation (0-100).
   * If undefined, displays an infinite loader animation instead of percentage.
   * 
   * @category State
   */
  percent?: number;

  /** 
   * Custom icon for the operation (overrides default operation icon).
   * The icon image must be uploaded to the "assets" folder.
   * Only specify the filename here, e.g., "upload.svg" or "custom-icon.png".
   * 
   * @category Appearance
   */
  icon?: string;
}


