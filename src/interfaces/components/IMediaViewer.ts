/**
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
 *
 * @license
 */

import { IBox } from "./IBox";
import { TReturnMessage } from "../utils";
import { FilesExst, FilesSecurity, Devices, UsersType } from "../../enums";

/**
 * Properties for the Media Viewer component that allows plugins to display custom content.
 *
 * To open the viewer, return an [`IMessage`](../utils.md#imessage) with
 * [`Actions.showMediaViewer`](../../enums/Actions.md#showmediaviewer) in `actions`
 * and pass the configuration in `mediaViewerProps`.
 * Use [`Actions.updateMediaViewer`](../../enums/Actions.md#updatemediaviewer) and
 * [`Actions.closeMediaViewer`](../../enums/Actions.md#closemediaviewer) to update or close it.
 *
 *
 * @example
 *
 * Display custom video player in Media Viewer
 *
 * ```typescript
 * const mediaViewerProps: IMediaViewer = {
 *   title: "Custom Video Player",
 *   content: {
 *     widthProp: "100%",
 *     heightProp: "100%",
 *     displayProp: "flex",
 *     children: [
 *       {
 *         component: Components.iFrame,
 *         props: {
 *           id: "video-player-frame",
 *           src: "https://player.example.com/video/12345",
 *           width: "100%",
 *           height: "100%",
 *           sandbox: "allow-scripts allow-same-origin",
 *           style: { border: "none" }
 *         }
 *       }
 *     ]
 *   },
 *   onClose: () => {
 *     return {
 *       actions: [Actions.closeMediaViewer]
 *     };
 *   },
 *   onLoad: (data) => {
 *     console.log("Media viewer loaded with fileId:", data.fileId);
 *     return { actions: [] };
 *   }
 * };
 * ```
 *
 * @example
 *
 * Display custom image viewer with playlist navigation
 *
 * ```typescript
 * const mediaViewerProps: IMediaViewer = {
 *   title: "Image with Annotations",
 *   content: {
 *     widthProp: "100%",
 *     heightProp: "100%",
 *     children: [
 *       {
 *         component: Components.iFrame,
 *         props: {
 *           id: "annotation-viewer",
 *           src: "https://annotator.example.com/image/67890",
 *           width: "100%",
 *           height: "100%"
 *         }
 *       }
 *     ]
 *   },
 *   playlistFilter: {
 *     filesExsts: [".jpg", ".png", FilesExst.svg],
 *     filesSecurity: [FilesSecurity.Read],
 *     usersTypes: [UsersType.user, UsersType.collaborator],
 *     devices: [Devices.desktop, Devices.tablet]
 *   },
 *   navigation: {
 *     onNext: () => {
 *       console.log("Next file");
 *       return { actions: [] };
 *     },
 *     onPrevious: () => {
 *       console.log("Previous file");
 *       return { actions: [] };
 *     },
 *     onFileChange: (data) => {
 *       console.log("File changed to:", data.fileId);
 *       return { actions: [] };
 *     }
 *   }
 * };
 * ```
 */
export interface IMediaViewer {
	/**
	 * The ID of the file to display in the media viewer.
	 * If not specified, the first file in the playlist will be displayed.
	 */
	fileId?: number | string;
	/**
	 * The custom content to render inside the media viewer.
	 * This should be a Box component that contains your custom UI elements.
	 */
	content: IBox;

	/**
	 * Optional title to display in the media viewer header.
	 * If not provided, the default file name will be used.
	 */
	title?: string;

	/**
	 * Callback function that is called when the media viewer should be closed.
	 * This is triggered when the user clicks the close button, background, or presses ESC.
	 * Can return a TReturnMessage with Actions.closeMediaViewer to close the viewer.
	 *
	 */
	onClose?: () => TReturnMessage;

	/**
	 * Filter configuration for playlist.
	 * Only applies when enablePlaylist is true.
	 */
	playlistFilter?: IMediaViewerPlaylistFilter;

	/**
	 * Navigation callbacks.
	 * Only applies when enablePlaylist is true.
	 */
	navigation?: IMediaViewerNavigation;

	/**
	 * A function that is executed when the plugin viewer is mounted.
	 * It is called once when the viewer is first displayed.
	 * @param data - Object containing fileId of the current file
	 */
	onLoad?: (data: { fileId: number | string }) => TReturnMessage;
}

/**
 * Filter configuration for media viewer playlist.
 * Defines which files should be included in the playlist.
 *
 */
export interface IMediaViewerPlaylistFilter {
	/**
	 * Allowed file extensions (e.g., [FilesExst.doc, ".drawio", ".md"]).
	 * If not specified, all extensions are allowed.
	 */
	filesExsts?: (FilesExst | string)[];

	/**
	 * Required security permissions for files.
	 * If not specified, all security permissions are allowed.
	 */
	filesSecurity?: FilesSecurity[];

	/**
	 * The types of users who will see the media viewer.
	 * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
	 * If this parameter is not specified, then the media viewer will be displayed for all user types.
	 */
	usersTypes?: UsersType[];

	/**
	 * The types of devices where the media viewer will be displayed.
	 * At the moment the following device types are available: mobile, tablet, desktop.
	 * If this parameter is not specified, then the media viewer will be displayed in any device types.
	 */
	devices?: Devices[];
}

/**
 * Navigation callbacks for media viewer.
 * Called when user navigates through the playlist.
 *
 */
export interface IMediaViewerNavigation {
	/**
	 * Called when navigating to next file.
	 */
	onNext?: () => TReturnMessage;

	/**
	 * Called when navigating to previous file.
	 */
	onPrevious?: () => TReturnMessage;

	/**
	 * Called when file changes.
	 * @param data - Object containing fileId of the new file
	 */
	onFileChange?: (data: { fileId: number | string }) => TReturnMessage;
}
