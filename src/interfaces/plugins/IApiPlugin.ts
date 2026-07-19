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
 * The plugin that is provided with the origin, proxy, and prefix to make requests to the portal server.
 *
 * @example
 *
 * The plugin class implements `IApiPlugin`. DocSpace fills in the API parameters
 * via `setOrigin`/`setProxy`/`setPrefix` (or `setAPI`) when the plugin is loaded;
 * the plugin then uses `getAPI` to build request URLs to the portal.
 *
 * ```typescript
 * import { type IApiPlugin } from "@onlyoffice/docspace-plugin-sdk";
 *
 * class Plugin implements IApiPlugin {
 *   origin = "";
 *   proxy = "";
 *   prefix = "";
 *
 *   setOrigin = (origin: string): void => {
 *     this.origin = origin;
 *   };
 *
 *   setProxy = (proxy: string): void => {
 *     this.proxy = proxy;
 *   };
 *
 *   setPrefix = (prefix: string): void => {
 *     this.prefix = prefix;
 *   };
 *
 *   getOrigin = (): string => {
 *     return this.origin;
 *   };
 *
 *   getProxy = (): string => {
 *     return this.proxy;
 *   };
 *
 *   getPrefix = (): string => {
 *     return this.prefix;
 *   };
 *
 *   setAPI = (origin: string, proxy: string, prefix: string): void => {
 *     this.origin = origin;
 *     this.proxy = proxy;
 *     this.prefix = prefix;
 *   };
 *
 *   getAPI = (): { origin: string; proxy: string; prefix: string } => {
 *     return { origin: this.origin, proxy: this.proxy, prefix: this.prefix };
 *   };
 *
 *   // Example of a custom method that uses the API parameters to call the portal
 *   getUsersList = async (): Promise<unknown> => {
 *     const { origin, proxy, prefix } = this.getAPI();
 *     const response = await fetch(`${origin}${proxy}${prefix}/people`);
 *     return response.json();
 *   };
 * }
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
