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

/**
 * A collection of events that will be processed on the portal side.
 *
 * @remarks
 * - updateProps: Calls a function to update the state of the item which action was passed.
 * It does not work if the "newProps" parameter is not passed to the message.
 *
 * - updateContext: Calls a function to update the state of the parent or child items which were passed.
 * It does not work if the "contextProps" parameter is not passed to the message.
 *
 * - updateStatus: Calls a function to update the plugin status.
 *
 * - updateContextMenuItems: Calls a function to update all the context menu items.
 *
 * - updateInfoPanelItems: Calls a function to update all the info panel items.
 *
 * - updateMainButtonItems: Calls a function to update all the main button menu items.
 *
 * - updateProfileMenuItems: Calls a function to update all the profile menu items.
 *
 * - updateFileItems: Calls a function to update all the file items.
 *
 * - updateEventListenerItems: Calls a function to update all the event listener items.
 *
 * - showToast: Calls a function to display a toast notification after the user actions.
 * It does not work if the "toastProps" parameter is not passed to the message.
 *
 * - showCreateDialogModal: Calls a function to open a modal window for creating certain item (file, folder, etc.).
 * It does not work if the "createDialogProps" parameter is not passed to the message.
 *
 * - showModal: Calls a function to open a modal window.
 * It does not work if the "modalDialogProps" parameter is not passed to the message.
 *
 * - closeModal: Calls a function to close a modal window.
 *
 * - sendPostMessage: Calls a function to send a message to a frame.
 * It does not work if the "postMessage" parameter is not passed to the message or the specified frame is not found.
 *
 * - saveSettings: Calls a function to save the data that was transferred in the "settings" parameter
 * and returns it in the "setAdminPluginSettingsValue" method each time the plugin is requested.
 * It functions only when the "Save" button is clicked in the "Settings" block.
 */
export const enum Actions {
  updateProps = "update-props",
  updateContext = "update-context",
  updateStatus = "update-status",
  updateContextMenuItems = "update-context-menu-items",
  updateInfoPanelItems = "update-info-panel-items",
  updateMainButtonItems = "update-main-button-items",
  updateProfileMenuItems = "update-profile-menu-items",
  updateFileItems = "update-file-items",
  updateEventListenerItems = "update-event-listener-items",
  showToast = "show-toast",
  showCreateDialogModal = "show-create-dialog-modal",
  showModal = "show-modal",
  closeModal = "close-modal",
  sendPostMessage = "send-post-message",
  saveSettings = "save-settings",
}
