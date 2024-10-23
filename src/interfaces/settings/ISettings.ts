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

import { ButtonGroup, IBox } from "../components";
/**
 * Defines the administrator or owner settings block that is embedded in the modal window with the plugin description.
 */
export interface ISettings {
  /**
   * Defines the administrator or owner settings.
   */
  settings: IBox;

  /**
   * Defines the button to save the settings.
   */
  saveButton: ButtonGroup;

  /**
   * Specifies if the settings block will be displayed as a loader icon or not.
   */
  isLoading?: boolean;

  /**
   * Defines a function that is triggered whenever the settings block is loaded.
   */
  onLoad?: () => Promise<{ settings: IBox; saveButton?: ButtonGroup }>;
}
