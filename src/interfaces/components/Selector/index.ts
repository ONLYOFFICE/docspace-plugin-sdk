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


import { SelectorType } from "../../../enums/Selector"
import {
    TBaseSelector,
    TSelectorItem,
    TSelectorItemFile,
    TSelectorItemInput,
    TSelectorItemNew,
    TBreadCrumbItem,
    TSelectorBreadCrumbs,
    TSelectorPagination,
    TSelectorHeader,
    TSelectorCheckbox,
    TSelectorCancelButton,
    TSelectorBaseProps,
    TSelectorLifecycleEvents,
    TSelectorEmptyScreen,
    TSelectorSearchCreate,
    TSelectorSubmitButton
} from "./IBaseSelector";
import { TFilesSelector } from "./IFilesSelector";
import { TGroupsSelector } from "./IGroupsSelector";
import { TPeopleSelector } from "./IPeopleSelector";
import { TRoomSelector } from "./IRoomSelector";


/**

 */

export type TSelector = {
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
    TBaseSelector,
    TFilesSelector,
    TSelectorItem,
    TSelectorItemFile,
    TSelectorItemInput,
    TSelectorItemNew,
    TBreadCrumbItem,
    TSelectorBreadCrumbs,
    TSelectorPagination,
    TSelectorHeader,
    TSelectorCheckbox,
    TSelectorCancelButton,
    TSelectorBaseProps,
    TSelectorLifecycleEvents,
    TSelectorEmptyScreen,
    TSelectorSearchCreate,
    TSelectorSubmitButton,
    TGroupsSelector,
    TPeopleSelector,
    TRoomSelector
};