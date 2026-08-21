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
	ButtonSize,
	Component,
	Components,
	IArticleNavigationItem,
	IArticleNavigationPlugin,
	IBox,
	IMessage,
	IPlugin,
	PluginStatus,
	Section,
	ToastType,
	UsersType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Article Navigation Sample Plugin
 *
 * Two navigation items demonstrating the core article navigation API:
 *
 * 1. "Sample Overview" - visible in every portal section, because `appears`
 *                        is omitted. Available to all user types.
 * 2. "Sample Settings" - visible only in the portal Settings section
 *                        (`appears: [Section.Settings]`) and only to admins.
 *
 * Both items use the same loading pattern: the initial `section` renders a
 * skeleton placeholder, and `onLoad` returns the real content once the
 * simulated request resolves.
 */
class ArticleNavigationSample implements IPlugin, IArticleNavigationPlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addArticleNavigationItem(overviewItem);
		this.addArticleNavigationItem(settingsItem);
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

	// --- IArticleNavigationPlugin ------------------------------------------------

	articleNavigationItems: Map<string, IArticleNavigationItem> = new Map();

	addArticleNavigationItem = (item: IArticleNavigationItem): void => {
		this.articleNavigationItems.set(item.key, item);
	};

	getArticleNavigationItems = (): Map<string, IArticleNavigationItem> => {
		return this.articleNavigationItems;
	};

	updateArticleNavigationItem = (item: IArticleNavigationItem): void => {
		this.articleNavigationItems.set(item.key, item);
	};
}

// --- Content helpers -----------------------------------------------------------

/** How long the simulated content request takes, in milliseconds. */
const LOADING_DELAY = 1500;

/** Resolves after the given number of milliseconds. Simulates a network request. */
const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/** A single skeleton bar, wrapped in a box that carries the spacing. */
const skeletonLine = (
	id: string,
	width: string,
	height: string,
	marginProp: string
): Component => ({
	component: Components.box,
	props: {
		id,
		marginProp,
		children: [
			{
				component: Components.skeleton,
				props: {
					width,
					height,
					borderRadius: "3px"
				}
			}
		]
	}
});

/** A page heading followed by a muted description line. */
const pageHeader = (
	idPrefix: string,
	title: string,
	description: string
): Component => ({
	component: Components.box,
	props: {
		id: `${idPrefix}-header`,
		displayProp: "flex",
		flexDirection: "column",
		marginProp: "0 0 24px 0",
		children: [
			{
				component: Components.text,
				props: {
					text: title,
					fontSize: "21px",
					fontWeight: 700,
					isBold: true,
					noSelect: true
				}
			},
			{
				component: Components.text,
				props: {
					text: description,
					fontSize: "13px",
					lineHeight: "20px",
					color: "#6d7b8d",
					noSelect: true
				}
			}
		]
	}
});

/** A bordered card showing a caption and its value. */
const infoCard = (id: string, caption: string, value: string): Component => ({
	component: Components.box,
	props: {
		id,
		widthProp: "220px",
		paddingProp: "12px 16px",
		marginProp: "0 16px 16px 0",
		displayProp: "flex",
		flexDirection: "column",
		borderProp: "1px solid #e0e0e0",
		children: [
			{
				component: Components.text,
				props: {
					text: caption,
					fontSize: "12px",
					lineHeight: "16px",
					color: "#6d7b8d",
					noSelect: true
				}
			},
			{
				component: Components.text,
				props: {
					text: value,
					fontSize: "15px",
					lineHeight: "22px",
					fontWeight: 600,
					isBold: true,
					noSelect: true
				}
			}
		]
	}
});

/** A label and value placed on a single row, as on a settings page. */
const settingsRow = (id: string, label: string, value: string): Component => ({
	component: Components.box,
	props: {
		id,
		widthProp: "100%",
		paddingProp: "10px 0",
		displayProp: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		children: [
			{
				component: Components.text,
				props: {
					text: label,
					fontSize: "13px",
					lineHeight: "20px",
					color: "#6d7b8d",
					noSelect: true
				}
			},
			{
				component: Components.text,
				props: {
					text: value,
					fontSize: "13px",
					lineHeight: "20px",
					fontWeight: 600,
					isBold: true,
					noSelect: true
				}
			}
		]
	}
});

