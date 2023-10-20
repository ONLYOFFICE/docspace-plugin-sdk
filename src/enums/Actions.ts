/**
 * A collection of events that will be processed on the portal side.
 */
export const enum Actions {
  /**
   * Defines a function called when updating the state of the item which action was passed.
   * It does not work if the newProps parameter is not passed to the message.
   */
  updateProps = "update-props",

  /**
   * Defines a function called when updating the state of the the parent or child items which were passed.
   * It does not work if the contextProps parameter is not passed to the message.
   */
  updateContext = "update-context",

  /**
   * Defines a function called when updating the plugin status.
   */
  updateStatus = "update-status",

  /**
   * Defines a function called when updating all the context menu items.
   */
  updateContextMenuItems = "update-context-menu-items",

  /**
   * Defines a function called when updating all the info panel items.
   */
  updateInfoPanelItems = "update-info-panel-items",

  /**
   * Defines a function called when updating all the main button menu items.
   */
  updateMainButtonItems = "update-main-button-items",

  /**
   * Defines a function called when updating all the profile menu items.
   */
  updateProfileMenuItems = "update-profile-menu-items",

  /**
   * Defines a function called when updating all the file items.
   */
  updateFileItems = "update-file-items",

  /**
   * Defines a function called when updating all the event listener items.
   */
  updateEventListenerItems = "update-event-listener-items",

  /**
   * Defines a function called when displaying a toast notification after the user actions.
   * It does not work if the toastProps parameter is not passed to the message.
   */
  showToast = "show-toast",

  // showSettingsModal = "show-settings-modal",
  // closeSettingsModal = "close-settings-modal",

  /**
   * Defines a function called when opening a modal window for creating certain item (file, folder, etc.).
   * It does not work if the createDialogProps parameter is not passed to the message.
   */
  showCreateDialogModal = "show-create-dialog-modal",

  /**
   * Defines a function called when opening a modal window.
   * It does not work if the modalDialogProps parameter is not passed to the message.
   */
  showModal = "show-modal",

  /**
   * Defines a function called when closing a modal window.
   */
  closeModal = "close-modal",

  /**
   * Defines a function called when sending a message to a frame.
   * It does not work if the postMessage parameter is not passed to the message or the specified frame is not found.
   */
  sendPostMessage = "send-post-message",
}
