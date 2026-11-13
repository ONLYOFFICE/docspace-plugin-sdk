import { useEffect, useState } from "react";

import {
  Button,
  ButtonSize,
  Heading,
  HeadingLevel,
  HeadingSize,
  SelectedItem,
  Text,
  ToggleButton,
} from "@onlyoffice/apps-ui-kit";
import {
  useCurrentUser,
  usePluginActions,
  usePluginAPI,
  usePluginSettings,
} from "@onlyoffice/docspace-plugin-sdk/react";
import {
  Actions,
  ButtonSize as SdkButtonSize,
  Components,
  type IArticleNavigationItem,
  type IArticleNavigationPlugin,
  type IMessage,
  type IPlugin,
  type ISettings,
  type ISettingsPlugin,
  PluginStatus,
  SelectorType,
  ToastType,
} from "@onlyoffice/docspace-plugin-sdk";

// --- Access settings ---------------------------------------------------------

type TAccess = { restricted: boolean; users: string[]; groups: string[] };

type TAccessList = "users" | "groups";

const DEFAULT_ACCESS: TAccess = { restricted: false, users: [], groups: [] };

const parseAccess = (settings: string | null): TAccess => {
  try {
    return { ...DEFAULT_ACCESS, ...JSON.parse(settings || "null") };
  } catch {
    return DEFAULT_ACCESS;
  }
};

const ENTITY_PATHS: Record<TAccessList, (id: string) => string> = {
  users: (id) => `/people/${id}`,
  groups: (id) => `/group/${id}`,
};

const toast = (type: ToastType, title: string): IMessage => ({
  actions: [Actions.showToast],
  toastProps: [{ type, title }],
});

const useEntityNames = (list: TAccessList, ids: string[]) => {
  const api = usePluginAPI();
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    for (const id of ids) {
      if (names[id]) continue;

      api
        .get<{ displayName?: string; name?: string }>(ENTITY_PATHS[list](id))
        .then(
          (entity) => entity.displayName ?? entity.name ?? id,
          () => id,
        )
        .then((name) => setNames((prev) => ({ ...prev, [id]: name })));
    }
  }, [ids]);

  return names;
};

const AccessList = ({
  list,
  ids,
  title,
  addLabel,
  onAdd,
  onRemove,
}: {
  list: TAccessList;
  ids: string[];
  title: string;
  addLabel: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) => {
  const names = useEntityNames(list, ids);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text fontSize="13px" fontWeight={600}>
        {title}
      </Text>
      {ids.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {ids.map((id) => (
            <SelectedItem
              key={id}
              propKey={id}
              label={names[id] ?? "…"}
              onClose={() => onRemove(id)}
            />
          ))}
        </div>
      ) : null}
      <div>
        <Button label={addLabel} size={ButtonSize.small} onClick={onAdd} />
      </div>
    </div>
  );
};

