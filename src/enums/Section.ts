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
 * Defines the portal sections in which an article navigation item can appear.
 * Pass one or more values in the `appears` array on {@link IArticleNavigationItem}
 * to restrict visibility. When omitted, the item is shown in all sections.
 *
 * @category Section
 */
export enum Section {
	/** The main Files section of the portal */
	Files = "Files",

	/** The Accounts / People section of the portal */
	Accounts = "Accounts",

	/** The Portal Settings section */
	Settings = "Settings"
}
