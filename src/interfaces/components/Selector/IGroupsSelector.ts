import { TReturnMessage } from "../../utils";
import { TSelectorHeader } from "./IBaseSelector";

/**
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
 */

/**
 * Defines the parameters passed to the `onSubmit` callback for the group selector.
 */
type TOnSubmitParams = {
    /**
     * An array of IDs of the selected groups.
     */
    selectedIds: (string | number)[];
    /**
     * The name of the file, if applicable.
     */
    fileName?: string;
    /**
     * The checked state of the footer checkbox.
     */
    isFooterCheckboxChecked?: boolean;
}

/**
 * Defines the properties for a group selector component.
 */
export type TGroupsSelector = TSelectorHeader & {
    /**
     * A CSS class name to apply to the selector component.
     */
    className?: string;
    /**
     * A callback function that is triggered when the selector is loaded.
     */
    onLoad?: () => TReturnMessage;
    /**
     * A callback function that is triggered when the selector is closed.
     */
    onClose?: () => TReturnMessage;
    /**
     * A callback function that is triggered when the submit button is clicked.
     */
    onSubmit: (params: TOnSubmitParams) => TReturnMessage;
}