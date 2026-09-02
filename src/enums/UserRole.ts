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
 * Defines the supported user types, named as the portal names them.
 *
 * Replaces the deprecated `UsersType`. An item may list members of either
 * enum — the portal matches a role against the old value as well as the new
 * one — but new code should use this one.
 *
 * @example
 *
 * ```typescript
 * import { IArticleButtonItem, UserRole } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const adminOnly: IArticleButtonItem = {
 *   key: "reports",
 *   label: "Reports",
 *   usersTypes: [UserRole.owner, UserRole.fullAdmin],
 *   onClick: () => ({ actions: [] }),
 * };
 * ```
 */
export enum UserRole {
  /** System owner with full administrative rights and control over the entire ONLYOFFICE Apps instance */
  owner = "Owner",

  /** Administrator with system-wide management capabilities but limited compared to owner */
  fullAdmin = "FullAdmin",

  /** User with administrative rights within specific rooms or workspaces */
  roomAdmin = "RoomAdmin",

  /** User with enhanced permissions for content creation and modification */
  user = "PortalUser",

  /** Regular user with basic access rights for viewing and interacting with content */
  guest = "Guest",
}
