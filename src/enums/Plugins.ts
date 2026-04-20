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
 * Defines the supported plugin statuses.
 */
export enum PluginStatus {
  /** Plugin is enabled and visible to users */
  active = "active",

  /** Plugin is disabled and hidden from the user interface */
  hide = "hide",
}

/**
 * Defines the supported plugin languages.
 */
export enum PluginLocale {
  AZ = "az",
  CS = "cs",
  DE = "de",
  EN_GB = "en-GB",
  EN_US = "en-US",
  ES = "es",
  FR = "fr",
  IT = "it",
  LV = "lv",
  NL = "nl",
  PL = "pl",
  PT_BR = "pt-BR",
  PT = "pt",
  RO = "ro",
  SK = "sk",
  SL = "sl",
  SQ_AL = "sq-AL",
  FI = "fi",
  VI = "vi",
  TR = "tr",
  EL_GR = "el-GR",
  BG = "bg",
  RU = "ru",
  SR_CYRL_RS = "sr-Cyrl-RS",
  SR_LATN_RS = "sr-Latn-RS",
  UK_UA = "uk-UA",
  HY_AM = "hy-AM",
  AR_SA = "ar-SA",
  SI = "si",
  LO_LA = "lo-LA",
  ZH_CN = "zh-CN",
  JA_JP = "ja-JP",
  KO_KR = "ko-KR",
}