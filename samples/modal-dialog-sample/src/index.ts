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
	IMessage,
	IModalDialog,
	IPlugin,
	IProfileMenuItem,
	IProfileMenuPlugin,
	ModalDisplayType,
	PluginStatus
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Modal Dialog Sample Plugin
 *
 * Demonstrates how a plugin opens an IModalDialog from a profile-menu item.
 *
 * The dialog props are defined as a module-level constant - no factory
 * function is used - showing that IModalDialog can be fully declared once.
 *
 * Flow
 * ────
 * 1. `onLoadCallback` registers a profile-menu item "About Plugin".
 * 2. When the user clicks the item, `onClick` returns
 *    `Actions.showModal` with the module-level `aboutDialog` constant.
 * 3. DocSpace renders the PluginDialog using those props.
 *    `onLoad` is called immediately and returns the dialog body/footer.
 * 4. The footer "Close" button returns `Actions.closeModal`; so does
 *    the built-in "x" button via `onClose`.
 *
 * Key IModalDialog features demonstrated
 * ───────────────────────────────────────
 * - `displayType`      - center-screen modal (`ModalDisplayType.modal`).
 * - `dialogHeader`     - static header string.
 * - `dialogBody`       - placeholder box (overwritten by `onLoad`).
 * - `dialogFooter`     - box with a "Close" button (set by `onLoad`).
 * - `onLoad`           - returns the real body and footer content.
 * - `onClose`          - called when "x" is clicked; returns `closeModal`.
 * - `withFooterBorder` - visual separator between body and footer.
 */
class ModalDialogPlugin implements IPlugin, IProfileMenuPlugin {
	// ── IPlugin ──────────────────────────────────────────────────────────────────

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addProfileMenuItem(aboutItem);
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
}

// ─── Dialog footer - "Close" button ──────────────────────────────────────────

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

// ─── Dialog body ──────────────────────────────────────────────────────────────

const bodyBox: IBox = {
	children: [
		{
			component: Components.text,
			props: {
				text: "This plugin demonstrates IModalDialog. It opens a modal dialog from a profile-menu item.",
				fontSize: "14px",
				lineHeight: "20px"
			}
		},
		{
			component: Components.text,
			props: {
				text: 'Click "Close" or the \u00d7 button to dismiss the dialog.',
				fontSize: "13px",
				lineHeight: "20px",
				color: "#6d7b8d"
			}
		}
	]
};

// ─── Modal dialog props (module-level constant) ────────────────────────────────

const aboutDialog: IModalDialog = {
	displayType: ModalDisplayType.modal,
	dialogHeader: "About Modal Dialog Sample",

	/** Placeholder body - replaced by onLoad before the dialog is shown. */
	dialogBody: { children: [] },

	withFooterBorder: true,

	onClose: (): IMessage => ({
		actions: [Actions.closeModal]
	}),

	onLoad: async () => ({
		newDialogHeader: "About Modal Dialog Sample",
		newDialogBody: bodyBox,
		newDialogFooter: footerBox
	})
};

// ─── Profile menu item ────────────────────────────────────────────────────────

const aboutItem: IProfileMenuItem = {
	key: "modal-dialog-sample-about",
	label: "Sample: About Plugin",
	icon: "docspace-icon.svg",
	onClick: (): IMessage => ({
		actions: [Actions.showModal],
		modalDialogProps: aboutDialog
	})
};

// ─── Registration ─────────────────────────────────────────────────────────────

const plugin = new ModalDialogPlugin();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins = window.Plugins || {};
window.Plugins.ModalDialogPlugin = plugin;

export default plugin;
