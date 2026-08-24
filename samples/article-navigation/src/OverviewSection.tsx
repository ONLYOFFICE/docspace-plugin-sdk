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

import { useEffect, useState } from "react";

import {
  Button,
  ButtonSize,
  Heading,
  HeadingLevel,
  HeadingSize,
  RectangleSkeleton,
  Text,
} from "@docspace/ui-kit";
import {
  usePluginActions,
  usePluginAPI,
  useCurrentUser,
  isPluginApiError,
} from "@onlyoffice/docspace-plugin-sdk/react";
import { ToastType } from "@onlyoffice/docspace-plugin-sdk";

import { renameOverviewItem } from "./navigation";

type Room = { id: number; title: string };

/** One caption/value card of the summary row. */
const InfoCard = ({ caption, value }: { caption: string; value: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "220px",
      padding: "12px 16px",
      margin: "0 16px 16px 0",
      border: "1px solid var(--border-color, #e0e0e0)",
      borderRadius: "6px",
    }}
  >
    <Text fontSize="12px" lineHeight="16px" noSelect>
      {caption}
    </Text>
    <Text fontSize="15px" lineHeight="22px" isBold noSelect>
      {value}
    </Text>
  </div>
);

/**
 * The page opened by the "Sample Overview" navigation item.
 *
 * Everything the IBox version of this sample did through `section` + `onLoad`
 * happens here instead: the component owns its loading state, so the skeleton
 * is just a branch of the render, and the data arrives through `usePluginAPI`
 * rather than a hand-rolled request in `onLoad`.
 */
const OverviewSection = () => {
  const api = usePluginAPI();
  const user = useCurrentUser();
  const { showToast, updateArticleNavigationItems } = usePluginActions();

  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [renames, setRenames] = useState(0);

  useEffect(() => {
    // Aborting on unmount, rather than dropping a late answer with a flag, so
    // that leaving the page also stops the request. The abort comes back as a
    // rejection like any other failure, and is the one kind of failure the
    // page has nothing to say about.
    const controller = new AbortController();

    api
      .get<{ folders: Room[] }>("/files/rooms", undefined, {
        signal: controller.signal,
      })
      .then((folder) => setRooms(folder.folders))
      .catch((error: unknown) => {
        if (isPluginApiError(error) && error.code === "ABORTED") return;
        setError("Could not load the room list.");
      });

    return () => controller.abort();
  }, [api]);

  /**
   * Mutates the navigation item itself and asks DocSpace to redraw the sidebar.
   * `updateArticleNavigationItem` alone only changes the plugin's own copy of
   * the item — `updateArticleNavigationItems` is what applies it to the UI.
   */
  const rename = () => {
    const next = renames + 1;
    setRenames(next);
    renameOverviewItem(`Sample Overview (${next})`);
    updateArticleNavigationItems();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
      }}
    >
      <Heading level={HeadingLevel.h1} size={HeadingSize.medium}>
        Article navigation sample
      </Heading>
      <Text fontSize="13px" lineHeight="20px" style={{ margin: "4px 0 24px" }}>
        This page is rendered by the ArticleNavigation plugin scope. The item
        that opens it is shown in every portal section.
      </Text>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <InfoCard caption="Plugin scope" value="ArticleNavigation" />
        <InfoCard caption="Visible in sections" value="All sections" />
        <InfoCard caption="Signed in as" value={user?.displayName ?? "…"} />

        {error ? (
          <InfoCard caption="Rooms" value={error} />
        ) : rooms ? (
          <InfoCard caption="Rooms" value={String(rooms.length)} />
        ) : (
          <div style={{ margin: "0 16px 16px 0" }}>
            <RectangleSkeleton width="220px" height="64px" borderRadius="6px" />
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <Button
          label="Show toast"
          size={ButtonSize.normal}
          primary
          onClick={() =>
            showToast({
              type: ToastType.success,
              title: "Hello from the article navigation sample!",
            })
          }
        />
        <Button label="Rename this item" size={ButtonSize.normal} onClick={rename} />
      </div>
    </div>
  );
};

export default OverviewSection;
