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
 * Defines the supported user types.
 */
export enum UsersType {
  /** System owner with full administrative rights and control over the entire DocSpace instance — shown as `Owner` in the portal */
  owner = "Owner",

  /** Administrator with system-wide management capabilities but limited compared to owner — shown as `Full admin` in the portal */
  docSpaceAdmin = "DocSpaceAdmin",

  /** User with administrative rights within specific rooms or workspaces — shown as `Room admin` in the portal */
  roomAdmin = "RoomAdmin",

  /** Member who creates and edits content in the rooms they are invited to, without managing the portal — shown as `User` in the portal */
  collaborator = "Collaborator",

  /** External member with view and interaction rights only — shown as `Guest` in the portal */
  user = "User",
}
