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
 * The supported toast types.
 */
export const enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

/**
 * Toast.
 */
export interface IToast {
  /**
   * Defines the toast type, which determines the toast color and icon.
   */
  type: ToastType;

  /**
   * Defines the toast title.
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
   */
  timeout?: number;
}
