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
 * @module Actions
 *
 * @category Post Message
 *
 * The properties that are used to send a message to a frame.
 * If the frame ID is not specified or the frame with such an ID does not exist, then nothing changes.
 *
 * @example
 *
 * Document preview frame communication
 *
 * ```typescript
 * const previewMessage: IPostMessage = {
 *   frameId: "document-preview-frame",
 *   message: {
 *     action: "zoom",
 *     scale: 1.5,
 *     position: { x: 100, y: 200 }
 *   }
 * };
 * ```
 */
export interface IPostMessage {
  /** Defines the frame ID */
  frameId: string;

  /** Defines a message that will be sent to a frame */
  message: { [key: string]: any };
}

/**
 * @module Actions
 *
 * @category Post Message
 *
 * A message which is returned when any item interacts with a user (onClick, onChange, onSelect, etc.).
 *
 * @example
 *
 * Form submission with validation and toast notification
 *
 * ```typescript
 * const formSubmissionMessage: IMessage = {
 *   actions: [Actions.updateProps, Actions.showToast, Actions.updateContext],
 *   newProps: {
 *     type: "input",
 *     id: "email-input",
 *     value: "user@example.com",
 *     isDisabled: true
 *   },
 *   toastProps: [{
 *     type: "success",
 *     title: "Form Submitted",
 *     message: "Your data has been saved successfully"
 *   }],
 *   contextProps: [{
 *     name: "submit-button",
 *     props: {
 *       type: "button",
 *       label: "Submitted",
 *       isDisabled: true
 *     }
 *   }]
 * };
 * ```
 *
 * @example
 *
 * Dynamic form field updates with error handling
 *
 * ```typescript
 * const fieldUpdateMessage: IMessage = {
 *   actions: [Actions.updateProps, Actions.showToast, Actions.updateContext],
 *   newProps: {
 *     type: "comboBox",
 *     id: "country-select",
 *     options: [
 *       { value: "us", label: "United States" },
 *       { value: "uk", label: "United Kingdom" }
 *     ],
 *     value: "us"
 *   },
 *   toastProps: [{
 *     type: "error",
 *     title: "Validation Error",
 *     message: "Please complete all required fields"
 *   }],
 *   contextProps: [{
 *     name: "state-select",
 *     props: {
 *       type: "comboBox",
 *       options: [
 *         { value: "ca", label: "California" },
 *         { value: "ny", label: "New York" }
 *       ],
 *       isDisabled: false
 *     }
 *   }]
 * };
 * ```
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
   * Contains an array of objects with:
   * - name: Defines the item name
   * - props: Defines the new properties for the parent or child item
   */
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
