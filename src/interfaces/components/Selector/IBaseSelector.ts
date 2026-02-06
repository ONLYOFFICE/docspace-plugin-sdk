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

import { FilesExst, FilesSecurity, FilesType } from "../../../enums";
import { TReturnMessage } from "../../utils";

/**
 * Defines the base properties for all selector components.
 * 
 * @category Selector
 * 
 * @categoryDescription Content
 * 
 * Properties that define the selector's items, text, and displayed information.
 * 
 * @categoryDescription State
 * 
 * Properties that control the selector's current state, loading, and selection behavior.
 * 
 * @categoryDescription Behavior
 * 
 * Callback functions and event handlers for user interactions and lifecycle events.
 * 
 * @categoryDescription Appearance
 * 
 * Properties that control the visual presentation and layout of the selector.
 * 
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
 *
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
export type TBaseSelector =
  TSelectorBreadCrumbs &
  TSelectorPagination &
  TSelectorHeader &
  TSelectorCancelButton &
  TSelectorSubmitButton &
  TSelectorCheckbox &
  TSelectorBaseProps &
  TSelectorLifecycleEvents &
  TSelectorEmptyScreen & {
    /** 
     * If true, shows a loading indicator for the entire selector. 
     * 
     * @category State
     */
    isLoading?: boolean;
    /** 
     * If true, allows multiple items to be selected. 
     * 
     * @category State
     */
    isMultiSelect?: boolean;
    /** 
     * The maximum number of items that can be selected. 
     * 
     * @category State
     */
    maxSelectedItems?: number;
    /** 
     * An array of initially selected items. 
     * 
     * @category State
     */
    selectedItems?: TSelectorItem[];
    /** 
     * A descriptive text displayed within the selector. 
     * 
     * @category Content
     */
    descriptionText?: string;
    /** 
     * The header text to display when a search yields no results. 
     * 
     * @category Content
     */
    searchEmptyScreenHeader?: string;
    /** 
     * The description text to display when a search yields no results. 
     * 
     * @category Content
     */
    searchEmptyScreenDescription?: string;
    /** 
     * A callback function that is triggered when an item is selected. 
     * 
     * @category Behavior
     */
    onSelect?: (params: TOnSelectParams) => TReturnMessage;
  };


/**
 * Represents a single item within a selector component.
 * 
 * @category Selector
 * 
 * @categoryDescription Content
 * 
 * Properties that define the item's display content and identification.
 */
export type TSelectorItem = {
  /** 
   * The display text for the item. 
   * 
   * @category Content
   */
  label: string;
  /** 
   * A unique identifier for the item. 
   * 
   * @category Content
   */
  id?: string | number;
} & Partial<TSelectorItemFile> &
  Partial<TSelectorItemInput> &
  Partial<TSelectorItemNew>;

/**
 * Defines properties for an item that represents a file.
 * 
 * @category Selector
 */
export type TSelectorItemFile = {
  /** 
   * The URL or identifier for the item's icon. 
   * 
   * @category Content
   */
  icon: string;
  /** 
   * The file extension (e.g., 'docx', 'pdf'). 
   * 
   * @category Content
   */
  fileExst: FilesExst | string;
  /** 
   * The general type of the file (e.g., 'text', 'spreadsheet'). 
   * 
   * @category Content
   */
  fileType: FilesType;
  /** 
   * The security or access level of the file. 
   * 
   * @category State
   */
  security: FilesSecurity;
};

/**
 * Defines properties for an item that functions as an input field.
 * 
 * @category Selector
 */
export type TSelectorItemInput = {
  /** 
   * If true, this item will be rendered as an input field. 
   * 
   * @category State
   */
  isInputItem: boolean;
  /** 
   * The default value to display in the input field. 
   * 
   * @category Content
   */
  defaultInputValue: string;
  /** 
   * A callback function that is triggered when the user accepts the input value. 
   * 
   * @category Behavior
   */
  onAcceptInput: (value: string) => TReturnMessage;
  /** 
   * A callback function that is triggered when the user cancels the input. 
   * 
   * @category Behavior
   */
  onCancelInput: () => TReturnMessage;
};

/**
 * Defines properties for an item that allows creating a new entity.
 * 
 * @category Selector
 */
export type TSelectorItemNew = {
  /** 
   * If true, this item will be rendered as a 'create new' button. 
   * 
   * @category State
   */
  isCreateNewItem: boolean;
  /** 
   * A callback function that is triggered when the user clicks the 'create new' button. 
   * 
   * @category Behavior
   */
  onCreateClick: () => TReturnMessage;
};

/**
 * Represents a single item in a breadcrumb trail.
 * 
 * @category Selector
 */
