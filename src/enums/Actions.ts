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

/**
 * A collection of events that will be processed on the portal side.
 */
export const enum Actions {
  /**
   * Calls a function to update the state of the item which action was passed.
   * It does not work if the "newProps" parameter is not passed to the message.
   */
  updateProps = "update-props",

  /**
   * Calls a function to update the state of the parent or child items which were passed.
   * It does not work if the "contextProps" parameter is not passed to the message.
   */
  updateContext = "update-context",

  /**
   * Calls a function to update the plugin status.
   */
  updateStatus = "update-status",

  /**
   * Calls a function to update all the context menu items.
   */
  updateContextMenuItems = "update-context-menu-items",

  /**
   * Calls a function to update all the info panel items.
   */
  updateInfoPanelItems = "update-info-panel-items",

  /**
   * Calls a function to update all the main button menu items.
   */
  updateMainButtonItems = "update-main-button-items",

  /**
   * Calls a function to update all the profile menu items.
   */
  updateProfileMenuItems = "update-profile-menu-items",

  /**
   * Calls a function to update all the file items.
   */
  updateFileItems = "update-file-items",

  /**
   * Calls a function to update all the event listener items.
   */
  updateEventListenerItems = "update-event-listener-items",

  /**
   * Calls a function to display a toast notification after the user actions.
   * It does not work if the "toastProps" parameter is not passed to the message.
   */
  showToast = "show-toast",

  // showSettingsModal = "show-settings-modal",
  // closeSettingsModal = "close-settings-modal",

  /**
   * Calls a function to open a modal window for creating certain item (file, folder, etc.).
   * It does not work if the "createDialogProps" parameter is not passed to the message.
   */
  showCreateDialogModal = "show-create-dialog-modal",

  /**
   * Calls a function to open a modal window.
   * It does not work if the "modalDialogProps" parameter is not passed to the message.
   */
  showModal = "show-modal",

  /**
   * Calls a function to close a modal window.
   */
  closeModal = "close-modal",

  /**
   * Calls a function to send a message to a frame.
   * It does not work if the "postMessage" parameter is not passed to the message or the specified frame is not found.
   */
  sendPostMessage = "send-post-message",
}
