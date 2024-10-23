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
 * The plugin that is provided with the origin, proxy, and prefix to make requests to the portal server.
 */
export interface IApiPlugin {
  /**
   * Stores the origin parameter of the DocSpace portal.
   */
  origin: string;

  /**
   * Stores the proxy parameter of the DocSpace portal.
   */
  proxy: string;

  /**
   * Stores the prefix parameter of the DocSpace portal to access the server side.
   */
  prefix: string;

  /**
   * Update the origin parameter of the DocSpace portal.
   *
   * @param origin Defines the origin parameter of the DocSpace portal.
   */
  setOrigin(origin: string): void;

  /**
   * Update the proxy parameter of the DocSpace portal.
   *
   * @param proxy Defines the proxy parameter of the DocSpace portal.
   */
  setProxy(proxy: string): void;

  /**
   * Update the prefix parameter of the DocSpace portal.
   *
   * @param prefix Defines the prefix parameter of the DocSpace portal.
   */
  setPrefix(prefix: string): void;

  /**
   * Get the origin parameter of the DocSpace portal.
   *
   * @returns The origin parameter of the DocSpace portal.
   */
  getOrigin(): string;

  /**
   * Get the proxy parameter of the DocSpace portal.
   *
   * @returns The proxy parameter of the DocSpace portal.
   */
  getProxy(): string;

  /**
   * Get the prefix parameter of the DocSpace portal.
   *
   * @returns The prefix parameter of the DocSpace portal to access the server side.
   */
  getPrefix(): string;

  /**
   * Update all the API parameters of the DocSpace portal in one request.
   *
   * @param origin Defines the origin parameter of the DocSpace portal.
   * @param proxy Defines the proxy parameter of the DocSpace portal.
   * @param prefix Defines the prefix parameter of the DocSpace portal.
   */
  setAPI(origin: string, proxy: string, prefix: string): void;

  /**
   * Get all the API parameters of the DocSpace portal in one request.
   *
   * @returns An object with the origin, proxy, and prefix parameters.
   */
  getAPI(): { origin: string; proxy: string; prefix: string };
}
