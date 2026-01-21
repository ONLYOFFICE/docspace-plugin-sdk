import { FilesExst, FilesSecurity, FilesType } from "../../../enums";
import { TReturnMessage } from "../../utils";

/**
 * @example
 * ```typescript
 * // This example demonstrates how to create a basic selector with a list of items,
 * // a header, and a submit button. It also includes an item that, when clicked,
 * // dynamically adds a new input item to the list.
 *
 * const selectorProps: TBaseSelector = {
 *   // Defines the text and visibility of the header.
 *   withHeader: true,
 *   headerProps: {
 *     label: "Plugin Base Selector",
 *   },
 *
 *   // The text to display on the main action button.
 *   submitButtonLabel: "Submit",
 *
 *   // An array of items to display in the selector.
 *   items: [
 *     {
 *       id: "create-new",
 *       label: "Create new item",
 *       isCreateNewItem: true, // Renders this item as a button for creating new entries.
 *       onCreateClick: () => {
 *         // When clicked, this function returns a message to the host application
 *         // with an `updateSelector` action. This action provides new props to
 *         // re-render the selector, in this case, adding a new item to the list.
 *         const updatedItems = [...selectorProps.items, { id: "new-item", label: "Newly Added Item" }];
 *
 *         return {
 *           actions: [Actions.updateSelector], // Specifies the action to perform.
 *           selectorProps: { // Provides the new properties for the selector.
 *              type: SelectorType.Base,
 *              props: { ...selectorProps, items: updatedItems }
 *           }
 *         };

 *       },
 *     },
 *     {
 *       id: "item-1",
 *       label: "First Item",
 *       icon: "your-icon-url.svg", // Specify an icon for the item.
 *     },
 *   ],
 *
 *   // A callback function that is executed when the user clicks the submit button.
 *   onSubmit: ({ selectedIds }) => {
 *     // The `selectedIds` parameter contains an array of the IDs of the selected items.
 *     console.log("Items submitted:", selectedIds);
 *
 *     // After submission, you can perform actions like closing the selector
 *     // and showing a success message.
 *     return {
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: `Selected ${selectedIds.length} items`,
 *       }],
 *     };
 *   },
 * };
 * ```
 */

/**
 * Represents a single item within a selector component.
 */
export type TSelectorItem = {
  /** The display text for the item. */
  label: string;
  /** A unique identifier for the item. */
  id?: string | number;
} & Partial<TSelectorItemFile> &
  Partial<TSelectorItemInput> &
  Partial<TSelectorItemNew>;

/**
 * Defines properties for an item that represents a file.
 */
export type TSelectorItemFile = {
  /** The URL or identifier for the item's icon. */
  icon: string;
  /** The file extension (e.g., 'docx', 'pdf'). */
  fileExst: FilesExst | string;
  /** The general type of the file (e.g., 'text', 'spreadsheet'). */
  fileType: FilesType;
  /** The security or access level of the file. */
  security: FilesSecurity;
};

/**
 * Defines properties for an item that functions as an input field.
 */
export type TSelectorItemInput = {
  /** If true, this item will be rendered as an input field. */
  isInputItem: boolean;
  /** The default value to display in the input field. */
  defaultInputValue: string;
  /** A callback function that is triggered when the user accepts the input value. */
  onAcceptInput: (value: string) => TReturnMessage;
  /** A callback function that is triggered when the user cancels the input. */
  onCancelInput: () => TReturnMessage;
};

/**
 * Defines properties for an item that allows creating a new entity.
 */
export type TSelectorItemNew = {
  /** If true, this item will be rendered as a 'create new' button. */
  isCreateNewItem: boolean;
  /** A callback function that is triggered when the user clicks the 'create new' button. */
  onCreateClick: () => TReturnMessage;
};

/**
 * Represents a single item in a breadcrumb trail.
 */
export type TBreadCrumbItem = {
  /** The display text for the breadcrumb item. */
  label: string;
  /** A unique identifier for the breadcrumb item. */
  id: string | number;
  /** If true, indicates that the breadcrumb item represents a room. */
  isRoom?: boolean;
};

/**
 * Defines the parameters passed to the `onSelect` callback.
 */
type TOnSelectParams = {
  /** The ID of the selected item. */
  selectedId?: string | number;
  /** If true, the item was selected with a double-click. */
  isDoubleClick: boolean;
};

/**
 * Defines properties for configuring breadcrumbs in a selector.
 */
