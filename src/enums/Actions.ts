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

/**
 * A collection of events that will be processed on the portal side.
 */
export enum Actions {
  /**
   * Calls a function to update the state of the item which action was passed.
   * It does not work if the "newProps" parameter is not passed to the message.
   *
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   newProps: {...acceptButton, isDisabled: true},
   *   actions: [Actions.showToast, Actions.updateStatus, Actions.updateProps],
   *   toastProps,
   * }
   * ```
   */
  updateProps = "update-props",

  /**
   * Calls a function to update the state of the parent or child items which were passed.
   * It does not work if the "contextProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateProps, Actions.updateContext],
   *   newProps: {...nameInputProps, value},
   *   contextProps: [
   *     {
   *       name: "accept-button",
   *       props: {
   *         ...acceptButtonProps,
   *         isDisabled: !value,
   *       },
   *     },
   *   ],
   * }
   * ```
   */
  updateContext = "update-context",

  /**
   * Calls a function to update the plugin status.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   newProps: {...acceptButton, isDisabled: true},
   *   actions: [Actions.showToast, Actions.updateProps, Actions.updateStatus],
   *   toastProps,
   * }
   * ```
   */
  updateStatus = "update-status",

  /**
   * Calls a function to update all the context menu items.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateContextMenuItems],
   * }
   * ```
   */
  updateContextMenuItems = "update-context-menu-items",

  /**
   * Calls a function to update all the info panel items.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateInfoPanelItems],
   * }
   * ```
   */
  updateInfoPanelItems = "update-info-panel-items",

  /**
   * Calls a function to update all the main button menu items.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateMainButtonItems],
   * }
   * ```
   */
  updateMainButtonItems = "update-main-button-items",

  /**
   * Calls a function to update all the profile menu items.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateProfileMenuItems],
   * }
   * ```
   */
  updateProfileMenuItems = "update-profile-menu-items",

  /**
   * Calls a function to update all the file items.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateFileItems],
   * }
   * ```
   */
  updateFileItems = "update-file-items",

  /**
   * Calls a function to update all the event listener items.
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateEventListenerItems],
   * }
   * ```
   */
  updateEventListenerItems = "update-event-listener-items",

  /**
   * Calls a function to display a toast notification after the user actions.
   * It does not work if the "toastProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   newProps: {...acceptButton, isDisabled: true},
   *   actions: [Actions.showToast, Actions.updateProps, Actions.updateStatus],
   *   toastProps,
   * }
   * ```
   */
  showToast = "show-toast",

  /**
   * Calls a function to open a modal window for creating certain item (file, folder, etc.).
   * It does not work if the "createDialogProps" parameter is not passed to the message.
   *
   *  @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.showCreateDialogModal],
   *   createDialogProps: {
   *     title: "Create diagram",
   *     startValue: "New diagram",
   *     visible: true,
   *     isCreateDialog: true,
   *     extension: ".drawio",
   *     onSave: async (e: any, value: string) => {
   *       await drawIo.createNewFile(value)
   *     },
   *     onCancel: (e: any) => {
   *       drawIo.setCurrentFolderId(null)
   *     },
   *     onClose: (e: any) => {
   *       drawIo.setCurrentFolderId(null)
   *     },
   *   },
   * }
   * ```
   */
  showCreateDialogModal = "show-create-dialog-modal",

  /**
   * Calls a function to update a modal window for creating certain item (file, folder, etc.).
   * It does not work if the "createDialogProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateCreateDialogModal],
   *   createDialogProps: {
   *     title: "some title value",
   *   },
   * };
   * ```
   */
  updateCreateDialogModal = "update-create-dialog-modal",

  /**
   * Calls a function to open a modal window.
   * It does not work if the "modalDialogProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.showModal],
   *   modalDialogProps: openFromUrlProps,
   * }
   * ```
   */
  showModal = "show-modal",

  /**
   * Calls a function to close a modal window.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.closeModal],
   * }
   * ```
   */
  closeModal = "close-modal",

