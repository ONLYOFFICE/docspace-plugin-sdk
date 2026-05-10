// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import React, { createContext, useContext } from "react";

export { Events } from "../enums/Events";
export { Actions } from "../enums/Actions";
export { FilesExst, FilesType, FilesSecurity } from "../enums/Files";
export { PluginStatus } from "../enums/Plugins";
export { RoomsType } from "../enums/Rooms";
export { Security } from "../enums/Security";

import type { FilesExst, FilesType } from "../enums/Files";

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface TCurrentFile {
	id: number | string;
	title: string;
	fileExst?: string;
	isFolder?: boolean;
	isRoom?: boolean;
	roomType?: string;
}

export interface TCurrentUser {
	id: string;
	displayName: string;
	email: string;
	isOwner: boolean;
	isAdmin: boolean;
	isRoomAdmin: boolean;
}

// ─── Actions / API ────────────────────────────────────────────────────────────

export interface ToastProps {
	type: "success" | "error" | "warning" | "info";
	title: string;
	description?: string;
}

export interface SelectorItem {
	id: string | number;
	label: string;
	type?: string;
}

export interface SelectorDialogProps {
	selectorType: "Files" | "Groups" | "People" | "Room";
	isMultiSelect?: boolean;
	searchPlaceholder?: string;
	onCancel?(): void;
}

export interface FloatingOperation {
	id: string;
	title: string;
	status?: "processing" | "completed" | "error";
	progress?: number;
}

export interface PluginActions {
	showToast(props: ToastProps): void;
	showModal(component: React.ReactNode): void;
	closeModal(): void;
	navigate(path: string): void;
	openInfoPanel(): void;
	showSelector(props: SelectorDialogProps): Promise<SelectorItem[]>;
	addFloatingOperation(props: FloatingOperation): void;
	updateFloatingOperation(props: Partial<FloatingOperation> & { id: string }): void;
	removeFloatingOperation(id: string): void;
}

export interface PluginAPIClient {
	get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T>;
	post<T = unknown>(path: string, body?: unknown): Promise<T>;
	put<T = unknown>(path: string, body?: unknown): Promise<T>;
	delete<T = unknown>(path: string): Promise<T>;
}

// ─── Runtime (injected by DocSpace via props) ─────────────────────────────────

export interface PluginRuntime {
	currentFile: TCurrentFile | null;
	currentUser: TCurrentUser | null;
	actions: PluginActions;
	api: PluginAPIClient;
	saveSettings(data: Record<string, unknown>): Promise<void>;
	loadSettings<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T | null>;
}

// ─── Slot definitions ─────────────────────────────────────────────────────────

export interface InfoPanelItem {
	key: string;
	label: string;
	icon?: string;
	component: React.ComponentType;
	isHeaderVisible?: boolean;
	filesType?: FilesType[];
	filesExsts?: (FilesExst | string)[];
}

// ─── PluginDefinition ─────────────────────────────────────────────────────────

export interface PluginDefinition {
	name: string;
	version?: string;

	infoPanelItems?: InfoPanelItem[];
	settings?: { component: React.ComponentType };

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
			component: withPluginRuntime(plugin.settings.component) as React.ComponentType
		}
	};
}

// ─── withPluginRuntime HOC + hooks ────────────────────────────────────────────
//
// The context is created inside the plugin bundle — provider and consumer
// share the same module, so the context reference is always the same.
// definePlugin wraps components with withPluginRuntime automatically.

const LocalRuntimeContext = createContext<PluginRuntime | null>(null);

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
