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
 * Defines the supported event types that can be listened to and handled in the DocSpace plugin system.
 *
 */
export const enum Events {
  /** Triggered when a new item is created */
  CREATE = "create",

  /** Triggered when an item is renamed */
  RENAME = "rename",

  /** Triggered when a new room is created */
  ROOM_CREATE = "create_room",

  /** Triggered when a room is edited */
  ROOM_EDIT = "edit_room",

  /** Triggered when a column configuration is changed */
  CHANGE_COLUMN = "change_column",

  /** Triggered when a user's type or role is modified */
  CHANGE_USER_TYPE = "change_user_type",

  /** Triggered when a new file is created through a plugin */
  CREATE_PLUGIN_FILE = "create_plugin_file",
}
