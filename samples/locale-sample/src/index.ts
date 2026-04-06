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
	IContextMenuItem,
	IContextMenuPlugin,
	IPlugin,
	ISettings,
	ISettingsPlugin,
	PluginLocale,
	PluginStatus,
} from "@onlyoffice/docspace-plugin-sdk";

import { adminSettings } from "./Settings";
import { contextMenuItem, createContextMenuItem } from "./ContextMenu";
import { i18n, setLocale } from "./i18n";

/**
 * Locale Sample Plugin
 *
 * Demonstrates how a DocSpace plugin can be fully localized:
 *
 * 1. **Plugin metadata** — `nameLocale` and `descriptionLocale` fields in
 *    `package.json` tell the portal to display translated plugin name and
 *    description based on the active portal language.
 *
 * 2. **Settings UI labels** — `ISettings.onLoad` refreshes translated text
 *    props (description, field labels, button label) every time the settings
 *    dialog opens, so the UI always matches the current language.
 *
 * 3. **Context menu item labels** — `setLanguage` is called by the portal
 *    whenever the user switches language. The plugin recreates the context menu
 *    item via a factory function so the label is retranslated immediately
 *    without a page reload.
 *
 * Supported locales: en-US (default), de, az.
 * Any unsupported locale falls back to en-US automatically.
 *
 * Key features demonstrated
 * ──────────────────────────
 * - `setLanguage(PluginLocale)` — portal callback for live language switching.
 * - `getLanguage()`             — returns the plugin's current active locale.
 * - `ISettingsPlugin`           — admin-configurable settings with translated labels.
 * - `IContextMenuPlugin`        — context menu item with translated label.
 * - `i18n-js`                   — lightweight i18n library for runtime translation.
 */
class LocaleSample implements IPlugin, ISettingsPlugin, IContextMenuPlugin {
	// ── IPlugin ────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addContextMenuItem(contextMenuItem);
		this.setAdminPluginSettings(adminSettings);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// ── Locale ────────────────────────────────────────────────────────────────

	/**
	 * Called by the portal whenever the user changes the interface language.
	 *
	 * Steps:
	 * 1. Update the i18n locale (falls back to en-US for unsupported locales).
	 * 2. Recreate context menu items so their labels are retranslated.
	 * 3. Settings labels are refreshed lazily in `ISettings.onLoad`.
	 */
	setLanguage = (language: PluginLocale): void => {
		setLocale(language);
		this.updateContextMenuItem(createContextMenuItem());
	};

	getLanguage = (): PluginLocale => i18n.locale as PluginLocale;

	// ── ISettingsPlugin ───────────────────────────────────────────────────────

	adminPluginSettings: ISettings | null = null;

	setAdminPluginSettings = (settings: ISettings | null): void => {
		this.adminPluginSettings = settings;
	};

	setAdminPluginSettingsValue = (_settings: string | null): void => {
		// Intentionally left empty for this sample.
		// A real plugin would deserialize and apply persisted settings here.
	};

	getAdminPluginSettings = (): ISettings | null => this.adminPluginSettings;

	// ── IContextMenuPlugin ────────────────────────────────────────────────────

	contextMenuItems: Map<string, IContextMenuItem> = new Map();

	addContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};

	getContextMenuItems = (): Map<string, IContextMenuItem> => this.contextMenuItems;

	getContextMenuItemsKeys = (): string[] => Array.from(this.contextMenuItems.keys());

	updateContextMenuItem = (item: IContextMenuItem): void => {
		this.contextMenuItems.set(item.key, item);
	};
}

// ── Registration ──────────────────────────────────────────────────────────────

const plugin = new LocaleSample();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins.LocaleSample = plugin;

export default plugin;
