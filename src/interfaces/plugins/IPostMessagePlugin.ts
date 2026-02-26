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

import { IPostMessageCallbackMessage } from "../utils";

/**
 * The plugin that is given the access to handle postMessage events from iframe components.
 * The plugin listens for window.postMessage events from embedded iframes
 * and triggers portal-side actions (such as showing toasts, modals, or updating items)
 * by calling the postMessageCallback with an {@link IPostMessageCallbackMessage}.
 *
 * @category PostMessagePlugin
 *
 * @example
 *
 * PostMessage handler with toast notification
 *
 * ```typescript
 * class MyPlugin implements IPlugin, IInfoPanelPlugin, IPostMessagePlugin {
 *   postMessageCallback: (message: IPostMessageCallbackMessage) => void = () => {};
 *
 *   setPostMessageCallback = (callback: (message: IPostMessageCallbackMessage) => void): void => {
 *     this.postMessageCallback = callback;
 *   };
 *
 *   getPostMessageCallback = (): ((message: IPostMessageCallbackMessage) => void) => {
 *     return this.postMessageCallback;
 *   };
 * }
 *
 * const plugin = new MyPlugin();
 *
 * window.parent.addEventListener("message", (event) => {
 *   try {
 *     const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
 *     if (data?.source !== "my-plugin") return;
 *
 *     plugin.postMessageCallback({
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         type: ToastType.success,
 *         title: "Message Received",
 *       }],
 *     });
 *   } catch {
 *     // ignore non-JSON messages
 *   }
 * });
 * ```
 *
 * @example
 *
 * PostMessage handler with modal dialog
 *
 * ```typescript
 * window.parent.addEventListener("message", (event) => {
 *   try {
 *     const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
 *     if (data?.source !== "my-plugin") return;
 *
 *     plugin.postMessageCallback({
 *       actions: [Actions.showModal],
 *       modalDialogProps: {
 *         dialogHeader: "Frame Response",
 *         dialogBody: body,
 *         displayType: ModalDisplayType.modal,
 *       },
 *     });
 *   } catch {
 *     // ignore non-JSON messages
 *   }
 * });
 * ```
 */
export interface IPostMessagePlugin {
  /**
   * A callback function that is called by the plugin to trigger portal-side actions
   * in response to postMessage events received from embedded iframes.
   * The portal sets this callback via {@link setPostMessageCallback}.
   * The plugin invokes it with an {@link IPostMessageCallbackMessage} containing the desired actions and their properties.
   * @param message - The message containing actions and their associated properties to be processed on the portal side
   */
  postMessageCallback: (message: IPostMessageCallbackMessage) => void;

  /**
   * Sets the postMessage callback function.
   * This method is called by the portal to register the callback that the plugin
   * will use to communicate actions back to the portal.
   * @param callback - The callback function provided by the portal for the plugin to invoke
   */
  setPostMessageCallback(
    callback: IPostMessagePlugin["postMessageCallback"]
  ): void;

  /**
   * Gets the current postMessage callback function.
   * @returns The currently registered postMessage callback function
   */
  getPostMessageCallback(): IPostMessagePlugin["postMessageCallback"];
}
