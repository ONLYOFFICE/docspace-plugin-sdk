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

import { Devices, UsersType } from "../../enums";
import { IMessage } from "../utils";

/**
 * @module Plugins
 *
 * @category Profile Menu Plugin
 *
 * Describes an item that will be embedded in the profile menu.
 *
 * @example
 *
 * API key management with status monitoring
 *
 * ```typescript
 * const apiKeyManager: IProfileMenuItem = {
 *   key: "api-keys",
 *   label: "API Keys",
 *   icon: "key-icon.svg",
 *   onClick: async () => {
 *     try {
 *       const keys = await fetchApiKeys();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "API Keys Status",
 *           message: "Keys retrieved successfully | Usage within limits | No expiring keys"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to fetch API keys",
 *           message: "Unable to retrieve keys | Check permissions"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 *
 * @example
 *
 * Service integration health checker
 *
 * ```typescript
 * const integrationSettings: IProfileMenuItem = {
 *   key: "integrations",
 *   label: "Integrations",
 *   icon: "integration-icon.svg",
 *   onClick: async () => {
 *     try {
 *       const status = await checkIntegrations();
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Integration Status",
 *           message: "All integrations active | Services connected | Sync complete"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Failed to check integrations",
 *           message: "Unable to verify integrations | Check connection"
 *         }]
 *       };
 *     }
 *   }
 * };
 * ```
 */
export interface IProfileMenuItem {
  /** The unique item identifier used by the service to recognize the item */
  key: string;

  /** The item display name */
  label: string;

  /**
   * The item display icon. The icon image must be uploaded to the assets folder.
   * Only the image name with the extension must be specified in this field.
   * The required icon size is 16x16 px. Otherwise, it will be compressed to this size.
   */
  icon: string;

  /**
   * A function that takes the file/folder/room id as an argument.
   * This function can be asynchronous.
   */
  onClick: () => Promise<IMessage> | IMessage | void;

  /**
   * The types of users who will see the current item in the profile menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current profile menu item will be displayed for all user types.
   */
  usersType?: UsersType[];

  /**
   * The types of devices where the current item will be displayed in the profile menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current profile menu item will be displayed in any device types.
   */
  devices?: Devices[];
}
