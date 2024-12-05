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
 *
 */

import { PluginStatus } from "../../enums";

/**
 * The default plugin.
 * This interface must be implemented in each plugin because without the plugin status it will not be built in.
 *
 * @example
 *
 * Document analyzer plugin with lifecycle management
 *
 * ```typescript
 * const documentAnalyzer: IPlugin = {
 *   status: PluginStatus.Active,
 *
 *   async onLoadCallback() {
 *     try {
 *       await initializeAnalyzer();
 *       console.log("Document analyzer initialized successfully");
 *     } catch (error) {
 *       console.error("Failed to initialize document analyzer:", error);
 *       this.status = PluginStatus.Hide;
 *     }
 *   },
 *
 *   updateStatus(status) {
 *     this.status = status;
 *     console.log(`Plugin status updated to: ${status}`);
 *   },
 *
 *   getStatus() {
 *     return this.status;
 *   },
 *
 *   setOnLoadCallback(callback) {
 *     this.onLoadCallback = callback;
 *   }
 * };
 * ```
 *
 * @example
 *
 * Auto-backup plugin with error recovery
 *
 * ```typescript
 * const backupPlugin: IPlugin = {
 *   status: PluginStatus.Active,
 *
 *   async onLoadCallback() {
 *     try {
 *       await validateBackupConfig();
 *       await initializeBackupService();
 *       console.log("Backup service started successfully");
 *     } catch (error) {
 *       console.error("Backup service initialization failed:", error);
 *       this.status = PluginStatus.Hide;
 *     }
 *   },
 *
 *   updateStatus(status) {
 *     const prevStatus = this.status;
 *     this.status = status;
 *
 *     if (prevStatus !== status) {
 *       console.log(`Backup service transitioned from ${prevStatus} to ${status}`);
 *     }
 *   },
 *
 *   getStatus() {
 *     return this.status;
 *   },
 *
 *   setOnLoadCallback(callback) {
 *     this.onLoadCallback = callback;
 *   }
 * };
 * ```
 */
export interface IPlugin {
  /** The plugin status (active or hide) */
  status: PluginStatus;

  /** Callback which will be executed when uploading the plugin to the portal */
  onLoadCallback: () => Promise<void>;

  /** Update the plugin status */
  updateStatus(status: PluginStatus): void;

  /** Get the current plugin status */
  getStatus(): PluginStatus;

  /** Sets the onLoadCallback variable to the plugin */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
