import { RoomSearchArea, RoomsType } from "../../../enums/Rooms";
import { TReturnMessage } from "../../utils";
import { TSelectorCancelButton, TSelectorHeader } from "./IBaseSelector";

/**
 * @example
 * ```typescript
 * // This example demonstrates how to create a room selector that allows users to
 * // select multiple public or custom rooms. It includes search and create functionalities.
 *
 * const roomSelectorProps: TRoomSelector = {
 *   // Defines the text and visibility of the header.
 *   withHeader: true,
 *   headerProps: {
 *     label: "Select a Room",
 *   },
 *
 *   // The text to display on the main action button.
 *   submitButtonLabel: "Open Rooms",
 *   // Enables and sets the text for the cancel button.
 *   withCancelButton: true,
 *   cancelButtonLabel: "Close",
 *
 *   // Custom text to display when no rooms are found.
 *   emptyScreenHeader: "No Rooms Available",
 *   emptyScreenDescription: "You can create a new room or try a different search.",
 *
 *   // Allows the selection of multiple rooms.
 *   isMultiSelect: true,
 *   // Filters the list to show only public and custom rooms.
 *   roomType: [RoomsType.PublicRoom, RoomsType.CustomRoom],
 *   // Sets the search scope to active rooms.
 *   searchArea: RoomSearchArea.Active,
 *
 *   // Enables the search bar and the create room button.
 *   withCreate: true,
 *   withSearch: true,
 *   // Label for the create room button.
 *   createDefineRoomLabel: "Create a new collaboration room",
 *   // Default type for a newly created room.
 *   createDefineRoomType: RoomsType.Collaboration,
 *
 *   // A callback function that is executed when the user clicks the submit button.
 *   onSubmit: (selectedIds) => {
 *     // The `selectedIds` parameter is an array of the selected room IDs.
 *     console.log("Selected rooms:", selectedIds);
 *
 *     // After submission, close the selector and show a success message.
 *     return {
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: `${selectedIds.length} rooms selected`,
 *       }],
 *     };
 *   },
 * };
 * ```
 */

/**
 * Defines the properties for a room selector component.
 */
export type TRoomSelector = TSelectorHeader &
    TSelectorCancelButton & {
        /**
         * A unique identifier for the selector component.
         */
        id?: string;
        /**
         * A CSS class name to apply to the selector component.
         */
        className?: string;

        /**
         * If true, displays a search input field in the selector.
         */
        withSearch?: boolean;
        /**
         * If true, allows users to create new rooms from within the selector.
         */
        withCreate?: boolean;

        /**
         * If true, allows multiple rooms to be selected.
         */
        isMultiSelect?: boolean;
        /**
         * The text label for the submit button.
         */
        submitButtonLabel?: string;
        /**
         * The type of rooms to display (e.g., 'collaboration', 'custom'). Can be a single type or an array of types.
         */
        roomType?: RoomsType | RoomsType[];
        /**
         * The area to search for rooms within (e.g., 'myRooms', 'allRooms').
         */
        searchArea?: RoomSearchArea;
        /**
         * An array of room IDs to exclude from the list.
         */
        excludeItems?: (number | string | undefined)[];
        /**
         * The label for the 'create new room' option.
         */
        createDefineRoomLabel?: string;
        /**
         * The default type for newly created rooms.
         */
        createDefineRoomType?: RoomsType;

        /**
         * The header text to display when there are no rooms to show.
         */
        emptyScreenHeader?: string;
        /**
         * The description text to display when there are no rooms to show.
         */
        emptyScreenDescription?: string;

        /**
         * A callback function that is triggered when the selector is loaded.
         */
        onLoad?: () => TReturnMessage;
        /**
         * A callback function that is triggered when the submit button is clicked.
         */
        onSubmit?: (selectedIds: (string | number)[]) => TReturnMessage;
        /**
         * A callback function that is triggered when the selector is closed.
         */
        onClose?: () => TReturnMessage;
    }