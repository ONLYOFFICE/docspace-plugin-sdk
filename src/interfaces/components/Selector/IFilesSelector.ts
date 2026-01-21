import { FilesExst, FilesSecurity, Security } from "../../../enums";
import { TReturnMessage } from "../../utils";
import { TBreadCrumbItem, TSelectorHeader } from "./IBaseSelector";

/**
 * @example
 * ```typescript
 * // This example demonstrates a file selector for choosing a location to save a file.
 * // It includes a footer input for the filename, breadcrumbs for navigation, and
 * // custom logic to disable the submit button in the root directory.
 *
 * const filesSelectorProps: TFilesSelector = {
 *   // Defines the text and visibility of the header.
 *   withHeader: true,
 *   headerProps: {
 *     label: "Save File As",
 *   },
 *
 *   // The text to display on the main action button.
 *   submitButtonLabel: "Save",
 *   // Enables and sets the text for the cancel button.
 *   withCancelButton: true,
 *   cancelButtonLabel: "Cancel",
 *
 *   // Enables breadcrumbs for easy navigation through folders.
 *   withBreadCrumbs: true,
 *   // Enables the search functionality.
 *   withSearch: true,
 *   // Allows users to create new folders within the selector.
 *   withCreate: true,
 *
 *   // Adds an input field in the footer, typically for a filename.
 *   withFooterInput: true,
 *   footerInputHeader: "File name",
 *   currentFooterInputValue: "Untitled Document",
 *
 *   // A callback function to determine if the submit button should be disabled.
 *   getIsDisabled: ({ isRoot }) => {
 *     // In this case, disable the submit button if the user is in the root directory.
 *     return isRoot;
 *   },
 *
 *   // A callback function that is executed when the user clicks the submit button.
 *   onSubmit: (payload) => {
 *     // The `payload` object contains information about the selected location and filename.
 *     console.log("File save details:", payload);
 *
 *     // After submission, close the selector and show a confirmation message.
 *     return {
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: `File saved as ${payload.fileName}`,
 *       }],
 *     };
 *   },
 * };
 * ```
 */

/**
 * Represents information about a selected file.
 */
type TSelectedFileInfo = {
  /** The unique identifier of the file. */
  id: string | number;
  /** The title or name of the file. */
  title: string;
  /** The file extension (e.g., 'docx', 'pdf'). */
  fileExst?: FilesExst | string;
};

/**
 * Defines the parameters passed to the `onSubmit` callback for the file selector.
 */
type TOnSubmitParams = {
  /** The ID of the selected item (file or folder). */
  selectedItemId: string | number | undefined;
  /** The title of the folder where the submission occurred. */
  folderTitle: string;
  /** The name of the file entered in the footer input. */
  fileName: string;
  /** The checked state of the footer checkbox. */
  isChecked: boolean;
  /** Detailed information about the selected file, if any. */
  selectedFileInfo: TSelectedFileInfo | null;
  /** The current breadcrumb trail at the time of submission. */
  breadCrumbs?: TBreadCrumbItem[];
};

/**
 * Defines the parameters for the `getIsDisabled` callback function.
 */
type TGetIsDisabledParams = {
  /** The ID of the currently selected item. */
  selectedItemId: string | number | undefined;
  /** The type of the selected item ('rooms' or 'files'). */
  selectedItemType?: "rooms" | "files";
  /** The security level of the selected item. */
  selectedItemSecurity?: FilesSecurity | Security;
  /** Detailed information about the selected file. */
  selectedFileInfo: TSelectedFileInfo | null;
  /** If true, this is the initial load of the selector. */
  isFirstLoad: boolean;
  /** If true, the selected item is a folder that should be disabled. */
  isDisabledFolder?: boolean;
  /** If true, the selector is currently at the root level. */
  isRoot: boolean;
};

/**
 * Defines the properties for a file and folder selector component.
 */
export type TFilesSelector = TSelectorHeader & {
  /** A unique identifier for the selector component. */
  id?: string;

  /** If true, allows multiple items to be selected. */
  isMultiSelect?: boolean;
  /** If true, displays a search input field. */
  withSearch?: boolean;
  /** If true, displays breadcrumb navigation. */
  withBreadCrumbs?: boolean;
  /** If true, allows users to create new folders. */
  withCreate?: boolean;

  /** The ID of the folder to open by default. */
  currentFolderId?: string | number;
  /** If true, displays only rooms at the root level. */
  isRoomsOnly?: boolean;
  /** If true, opens the root directory by default. */
  openRoot?: boolean;

  /** If true, displays a cancel button. */
  withCancelButton?: boolean;
  /** The text label for the cancel button. */
  cancelButtonLabel?: string;
  /** The text label for the submit button. */
  submitButtonLabel?: string;

  /** A descriptive text displayed within the selector. */
  descriptionText?: string;
  /** If true, displays an input field in the footer. */
  withFooterInput?: boolean;
  /** The header text for the footer input. */
  footerInputHeader?: string;
  /** The initial value for the footer input. */
  currentFooterInputValue?: string;
  /** If true, displays a checkbox in the footer. */
  withFooterCheckbox?: boolean;
  /** The label for the footer checkbox. */
  footerCheckboxLabel?: string;

  /** A callback function to determine if the submit button should be disabled. */
  getIsDisabled: (params: TGetIsDisabledParams) => boolean;
  /** A callback function that is triggered when the selector is loaded. */
  onLoad?: () => TReturnMessage;
  /** A callback function that is triggered when the submit button is clicked. */
  onSubmit?: (params: TOnSubmitParams) => TReturnMessage;
  /** A callback function that is triggered when an item is selected. */
  onSelectItem?: (id: string | number | undefined) => TReturnMessage;
  /** A callback function that is triggered when the cancel button is clicked. */
  onCancel?: () => TReturnMessage;
  /** A callback function that is triggered when the selector is closed. */
}