/**
 * A toast-firing button used as the call to action on both pages.
 * IButton has no `id` prop, so the wrapping box carries the identifier.
 */
const toastButton = (
	id: string,
	label: string,
	toastTitle: string,
	marginProp: string
): Component => ({
	component: Components.box,
	props: {
		id,
		marginProp,
		children: [
			{
				component: Components.button,
				props: {
					label,
					size: ButtonSize.normal,
					primary: true,
					scale: false,
					onClick: async (): Promise<IMessage> => ({
						actions: [Actions.showToast],
						toastProps: [
							{
								type: ToastType.success,
								title: toastTitle
							}
						]
					})
				}
			}
		]
	}
});

/** How many times the overview section has been refreshed. */
let refreshCount = 0;

/**
 * A button that mutates the overview item and applies the change with
 * the `updateArticleNavigationItems` action.
 */
const refreshButton = (id: string, label: string, marginProp: string): Component => ({
	component: Components.box,
	props: {
		id,
		marginProp,
		children: [
			{
				component: Components.button,
				props: {
					label,
					size: ButtonSize.normal,
					scale: false,
					onClick: async (): Promise<IMessage> => {
						refreshCount += 1;

						plugin.updateArticleNavigationItem({
							...overviewItem,
							label: `Sample Overview (${refreshCount})`
						});

						return {
							actions: [Actions.updateArticleNavigationItems]
						};
					}
				}
			}
		]
	}
});

// --- Item definitions ----------------------------------------------------------

/**
 * 1. Sample Overview
 *
 * A navigation item shown in every portal section: Files, Accounts and Settings.
 * Clicking it opens a plugin page that first renders a skeleton and then swaps
 * in the loaded content.
 *
 * Key API features demonstrated:
 * - `appears` omitted    - the item is visible in all sections.
 * - `usersTypes` omitted - the item is visible to all user types.
 * - `section`            - the IBox rendered on the plugin page (skeleton state).
 * - `onLoad`             - resolves with the section that replaces the skeleton.
 */
const overviewItem: IArticleNavigationItem = {
	key: "article-navigation-sample-overview",
	label: "Sample Overview",
	icon: "docspace-icon.svg",
	section: {
		id: "article-navigation-sample-overview-skeleton",
		widthProp: "100%",
		paddingProp: "20px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			skeletonLine(
				"article-navigation-sample-overview-skeleton-title",
				"260px",
				"24px",
				"0 0 12px 0"
			),
			skeletonLine(
				"article-navigation-sample-overview-skeleton-description",
				"420px",
				"16px",
				"0 0 28px 0"
			),
			{
				component: Components.box,
				props: {
					id: "article-navigation-sample-overview-skeleton-cards",
					displayProp: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					children: [
						skeletonLine(
							"article-navigation-sample-overview-skeleton-card-1",
							"220px",
							"64px",
							"0 16px 16px 0"
						),
						skeletonLine(
							"article-navigation-sample-overview-skeleton-card-2",
							"220px",
							"64px",
							"0 16px 16px 0"
						),
						skeletonLine(
							"article-navigation-sample-overview-skeleton-card-3",
							"220px",
							"64px",
							"0 16px 16px 0"
						)
					]
				}
			},
			skeletonLine(
				"article-navigation-sample-overview-skeleton-button",
				"120px",
				"32px",
				"12px 0 0 0"
			)
		]
	} as IBox,
	onLoad: async (): Promise<{ section: IBox }> => {
		// Stands in for the request a real plugin would make here.

		return {
			section: {
				id: "article-navigation-sample-overview-section",
				widthProp: "100%",
				paddingProp: "20px",
				displayProp: "flex",
				flexDirection: "column",
				children: [
					pageHeader(
						"article-navigation-sample-overview",
						"Article navigation sample",
						"This page is rendered by the ArticleNavigation plugin scope. The item that opens it is shown in every portal section."
					),
					{
						component: Components.box,
						props: {
							id: "article-navigation-sample-overview-cards",
							displayProp: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							children: [
								infoCard(
									"article-navigation-sample-overview-card-scope",
									"Plugin scope",
									"ArticleNavigation"
								),
								infoCard(
									"article-navigation-sample-overview-card-sections",
									"Visible in sections",
									"Files, Accounts, Settings"
								),
								infoCard(
									"article-navigation-sample-overview-card-users",
									"Visible to users",
									"All user types"
								),
								infoCard(
									"article-navigation-sample-overview-card-refreshes",
									"Section refreshes",
									String(refreshCount)
								)
							]
						}
					},
					toastButton(
						"article-navigation-sample-overview-button",
						"Show toast",
						"Hello from the article navigation sample!",
						"12px 0 0 0"
					),
					refreshButton(
						"article-navigation-sample-overview-refresh-button",
						"Refresh section",
						"12px 0 0 0"
					)
				]
			} as IBox
		};
	}
};

