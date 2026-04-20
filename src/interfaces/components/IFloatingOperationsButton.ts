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

import { IMessage, TReturnMessage } from "../utils";


/**
 * Configuration for the floating operations button.
 * Used to display progress of long-running operations (upload, conversion, backup, etc.)
 * The button appears as a floating action button in the bottom-right corner of DocSpace.
 *
 * @example
 *
 * Demonstrates a floating operations in button with simulated upload progress,
 * allowing users to cancel the process or remove individual operations while
 * preventing a new upload until the current one finishes.
 *
 * ```typescript
 * import {
 *   IFloatingOperationsButton,
 *   FloatingOperationType,
 *   Actions,
 *   IContextMenuItem,
 *   FilesType,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const operations = [
 *   {
 *       id: "upload-document",
 *       label: "Uploading document.pdf",
 *       operation: FloatingOperationType.Upload,
 *       alert: false,
 *       completed: false,
 *       percent: 0,
 *       // custom icon from assets
 *       icon: "upload.svg",
 *   },
 *   {
 *       id: "convert-image",
 *       label: "Converting image.jpg",
 *       operation: FloatingOperationType.Convert,
 *       alert: false,
 *       completed: false,
 *       percent: 0,
 *   }
 * ]
 *
 * // flag to check if upload is in progress
 * let isUpload = false;
 * let intervalId: NodeJS.Timeout | null = null;
 *
 * export const uploadButton: IFloatingOperationsButton = {
 *   id: "upload-button",
 *   operationsCompleted: false,
 *   operationsAlert: false,
 *   // show cancel button when there is only one operation left
 *   showCancelButton: true,
 *
 *   cancelOperation: () => {
 *       // reset interval and flags
 *       intervalId && clearInterval(intervalId);
 *       isUpload = false;
 *       intervalId = null;
 *       // send message to remove floating operations from button
 *       return {
 *           actions: [Actions.removeFloatingOperationsButton],
 *           floatingOperationsButtonPropsId: uploadButton.id,
 *       };
 *   },
 *
 *   onCancelOperationFromList: (id) => {
 *       // remove operation from list
 *       const filteredOps = uploadButton.operations?.filter(
 *           (op) => op.id !== id
 *       ) ?? [];
 *
 *       // update operations
 *       uploadButton.operations = filteredOps;
 *
 *       // send message to update floating operations button
 *       return {
 *           actions: [Actions.updateFloatingOperationsButton],
 *           floatingOperationsButtonProps: uploadButton,
 *       };
 *   },
 *
 *   // event on add floating operations in button
 *   onLoad: (dispatchMessage) => {
 *       let progress = 0;
 *       isUpload = true;
 *
 *       // update progress every 400ms
 *       intervalId = setInterval(() => {
 *           progress += 5;
 *
 *           // update progress for each operation
 *           const operations = uploadButton.operations?.map((op) => ({
 *               ...op,
 *               percent: progress,
 *               completed: progress >= 100,
 *           })) ?? [];
 *
 *           uploadButton.operations = operations;
 *
 *           // update operations completed
 *           uploadButton.operationsCompleted = progress >= 100;
 *
 *           // send message to update floating operations button
 *           dispatchMessage({
 *               actions: [Actions.updateFloatingOperationsButton],
 *               floatingOperationsButtonProps: uploadButton,
 *           });
 *
 *           // stop interval if progress is 100
 *           if (progress >= 100) {
 *               // reset interval and flags
 *               intervalId && clearInterval(intervalId);
 *               isUpload = false;
 *               intervalId = null;
 *           }
 *       }, 400);
 *   },
 * };
 *
 * export const uploadMenuItem: IContextMenuItem = {
 *   key: "upload-files",
 *   label: "Upload with progress",
 *   icon: "upload.svg",
 *   fileType: [FilesType.file],
 *   onClick: () => {
 *       // if upload is in progress, do not allow to start new upload
 *       if (isUpload) {
 *           return;
 *       }
 *
 *       // Reset operations from previous upload
 *       uploadButton.operations = structuredClone(operations);
 *       uploadButton.operationsCompleted = false;
 *       uploadButton.operationsAlert = false;
 *
 *       // send message to add floating operations in button
 *       return {
 *           actions: [Actions.addFloatingOperationsButton],
 *           floatingOperationsButtonProps: uploadButton,
 *       };
 *   },
 * };
 * ```
 *
 */
export interface IFloatingOperationsButton {
   /**
    * Unique identifier for floating operations.
    * Used to track and update operations from the same plugin.
    * When Actions.addFloatingOperationsButton is called again with the same identifier,
    * operations in the button will not be replaced as long as there are operations in the button.
    * Use Actions.updateFloatingOperationsButton to update the state.
   */
   id: string;

   /**
    * Array of operations to display in the floating button.
    * Each operation shows as a row with icon, label, and progress indicator.
    * Operations from multiple plugins are aggregated and displayed together.

    */
   operations?: IFloatingOperation[];

   /**
    * Flag indicating all operations are completed.
    * When true, the button shows a green checkmark and "completed" status.
    * User can then dismiss the button or review completed operations.
    *

    */
   operationsCompleted?: boolean;

   /**
    * Flag indicating at least one operation has an error.
    * When true, the button shows a red warning indicator.
    *

    */
   operationsAlert?: boolean;

   /**
    * Controls the visibility of the cancel button.
    * Cancel button is displayed only if the floating button contains only one operation
    * from the plugin and this flag is set to true.
    *

    */
   showCancelButton?: boolean;

   /**
    * Callback executed when user clicks the cancel button in the floating button.
    *

    */
   cancelOperation?: () => TReturnMessage;

   /**
    * Callback executed when user closes a specific operation from the operations list.
    * Receives the operation ID.
    * Typically returns Actions.updateFloatingOperationsButton with the updated operations list.
    *

    */
   onCancelOperationFromList?: (operationId: string) => TReturnMessage;

   /**
    * Lifecycle callback executed once when floating operations button with given id is displayed for the first time.
    * Receives a dispatchMessage function to send updates back to DocSpace.
    * Use this to initialize progress tracking or update.
    * @param dispatchMessage - Function to send progress updates to DocSpace
    *

    */
   onLoad?: (dispatchMessage: (message: IMessage) => void) => TReturnMessage;
}


/**
 * Determines the icon and visual representation of the operation.
 *

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

 *
 */
export interface IFloatingOperation {
   /**
    * Unique identifier for the operation.
    */
   id: string;

   /**
    * Text label displayed to the user describing the operation.
    * Example: "Uploading document.pdf" or "Converting 5 files"
    *

    */
   label: string;

   /**
    * Type of operation - determines the default icon and visual representation.
    * Use predefined types (Upload, Convert, etc.).
    *

    */
   operation: FloatingOperationType;

   /**
    * Error flag - if true, the operation is displayed with a warning/error state.
    * Shows red icon and allows user to see what went wrong.
    *

    * Shows red icon.
    */
   alert: boolean;

   /**
    * Completion flag - if true, the operation is marked as completed.
    * Shows checkmark icon and allows user to dismiss the operation.
    *

    */
   completed: boolean;

   /**
    * Progress percentage of the operation (0-100).
    * If undefined, displays an infinite loader animation instead of percentage.
    *

    */
   percent?: number;

   /**
    * Custom icon for the operation (overrides default operation icon).
    * The icon image must be uploaded to the "assets" folder.
    * Only specify the filename here, e.g., "upload.svg" or "custom-icon.png".
    *

    */
   icon?: string;
}