  /**
   * Calls a function to send a message to a frame.
   * It does not work if the "postMessage" parameter is not passed to the message or the specified frame is not found.
   * @category Actions
   */
  sendPostMessage = "send-post-message",

  /**
   * Calls a function to save the data that was transferred in the "settings" parameter
   * and returns it in the "setAdminPluginSettingsValue" method each time the plugin is requested.
   * It functions only when the "Save" button is clicked in the "Settings" block.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.sendPostMessage],
   *   postMessage: {
   *     frameId: this.frameId,
   *     message: {
   *       action: "export",
   *       format: this.format,
   *       xml: msg.xml,
   *       spinKey: "export",
   *     },
   *   },
   * }
   * ```
   */
  saveSettings = "save-settings",

  /**
   * Calls a function to display a selector.
   * It does not work if the "selectorProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.showSelector],
   *   selectorProps: {
   *     type: SelectorType.Base,
   *     props: { ...selectorProps },
   *   },
   * }
   * ```
   */
  showSelector = "show-selector",

  /**
   * Calls a function to update a selector.
   * It does not work if the "selectorProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateSelector],
   *   selectorProps: {
   *     type: SelectorType.Base,
   *     props: { ...selectorProps },
   *   },
   * }
   * ```
   */
  updateSelector = "update-selector",

  /**
   * Calls a function to close a selector.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.closeSelector],
   * }
   * ```
   */
  closeSelector = "close-selector",

  /**
   * Calls a function to add operations in floating button.
   * Multiple plugins can show operations simultaneously - they will be aggregated.
   * It does not work if the "floatingOperationsButtonProps" parameter is not passed to the message.
   * 
   * **Note:** Each floating operations is identified by its id. Calling this  action again
   * will not replace the previous operations.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.addFloatingOperationsButton],
   *   floatingOperationsButtonProps: { ...floatingOperationsButtonProps },
   * }
   * ```
   */
  addFloatingOperationsButton = "add-floating-operations-button",

  /**
   * Calls a function to update operations in floating button.
   * It does not work if the "floatingOperationsButtonProps" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.updateFloatingOperationsButton],
   *   floatingOperationsButtonProps: { ...floatingOperationsButtonProps },
   * }
   * ```
   * 
   * @remarks
   * To update the status directly, you can use the "dispatchMessage" callback from the onLoad event.
   * 
   * @example
   * ```typescript
   * onLoad(dispatchMessage) {
   *   const message: IMessage = {
   *     actions: [Actions.updateFloatingOperationsButton],
   *     floatingOperationsButtonProps: { ...floatingOperationsButtonProps },
   *   }
   *   dispatchMessage(message)
   * }
   * ```
   */
  updateFloatingOperationsButton = "update-floating-operations-button",

  /**
   * Calls a function to remove the floating operations.
   * It does not work if the "floatingOperationsButtonPropsId" parameter is not passed to the message.
   * 
   * @category Actions
   * 
   * @example
   * ```typescript
   * const message: IMessage = {
   *   actions: [Actions.removeFloatingOperationsButton],
   *   floatingOperationsButtonPropsId: floatingOperationsButtonProps.id,
   * }
   * ```
   */
  removeFloatingOperationsButton = "remove-floating-operations-button",

  /**
   * Calls a function to navigate to the specified path.
   * All actions listed after navigate will be called after the navigation is complete.
   * It does not work if the "navigatePath" parameter is not passed to the message.
   */
  navigate = "navigate",

  /**
   * Calls a function to open the plugin info panel.
   */
  openInfoPanel = "open-info-panel",

  /**
   * Calls a function to open the plugin media viewer.
   */
  showMediaViewer = "show-media-viewer",

  /**
   * Calls a function to update the plugin media viewer.
   */
  updateMediaViewer = "update-media-viewer",

  /**
   * Calls a function to close the plugin media viewer.
   */
  closeMediaViewer = "close-media-viewer"

}
