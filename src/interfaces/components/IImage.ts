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
 * A component that is used to embed an image not from the assets folder into a modal window or the settings page.
 */
export interface IImage {
  /**
   * Defines the full path to the image.
   */
  src: string;

  /**
   * Defines the image alt attribute.
   */
  alt: string;

  /**
   * Defines the image width.
   */
  width?: string;

  /**
   * Defines the image height.
   */
  height?: string;

  /**
   * Defines the image name.
   */
  name?: string;

  /**
   * Defines the image ID.
   */
  id?: string;

  /**
   * Defines the image style.
   */
  style?: { [key: string]: string };
}
