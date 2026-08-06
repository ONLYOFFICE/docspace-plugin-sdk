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

import { Devices, UsersType } from "../../enums";
import { Section } from "../../enums/Section";
import { IBox } from "../components/IBox";

/**
 * Describes a navigation item that will be embedded in the article sidebar as a first-class
 * navigation entry. When the user clicks the item, DocSpace navigates to a dedicated plugin
 * section page where the `section` content (typically an IFrame) is rendered.
 *
 * @category ArticleNavigationItem
 *
 * @example
 *
 * Article navigation item with an IFrame section
 *
 * ```typescript
 * const myItem: IArticleNavigationItem = {
 *   key: "my-plugin-section",
 *   label: "My Plugin",
 *   icon: "icon.svg",
 *   section: {
 *     component: Components.iFrame,
 *     props: {
 *       src: "https://example.com",
 *       width: "100%",
 *       height: "100%",
 *       name: "my-plugin-iframe",
 *       sandbox: "allow-scripts allow-same-origin allow-forms"
 *     }
 *   },
 *   usersTypes: [UsersType.owner, UsersType.docSpaceAdmin]
 *   appears: [Section.Files]
 * };
 * ```
 */

export interface IArticleNavigationItem {
	/**
	 * The unique item identifier used to recognize the item.
	 */
	key: string;

	/**
	 * The text label displayed next to the icon when the sidebar is expanded.
	 */
	label: string;

	/**
	 * The item display icon. The icon image must be uploaded to the "assets" folder.
	 * Only the image name with the extension must be specified in this field. The required icon size is 20x20 px.
	 * Otherwise, it will be compressed to this size.
	 *
	 */
	icon: string;

	/**
	 * The content to render on the plugin section page when this navigation item is active.
	 */
	section: IBox;

	/**
	 * A function that runs after navigating to a section.
	 * It returns a new section value. If this functionality is not required,   the previous section value is returned.
	 */
	onLoad?: () => Promise<{ section: IBox }>;

	/*T*
	 * The types of users who will see this navigation item.
	 * If omitted, the item is visible to all user types.
	 */
	usersTypes?: UsersType[];

	/**
	 * The device types on which this navigation item is displayed.
	 * If omitted, the item is visible on all device types.
	 */
	devices?: Devices[];

	/**
	 * The sections in which this navigation item is displayed.
	 * If omitted, the item is visible in all sections.
	 */
	appears?: Section[];
}
