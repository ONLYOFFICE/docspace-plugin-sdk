import { SelectorType } from "../../../enums/Selector"
import { TBaseSelector, TSelectorItem } from "./IBaseSelector";
import { TFilesSelector } from "./IFilesSelector";
import { TGroupsSelector } from "./IGroupsSelector";
import { TPeopleSelector } from "./IPeopleSelector";
import { TRoomSelector } from "./IRoomSelector";

/**
 * A discriminated union representing all available selector components.
 * The `type` property determines which selector to render, and the `props` property
 * must match the corresponding selector's interface.
 */
type TSelector = {
    type: SelectorType.Base;
    props: TBaseSelector;
} | {
    type: SelectorType.Files;
    props: TFilesSelector;
} | {
    type: SelectorType.Groups;
    props: TGroupsSelector;
} | {
    type: SelectorType.People;
    props: TPeopleSelector;
} | {
    type: SelectorType.Room;
    props: TRoomSelector;
}

export {
    TSelector,
    TBaseSelector,
    TFilesSelector,
    TSelectorItem,
    TGroupsSelector,
    TPeopleSelector,
    TRoomSelector
};