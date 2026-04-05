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
	Components,
	IBox,
	IFrame,
	IMessage,
	IModalDialog,
	IPlugin,
	IPostMessageCallbackMessage,
	IPostMessagePlugin,
	IProfileMenuItem,
	IProfileMenuPlugin,
	ModalDisplayType,
	PluginStatus,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * PostMessage Sample Plugin
 *
 * Demonstrates how a plugin implements IPostMessagePlugin to receive messages
 * from an embedded iframe and trigger portal-side actions.
 *
 * Flow
 * ────
 * 1. `onLoadCallback` registers a profile-menu item "Open PostMessage Panel".
 * 2.  window.parent.addEventListener("message", ...)` handler
 *    is installed.  It parses incoming postMessage events and, when
 *    `data.source === "post-message-plugin"`, calls `plugin.postMessageCallback`
 *    wieth `Actions.showToast` to surface a success notification in the portal.
 * 3. When the user clicks the menu item, `onClick` returns
 *    `Actions.showModal` with the module-level `postMessageDialog` constant.
 * 4. DocSpace renders a PluginDialog containing an IFrame whose `src` is a
 *    `data:text/html` URI built inline — no separate HTML asset is required.
 *    `onLoad` is called immediately and returns the real dialog body and footer.
 * 5. The iframe page has a button that calls
 *    `window.parent.postMessage({ source: "post-message-plugin", ... }, "*")`.
 *    The listener installed in step 2 catches this and fires the toast.
 *
 * Key features demonstrated
 * ──────────────────────────
 * - `IPostMessagePlugin`       — the interface that grants postMessage access.
 * - `postMessageCallback`      — set by the portal; called by the plugin to
 *                                 trigger portal-side actions.
 * - `setPostMessageCallback`   — portal calls this to register the callback.
 * - `getPostMessageCallback`   — portal calls this to retrieve the callback.
 * - `window.parent.addEventListener` — the plugin runs inside a hidden iframe;
 *                                 `window.parent` is the portal window where
 *                                 visible iframes deliver their messages.
 * - `IFrame` component         — embeds an inline `data:text/html` page inside the dialog.
 * - `ModalDisplayType.modal`   — center-screen modal dialog.
 * - `onLoad`                   — returns real body and footer after the shell
 *                                 dialog is already visible.
 */
class PostMessagePlugin implements IPlugin, IProfileMenuPlugin, IPostMessagePlugin {
	// ── IPlugin ──────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addProfileMenuItem(openPanelItem);
	};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// ── IProfileMenuPlugin ────────────────────────────────────────────────────────

	profileMenuItems: Map<string, IProfileMenuItem> = new Map();

	addProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};

	getProfileMenuItems = (): Map<string, IProfileMenuItem> => this.profileMenuItems;

	updateProfileMenuItem = (item: IProfileMenuItem): void => {
		this.profileMenuItems.set(item.key, item);
	};

	// ── IPostMessagePlugin ────────────────────────────────────────────────────────

	/** Callback registered by the portal; initially a no-op. */
	postMessageCallback: (message: IPostMessageCallbackMessage) => void = () => {};

	setPostMessageCallback = (
		callback: (message: IPostMessageCallbackMessage) => void
	): void => {
		this.postMessageCallback = callback;
	};

	getPostMessageCallback = (): ((message: IPostMessageCallbackMessage) => void) => {
		return this.postMessageCallback;
	};
}

// ─── Dialog footer — "Close" button ──────────────────────────────────────────

const footerBox: IBox = {
	children: [
		{
			component: Components.button,
			props: {
				label: "Close",
				size: ButtonSize.normal,
				primary: false,
				scale: true,
				onClick: (): IMessage => ({
					actions: [Actions.closeModal]
				})
			}
		}
	]
};

// ─── Iframe HTML — defined inline so no separate asset file is needed ─────────
//
// The page has a single button that fires window.parent.postMessage with
// source: "post-message-plugin".  The plugin's message listener (installed in
// the constructor) catches this and calls postMessageCallback → showToast.

const iframeHtml = `
<!DOCTYPE html>
<html>
<body>
  <button onclick="window.parent.postMessage(JSON.stringify({ source: 'post-message-plugin', data: 'work' }), '*')">Send Message</button>
</body>
</html>
`;

// ─── Embedded iframe using a data URI — no server-side asset required ──────────

const frameProps: IFrame = {
	src: "data:text/html;charset=utf-8," + encodeURIComponent(iframeHtml),
	name: "post-message-frame",
	id: "post-message-frame",
	width: "100%",
	height: "220px",
	sandbox: "allow-scripts",
	style: { border: "none" }
};

// ─── Dialog body — the IFrame component ──────────────────────────────────────

const bodyBox: IBox = {
	children: [
		{
			component: Components.iFrame,
			props: frameProps
		}
	]
};

// ─── Modal dialog props (module-level constant) ────────────────────────────────

const postMessageDialog: IModalDialog = {
	displayType: ModalDisplayType.modal,
	dialogHeader: "PostMessage Plugin Demo",

	/** Placeholder body — replaced by onLoad before the dialog is shown. */
	dialogBody: { children: [] },

	withFooterBorder: true,
	autoMaxHeight: true,

	onClose: (): IMessage => ({
		actions: [Actions.closeModal]
	}),

	onLoad: async () => ({
		newDialogHeader: "PostMessage Plugin Demo",
		newDialogBody: bodyBox,
		newDialogFooter: footerBox
	})
};

// ─── Profile menu item ────────────────────────────────────────────────────────

const openPanelItem: IProfileMenuItem = {
	key: "post-message-open-panel",
	label: "Open PostMessage Panel",
	icon: "docspace-icon.svg",
	onClick: (): IMessage => ({
		actions: [Actions.showModal],
		modalDialogProps: postMessageDialog
	})
};

// ─── Registration ─────────────────────────────────────────────────────────────

const plugin = new PostMessagePlugin();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins.PostMessagePlugin = plugin;

/**
 * Install the postMessage listener immediately so it is active before
 * the user opens the dialog.  Messages that do not carry
 * `source: "post-message-plugin"` are silently ignored.
 */
window.parent.addEventListener("message", (event: MessageEvent) => {
	try {
		const data: unknown =
			typeof event.data === "string" ? JSON.parse(event.data) : event.data;

		console.log(data);

		if (
			!data ||
			typeof data !== "object" ||
			(data as Record<string, unknown>).source !== "post-message-plugin"
		) {
			return;
		}

		console.log("call postMessageCallback");

		plugin.postMessageCallback({
			actions: [Actions.showToast],
			toastProps: [
				{
					type: ToastType.success,
					title: "PostMessage received"
				}
			]
		});
	} catch {
		// Ignore non-JSON or unrelated messages.
	}
});

export default plugin;
