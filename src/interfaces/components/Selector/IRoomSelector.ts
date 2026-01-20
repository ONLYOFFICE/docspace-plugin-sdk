import { RoomSearchArea, RoomsType } from "../../../enums/Rooms";
import { TReturnMessage } from "../../utils";
import { TSelectorCancelButton, TSelectorHeader } from "./IBaseSelector";

export type TRoomSelector = TSelectorHeader &
    TSelectorCancelButton & {
        id?: string;
        className?: string;

        withSearch?: boolean;
        withCreate?: boolean;

        isMultiSelect?: boolean;
        submitButtonLabel?: string;
        roomType?: RoomsType | RoomsType[];
        searchArea?: RoomSearchArea;
        excludeItems?: (number | string | undefined)[];
        createDefineRoomLabel?: string;
        createDefineRoomType?: RoomsType;

        emptyScreenHeader?: string;
        emptyScreenDescription?: string;

        onLoad?: () => TReturnMessage;
        onSubmit?: (selectedIds: (string | number)[]) => TReturnMessage;
        onClose?: () => TReturnMessage;
    }