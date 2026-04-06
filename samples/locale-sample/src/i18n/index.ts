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

import { I18n } from "i18n-js";
import { PluginLocale } from "@onlyoffice/docspace-plugin-sdk";

import enUS from "../locales/en-US.json";
import de from "../locales/de.json";
import az from "../locales/az.json";

/**
 * Shared i18n instance used by all plugin modules.
 *
 * Supported locales: en-US (default), de, az.
 * Any unsupported locale falls back to en-US via `enableFallback`.
 */
export const i18n = new I18n({
	[PluginLocale.EN_US]: enUS,
	[PluginLocale.DE]: de,
	[PluginLocale.AZ]: az,
});

i18n.defaultLocale = PluginLocale.EN_US;
i18n.locale = PluginLocale.EN_US;
i18n.enableFallback = true;

/**
 * Switch the active locale.
 * Falls back to `defaultLocale` if the requested locale has no translations.
 */
export const setLocale = (locale: PluginLocale): void => {
	i18n.locale = i18n.translations[locale] ? locale : i18n.defaultLocale;
};
