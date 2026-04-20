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

import {
    TSelectorBaseProps,
    TSelectorCancelButton,
    TSelectorEmptyScreen,
    TSelectorHeader,
    TSelectorLifecycleEvents,
    TSelectorSubmitButton
} from "./IBaseSelector";



/**
 * Defines the properties for a user and group selector component.
 *
 * This type combines multiple selector-related types:
 *
 * @see {@link TSelectorHeader} - Header configuration properties
 * @see {@link TSelectorCancelButton} - Cancel button properties
 * @see {@link TSelectorSubmitButton} - Submit button properties
 * @see {@link TSelectorBaseProps} - Common base properties (id, className)
 * @see {@link TSelectorLifecycleEvents} - Lifecycle callbacks (onLoad, onClose)
 * @see {@link TSelectorEmptyScreen} - Empty state messages
 * 
 * @example
 * ```typescript
 * // This example demonstrates how to configure a selector for choosing users and groups.
 * // It allows multi-selection, includes groups, and provides clear labels and descriptions.
 *
 * const peopleSelectorProps: TPeopleSelector = {
 *   // Defines the text and visibility of the header.
 *   withHeader: true,
 *   headerProps: {
 *     label: "Share Document",
 *   },
 *
 *   // The text to display on the main action button.
 *   submitButtonLabel: "Share",
 *   // The text for the cancel button.
 *   cancelButtonLabel: "Cancel",
 *
 *   // If true, the footer with action buttons is always visible.
 *   alwaysShowFooter: true,
 *
 *   // Custom text to display when no users or groups are found.
 *   emptyScreenHeader: "No users found",
 *   emptyScreenDescription: "There are no users or groups matching your search.",
 *
 *   // Allows the selection of multiple users and groups.
 *   isMultiSelect: true,
 *   // Includes groups in the selection list.
 *   withGroups: true,
 *
 *   // A callback function that is executed when the user clicks the submit button.
 *   onSubmit: (payload) => {
 *     // The `payload` object contains the `selectedIds` of the chosen users and groups.
 *     console.log("Selected users and groups:", payload.selectedIds);
 *
 *     // After submission, close the selector and show a confirmation toast.
 *     return {
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: "Document shared successfully",
 *       }],
 *     };
 *   },
 * };
 * ```
 * 
 * 
 */
export type TPeopleSelector = TSelectorHeader &
    TSelectorCancelButton &
    TSelectorSubmitButton &
    TSelectorBaseProps &
    TSelectorLifecycleEvents &
    TSelectorEmptyScreen & {
        /**
         * The type of entity for which the user is being selected (e.g., for sharing a file).
         * @example "file" | "folder" | "room"
         * 

         */
        targetEntityType?: "file" | "folder" | "room";
        /**
         * If true, allows the selection of groups.
         * @default false
         * 

         */
        withGroups?: boolean;
        /**
         * If true, displays only groups in the selector.
         * @default false
         * 

         */
        isGroupsOnly?: boolean;
        /**
         * If true, includes guest users in the selector.
         * @default false
         * 

         */
        withGuests?: boolean;
        /**
         * If true, displays only guest users in the selector.
         * @default false
         * 

         */
        isGuestsOnly?: boolean;
        /**
         * If true, allows multiple users and/or groups to be selected.
         * @default false
         * 

         */
        isMultiSelect?: boolean;
        /**
         * The ID of the current user, to be excluded from the list.
         * @example "user-1234"
         * 

         */
        currentUserId?: string;
        /**
         * An array of user or group IDs to exclude from the list.
         * @example ["user-1234", "group-5678"]
         * 

         */
        excludeItems?: string[];
        /**
         * An array of user IDs that are already invited and should be disabled.
         * @example ["user-1234", "user-5678"]
         * 

         */
        disableInvitedUsers?: string[];
        /**
         * If true, users with a 'disabled' status will not be displayed.
         * @default false
         * 

         */
        disableDisabledUsers?: boolean;
        /**
         * The ID of the room to which the selector is related.
         * @example "room-1234"
         * 

         */
        roomId?: string | number;

        /**
         * If true, the footer will always be visible, even if no users are selected.
         * @default false
         * 

         */
        alwaysShowFooter?: boolean;
        /**
         * If true, displays only the members of the current room.
         * @default false
         * 

         */
        onlyRoomMembers?: boolean;
    }
