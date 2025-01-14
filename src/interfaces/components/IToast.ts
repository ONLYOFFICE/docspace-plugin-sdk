/**
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
 *
 * @license
 */

/**
 * The supported toast types.
 *
 * @category Toast
 */
export const enum ToastType {
  /** Success toast with green color scheme */
  success = "success",
  /** Error toast with red color scheme */
  error = "error",
  /** Warning toast with yellow color scheme */
  warning = "warning",
  /** Info toast with blue color scheme */
  info = "info",
}

/**
 * Toast notification component for displaying temporary messages.
 *
 * @category Toast
 *
 * @categoryDescription Content
 *
 * Here is a description of the category Content.
 *
 * @categoryDescription Appearance
 *
 * Here is a description of the category Appearance.
 *
 * @categoryDescription Behavior
 *
 * Here is a description of the category Behavior.
 *
 * @example
 *
 * Auto-dismissing success notification
 *
 * ```typescript
 * const saveSuccess: IToast = {
 *   type: ToastType.success,
 *   title: "Changes saved successfully",
 *   withCross: false,
 *   timeout: 3000 // Dismiss after 3 seconds
 * }
 * ```
 *
 * @example
 *
 * Persistent error notification with manual dismiss
 *
 * ```typescript
 * const errorToast: IToast = {
 *   type: ToastType.error,
 *   title: "Failed to upload file. Please try again.",
 *   withCross: true,
 *   timeout: 0 // Stay until manually dismissed
 * }
 * ```
 *
 * @example
 *
 * Session expiration warning with medium duration
 *
 * ```typescript
 * const warningToast: IToast = {
 *   type: ToastType.warning,
 *   title: "Your session will expire in 5 minutes",
 *   withCross: true,
 *   timeout: 5000
 * }
 * ```
 *
 * @example
 *
 * Temporary update notification
 *
 * ```typescript
 * const infoToast: IToast = {
 *   type: ToastType.info,
 *   title: "New updates are available",
 *   withCross: false,
 *   timeout: 4000
 * }
 * ```
 */
export interface IToast {
  /** Defines the toast type, which determines the toast color and icon
   *
   * @category Appearance
   */
  type: ToastType;

  /** Defines the toast title
   *
   * @category Content
   */
  title: string;

  /**
   * Specifies whether the "Close" button will be displayed in the toast to close it (true).
   * Otherwise, the toast will disappear after clicking on any toast area (false).
   */
  withCross?: boolean;

  /**
   * Defines the time (in milliseconds) for showing the toast.
   * Setting the value to 0 allows the toast to be displayed continuously until clicking on it.
   *
   * @category Behavior
   */
  timeout?: number;
}
