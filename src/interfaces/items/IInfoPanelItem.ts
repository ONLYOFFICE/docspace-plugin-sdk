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

import { Devices, UsersType } from "../../enums";
import { FilesExst, FilesType } from "../../enums/Files";
import { IBox } from "../components";
import { IMessage } from "../utils";

/**
 * Describes the item submenu.
 */
export interface IInfoPanelSubMenu {
  /** The tab display name */
  name: string;

  /**
   * A function that takes the file/folder/room id as an argument.
   * This function can be asynchronous. It will be executed when clicking on the tab.
   */
  onClick?: (id: number) => Promise<IMessage> | IMessage | void;
}

/**
 * The info panel item that is displayed in the info panel.
 *
 * <plugin-image src="infopanelitem.png" dark />
 *
 * @example
 *
 * AI-powered document analysis panel
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { useCurrentFile, usePluginActions } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IInfoPanelItem, FilesType, ToastType } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function AnalysisPanel() {
 *   const file = useCurrentFile();
 *   const { showToast } = usePluginActions();
 *   const [result, setResult] = useState<string | null>(null);
 *
 *   useEffect(() => {
 *     if (!file) return;
 *     analyzeDocument(file.id).then(setResult).catch(() => setResult("Error"));
 *   }, [file?.id]);
 *
 *   const handleExport = async () => {
 *     await exportAnalysis(file!.id, result!);
 *     showToast({ type: ToastType.success, title: "Exported" });
 *   };
 *
 *   return (
 *     <div>
 *       <p>{result ?? "Analyzing..."}</p>
 *       <button onClick={handleExport}>Export</button>
 *     </div>
 *   );
 * }
 *
 * const documentAnalysis: IInfoPanelItem = {
 *   key: "ai-analysis",
 *   subMenu: { name: "AI Analysis" },
 *   component: AnalysisPanel,
 *   filesType: [FilesType.file]
 * }
 * ```
 *
 * @example
 *
 * Image metadata viewer with file type restrictions
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { useCurrentFile } from "@onlyoffice/docspace-plugin-sdk/react";
 * import { IInfoPanelItem, FilesType, Devices } from "@onlyoffice/docspace-plugin-sdk";
 *
 * function ImageMetadataPanel() {
 *   const file = useCurrentFile();
 *   const [metadata, setMetadata] = useState<Record<string, string> | null>(null);
 *
 *   useEffect(() => {
 *     if (!file) return;
 *     getImageMetadata(file.id).then(setMetadata);
 *   }, [file?.id]);
 *
 *   return (
 *     <div>
 *       {metadata
 *         ? Object.entries(metadata).map(([k, v]) => <p key={k}>{k}: {v}</p>)
 *         : <p>Loading...</p>}
 *     </div>
 *   );
 * }
 *
 * const imageMetadata: IInfoPanelItem = {
 *   key: "image-metadata",
 *   subMenu: { name: "Image Info" },
 *   component: ImageMetadataPanel,
 *   isHeaderVisible: true,
 *   filesType: [FilesType.image],
 *   filesExsts: [".jpeg", ".jpg", ".png", ".gif", ".bmp"],
 *   devices: [Devices.desktop, Devices.tablet]
 * }
 * ```
 */
export interface IInfoPanelItem {
  /**
   * The unique item identifier used by the service to recognize the item
   */
  key: string;

  /**
   * The item submenu
   */
  subMenu: IInfoPanelSubMenu;

  /**
   * The tab UI of the info panel rendered via the IBox component tree.
   * Use either `body` or `component`, not both.
   *
   * @deprecated Use `component` instead — accepts a React component and supports hooks from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  body?: IBox;

  /**
   * A React component rendered as the tab UI of the info panel.
   * Use either `component` or `body`, not both.
   * The component can use `usePluginActions`, `useCurrentFile` and other hooks
   * from `@onlyoffice/docspace-plugin-sdk/react`.
   */
  component?: ComponentType;

  /**
   * The property that controls whether the header is visible in the info panel.
   * By default, the header is visible.
   */
  isHeaderVisible?: boolean;

  /**
   * A function that is executed after opening a tab.
   * It returns a new body. If this functionality is not needed, the old body value is returned.
   *
   * @deprecated Use a React component via `component` with `useEffect` for data loading instead.
   */
  onLoad?: () => Promise<{ body: IBox }>;

  /**
   * The types of files where the current item will be displayed in the info panel.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current info panel item will be displayed in any file type.
   */
  filesType?: FilesType[];

  /**
   * The extensions of files where the current item will be displayed in the info panel.
   * It only works if the FilesType.file is specified in the filesType parameter.
   * If this parameter is not specified, then the current info panel item will be displayed in any file extension.
   */
  filesExsts?: (FilesExst | string)[];

  /**
   * The types of users who will see the current item in the info panel.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current info panel item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * The types of devices where the current item will be displayed in the info panel.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current info panel item will be displayed in any device types.
   */
  devices?: Devices[];
}
