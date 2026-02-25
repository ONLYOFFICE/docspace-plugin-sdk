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
 * The plugin that is given the access to handle postMessage events from frames.
 *
 * @category PostMessagePlugin
 *
 * @example
 *
 * PostMessage handler with toast notification
 *
 * ```typescript
 * const postMessagePlugin: IPostMessagePlugin = {
 *   postMessageCallback: (message) => {
 *     console.log("Received message from frame:", message.frameId, message.message);
 *     return {
 *       actions: [Actions.showToast],
 *       toastProps: [{
 *         type: "success",
 *         title: "Message Received",
 *         message: `Received data from frame ${message.frameId}`
 *       }]
 *     };
 *   },
 *   setPostMessageCallback(callback) {
 *     this.postMessageCallback = callback;
 *   },
 *   getPostMessageCallback() {
 *     return this.postMessageCallback;
 *   }
 * };
 * ```
 */
export interface IPostMessagePlugin {
  /**
   * A callback function that is invoked when a postMessage event is received from a frame.
   * @param message - The post message data containing the frame ID and the message payload
   */
  postMessageCallback: (message: IPostMessageCallbackMessage) => void;

  /**
   * Sets the postMessage callback function.
   * @param callback - The callback function to be invoked when a postMessage event is received
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
