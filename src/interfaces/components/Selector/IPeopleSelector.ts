import { TReturnMessage } from "../../utils";
import { TSelectorCancelButton, TSelectorHeader, TSelectorSubmitButton } from "./IBaseSelector";

/**
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
 */



/**
 * Defines the properties for a user and group selector component.
 */
export type TPeopleSelector = TSelectorHeader &
    TSelectorCancelButton &
    TSelectorSubmitButton & {
        /** A CSS class name to apply to the selector component. */
        className?: string;

        /**
         * The type of entity for which the user is being selected (e.g., for sharing a file).
         * @example "file" | "folder" | "room"
         */
        targetEntityType?: "file" | "folder" | "room";

        /**
         * If true, allows the selection of groups.
         * @default false
         */
        withGroups?: boolean;
        /**
         * If true, displays only groups in the selector.
         * @default false
         */
        isGroupsOnly?: boolean;

        /**
         * If true, includes guest users in the selector.
         * @default false
         */
        withGuests?: boolean;
        /**
         * If true, displays only guest users in the selector.
         * @default false
         */
        isGuestsOnly?: boolean;

        /**
         * If true, allows multiple users and/or groups to be selected.
         * @default false
         */
        isMultiSelect?: boolean;
        /**
         * The ID of the current user, to be excluded from the list.
         * @example "user-1234"
         */
        currentUserId?: string;

        /**
         * An array of user or group IDs to exclude from the list.
         * @example ["user-1234", "group-5678"]
         */
        excludeItems?: string[];
        /**
         * An array of user IDs that are already invited and should be disabled.
         * @example ["user-1234", "user-5678"]
         */
        disableInvitedUsers?: string[];
        /**
         * If true, users with a 'disabled' status will not be displayed.
         * @default false
         */
        disableDisabledUsers?: boolean;

        /**
         * The header text to display when there are no users or groups to show.
         * @example "No users found"
         */
        emptyScreenHeader?: string;
        /**
         * The description text to display when there are no users or groups to show.
         * @example "Please try searching for users or groups."
         */
        emptyScreenDescription?: string;

        /**
         * The ID of the room to which the selector is related.
         * @example "room-1234"
         */
        roomId?: string | number;

        /**
         * If true, the footer will always be visible, even if no users are selected.
         * @default false
         */
        alwaysShowFooter?: boolean;
        /**
         * If true, displays only the members of the current room.
         * @default false
         */
        onlyRoomMembers?: boolean;

        /**
         * A callback function that is triggered when the selector is loaded.
         * @example () => TReturnMessage
         */
        onLoad?: () => TReturnMessage;
        /**
         * A callback function that is triggered when the selector is closed.
         * @example () => TReturnMessage
         */
        onClose?: () => TReturnMessage;
    }