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
 * @category API Plugin
 *
 * The plugin that is provided with the origin, proxy, and prefix to make requests to the portal server.
 *
 * @param origin - Stores the origin parameter of the DocSpace portal.
 * @param proxy - Stores the proxy parameter of the DocSpace portal.
 * @param prefix - Stores the prefix parameter of the DocSpace portal to access the server side.
 *
 * @method setOrigin - Update the origin parameter of the DocSpace portal.
 * @param origin - Defines the origin parameter of the DocSpace portal.
 *
 * @method setProxy - Update the proxy parameter of the DocSpace portal.
 * @param proxy - Defines the proxy parameter of the DocSpace portal.
 *
 * @method setPrefix - Update the prefix parameter of the DocSpace portal.
 * @param prefix - Defines the prefix parameter of the DocSpace portal.
 *
 * @method getOrigin - Get the origin parameter of the DocSpace portal.
 * @returns The origin parameter of the DocSpace portal.
 *
 * @method getProxy - Get the proxy parameter of the DocSpace portal.
 * @returns The proxy parameter of the DocSpace portal.
 *
 * @method getPrefix - Get the prefix parameter of the DocSpace portal.
 * @returns The prefix parameter of the DocSpace portal to access the server side.
 *
 * @method setAPI - Update all the API parameters of the DocSpace portal in one request.
 * @param origin - Defines the origin parameter of the DocSpace portal.
 * @param proxy - Defines the proxy parameter of the DocSpace portal.
 * @param prefix - Defines the prefix parameter of the DocSpace portal.
 *
 * @method getAPI - Get all the API parameters of the DocSpace portal in one request.
 * @returns An object with the origin, proxy, and prefix parameters.
 */
export interface IApiPlugin {
  origin: string;
  proxy: string;
  prefix: string;

  setOrigin(origin: string): void;
  setProxy(proxy: string): void;
  setPrefix(prefix: string): void;
  getOrigin(): string;
  getProxy(): string;
  getPrefix(): string;
  setAPI(origin: string, proxy: string, prefix: string): void;
  getAPI(): { origin: string; proxy: string; prefix: string };
}
