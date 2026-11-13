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

import type { ComponentType } from "react";

import { UserRole, UsersType } from "../../enums";

/**
 * Describes a widget the plugin adds to the Home page: a full-width block below the apps block,
 * headed by its title and description the way the portal's own blocks are. The portal draws no
 * frame around the component, so the widget owns its look. Widgets go one under another.
 *
 * @example
 *
 * ```tsx
 * const pipelineWidget: IDashboardWidgetItem = {
 *   key: "crm-pipeline-widget",
 *   title: "Pipeline",
 *   description: "Open deals by stage",
 *   component: PipelineWidget,
 * };
 * ```
 */
export interface IDashboardWidgetItem {
  /** The unique item identifier, across all the installed plugins. */
  key: string;

  /** The title shown above the widget. If omitted, the plugin name from its manifest is used. */
  title?: string;

  /** The subtitle shown under the title. If omitted, the widget has no subtitle. */
  description?: string;

  /**
   * The React component rendered under the title. It can use the hooks from
   * `@onlyoffice/docspace-plugin-sdk/react` and owns its own loading state.
   */
  component: ComponentType;

  /**
   * The types of users who will see the widget.
   * If this parameter is not specified, the widget is displayed for all user types.
   */
  usersTypes?: (UserRole | UsersType)[];

  /** The IDs of the users who will see the widget. Works like [`users`](IArticleNavigationItem.md#users). */
  users?: string[];

  /** The IDs of the groups whose members will see the widget. Works like [`groups`](IArticleNavigationItem.md#groups). */
  groups?: string[];
}