export type TBreadCrumbItem = {
  /** 
   * The display text for the breadcrumb item. 
   * 
   * @category Content
   */
  label: string;
  /** 
   * A unique identifier for the breadcrumb item. 
   * 
   * @category Content
   */
  id: string | number;
  /** 
   * If true, indicates that the breadcrumb item represents a room. 
   * 
   * @category State
   */
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
 * 
 * @category Selector
 */
export type TSelectorBreadCrumbs = {
  /** 
   * If true, displays the breadcrumb navigation. 
   * 
   * @category Appearance
   */
  withBreadCrumbs?: boolean;
  /** 
   * If true, shows a loading indicator for the breadcrumbs. 
   * 
   * @category State
   */
  isBreadCrumbsLoading?: boolean;
  /** 
   * An array of breadcrumb items to display. 
   * 
   * @category Content
   */
  breadCrumbs?: TBreadCrumbItem[];
  /** 
   * A callback function that is triggered when a breadcrumb item is selected. 
   * 
   * @category Behavior
   */
  onSelectBreadCrumb?: (id: string | number) => TReturnMessage;
};

/**
 * Defines properties for pagination within a selector.
 * 
 * @category Selector
 */
export type TSelectorPagination = {
  /** 
   * The list of items to display on the current page. 
   * 
   * @category Content
   */
  items: TSelectorItem[];
  /** 
   * If true, indicates that more items are available on subsequent pages. 
   * 
   * @category State
   */
  hasNextPage?: boolean;
  /** 
   * If true, shows a loading indicator while the next page is being loaded. 
   * 
   * @category State
   */
  isNextPageLoading?: boolean;
  /** 
   * A callback function that is triggered to load the next page of items. 
   * 
   * @category Behavior
   */
  onLoadNextPage?: () => TReturnMessage;
  /** 
   * The total number of items available. 
   * 
   * @category Content
   */
  totalItems?: number;
};

/**
 * Defines properties for the selector's header.
 * 
 * @category Selector
 */
export type TSelectorHeader = {
  /** 
   * If true, displays the header. 
   * 
   * @category Appearance
   */
  withHeader?: boolean;
  /** 
   * An object containing properties for the header. 
   * 
   * @category Content
   */
  headerProps?: {
    /** 
     * The title text to display in the header. 
     * 
     * @category Content
     */
    label: string;
    /** 
     * If true, displays a close button in the header. 
     * 
     * @category Appearance
     */
    isCloseable?: boolean;
    /** 
     * A callback function that is triggered when the close button is clicked. 
     * 
     * @category Behavior
     */
    onCloseClick?: () => TReturnMessage;
    /** 
     * If true, displays a back button in the header. 
     * 
     * @category Appearance
     */
    withBackButton?: boolean;
    /** 
     * A callback function that is triggered when the back button is clicked. 
     * 
     * @category Behavior
     */
    onBackClick?: () => TReturnMessage;
  };
};

/**
 * Defines properties for a checkbox in the selector's footer.
 * 
 * @category Selector
 */
export type TSelectorCheckbox = {
  /** 
   * If true, displays a checkbox in the footer. 
   * 
   * @category Appearance
   */
  withCheckbox?: boolean;
  /** 
   * The label for the footer checkbox. 
   * 
   * @category Content
   */
  footerCheckboxLabel?: string;
  /** 
   * The initial checked state of the footer checkbox. 
   * 
   * @category State
   */
  isChecked?: boolean;
}

/**
 * Defines properties for the cancel button in the selector.
 * 
 * @category Selector
 */
export type TSelectorCancelButton = {
  /** 
   * If true, displays the cancel button. 
   * 
   * @category Appearance
   */
  withCancelButton?: boolean;
  /** 
   * The text label for the cancel button. 
   * 
   * @category Content
   */
  cancelButtonLabel?: string;
  /** 
   * A callback function that is triggered when the cancel button is clicked. 
   * 
   * @category Behavior
   */
  onCancel?: () => TReturnMessage;
}

/**
 * Common base properties shared across all selector types.
 * 
 * @category Selector
 */
export type TSelectorBaseProps = {
  /** 
   * A unique identifier for the selector component. 
   * 
   * @category Appearance
   */
  id?: string;
  /** 
   * A CSS class name to apply to the selector component. 
   * 
   * @category Appearance
   */
  className?: string;
}

/**
 * Lifecycle callback properties for selectors.
 * 
 * @category Selector
 */
export type TSelectorLifecycleEvents = {
  /** 
   * A callback function that is triggered when the selector is loaded. 
   * 
   * @category Behavior
   */
  onLoad?: () => TReturnMessage;
  /** 
   * A callback function that is triggered when the selector is closed. 
   * 
   * @category Behavior
   */
  onClose?: () => TReturnMessage;
}

/**
 * Empty screen message properties for selectors.
 * 
 * @category Selector
 */
export type TSelectorEmptyScreen = {
  /** 
   * The header text to display when there are no items to show. 
   * 
   * @category Content
   */
  emptyScreenHeader?: string;
  /** 
   * The description text to display when there are no items to show. 
   * 
   * @category Content
   */
  emptyScreenDescription?: string;
}

/**
 * Search and create functionality properties for selectors.
 * 
 * @category Selector
 */
export type TSelectorSearchCreate = {
  /** 
   * If true, displays a search input field. 
   * 
   * @category Appearance
   */
  withSearch?: boolean;
  /** 
   * If true, allows users to create new items. 
   * 
   * @category Behavior
   */
  withCreate?: boolean;
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
 * 
 * @category Selector
 */
export type TSelectorSubmitButton = {
  /** 
   * The text label for the submit button. 
   * 
   * @category Content
   */
  submitButtonLabel: string;
  /** 
   * If true, the submit button will be disabled. 
   * 
   * @category State
   */
  disabledSubmitButton?: boolean;
  /** 
   * A callback function that is triggered when the submit button is clicked. 
   * 
   * @category Behavior
   */
  onSubmit: (params: TOnSubmitParams) => TReturnMessage;
}
