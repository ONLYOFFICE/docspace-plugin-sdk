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
 *
 * @deprecated Use [`UserRole`](UserRole.md) instead — its members carry the names the
 * portal itself uses, and `docSpaceAdmin` is gone from them. Every member here
 * keeps its value, and the portal matches a role against both the old and the
 * new value, so an item that still lists these appears for the right people.
 *
 * | This enum       | `UserRole`  | The portal shows |
 * | --------------- | ----------- | ---------------- |
 * | `owner`         | `owner`     | Owner            |
 * | `docSpaceAdmin` | `fullAdmin` | Full admin       |
 * | `roomAdmin`     | `roomAdmin` | Room admin       |
 * | `collaborator`  | `user`      | User             |
 * | `user`          | `guest`     | Guest            |
 */
export enum UsersType {
  /** System owner with full administrative rights and control over the entire ONLYOFFICE Apps instance — shown as `Owner` in the portal */
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
