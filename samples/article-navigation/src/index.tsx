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

/**
 * Article navigation sample — the whole plugin in one file.
 *
 * The `ArticleNavigation` scope adds entries to the portal sidebar. Clicking an
 * entry opens a full plugin page — not a dialog — and ONLYOFFICE Apps renders the
 * item's `component` on it, inside its own React tree. That is why the pages
 * below are ordinary components built from `@docspace/ui-kit`: they get the
 * portal theme for free, and the SDK hooks reach the portal through context.
 *
 * Two items, to show how `appears` places an entry:
 *
 * 1. "Sample files" — sidebar entry in the Files section, for every user type.
 * 2. "Sample settings" — sidebar entry in the portal Settings section, admins only.
 */

import { useState, type ReactNode } from "react";

import {
  Button,
  ButtonSize,
  Heading,
  HeadingLevel,
  HeadingSize,
  Text,
  ToggleButton,
} from "@docspace/ui-kit";
import {
  useCurrentUser,
  usePluginActions,
} from "@onlyoffice/docspace-plugin-sdk/react";
import {
  type IArticleNavigationItem,
  type IArticleNavigationPlugin,
  type IPlugin,
  PluginStatus,
  Section,
  ToastType,
  UserRole,
} from "@onlyoffice/docspace-plugin-sdk";

// --- Pages -------------------------------------------------------------------

/**
 * The frame both pages share: a heading, a subtitle and the page content.
 *
 * The `id` is what the e2e tests anchor on — plugin markup carries no test ids
 * of its own, so every element a test needs is given a stable id here.
 */
const Page = ({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <div id={id} style={{ padding: "20px", maxWidth: "640px" }}>
    <Heading level={HeadingLevel.h1} size={HeadingSize.medium}>
      {title}
    </Heading>
    <Text fontSize="13px" lineHeight="20px" style={{ margin: "4px 0 24px" }}>
      {description}
    </Text>
    {children}
  </div>
);

/**
 * The page behind the Files section entry.
 *
 * `useCurrentUser` gives the signed-in profile, `usePluginActions` the portal
 * UI actions — here a toast, which the portal draws itself.
 */
const FilesPage = () => {
  const user = useCurrentUser();
  const { showToast } = usePluginActions();

  return (
    <Page
      id="article-navigation-sample-files-page"
      title="Sample files page"
      description="Opened from the sidebar entry that the plugin adds to the Files section."
    >
      <Text fontSize="13px" lineHeight="20px" style={{ marginBottom: "16px" }}>
        Signed in as <b>{user?.displayName ?? "…"}</b>.
      </Text>
      <Button
        id="article-navigation-sample-toast-btn"
        label="Show a toast"
        size={ButtonSize.normal}
        primary
        onClick={() =>
          showToast({
            type: ToastType.success,
            title: `Hello, ${user?.displayName ?? "there"}!`,
          })
        }
      />
    </Page>
  );
};

/**
 * The page behind the Settings section entry.
 *
 * Plain component state, so the sample stays about the navigation item itself:
 * persisting the value would go through `usePluginSettings`.
 */
const SettingsPage = () => {
  const { showToast } = usePluginActions();
  const [enabled, setEnabled] = useState(false);

  const toggle = () => {
    setEnabled(!enabled);
    showToast({
      type: ToastType.info,
      title: enabled ? "Sample feature off" : "Sample feature on",
    });
  };

  return (
    <Page
      id="article-navigation-sample-settings-page"
      title="Sample settings page"
      description="Only portal administrators see the sidebar entry that opens this page."
    >
      <ToggleButton
        label="Enable the sample feature"
        isChecked={enabled}
        onChange={toggle}
      />
    </Page>
  );
};

// --- Navigation items --------------------------------------------------------

/**
 * `key` becomes the last segment of the page URL, so it has to be unique across
 * every installed plugin. `icon` is a file name from the `assets` folder, 20x20.
 */
const filesItem: IArticleNavigationItem = {
  key: "article-navigation-sample-files",
  label: "Sample files",
  icon: "plugin-icon.svg",
  component: FilesPage,
  appears: [Section.Files],
};

/** `appears` narrows the entry to one section, `usersTypes` to a set of roles. */
const settingsItem: IArticleNavigationItem = {
  key: "article-navigation-sample-settings",
  label: "Sample settings",
  icon: "plugin-icon.svg",
  component: SettingsPage,
  appears: [Section.Settings],
  usersTypes: [UserRole.owner, UserRole.fullAdmin],
};

// --- Plugin -----------------------------------------------------------------

class ArticleNavigationSample implements IPlugin, IArticleNavigationPlugin {
  // --- IPlugin --------------------------------------------------------------

  status: PluginStatus = PluginStatus.active;

  /** Called by ONLYOFFICE Apps once the plugin is loaded: register the items here. */
  onLoadCallback = async (): Promise<void> => {
    this.addArticleNavigationItem(filesItem);
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

  // --- IArticleNavigationPlugin ---------------------------------------------

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