export type TSelectorBreadCrumbs = {
  /** If true, displays the breadcrumb navigation. */
  withBreadCrumbs?: boolean;
  /** If true, shows a loading indicator for the breadcrumbs. */
  isBreadCrumbsLoading?: boolean;
  /** An array of breadcrumb items to display. */
  breadCrumbs?: TBreadCrumbItem[];
  /** A callback function that is triggered when a breadcrumb item is selected. */
  onSelectBreadCrumb?: (id: string | number) => TReturnMessage;
};

/**
 * Defines properties for pagination within a selector.
 */
export type TSelectorPagination = {
  /** The list of items to display on the current page. */
  items: TSelectorItem[];
  /** If true, indicates that more items are available on subsequent pages. */
  hasNextPage?: boolean;
  /** If true, shows a loading indicator while the next page is being loaded. */
  isNextPageLoading?: boolean;
  /** A callback function that is triggered to load the next page of items. */
  onLoadNextPage?: () => TReturnMessage;
  /** The total number of items available. */
  totalItems?: number;
};

/**
 * Defines properties for the selector's header.
 */
export type TSelectorHeader = {
  /** If true, displays the header. */
  withHeader?: boolean;
  /** An object containing properties for the header. */
  headerProps?: {
    /** The title text to display in the header. */
    label: string;
    /** If true, displays a close button in the header. */
    isCloseable?: boolean;
    /** A callback function that is triggered when the close button is clicked. */
    onCloseClick?: () => TReturnMessage;
    /** If true, displays a back button in the header. */
    withBackButton?: boolean;
    /** A callback function that is triggered when the back button is clicked. */
    onBackClick?: () => TReturnMessage;
  };
};

/**
 * Defines properties for a checkbox in the selector's footer.
 */
export type TSelectorCheckbox = {
  /** If true, displays a checkbox in the footer. */
  withCheckbox?: boolean;
  /** The label for the footer checkbox. */
  footerCheckboxLabel?: string;
  /** The initial checked state of the footer checkbox. */
  isChecked?: boolean;
}

/**
 * Defines properties for the cancel button in the selector.
 */
export type TSelectorCancelButton = {
  /** If true, displays the cancel button. */
  withCancelButton?: boolean;
  /** The text label for the cancel button. */
  cancelButtonLabel?: string;
  /** A callback function that is triggered when the cancel button is clicked. */
  onCancel?: () => TReturnMessage;
}

/**
 * Defines the parameters passed to the `onSubmit` callback.
 */
type TOnSubmitParams = {
  /** An array of IDs of the selected items. */
  selectedIds: (string | number)[];
  /** The name of the file, if applicable. */
  fileName: string;
  /** The checked state of the footer checkbox. */
  isFooterCheckboxChecked: boolean;
}

/**
 * Defines properties for the submit button in the selector.
 */
export type TSelectorSubmitButton = {
  /** The text label for the submit button. */
  submitButtonLabel: string;
  /** If true, the submit button will be disabled. */
  disabledSubmitButton?: boolean;
  /** A callback function that is triggered when the submit button is clicked. */
  onSubmit: (params: TOnSubmitParams) => TReturnMessage;
}

/**
 * Defines the base properties for all selector components.
 */
export type TBaseSelector =
  TSelectorBreadCrumbs &
  TSelectorPagination &
  TSelectorHeader &
  TSelectorCancelButton &
  TSelectorSubmitButton &
  TSelectorCheckbox & {
    /** A unique identifier for the selector component. */
    id?: string;
    /** A CSS class name to apply to the selector component. */
    className?: string;

    /** If true, shows a loading indicator for the entire selector. */
    isLoading?: boolean;

    /** If true, allows multiple items to be selected. */
    isMultiSelect?: boolean;
    /** The maximum number of items that can be selected. */
    maxSelectedItems?: number;
    /** An array of initially selected items. */
    selectedItems?: TSelectorItem[];

    /** A descriptive text displayed within the selector. */
    descriptionText?: string;
    /** The header text to display when there are no items to show. */
    emptyScreenHeader?: string;
    /** The description text to display when there are no items to show. */
    emptyScreenDescription?: string;

    /** The header text to display when a search yields no results. */
    searchEmptyScreenHeader?: string;
    /** The description text to display when a search yields no results. */
    searchEmptyScreenDescription?: string;

    /** A callback function that is triggered when the selector is loaded. */
    onLoad?: () => TReturnMessage;
    /** A callback function that is triggered when the selector is closed. */
    onClose?: () => TReturnMessage;
    /** A callback function that is triggered when an item is selected. */
    onSelect?: (params: TOnSelectParams) => TReturnMessage;
  };

