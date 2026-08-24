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
  type IArticleNavigationPlugin,
  type IPlugin,
  PluginStatus,
} from "@onlyoffice/docspace-plugin-sdk";

import { overviewItem, settingsItem } from "./items";
import { attachPlugin } from "./navigation";

/**
 * Article Navigation Sample Plugin
 *
 * Two navigation items demonstrating the article navigation API with React
 * section pages:
 *
 * 1. "Sample Overview" - visible in every portal section, because `appears`
 *                        is omitted. Available to all user types.
 * 2. "Sample Settings" - visible only in the portal Settings section
 *                        (`appears: [Section.Settings]`) and only to admins.
 *
 * Each item points at a React component through `component`. The
 * component owns its own loading state and reads the portal through the hooks
 * from `@onlyoffice/docspace-plugin-sdk/react`, so neither item needs the
 * deprecated `section` IBox tree or an `onLoad` callback.
 */
class ArticleNavigationSample implements IPlugin, IArticleNavigationPlugin {
  // --- IPlugin ----------------------------------------------------------------

  status: PluginStatus = PluginStatus.active;

  onLoadCallback = async (): Promise<void> => {
    attachPlugin(this);

    this.addArticleNavigationItem(overviewItem);
    this.addArticleNavigationItem(settingsItem);
  };

  updateStatus = (status: PluginStatus): void => {
    this.status = status;
  };

  getStatus = (): PluginStatus => {
    return this.status;
  };

  setOnLoadCallback = (callback: () => Promise<void>): void => {
    this.onLoadCallback = callback;
  };

  // --- IArticleNavigationPlugin ------------------------------------------------

  articleNavigationItems: Map<string, IArticleNavigationItem> = new Map();

  addArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };

  getArticleNavigationItems = (): Map<string, IArticleNavigationItem> => {
    return this.articleNavigationItems;
  };

  updateArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };
}

const plugin = new ArticleNavigationSample();

export default plugin;
