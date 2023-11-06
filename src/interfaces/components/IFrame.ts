/*
* (c) Copyright Ascensio System SIA 2023
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
 * A component that is used to embed a third-party website into a modal window or the settings page.
 */
export interface IFrame {
  /**
   * Defines the base URL to a modal window or the settings page. It is used to generate links.
   */
  src: string;

  /**
   * Defines the frame width measured in percent.
   */
  width?: string;

  /**
   * Defines the frame height measured in percent.
   */
  height?: string;

  /**
   * Defines the name of the object inserted into the page.
   */
  name?: string;

  /**
   * Defines the frame sandbox.
   */
  sandbox?: string;

  /**
   * Defines the element ID.
   */
  id?: string;

  /**
   * Defines the frame style.
   */
  style?: { [key: string]: string };
}
