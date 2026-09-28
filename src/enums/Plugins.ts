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
 * Enumerations for plugin status and supported locales.
 * @packageDocumentation
 */

/**
 * Defines the supported plugin statuses. The portal reads the current one
 * through [`IPlugin.getStatus`](../interfaces/plugins/IPlugin.md#getstatus)
 * and switches the plugin on and off by it.
 */
export enum PluginStatus {
  /**
   * Plugin is enabled and visible to users: its items are registered and its
   * CSS is loaded. A plugin that reports no status is treated as active.
   */
  active = "active",

  /**
   * Plugin is hidden from the user interface: its items are unregistered and
   * its CSS unloaded until the status is read as `active` again. Unlike the
   * administrator's switch, it does not disable the plugin.
   */
  hide = "hide",
}

/**
 * Defines the supported plugin locales.
 */
export enum PluginLocale {
  /** Azerbaijani */
  AZ = "az",

  /** Czech */
  CS = "cs",

  /** German */
  DE = "de",

  /** English (United Kingdom) */
  EN_GB = "en-GB",

  /** English (United States) */
  EN_US = "en-US",

  /** Spanish */
  ES = "es",

  /** French */
  FR = "fr",

  /** Italian */
  IT = "it",

  /** Latvian */
  LV = "lv",

  /** Dutch */
  NL = "nl",

  /** Polish */
  PL = "pl",

  /** Portuguese (Brazil) */
  PT_BR = "pt-BR",

  /** Portuguese */
  PT = "pt",

  /** Romanian */
  RO = "ro",

  /** Slovak */
  SK = "sk",

  /** Slovenian */
  SL = "sl",

  /** Albanian (Albania) */
  SQ_AL = "sq-AL",

  /** Finnish */
  FI = "fi",

  /** Vietnamese */
  VI = "vi",

  /** Turkish */
  TR = "tr",

  /** Greek (Greece) */
  EL_GR = "el-GR",

  /** Bulgarian */
  BG = "bg",

  /** Russian */
  RU = "ru",

  /** Serbian (Cyrillic, Serbia) */
  SR_CYRL_RS = "sr-Cyrl-RS",

  /** Serbian (Latin, Serbia) */
  SR_LATN_RS = "sr-Latn-RS",

  /** Ukrainian (Ukraine) */
  UK_UA = "uk-UA",

  /** Armenian (Armenia) */
  HY_AM = "hy-AM",

  /** Arabic (Saudi Arabia) */
  AR_SA = "ar-SA",

  /** Sinhala */
  SI = "si",

  /** Lao (Laos) */
  LO_LA = "lo-LA",

  /** Chinese (Simplified, China) */
  ZH_CN = "zh-CN",

  /** Japanese (Japan) */
  JA_JP = "ja-JP",

  /** Korean (Korea) */
  KO_KR = "ko-KR",
}