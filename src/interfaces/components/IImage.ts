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
 * @category Image Component
 *
 * A component that is used to embed an image not from the assets folder into a modal window or the settings page.
 *
 * @param src - Defines the full path to the image.
 *
 * @param alt - Defines the image alt attribute.
 *
 * @param width - Defines the image width.
 *
 * @param height - Defines the image height.
 *
 * @param name - Defines the image name.
 *
 * @param id - Defines the image ID.
 *
 * @param style - Defines the image style.
 */
export interface IImage {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  name?: string;
  id?: string;
  style?: { [key: string]: string };
}
