/*
 * Eval fixture for the audit mode of the docspace-plugin skill.
 *
 * This plugin compiles, packs and uploads without complaint, and then does
 * nothing at all on the portal. Four defects are planted here on purpose:
 *
 *   1. it registers under a different global name than package.json:pluginName
 *   2. the context menu item filters with usersType, which this scope ignores
 *   3. the click returns showModal with no modalDialogProps
 *   4. items are registered at module scope, before the language is set
 *
 * Do not "fix" this file - the eval measures whether they are found.
 */

import {
  Actions,
  IContextMenuPlugin,
  IContextMenuItem,
  IPlugin,
  FilesType,
  PluginLocale,
  PluginStatus,
  UsersType,
} from "@onlyoffice/docspace-plugin-sdk";

const labels: Record<string, string> = {
  "en-US": "Room statistics",
  de: "Raumstatistik",
};

let locale: PluginLocale = PluginLocale.EN_US;

const t = (): string => labels[locale] ?? labels["en-US"];

const roomStatsItem = {
  key: "room-stats-context-menu",
  label: t(),
  icon: "icon-16.svg",
  fileType: [FilesType.room],
  usersType: [UsersType.roomAdmin, UsersType.docSpaceAdmin],
  onItemClick: async (id: string | number) => {
    const total = await Promise.resolve(id);

    return {
      actions: [Actions.showModal],
    };
  },
};

class RoomStats implements IPlugin, IContextMenuPlugin {
  status: PluginStatus = PluginStatus.active;

  contextMenuItems: Map<string, IContextMenuItem> = new Map();

  onLoadCallback = async (): Promise<void> => {
    return;
  };

  updateStatus = (status: PluginStatus): void => {
    this.status = status;
  };

  getStatus = (): PluginStatus => this.status;

  setOnLoadCallback = (callback: () => Promise<void>): void => {
    this.onLoadCallback = callback;
  };

  setLanguage = (language: PluginLocale): void => {
    locale = language;
  };

  getLanguage = (): PluginLocale => locale;

  addContextMenuItem = (item: IContextMenuItem): void => {
    this.contextMenuItems.set(item.key, item);
  };

  getContextMenuItems = (): Map<string, IContextMenuItem> => this.contextMenuItems;

  getContextMenuItemsKeys = (): string[] => Array.from(this.contextMenuItems.keys());

  updateContextMenuItem = (item: IContextMenuItem): void => {
    this.contextMenuItems.set(item.key, item);
  };
}

const plugin = new RoomStats();

plugin.addContextMenuItem(roomStatsItem);

declare global {
  interface Window {
    Plugins: Record<string, unknown>;
  }
}

window.Plugins.RoomStatistics = plugin || {};

export default plugin;
