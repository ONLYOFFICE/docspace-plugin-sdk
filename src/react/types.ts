// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import type { ComponentType } from "react";

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

export interface ToastProps {
	type: "success" | "error" | "warning" | "info";
	title: string;
	description?: string;
}

export interface ModalDialogOptions {
	/** Display type: "modal" (center) or "aside" (side panel). Default: "modal" */
	displayType?: "modal" | "aside";
	/** Sets max-width: auto */
	autoMaxWidth?: boolean;
	/** Sets max-height: auto */
	autoMaxHeight?: boolean;
	/** Removes default padding from body */
	withoutBodyPadding?: boolean;
	/** Removes default margin from header */
	withoutHeaderMargin?: boolean;
	/** Shows border between body and footer */
	withFooterBorder?: boolean;
	/** Large size preset */
	isLarge?: boolean;
	/** Prevents closing the dialog via Escape key or backdrop click */
	isCloseable?: boolean;
}

export interface PluginActions {
	showToast(props: ToastProps): void;
	showModal(component: ModalDialogContent, options?: ModalDialogOptions): void;
	closeModal(): void;
	navigate(path: string): void;
	openInfoPanel(): void;
}

export interface PluginAPIClient {
	get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T>;
	post<T = unknown>(path: string, body?: unknown): Promise<T>;
	put<T = unknown>(path: string, body?: unknown): Promise<T>;
	delete<T = unknown>(path: string): Promise<T>;
}

export interface PluginRuntime {
	currentFile: TCurrentFile | null;
	currentUser: TCurrentUser | null;
	actions: PluginActions;
	api: PluginAPIClient;
	saveSettings(data: Record<string, unknown>): Promise<void>;
	loadSettings<
		T extends Record<string, unknown> = Record<string, unknown>
	>(): Promise<T | null>;
}

export type ModalDialogContent = ComponentType<{ runtime: PluginRuntime }>;
