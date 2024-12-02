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
 * @module Enums
 */

/**
 * Defines the supported user types.
 */
export const enum UsersType {
  /** System owner with full administrative rights and control over the entire DocSpace instance */
  owner = "Owner",

  /** Administrator with system-wide management capabilities but limited compared to owner */
  docSpaceAdmin = "DocSpaceAdmin",

  /** User with administrative rights within specific rooms or workspaces */
  roomAdmin = "RoomAdmin",

  /** User with enhanced permissions for content creation and modification */
  collaborator = "Collaborator",

  /** Regular user with basic access rights for viewing and interacting with content */
  user = "User",
}
