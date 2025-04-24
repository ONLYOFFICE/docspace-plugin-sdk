/**
 * (c) Copyright Ascensio System SIA 2025
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
 * @packageDocumentation
 *
 * Here is a description of the module Plugins.
 *
 * @categoryDescription APIPlugin
 *
 * Here is a description of the category APIPlugin.
 *
 * @categoryDescription ContextMenuPlugin
 *
 * Here is a description of the category ContextMenuPlugin.
 *
 * @categoryDescription EventListenerPlugin
 *
 * Here is a description of the category EventListenerPlugin.
 *
 * @categoryDescription FilePlugin
 *
 * Here is a description of the category FilePlugin.
 *
 * @categoryDescription InfoPanelPlugin
 *
 * Here is a description of the category InfoPanelPlugin.
 *
 * @categoryDescription MainButtonPlugin
 *
 * Here is a description of the category MainButtonPlugin.
 *
 * @categoryDescription ProfileMenuPlugin
 *
 * Here is a description of the category ProfileMenuPlugin.
 *
 * @categoryDescription SettingsPlugin
 *
 * Here is a description of the category SettingsPlugin.
 *
 * @module Plugins
 */

import { IFilePlugin } from "./IFilePlugin";
import { IMainButtonPlugin } from "./IMainButtonPlugin";
import { IProfileMenuPlugin } from "./IProfileMenuPlugin";
import { IInfoPanelPlugin } from "./IInfoPanelPlugin";
import { IPlugin } from "./IPlugin";
import { IApiPlugin } from "./IApiPlugin";
import { ISettingsPlugin } from "./ISettingsPlugin";
import { IContextMenuPlugin } from "./IContextMenuPlugin";
import { IEventListenerPlugin } from "./IEventListenerPlugin";

export {
  IPlugin,
  IApiPlugin,
  ISettingsPlugin,
  IContextMenuPlugin,
  IInfoPanelPlugin,
  IProfileMenuPlugin,
  IMainButtonPlugin,
  IEventListenerPlugin,
  IFilePlugin,
};
