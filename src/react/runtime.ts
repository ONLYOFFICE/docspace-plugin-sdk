// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// The context is created inside the plugin bundle — provider and consumer
// share the same module, so the context reference is always the same.
// definePlugin wraps components with withPluginRuntime automatically.

import React, { createContext, useContext } from "react";

import type {
	PluginRuntime,
	TCurrentFile,
	PluginActions,
	PluginAPIClient,
	TCurrentUser,
} from "./types";

export const LocalRuntimeContext = createContext<PluginRuntime | null>(null);

export function withPluginRuntime(Component: React.ComponentType) {
	function WithRuntime({ runtime }: { runtime: PluginRuntime }) {
		return React.createElement(
			LocalRuntimeContext.Provider,
			{ value: runtime },
			React.createElement(Component, null)
		);
	}
	WithRuntime.displayName = `WithRuntime(${Component.displayName ?? Component.name ?? "Component"})`;
	return WithRuntime;
}

export function usePluginRuntime(): PluginRuntime {
	const ctx = useContext(LocalRuntimeContext);
	if (!ctx)
		throw new Error(
			"usePluginRuntime: wrap the component with withPluginRuntime or pass runtime as a prop"
		);
	return ctx;
}

export function useCurrentFile(): TCurrentFile | null {
	return usePluginRuntime().currentFile;
}

export function usePluginActions(): PluginActions {
	return usePluginRuntime().actions;
}

export function usePluginAPI(): PluginAPIClient {
	return usePluginRuntime().api;
}

export function useCurrentUser(): TCurrentUser | null {
	return usePluginRuntime().currentUser;
}
