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
 * @category IFrame Component
 *
 * A component that is used to embed a third-party website into a modal window or the settings page.
 *
 * @param src - Defines the base URL to a modal window or the settings page. It is used to generate links.
 *
 * @param width - Defines the frame width measured in percent.
 *
 * @param height - Defines the frame height measured in percent.
 *
 * @param name - Defines the name of the object inserted into the page.
 *
 * @param sandbox - Defines the frame sandbox.
 *
 * @param id - Defines the element ID.
 *
 * @param style - Defines the frame style.
 */
export interface IFrame {
  src: string;
  width?: string;
  height?: string;
  name?: string;
  sandbox?: string;
  id?: string;
  style?: { [key: string]: string };
}
