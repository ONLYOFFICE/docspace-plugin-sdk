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

import type { ComponentType } from "react";

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
 * <plugin-image src="mediaviewer.png" dark />
 *
 * @example
 *
 * Custom video player in the media viewer
 *
 * ```tsx
 * import { useCurrentFile, usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IMediaViewer } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function VideoPlayer() {
 *   const file = useCurrentFile();
 *   const { closeMediaViewer } = usePluginActions();
 *
 *   if (!file) return null;
 *
 *   return (
 *     <div style={{ width: "100%", height: "100%" }}>
 *       <iframe
 *         src={`https://player.example.com/video/${file.id}`}
 *         width="100%"
 *         height="100%"
 *         sandbox="allow-scripts allow-same-origin"
 *         style={{ border: "none" }}
 *       />
 *       <button type="button" onClick={closeMediaViewer}>Close</button>
 *     </div>
 *   );
 * }
 *
 * const mediaViewerProps: IMediaViewer = {
 *   title: "Custom Video Player",
 *   component: VideoPlayer,
 *   onClose: () => ({ actions: [Actions.closeMediaViewer] })
 * };
 * ```
 *
 * @example
 *
 * Image viewer that follows the playlist
 *
 * The component reads the current file itself, so navigating the playlist needs no
 * `onFileChange` round-trip — `useCurrentFile` re-renders it with the new file.
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { useCurrentFile, usePluginAPI } from "@onlyoffice/docspace-plugin-sdk/react";
 * import {
 *   IMediaViewer,
 *   FilesExst,
 *   FilesSecurity,
 *   UsersType,
 *   Devices,
 * } from "@onlyoffice/docspace-plugin-sdk";
 *
 * type TImage = { title: string; viewUrl?: string };
 *
 * function ImagePreview() {
 *   const file = useCurrentFile();
 *   const api = usePluginAPI();
 *   const [image, setImage] = useState<TImage | null>(null);
 *
 *   // The portal, not the plugin, knows where a file is served from: `viewUrl`
 *   // comes with the file itself. Building the URL by hand would hard-code the
 *   // API prefix, which the portal is free to change.
 *   useEffect(() => {
 *     if (!file) return;
 *
 *     const controller = new AbortController();
 *
 *     api
 *       .get<TImage>(`/files/file/${file.id}`, undefined, {
 *         signal: controller.signal,
 *       })
 *       .then(setImage)
 *       .catch(() => setImage(null));
 *
 *     return () => controller.abort();
 *   }, [api, file?.id]);
 *
 *   if (!image?.viewUrl) return <p>Loading…</p>;
 *
 *   return (
 *     <div style={{ width: "100%", height: "100%" }}>
 *       <img src={image.viewUrl} alt={image.title} />
 *     </div>
 *   );
 * }
 *
 * const mediaViewerProps: IMediaViewer = {
 *   title: "Image preview",
 *   component: ImagePreview,
 *   playlistFilter: {
 *     filesExsts: [".jpg", ".png", FilesExst.svg],
 *     filesSecurity: [FilesSecurity.Read],
 *     usersTypes: [UsersType.user, UsersType.collaborator],
 *     devices: [Devices.desktop, Devices.tablet]
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
   * The custom content rendered inside the media viewer via the IBox component tree.
   * Use either `content` or `component`, not both.
   *
   * @deprecated Use `component` instead — accepts a React component and supports hooks from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  content?: IBox;

  /**
   * A React component rendered as the media viewer content.
   * Use either `component` or `content`, not both.
   * The component can use `useCurrentFile`, `usePluginActions` and other hooks
   * from `@onlyoffice/docspace-plugin-sdk/react`, and owns its own loading state —
   * fetch in a `useEffect` and render a placeholder until the data arrives.
   */
  component?: ComponentType;

  /**
   * Optional title to display in the media viewer header.
   * If not provided, the default file name will be used.
   */
  title?: string;

  /**
   * Callback function that is called when the media viewer should be closed.
   * This is triggered when the user clicks the close button, background, or presses ESC.
   * Can return a TReturnMessage with Actions.closeMediaViewer to close the viewer.
   */
  onClose?: () => TReturnMessage;

  /**
   * Filter that determines which files are included in the media viewer playlist
   * used for navigation.
   * If not specified, the playlist is not filtered.
   */
  playlistFilter?: IMediaViewerPlaylistFilter;

  /**
   * Navigation callbacks invoked when the user moves between files in the media
   * viewer playlist.
   * If not specified, no navigation callbacks are triggered.
   */
  navigation?: IMediaViewerNavigation;

  /**
   * A function that is executed when the plugin viewer is mounted.
   * It is called once when the viewer is first displayed.
   * @param data - Object containing fileId of the current file
   *
   * @deprecated Use a React component via `component` with `useEffect` for data loading instead.
   */
  onLoad?: (data: { fileId: number | string }) => TReturnMessage;
}

/**
 * Filter configuration for media viewer playlist.
 * Defines which files should be included in the playlist.
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
