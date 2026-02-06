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

import { RoomSearchArea, RoomsType } from "../../../enums/Rooms";
import { TReturnMessage } from "../../utils";
import {
    TSelectorBaseProps,
    TSelectorCancelButton,
    TSelectorEmptyScreen,
    TSelectorHeader,
    TSelectorLifecycleEvents,
    TSelectorSearchCreate,
    TSelectorSubmitButton
} from "./IBaseSelector";


/**
 * Defines the properties for a room selector component.
 * 
 * @category Selector
 * 
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
export type TRoomSelector = TSelectorHeader &
    TSelectorCancelButton &
    TSelectorBaseProps &
    TSelectorLifecycleEvents &
    TSelectorEmptyScreen &
    TSelectorSearchCreate &
    Pick<TSelectorSubmitButton, "submitButtonLabel"> & {
        /**
         * If true, allows multiple rooms to be selected.
         */
        isMultiSelect?: boolean;
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
         * A callback function that is triggered when the submit button is clicked.
         */
        onSubmit?: (selectedIds: (string | number)[]) => TReturnMessage;
    }
