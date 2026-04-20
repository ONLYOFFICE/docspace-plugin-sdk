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

import { TReturnMessage } from '../utils'
import { IText } from './IText'

/**
 * Defines the link component properties.
 *
 * @example
 * ```typescript
 * import { ILink, LinkType, LinkTarget } from "@onlyoffice/docspace-plugin-sdk";
 *
 * const link: ILink = {
 *   href: "https://example.com",
 *   children: "Visit Example",
 *   type: LinkType.page,
 *   target: LinkTarget.blank,
 *   isBold: false,
 *   color: "accent",
 *   fontSize: "14px",
 *   onClick: () => {
 *     console.log("Link clicked");
 *   }
 * };
 * ```
 */
export interface ILink extends IText {
  /** URL for the link */
  href?: string;

  /** Link identifier */
  id?: string;

  /** Sets hovered state and link effects */
  isHovered?: boolean;

  /** Activates text-overflow with ellipsis */
  isTextOverflow?: boolean;

  /** Disables hover effect */
  noHover?: boolean;

  /** Enables user selection */
  enableUserSelect?: boolean;

  /** Link type (page or action) */
  type?: LinkType;

  /** Target attribute for link */
  target?: LinkTarget;

  /** Text decoration style */
  textDecoration?:
    | "none"
    | "underline"
    | "line-through"
    | "overline"
    | "underline dotted"
    | "underline dashed";

  /** Click handler (for action type links) */
  onClick?: () => TReturnMessage;
}

/**
 * Defines the link type.
 */
export enum LinkType {
  /** Regular page link */
  page = "page",
  /** Action link (clickable but not navigating) */
  action = "action",
}

/**
 * Defines the link target attribute.
 */
export enum LinkTarget {
  /** Opens in a new tab */
  blank = "_blank",
  /** Opens in the same frame */
  self = "_self",
  /** Opens in the parent frame */
  parent = "_parent",
  /** Opens in the full body of the window */
  top = "_top",
}
