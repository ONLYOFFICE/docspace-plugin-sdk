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
 * A component that is used to hide components during uploading.
 *
 * @example
 *
 * Circular avatar placeholder for loading states
 *
 * ```typescript
 * const avatarSkeleton: ISkeleton = {
 *   width: "40px",
 *   height: "40px",
 *   borderRadius: "50%"
 * }
 * ```
 *
 * @example
 *
 * Responsive content card loading placeholder
 *
 * ```typescript
 * const cardSkeleton: ISkeleton = {
 *   width: "100%",
 *   height: "120px",
 *   borderRadius: "8px"
 * }
 * ```
 *
 * @example
 *
 * Text line loading animation
 *
 * ```typescript
 * const textSkeleton: ISkeleton = {
 *   width: "80%",
 *   height: "16px",
 *   borderRadius: "4px"
 * }
 * ```
 */
export interface ISkeleton {
  /** Defines the skeleton width */
  width: string;

  /** Defines the skeleton height */
  height: string;

  /** Defines the skeleton border radius */
  borderRadius?: string;
}
