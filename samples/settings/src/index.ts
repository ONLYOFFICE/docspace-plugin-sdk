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
	IButton,
	IInput,
	IMessage,
	IPlugin,
	ISettings,
	ISettingsPlugin,
	IToggleButton,
	InputSize,
	PluginStatus,
	ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Settings Sample Plugin
 *
 * Demonstrates how a plugin implements ISettingsPlugin to provide
 * administrator/owner configurable settings embedded in the plugin
 * description modal.
 *
 * Flow
 * ----
 * 1. Plugin registers `adminPluginSettings` with an `ISettings` block
 *    containing an API endpoint input and an "Enable Notifications" toggle.
 * 2. When the settings dialog opens, `onLoad` is called - it reads the
 *    persisted settings string (stored by the portal) and populates the
 *    input/toggle with the saved values.
 * 3. Clicking Save calls `Actions.saveSettings` with a JSON string containing
 *    `{ endpoint, notifications }`.  The portal stores it and broadcasts it to
 *    all users via `setAdminPluginSettingsValue`.
 * 4. `setAdminPluginSettingsValue` deserializes the string and updates the
 *    in-memory state so the UI reflects the latest persisted values.
 *
 * Key features demonstrated
 * --------------------------
 * - `ISettingsPlugin`            - the interface that adds admin settings.
 * - `adminPluginSettings`        - the ISettings block rendered in the dialog.
 * - `setAdminPluginSettings`     - called by the portal to replace the block.
 * - `setAdminPluginSettingsValue`- called by the portal to distribute saved
 *                                  settings to every connected user.
 * - `getAdminPluginSettings`     - returns the current ISettings block.
 * - `ISettings.onLoad`           - hydrates the UI from persisted values.
 * - `Actions.saveSettings`       - triggers portal-side save + distribution.
 * - `IInput` component           - text input for the API endpoint URL.
 * - `IToggleButton` component    - toggle for enabling/disabling notifications.
 */

// -- Mutable state -------------------------------------------------------------

/** Tracks the current endpoint value so the save button can read it. */
let currentEndpoint = "https://api.example.com";

/** Tracks the current toggle state so the save button can read it. */
let currentNotifications = true;

// -- Input component -----------------------------------------------------------

const endpointInput: IInput = {
	value: currentEndpoint,
	size: InputSize.base,
	scale: true,
	placeholder: "https://api.example.com",
	onChange: (value: string): IMessage => {
		currentEndpoint = value;
		endpointInput.value = value;
		return {
			actions: [Actions.updateProps],
			newProps: { ...endpointInput, value } as IInput,
		};
	},
};

// -- Toggle component ----------------------------------------------------------

const notificationsToggle: IToggleButton = {
	label: "Enable Notifications",
	isChecked: currentNotifications,
	onChange: (): IMessage => {
		currentNotifications = !currentNotifications;
		notificationsToggle.isChecked = currentNotifications;
		return {
			actions: [Actions.updateProps],
			newProps: {
				...notificationsToggle,
				isChecked: currentNotifications,
			} as IToggleButton,
		};
	},
};

// -- Settings body (IBox) ------------------------------------------------------

const settingsBox: IBox = {
	children: [
		{
			component: Components.input,
			props: endpointInput,
		},
		{
			component: Components.toggleButton,
			props: notificationsToggle,
		},
	],
};

// -- Save button ----------------------------------------------------------------

const saveButton: { component: Components.button; props: IButton } = {
	component: Components.button,
	props: {
		label: "Save",
		size: ButtonSize.normal,
		primary: true,
		scale: false,
		onClick: (): IMessage => ({
			actions: [Actions.saveSettings, Actions.showToast],
			settings: JSON.stringify({
				endpoint: currentEndpoint,
				notifications: currentNotifications,
			}),
			toastProps: [
				{
					type: ToastType.success,
					title: "Settings saved",
				},
			],
		}),
	},
};

// -- ISettings block -----------------------------------------------------------

const adminSettings: ISettings = {
	settings: settingsBox,
	saveButton,
	isLoading: false,

	onLoad: async () => {
		// Values may have been updated by setAdminPluginSettingsValue before
		// the dialog opened; re-sync the component props from in-memory state.
		return {
			settings: {
				children: [
					{
						component: Components.input,
						props: { ...endpointInput, value: currentEndpoint },
					},
					{
						component: Components.toggleButton,
						props: {
							...notificationsToggle,
							isChecked: currentNotifications,
						},
					},
				],
			},
		};
	},
};

// -- Plugin class --------------------------------------------------------------

class SettingsPlugin implements IPlugin, ISettingsPlugin {
	// -- IPlugin --------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {};

	updateStatus = (status: PluginStatus): void => {
		this.status = status;
	};

	getStatus = (): PluginStatus => this.status;

	setOnLoadCallback = (callback: () => Promise<void>): void => {
		this.onLoadCallback = callback;
	};

	// -- ISettingsPlugin -------------------------------------------------------

	adminPluginSettings: ISettings | null = adminSettings;

	setAdminPluginSettings = (settings: ISettings | null): void => {
		this.adminPluginSettings = settings;
	};

	/**
	 * Called by the portal to distribute persisted settings to all users.
	 * Deserializes the JSON string and updates in-memory state so the next
	 * time the settings dialog opens, `onLoad` reflects the saved values.
	 */
	setAdminPluginSettingsValue = (settings: string | null): void => {
		if (!settings) return;

		try {
			const parsed = JSON.parse(settings) as {
				endpoint?: string;
				notifications?: boolean;
			};

			if (typeof parsed.endpoint === "string") {
				currentEndpoint = parsed.endpoint;
			}

			if (typeof parsed.notifications === "boolean") {
				currentNotifications = parsed.notifications;
			}
		} catch {
			// Ignore malformed settings strings.
		}
	};

	getAdminPluginSettings = (): ISettings | null => this.adminPluginSettings;
}

// -- Registration --------------------------------------------------------------

const plugin = new SettingsPlugin();

declare global {
	interface Window {
		Plugins: Record<string, IPlugin>;
	}
}

window.Plugins.SettingsPlugin = plugin;

export default plugin;
