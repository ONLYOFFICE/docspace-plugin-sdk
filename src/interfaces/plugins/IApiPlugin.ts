/**
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
 * @license
 */

/**
 * The plugin that is provided with the origin, proxy, and prefix to make requests to the portal server.
 *
 * @example
 *
 * API configuration manager with endpoint validation
 *
 * ```typescript
 * const documentApi: IApiPlugin = {
 *   origin: "https://docspace.example.com",
 *   proxy: "/api/proxy",
 *   prefix: "/api/v1",
 *
 *   setOrigin(origin) {
 *     try {
 *       this.origin = origin;
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "Origin Updated",
 *           message: "API endpoint changed | Config saved | Ready to use"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Update Failed",
 *           message: "Unable to update origin | Check URL format"
 *         }]
 *       };
 *     }
 *   },
 *
 *   setProxy(proxy) {
 *     this.proxy = proxy;
 *   },
 *
 *   setPrefix(prefix) {
 *     this.prefix = prefix;
 *   },
 *
 *   getOrigin() {
 *     return this.origin;
 *   },
 *
 *   getProxy() {
 *     return this.proxy;
 *   },
 *
 *   getPrefix() {
 *     return this.prefix;
 *   },
 *
 *   setAPI(origin, proxy, prefix) {
 *     try {
 *       this.origin = origin;
 *       this.proxy = proxy;
 *       this.prefix = prefix;
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "success",
 *           title: "API Updated",
 *           message: "Configuration saved | Endpoints updated | Ready to use"
 *         }]
 *       };
 *     } catch (error) {
 *       return {
 *         actions: [Actions.showToast],
 *         toastProps: [{
 *           type: "error",
 *           title: "Update Failed",
 *           message: "Unable to update API | Check configuration"
 *         }]
 *       };
 *     }
 *   },
 *
 *   getAPI() {
 *     return {
 *       origin: this.origin,
 *       proxy: this.proxy,
 *       prefix: this.prefix
 *     };
 *   }
 * };
 * ```
 */
export interface IApiPlugin {
  /** Stores the origin parameter of the DocSpace portal */
  origin: string;

  /** Stores the proxy parameter of the DocSpace portal */
  proxy: string;

  /** Stores the prefix parameter of the DocSpace portal to access the server side */
  prefix: string;

  /**
   * Update the origin parameter of the DocSpace portal.
   * @param origin - The new origin parameter
   */
  setOrigin(origin: string): void;

  /**
   * Update the proxy parameter of the DocSpace portal.
   * @param proxy - The new proxy parameter
   */
  setProxy(proxy: string): void;

  /**
   * Update the prefix parameter of the DocSpace portal.
   * @param prefix - The new prefix parameter
   */
  setPrefix(prefix: string): void;

  /**
   * Get the origin parameter of the DocSpace portal.
   * @returns The current origin parameter
   */
  getOrigin(): string;

  /**
   * Get the proxy parameter of the DocSpace portal.
   * @returns The current proxy parameter
   */
  getProxy(): string;

  /**
   * Get the prefix parameter of the DocSpace portal to access the server side.
   * @returns The current prefix parameter
   */
  getPrefix(): string;

  /**
   * Update all the API parameters of the DocSpace portal in one request.
   * @param origin - The new origin parameter
   * @param proxy - The new proxy parameter
   * @param prefix - The new prefix parameter
   */
  setAPI(origin: string, proxy: string, prefix: string): void;

  /**
   * Get all the API parameters of the DocSpace portal in one request.
   * @returns An object containing the current origin, proxy, and prefix parameters
   */
  getAPI(): { origin: string; proxy: string; prefix: string };
}
