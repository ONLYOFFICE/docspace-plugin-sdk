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

import { TReturnMessage } from "../../utils";
import { TSelectorBaseProps, TSelectorHeader, TSelectorLifecycleEvents } from "./IBaseSelector";

/**
 * Defines the properties for a group selector component.
 *
 * This type combines multiple selector-related types:
 *
 * #### onSubmit parameters
 *
 * | Property | Type | Description |
 * |----------|------|-------------|
 * | `selectedIds` | `(string \| number)[]` | An array of IDs of the selected groups |
 * | `fileName` | `string` | The name of the file, if applicable |
 * | `isFooterCheckboxChecked` | `boolean` | The checked state of the footer checkbox |
 *
 * @see {@link TSelectorHeader} - Header configuration properties
 * @see {@link TSelectorBaseProps} - Common base properties (id, className)
 * @see {@link TSelectorLifecycleEvents} - Lifecycle callbacks (onLoad, onClose)
 *
 *
 * @example
 * ```typescript
 * // This example shows how to set up a group selector with a custom header and submit logic.
 *
 * const groupsSelectorProps: TGroupsSelector = {
 *   // Defines the text and visibility of the header.
 *   withHeader: true,
 *   headerProps: {
 *     label: "Select Groups",
 *   },
 *
 *   // A callback function that is executed when the user clicks the submit button.
 *   onSubmit: (payload) => {
 *     // The `payload` object contains the `selectedIds` of the chosen groups.
 *     console.log("Selected groups:", payload.selectedIds);
 *
 *     // After submission, close the selector and display a toast notification.
 *     return {
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: "Groups selected successfully",
 *       }],
 *     };
 *   },
 * };
 * ```
 *
 */
export type TGroupsSelector = TSelectorHeader &
    TSelectorBaseProps &
    TSelectorLifecycleEvents & {
        /**
         * A callback function that is triggered when the submit button is clicked.
         *

         */
        onSubmit: (params: TOnSubmitParams) => TReturnMessage;
    }

/**
 * Defines the parameters passed to the `onSubmit` callback for the group selector.
 * @inline
 *
 */
type TOnSubmitParams = {
    /**
     * An array of IDs of the selected groups.
     *
     */
    selectedIds: (string | number)[];
    /**
     * The name of the file, if applicable.
     *
     */
    fileName?: string;
    /**
     * The checked state of the footer checkbox.
     *
     */
    isFooterCheckboxChecked?: boolean;
}
