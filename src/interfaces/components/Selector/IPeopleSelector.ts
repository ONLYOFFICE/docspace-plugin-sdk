import { TReturnMessage } from "../../utils";
import { TSelectorCancelButton, TSelectorHeader, TSelectorSubmitButton } from "./IBaseSelector";



export type TPeopleSelector = TSelectorHeader &
    TSelectorCancelButton &
    TSelectorSubmitButton & {
        className?: string;

        targetEntityType?: "file" | "folder" | "room";

        withGroups?: boolean;
        isGroupsOnly?: boolean;

        withGuests?: boolean;
        isGuestsOnly?: boolean;

        isMultiSelect?: boolean;
        currentUserId?: string;

        excludeItems?: string[];
        disableInvitedUsers?: string[];
        disableDisabledUsers?: boolean;

        emptyScreenHeader?: string;
        emptyScreenDescription?: string;

        roomId?: string | number;

        alwaysShowFooter?: boolean;
        onlyRoomMembers?: boolean;

        onLoad?: () => TReturnMessage;
        onClose?: () => TReturnMessage;
    }