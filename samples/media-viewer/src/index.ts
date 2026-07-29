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
	Devices,
	File,
	IBox,
	IFileItem,
	IFilePlugin,
	IMediaViewer,
	IMessage,
	IPlugin,
	PluginStatus,
	TextGroup,
	ToastType
} from "@onlyoffice/docspace-plugin-sdk";

/**
 * Media Viewer Sample Plugin
 *
 * Two items demonstrating the core media viewer API:
 *
 * 1. ".mp4" handler - intercepts video file clicks and opens a custom media viewer.
 *                     Shows an info toast via the `onLoad` callback.
 *
 * 2. ".jpg" handler - same pattern for image files.
 *                     Shows a success toast via the `onLoad` callback.
 */
class MediaViewerSample implements IPlugin, IFilePlugin {
	// --- IPlugin ----------------------------------------------------------------

	status: PluginStatus = PluginStatus.active;

	onLoadCallback = async (): Promise<void> => {
		this.addFileItem(mp4Item);
		this.addFileItem(jpgItem);
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

	// --- IFilePlugin ----------------------------------------------------------

	fileItems: Map<string, IFileItem> = new Map();

	addFileItem = (item: IFileItem): void => {
		this.fileItems.set(item.extension, item);
	};

	getFileItems = (): Map<string, IFileItem> => {
		return this.fileItems;
	};

	updateFileItem = (item: IFileItem): void => {
		this.fileItems.set(item.extension, item);
	};
}

// --- Helpers ------------------------------------------------------------------

function buildViewerContent(fileTitle: string): IBox {
	const title: TextGroup = {
		component: Components.text,
		props: {
			text: `Custom viewer: ${fileTitle}`,
			noSelect: true,
			isBold: true
		}
	};

	return {
		id: "media-viewer-sample-content",
		widthProp: "100%",
		heightProp: "100%",
		displayProp: "flex",
		alignItems: "center",
		justifyContent: "center",
		children: [title]
	};
}

function buildMediaViewerProps(
	file: File,
	toastType: ToastType,
	toastTitle: string
): IMediaViewer {
	return {
		fileId: file.id,
		title: `Plugin Viewer: ${file.title}`,
		content: buildViewerContent(file.title),
		onLoad: (data) => ({
			actions: [Actions.showToast],
			toastProps: [{ type: toastType, title: `${toastTitle}: ${data.fileId}` }]
		}),
		onClose: () => ({
			actions: [Actions.closeMediaViewer]
		}),
		playlistFilter: {
			filesExsts: [".mp4", ".jpg", ".png"],
			devices: [Devices.desktop, Devices.tablet]
		},
		navigation: {
			onNext: () => ({
				actions: [Actions.showToast],
				toastProps: [{ type: ToastType.info, title: "Navigation: next" }]
			}),
			onPrevious: () => ({
				actions: [Actions.showToast],
				toastProps: [{ type: ToastType.info, title: "Navigation: previous" }]
			}),
			onFileChange: (data) => ({
				actions: [Actions.showToast],
				toastProps: [{ type: ToastType.info, title: `File changed: ${data.fileId}` }]
			})
		}
	};
}

// --- Item definitions ---------------------------------------------------------

/**
 * 1. MP4 handler
 *
 * Intercepts clicks on every .mp4 file in the file list.
 * Opens the DocSpace media viewer with custom plugin content.
 *
 * Key API features demonstrated:
 * - `Actions.showMediaViewer` - opens the media viewer with plugin content.
 * - `mediaViewerProps.content` - IBox rendered inside the viewer.
 * - `mediaViewerProps.onLoad`  - fires an info toast when the viewer mounts.
 * - `mediaViewerProps.onClose` - closes the viewer with Actions.closeMediaViewer.
 * - `mediaViewerProps.playlistFilter` - restricts playlist to media/image files.
 * - `mediaViewerProps.navigation` - callbacks for next/prev navigation.
 */
const mp4Item: IFileItem = {
	extension: ".mp4",
	fileTypeName: "Sample: Media Viewer",
	fileRowIcon: "docspace-icon.svg",
	fileTileIcon: "docspace-icon.svg",
	onClick: async (file: File): Promise<IMessage> => ({
		actions: [Actions.showMediaViewer],
		mediaViewerProps: buildMediaViewerProps(file, ToastType.info, "Media viewer loaded")
	})
};

/**
 * 2. JPG handler
 *
 * Intercepts clicks on every .jpg file in the file list.
 *
 * Key API features demonstrated:
 * - Same structure as the MP4 handler, but for `.jpg` image files.
 * - Demonstrates that both image and video extensions can be intercepted.
 */
const jpgItem: IFileItem = {
	extension: ".jpg",
	fileTypeName: "Sample: Image Viewer",
	fileRowIcon: "docspace-icon.svg",
	fileTileIcon: "docspace-icon.svg",
	onClick: async (file: File): Promise<IMessage> => ({
		actions: [Actions.showMediaViewer],
		mediaViewerProps: buildMediaViewerProps(
			file,
			ToastType.success,
			"Image viewer loaded"
		)
	})
};

// --- Plugin registration -------------------------------------------------------

const plugin = new MediaViewerSample();

declare global {
	interface Window {
		Plugins: any;
	}
}

window.Plugins.MediaViewerSample = plugin || {};

export default plugin;
