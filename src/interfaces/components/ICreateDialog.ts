/*
* (c) Copyright Ascensio System SIA 2024
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
*/

import { IMessage } from "../utils";
import { IComboBoxItem } from "./IComboBox";

/**
 * @category Dialog Component
 *
 * Modal dialog for creating certain item (file, folder, etc.).
 * The user gets the full acess to the functionality but cannot control the layout.
 *
 * @param title - Defines the modal dialog title.
 *
 * @param startValue - Defines the modal dialog start value.
 *
 * @param visible - Specifies if the modal dialog is visible or not.
 *
 * @param options - Defines an array of the modal dialog options.
 *
 * @param selectedOption - Defines the selected modal dialog option.
 *
 * @param onSelect - Sets a function which is triggered whenever the modal dialog option is selected.
 *
 * @param onSave - Sets a function which is triggered whenever the data in the modal dialog is saved.
 *
 * @param onCancel - Sets a function which is triggered whenever an action in the modal dialog is canceled.
 *
 * @param onClose - Sets a function which is triggered whenever the modal dialog is closed.
 *
 * @param isCreateDialog - Specifies if this modal dialog is for creating certain item (file, folder, etc.).
 *
 * @param extension - Defines an extension of an item which will be created (file, folder, etc.).
 */
export interface ICreateDialog {
  title: string;
  startValue: string;
  visible: boolean;
  options?: IComboBoxItem[];
  selectedOption?: IComboBoxItem;
  onSelect?: (option: IComboBoxItem) => IMessage | void;
  onSave?: (e: any, value: string) => Promise<IMessage> | Promise<void> | IMessage | void;
  onCancel?: (e: any) => void;
  onClose?: (e: any) => void;
  isCreateDialog: boolean;
  extension?: string;
}
