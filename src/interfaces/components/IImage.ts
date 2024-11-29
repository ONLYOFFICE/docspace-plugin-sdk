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
 * @category Image Component
 *
 * A component that is used to embed an image not from the assets folder into a modal window or the settings page.
 *
 * @example
 *
 * Plugin logo with fixed dimensions and spacing
 *
 * ```typescript
 * const pluginLogo: IImage = {
 *   src: "https://example.com/plugin-logo.png",
 *   alt: "Plugin Logo",
 *   width: "120px",
 *   height: "40px",
 *   name: "plugin-logo",
 *   id: "settings-logo",
 *   style: {
 *     objectFit: "contain",
 *     marginBottom: "16px"
 *   }
 * }
 * ```
 *
 * @example
 *
 * Responsive document preview with modern styling
 *
 * ```typescript
 * const documentPreview: IImage = {
 *   src: "https://example.com/document-preview.jpg",
 *   alt: "Document Preview",
 *   width: "100%",
 *   height: "auto",
 *   name: "doc-preview",
 *   style: {
 *     borderRadius: "4px",
 *     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
 *     maxWidth: "800px"
 *   }
 * }
 * ```
 */
export interface IImage {
  /** Defines the full path to the image */
  src: string;

  /** Defines the image alt attribute */
  alt: string;

  /** Defines the image width */
  width?: string;

  /** Defines the image height */
  height?: string;

  /** Defines the image name */
  name?: string;

  /** Defines the image ID */
  id?: string;

  /** Defines the image style */
  style?: { [key: string]: string };
}