/**
 * 2. Sample Settings
 *
 * A navigation item restricted to the portal Settings section and to portal
 * administrators. It shows the same skeleton-then-content flow as the first item.
 *
 * Key API features demonstrated:
 * - `appears: [Section.Settings]` - the item is shown in Settings only.
 * - `usersTypes`                  - the item is shown to admins only.
 */
const settingsItem: IArticleNavigationItem = {
	key: "article-navigation-sample-settings",
	label: "Sample Settings",
	icon: "docspace-icon.svg",
	appears: [Section.Settings],
	usersTypes: [UsersType.owner, UsersType.docSpaceAdmin],
	section: {
		id: "article-navigation-sample-settings-skeleton",
		widthProp: "100%",
		paddingProp: "20px",
		displayProp: "flex",
		flexDirection: "column",
		children: [
			skeletonLine(
				"article-navigation-sample-settings-skeleton-title",
				"220px",
				"24px",
				"0 0 12px 0"
			),
			skeletonLine(
				"article-navigation-sample-settings-skeleton-description",
				"380px",
				"16px",
				"0 0 28px 0"
			),
			skeletonLine(
				"article-navigation-sample-settings-skeleton-row-1",
				"440px",
				"20px",
				"0 0 16px 0"
			),
			skeletonLine(
				"article-navigation-sample-settings-skeleton-row-2",
				"440px",
				"20px",
				"0 0 16px 0"
			),
			skeletonLine(
				"article-navigation-sample-settings-skeleton-row-3",
				"440px",
				"20px",
				"0 0 28px 0"
			),
			skeletonLine(
				"article-navigation-sample-settings-skeleton-button",
				"120px",
				"32px",
				"0"
			)
		]
	} as IBox,
	onLoad: async (): Promise<{ section: IBox }> => {
		// Stands in for the settings request a real plugin would make here.
		await delay(LOADING_DELAY);

		return {
			section: {
				id: "article-navigation-sample-settings-section",
				widthProp: "100%",
				paddingProp: "20px",
				displayProp: "flex",
				flexDirection: "column",
				children: [
					pageHeader(
						"article-navigation-sample-settings",
						"Sample settings",
						"This page is reachable from the portal Settings section only, and only portal administrators see the navigation item."
					),
					{
						component: Components.box,
						props: {
							id: "article-navigation-sample-settings-rows",
							widthProp: "440px",
							paddingProp: "4px 16px",
							displayProp: "flex",
							flexDirection: "column",
							borderProp: "1px solid #e0e0e0",
							children: [
								settingsRow(
									"article-navigation-sample-settings-row-section",
									"Section",
									"Settings"
								),
								settingsRow(
									"article-navigation-sample-settings-row-users",
									"User types",
									"Owner, DocSpace admin"
								),
								settingsRow(
									"article-navigation-sample-settings-row-state",
									"Content state",
									"Loaded"
								)
							]
						}
					},
					toastButton(
						"article-navigation-sample-settings-button",
						"Save",
						"Sample settings saved!",
						"24px 0 0 0"
					)
				]
			} as IBox
		};
	}
};

// --- Plugin registration -------------------------------------------------------

const plugin = new ArticleNavigationSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.ArticleNavigationSample = plugin || {};

export default plugin;
