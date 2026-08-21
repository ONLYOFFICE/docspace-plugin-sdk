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

import type { IArticleNavigationPlugin } from "@onlyoffice/docspace-plugin-sdk";

/** Key of the overview item. Also the last path segment of its section URL. */
export const OVERVIEW_KEY = "article-navigation-sample-overview";

/** Key of the settings item. */
export const SETTINGS_KEY = "article-navigation-sample-settings";

/**
 * The running plugin instance.
 *
 * A section component cannot reach the plugin class through the SDK, so the
 * plugin registers itself here on load. Keeping this in its own module — rather
 * than importing the item definitions into the components — avoids an import
 * cycle between the items and the sections they render.
 */
let plugin: IArticleNavigationPlugin | null = null;

/** Called once from the plugin's `onLoadCallback`. */
export const attachPlugin = (instance: IArticleNavigationPlugin): void => {
  plugin = instance;
};

/**
 * Renames the overview item in the plugin's own collection.
 *
 * The caller still has to dispatch `updateArticleNavigationItems` — through the
 * `usePluginActions` hook in a React component, or `Actions.updateArticleNavigationItems`
 * in an `IMessage` — for DocSpace to redraw the sidebar.
 */
export const renameOverviewItem = (label: string): void => {
  const item = plugin?.getArticleNavigationItems().get(OVERVIEW_KEY);
  if (!plugin || !item) return;

  plugin.updateArticleNavigationItem({ ...item, label });
};
