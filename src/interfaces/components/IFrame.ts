/*
 * (c) Copyright Ascensio System SIA 2024
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
 * @module Components
 *
 * @category IFrame Component
 *
 * A component that is used to embed a third-party website into a modal window or the settings page.
 *
 * @example
 *
 * Embedding a PDF viewer in a modal window
 *
 * ```typescript
 * const pdfViewer: IFrame = {
 *   src: "https://example.com/pdf-viewer",
 *   width: "100%",
 *   height: "80%",
 *   name: "pdf-viewer-frame",
 *   sandbox: "allow-scripts allow-same-origin allow-forms",
 *   id: "pdf-viewer-iframe",
 *   style: {
 *     border: "none",
 *     borderRadius: "8px",
 *     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
 *   }
 * }
 * ```
 *
 * @example
 *
 * Embedding a settings configuration page
 *
 * ```typescript
 * const settingsConfig: IFrame = {
 *   src: "https://example.com/plugin-settings",
 *   width: "100%",
 *   height: "100%",
 *   name: "plugin-settings",
 *   sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
 *   id: "settings-iframe",
 *   style: {
 *     border: "1px solid #eceef1",
 *     backgroundColor: "#ffffff",
 *     padding: "16px"
 *   }
 * }
 * ```
 */
export interface IFrame {
  /** Defines the base URL to a modal window or the settings page. It is used to generate links */
  src: string;

  /** Defines the frame width measured in percent */
  width?: string;

  /** Defines the frame height measured in percent */
  height?: string;

  /** Defines the name of the object inserted into the page */
  name?: string;

  /** Defines the frame sandbox */
  sandbox?: string;

  /** Defines the element ID */
  id?: string;

  /** Defines the frame style */
  style?: { [key: string]: string };
}
