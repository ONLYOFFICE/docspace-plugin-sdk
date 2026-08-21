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
  InputType,
  RectangleSkeleton,
  Text,
  TextInput,
} from "@docspace/ui-kit";
import {
  usePluginActions,
  usePluginSettings,
} from "@onlyoffice/docspace-plugin-sdk/react";
import { ToastType } from "@onlyoffice/docspace-plugin-sdk";

/** Shape of the settings this sample persists. */
type SampleConfig = { reportName: string };

/** A label and a value on one row, as on a portal settings page. */
const SettingsRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "10px 0",
    }}
  >
    <Text fontSize="13px" lineHeight="20px" noSelect>
      {label}
    </Text>
    {children}
  </div>
);

/**
 * The page opened by the "Sample Settings" navigation item.
 *
 * Shows the settings client: `load` on mount, `save` on submit. A section page
 * is a plain React tree, so the Save button lives in the page itself — unlike
 * the settings dialog, where it is registered through `settings.setSaveButton`.
 */
const SettingsSection = () => {
  const settings = usePluginSettings();
  const { showToast } = usePluginActions();

  const [reportName, setReportName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    settings
      .load<SampleConfig>()
      .then((saved) => {
        if (cancelled) return;
        if (saved?.reportName) setReportName(saved.reportName);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [settings]);

  const save = async () => {
    setSaving(true);
    try {
      await settings.save({ reportName });
      showToast({ type: ToastType.success, title: "Sample settings saved!" });
    } catch {
      showToast({ type: ToastType.error, title: "Could not save the settings." });
    } finally {
      setSaving(false);
    }
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
        Sample settings
      </Heading>
      <Text fontSize="13px" lineHeight="20px" style={{ margin: "4px 0 24px" }}>
        This page is reachable from the portal Settings section only, and only
        portal administrators see the navigation item.
      </Text>

      {!loaded ? (
        <RectangleSkeleton width="440px" height="120px" borderRadius="6px" />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "440px",
            padding: "4px 16px",
            border: "1px solid var(--border-color, #e0e0e0)",
            borderRadius: "6px",
          }}
        >
          <SettingsRow label="Report name">
            <TextInput
              type={InputType.text}
              value={reportName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReportName(e.target.value)
              }
              placeholder="Monthly report"
              scale={false}
            />
          </SettingsRow>
          <SettingsRow label="Visible to">
            <Text fontSize="13px" isBold noSelect>
              Owner, DocSpace admin
            </Text>
          </SettingsRow>
        </div>
      )}

      <div style={{ marginTop: "24px" }}>
        <Button
          label="Save"
          size={ButtonSize.normal}
          primary
          isLoading={saving}
          isDisabled={!loaded || !reportName.trim()}
          onClick={save}
        />
      </div>
    </div>
  );
};

export default SettingsSection;
