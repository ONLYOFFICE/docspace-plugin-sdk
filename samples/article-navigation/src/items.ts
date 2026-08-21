/*
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
 */

import {
  type IArticleNavigationItem,
  Section,
  UsersType,
} from "@onlyoffice/docspace-plugin-sdk";

import { OVERVIEW_KEY, SETTINGS_KEY } from "./navigation";
import OverviewSection from "./OverviewSection";
import SettingsSection from "./SettingsSection";

/**
 * 1. Sample Overview
 *
 * A navigation item shown in every portal section: Files, Accounts and Settings.
 * Clicking it opens a plugin page rendered by `OverviewSection`.
 *
 * Key API features demonstrated:
 * - `appears` omitted    - the item is visible in all sections.
 * - `usersTypes` omitted - the item is visible to all user types.
 * - `sectionComponent`   - the React component rendered on the plugin page.
 */
export const overviewItem: IArticleNavigationItem = {
  key: OVERVIEW_KEY,
  label: "Sample Overview",
  icon: "docspace-icon.svg",
  sectionComponent: OverviewSection,
};

/**
 * 2. Sample Settings
 *
 * A navigation item restricted to the portal Settings section and to portal
 * administrators.
 *
 * Key API features demonstrated:
 * - `appears: [Section.Settings]` - the item is shown in Settings only.
 * - `usersTypes`                  - the item is shown to admins only.
 */
export const settingsItem: IArticleNavigationItem = {
  key: SETTINGS_KEY,
  label: "Sample Settings",
  icon: "docspace-icon.svg",
  sectionComponent: SettingsSection,
  appears: [Section.Settings],
  usersTypes: [UsersType.owner, UsersType.docSpaceAdmin],
};
