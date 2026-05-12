// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import type React from "react";

import type { InfoPanelItem, ContextMenuItem } from "./items";
import { withPluginRuntime } from "./runtime";

export interface PluginDefinition {
	infoPanelItems?: InfoPanelItem[];
	contextMenuItems?: ContextMenuItem[];
	settings?: {
		component: React.ComponentType;
		onSave?: () => Promise<void>;
	};

	onInit?(): Promise<void>;
	onDestroy?(): void;
}

export function definePlugin(plugin: PluginDefinition): PluginDefinition {
	return {
		...plugin,
		infoPanelItems: plugin.infoPanelItems?.map((item) => ({
			...item,
			component: withPluginRuntime(item.component) as React.ComponentType
		})),
		settings: plugin.settings && {
			component: withPluginRuntime(plugin.settings.component) as React.ComponentType,
			onSave: plugin.settings.onSave
		}
	};
}
