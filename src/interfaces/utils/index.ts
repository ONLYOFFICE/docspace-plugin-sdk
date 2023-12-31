/*
 * (c) Copyright Ascensio System SIA 2023
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
 * The properties that are used to send a message to a frame.
 * If the frame ID is not specified or the frame with such an ID does not exist, then nothing changes.
 */
export interface IPostMessage {
  /**
   * Defines the frame ID.
   */
  frameId: string;

  /**
   * Defines a message that will be sent to a frame.
   */
  message: { [key: string]: any };
}

/**
 * A message which is returned when any item interacts with a user (onClick, onChange, onSelect, etc.).
 */
export interface IMessage {
  /**
   * Defines a collection of events that will be processed on the portal side.
   * The specified actions will be performed depending on the set of values.
   */
  actions?: Actions[];

  /**
   * Defines the properties that update the state of the items which interact with the users.
   * This parameter is used only with Actions.updateProps.
   */
  newProps?:
    | IInput
    | ICheckbox
    | IToggleButton
    | IButton
    | ITextArea
    | IComboBox;

  /**
   * Defines the properties that display a toast notification after the user actions.
   * This parameter is used only with Actions.showToast.
   */
  toastProps?: IToast[];

  /**
   * Defines the properties that update the state of the parent or child item after the event was executed.
   */
  contextProps?: {
    /**
     * Defines the item name.
     */
    name: string;

    /**
     * Defines the new properties for the parent or child item.
     */
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

  /**
   * Defines the properties that display the default dialog box for creating a file/folder managed by the plugin.
   * This parameter is used only with Actions.showCreateDialogModal.
   */
  createDialogProps?: ICreateDialog;

  /**
   * Defines the properties that display the modal window.
   * This parameter is used only with Actions.showModal.
   */
  modalDialogProps?: IModalDialog;

  /**
   * Defines the properties that are used to send a message to a frame.
   * If the frame ID is not specified or the frame with such an ID does not exist, then nothing changes.
   * This parameter is used only with Actions.sendPostMessage.
   */
  postMessage?: IPostMessage;

  /**
   * Defines a parameter that is used to save and transfer the administrator or owner plugin settings to all the portal users.
   * This parameter is used only with Actions.saveSettings.
   */
  settings?: string;
}
