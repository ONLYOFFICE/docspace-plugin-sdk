/*
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
 */

import {
	Actions,
	Components,
	IArticleButtonItem,
	IArticleButtonPlugin,
	IBox,
	IMessage,
	IPlugin,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Article Button Sample Plugin
 *
 * Two items demonstrating the core article button API:
 *
 * 1. "Notification Button" - a simple icon button in the article sidebar
 *                            that fires a success toast when clicked.
 * 2. "Status Button"       - demonstrates the onLoad pattern:
 *                            starts as a skeleton, then loads an icon button.
 */
class ArticleButtonSample implements IPlugin, IArticleButtonPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addArticleButtonItem(notifyItem);
		this.addArticleButtonItem(statusItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => {
		return this.status;
	};

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// --- IArticleButtonPlugin ----------------------------------------------------

	articleButtonItems: Map<string, IArticleButtonItem> = new Map();

	addArticleButtonItem = (item: IArticleButtonItem): void => {
		this.articleButtonItems.set(item.key, item);
	};

	getArticleButtonItems = (): Map<string, IArticleButtonItem> => {
		return this.articleButtonItems;
	};

	updateArticleButtonItem = (item: IArticleButtonItem): void => {
		this.articleButtonItems.set(item.key, item);
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. Notification Button
 *
 * A simple article button item with no onLoad.
 * Clicking it shows a success toast.
 *
 * Key API features demonstrated:
 * - `body` as IBox containing an `iconButton` child.
 * - `onClick` on the iconButton to return an IMessage.
 */
const notifyItem: IArticleButtonItem = {
	key: "article-button-sample-notify",
	body: {
		id: "article-button-sample-notify-box",
		widthProp: "32px",
		heightProp: "32px",
		children: [
			{
				component: Components.iconButton,
				props: {
					id: "article-button-sample-notify-btn",
					iconName: "docspace-icon.svg",
					size: 20,
					isClickable: true,
					title: "Sample: Notifications",
					onClick: async (): Promise<IMessage> => ({
						actions: [Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: "Notification button clicked!"
							}
						]
					})
				}
			}
		]
	} as IBox
};

/**
 * 2. Status Button
 *
 * An article button item that demonstrates the onLoad pattern.
 * The initial body shows a skeleton placeholder.
 * After onLoad resolves, the skeleton is replaced by an icon button.
 *
 * Key API features demonstrated:
 * - `body` with `skeleton` child as the initial loading state.
 * - `onLoad` returning a new body with an `iconButton`.
 */
const statusItem: IArticleButtonItem = {
	key: "article-button-sample-status",
	body: {
		id: "article-button-sample-status-skeleton-box",
		widthProp: "32px",
		heightProp: "32px",
		children: [
			{
				component: Components.skeleton,
				props: {
					width: "32px",
					height: "32px"
				}
			}
		]
	} as IBox,
	onLoad: async (): Promise<{ body: IBox }> => ({
		body: {
			id: "article-button-sample-status-box",
			widthProp: "32px",
			heightProp: "32px",
			children: [
				{
					component: Components.iconButton,
					props: {
						id: "article-button-sample-status-btn",
						iconName: "docspace-icon.svg",
						size: 20,
						isClickable: true,
						title: "Sample: Status",
						onClick: async (): Promise<IMessage> => ({
							actions: [Actions.showToast],
							toastProps: [
								{
									type: ToastType.success,
									title: "Status button clicked!"
								}
							]
						})
					}
				}
			]
		} as IBox
	})
};

// --- Plugin registration -------------------------------------------------------

const plugin = new ArticleButtonSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.ArticleButtonSample = plugin || {};

export default plugin;
