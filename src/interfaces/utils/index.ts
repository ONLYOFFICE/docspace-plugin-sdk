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

import { Actions } from "../../enums";
import {
  IBox,
  IButton,
  ICheckbox,
  IComboBox,
  ICreateDialog,
  IFrame,
  IImage,
  IInput,
  ILabel,
  IModalDialog,
  ISkeleton,
  IText,
  ITextArea,
  IToast,
  IToggleButton,
} from "../components";

/**
 * @category Post Message
 *
 * The properties that are used to send a message to a frame.
 * If the frame ID is not specified or the frame with such an ID does not exist, then nothing changes.
 *
 * @param frameId - Defines the frame ID.
 * @param message - Defines a message that will be sent to a frame.
 */
export interface IPostMessage {
  frameId: string;
  message: { [key: string]: any };
}

/**
 * @category Post Message
 *
 * A message which is returned when any item interacts with a user (onClick, onChange, onSelect, etc.).
 *
 * @param actions - Defines a collection of events that will be processed on the portal side.
 * The specified actions will be performed depending on the set of values.
 *
 * @param newProps - Defines the properties that update the state of the items which interact with the users.
 * This parameter is used only with Actions.updateProps.
 *
 * @param toastProps - Defines the properties that display a toast notification after the user actions.
 * This parameter is used only with Actions.showToast.
 *
 * @param contextProps - Defines the properties that update the state of the parent or child item after the event was executed.
 * Contains an array of objects with:
 * - name: Defines the item name
 * - props: Defines the new properties for the parent or child item
 *
 * @param createDialogProps - Defines the properties that display the default dialog box for creating a file/folder managed by the plugin.
 * This parameter is used only with Actions.showCreateDialogModal.
 *
 * @param modalDialogProps - Defines the properties that display the modal window.
 * This parameter is used only with Actions.showModal.
 *
 * @param postMessage - Defines the properties that are used to send a message to a frame.
 * If the frame ID is not specified or the frame with such an ID does not exist, then nothing changes.
 * This parameter is used only with Actions.sendPostMessage.
 *
 * @param settings - Defines a parameter that is used to save and transfer the administrator or owner plugin settings to all the portal users.
 * This parameter is used only with Actions.saveSettings.
 */
export interface IMessage {
  actions?: Actions[];
  newProps?:
    | IInput
    | ICheckbox
    | IToggleButton
    | IButton
    | ITextArea
    | IComboBox;
  toastProps?: IToast[];
  contextProps?: {
    name: string;
    props:
      | IBox
      | IButton
      | ICheckbox
      | IComboBox
      | IFrame
      | IImage
      | IInput
      | ILabel
      | ISkeleton
      | IText
      | ITextArea
      | IToggleButton;
  }[];
  createDialogProps?: ICreateDialog;
  modalDialogProps?: IModalDialog;
  postMessage?: IPostMessage;
  settings?: string;
}
