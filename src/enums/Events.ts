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
 * Defines the supported event types for the plugin system.
 *
 * Most of them are the signal the portal uses to open a dialog, so they fire
 * when the dialog opens, before anything is created or changed.
 */
export enum Events {
  /** Triggered when the dialog for creating a new item opens */
  CREATE = "create",

  /** Triggered when the rename dialog opens */
  RENAME = "rename",

  /** Triggered when the dialog for creating a new room opens */
  ROOM_CREATE = "create_room",

  /** Triggered when the room editing dialog opens */
  ROOM_EDIT = "edit_room",

  /** Triggered after a column is shown or hidden in a table view */
  CHANGE_COLUMN = "change_column",

  /** Triggered when the dialog for changing a user's type opens */
  CHANGE_USER_TYPE = "change_user_type",

  /** Triggered when a plugin opens the create dialog for a file it owns */
  CREATE_PLUGIN_FILE = "create_plugin_file",
}