const AccessSettings = () => {
  const settings = usePluginSettings();
  const { showSelector, closeSelector } = usePluginActions();

  const [saved, setSaved] = useState<TAccess>(() => ({
    ...DEFAULT_ACCESS,
    ...settings.load<Partial<TAccess>>(),
  }));
  const [access, setAccess] = useState<TAccess>(saved);

  const dirty = JSON.stringify(access) !== JSON.stringify(saved);
  const nobody =
    access.restricted && !access.users.length && !access.groups.length;

  useEffect(() => {
    settings.setSaveButton({
      component: Components.button,
      props: {
        label: "Save",
        size: SdkButtonSize.normal,
        isDisabled: !dirty,
        withLoadingAfterClick: true,
        onClick: async () => {
          try {
            await settings.save(access);
            setSaved(access);
            return toast(ToastType.success, "Access to Deals saved");
          } catch {
            return toast(
              ToastType.error,
              "Access was not saved: the list may be too long",
            );
          }
        },
      },
    });
  }, [settings, access, dirty]);

  const remove = (list: TAccessList, id: string) =>
    setAccess((prev) => ({
      ...prev,
      [list]: prev[list].filter((item) => item !== id),
    }));

  const pick = (list: TAccessList) =>
    showSelector({
      type: SelectorType.People,
      props: {
        isMultiSelect: true,
        withGroups: list === "groups",
        isGroupsOnly: list === "groups",
        excludeItems: access[list],
        withHeader: true,
        headerProps: {
          label: list === "groups" ? "Add groups" : "Add people",
          isCloseable: true,
          onCloseClick: closeSelector,
        },
        submitButtonLabel: "Add",
        withCancelButton: true,
        cancelButtonLabel: "Cancel",
        onCancel: closeSelector,
        onClose: closeSelector,
        onSubmit: ({ selectedIds }) => {
          setAccess((prev) => ({
            ...prev,
            [list]: [...new Set([...prev[list], ...selectedIds.map(String)])],
          }));
          closeSelector();
        },
      },
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ position: "relative", height: "20px", flex: "0 0 auto" }}>
        <ToggleButton
          label="Restrict access"
          isChecked={access.restricted}
          onChange={() =>
            setAccess((prev) => ({ ...prev, restricted: !prev.restricted }))
          }
        />
      </div>
      <Text fontSize="12px" lineHeight="16px">
        {access.restricted
          ? "Only the people and the members of the groups below see Deals in the sidebar."
          : "Everyone sees Deals in the sidebar."}
      </Text>
      {access.restricted ? (
        <>
          <AccessList
            list="groups"
            ids={access.groups}
            title="Groups"
            addLabel="Add groups"
            onAdd={() => pick("groups")}
            onRemove={(id) => remove("groups", id)}
          />
          <AccessList
            list="users"
            ids={access.users}
            title="People"
            addLabel="Add people"
            onAdd={() => pick("users")}
            onRemove={(id) => remove("users", id)}
          />
          {nobody ? (
            <Text fontSize="12px" color="var(--color-scheme-main-error, red)">
              No one is listed, so no one will see Deals.
            </Text>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

// --- Page ----------------------------------------------------------------------

const DEALS = [
  { title: "Annual licence renewal", stage: "Negotiation", amount: "$12,400" },
  { title: "Cloud migration", stage: "Proposal", amount: "$8,900" },
  { title: "Training package", stage: "Won", amount: "$2,300" },
];

const DealsPage = () => {
  const user = useCurrentUser();

  return (
    <div
      id="article-navigation-access-sample-page"
      style={{ padding: "20px", maxWidth: "640px" }}
    >
      <Heading level={HeadingLevel.h1} size={HeadingSize.medium}>
        Deals
      </Heading>
      <Text fontSize="13px" lineHeight="20px" style={{ margin: "4px 0 24px" }}>
        {user?.displayName ?? "You"} can open this page: the administrator
        listed them, or one of their groups, in the plugin settings.
      </Text>
      {DEALS.map(({ title, stage, amount }) => (
        <div
          key={title}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
          }}
        >
          <Text fontSize="13px" fontWeight={600}>
            {title}
          </Text>
          <Text fontSize="13px">
            {stage} · {amount}
          </Text>
        </div>
      ))}
    </div>
  );
};

// --- Navigation item -----------------------------------------------------------

const dealsItem: IArticleNavigationItem = {
  key: "article-navigation-access-sample-deals",
  label: "Deals",
  icon: "plugin-icon.svg",
  component: DealsPage,
};

// --- Plugin --------------------------------------------------------------------

class ArticleNavigationAccessSample
  implements IPlugin, IArticleNavigationPlugin, ISettingsPlugin
{
  status: PluginStatus = PluginStatus.active;

  onLoadCallback = async (): Promise<void> => {
    this.setAdminPluginSettings({ component: AccessSettings });
  };

  updateStatus = (status: PluginStatus): void => {
    this.status = status;
  };

  getStatus = (): PluginStatus => this.status;

  setOnLoadCallback = (callback: () => Promise<void>): void => {
    this.onLoadCallback = callback;
  };

  articleNavigationItems: Map<string, IArticleNavigationItem> = new Map();

  addArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };

  getArticleNavigationItems = (): Map<string, IArticleNavigationItem> =>
    this.articleNavigationItems;

  updateArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };

  adminPluginSettings: ISettings | null = null;

  setAdminPluginSettings = (settings: ISettings | null): void => {
    this.adminPluginSettings = settings;
  };

  getAdminPluginSettings = (): ISettings | null => this.adminPluginSettings;

  // Every user's portal calls this with the stored settings, so the item is registered only once its access is known.
  setAdminPluginSettingsValue = (settings: string | null): void => {
    const { restricted, users, groups } = parseAccess(settings);

    this.addArticleNavigationItem(
      restricted ? { ...dealsItem, users, groups } : dealsItem,
    );
  };
}

const plugin = new ArticleNavigationAccessSample();

export default plugin;
