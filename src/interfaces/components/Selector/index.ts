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

import { SelectorType } from "../../../enums/Selector";
import type { TBaseSelector } from "./IBaseSelector";
import type { TFilesSelector } from "./IFilesSelector";
import type { TGroupsSelector } from "./IGroupsSelector";
import type { TPeopleSelector } from "./IPeopleSelector";
import type { TRoomSelector } from "./IRoomSelector";

/**
 * Provides selector components for choosing files, rooms, users, and groups within DocSpace.
 *
 * Set `type` to the desired {@link SelectorType} value and `props` to the matching
 * selector props interface ({@link TBaseSelector}, {@link TFilesSelector},
 * {@link TGroupsSelector}, {@link TPeopleSelector}, or {@link TRoomSelector}).
 *
 * To display a selector, return an [`IMessage`](../utils.md#imessage) with
 * [`Actions.showSelector`](../../enums/Actions.md#showselector) in `actions`
 * and pass the configuration in `selectorProps`.
 * Use [`Actions.updateSelector`](../../enums/Actions.md#updateselector) and
 * [`Actions.closeSelector`](../../enums/Actions.md#closeselector) to update or close it.
 *
 * <plugin-image src="selector.png" dark />
 *
 * @example
 * ```typescript
 * import { TSelector, TBaseSelector, SelectorType, Actions, ToastType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const selector: TSelector = {
 *   type: SelectorType.Base,
 *   props: {
 *     submitButtonLabel: "Select",
 *     items: [{ id: "item-1", label: "First Item" }],
 *     onSubmit: ({ selectedIds }) => ({
 *       actions: [Actions.closeSelector, Actions.showToast],
 *       toastProps: [{ type: ToastType.success, title: `Selected ${selectedIds.length} items` }],
 *     }),
 *   },
 * };
 * ```
 */
export type TSelector =
  | {
      type: SelectorType.Base;
      props: TBaseSelector;
    }
  | {
      type: SelectorType.Files;
      props: TFilesSelector;
    }
  | {
      type: SelectorType.Groups;
      props: TGroupsSelector;
    }
  | {
      type: SelectorType.People;
      props: TPeopleSelector;
    }
  | {
      type: SelectorType.Room;
      props: TRoomSelector;
    };

export {
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

export { TFilesSelector } from "./IFilesSelector";
export { TGroupsSelector } from "./IGroupsSelector";
export { TPeopleSelector } from "./IPeopleSelector";
export { TRoomSelector } from "./IRoomSelector";
