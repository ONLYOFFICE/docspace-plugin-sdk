// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

import type { IToast } from "../interfaces/components/IToast";
import type {
  IModalDialog,
  ModalDisplayType,
} from "../interfaces/components/IModalDialog";
import type { TSelector } from "../interfaces/components/Selector";
import type { IMediaViewer } from "../interfaces/components/IMediaViewer";
import type { IFloatingOperationsButton } from "../interfaces/components/IFloatingOperationsButton";
import type { ICreateDialog } from "../interfaces/components/ICreateDialog";
import type { TInfoPanelTab } from "../interfaces/utils";

export type {
  IToast,
  IModalDialog,
  ModalDisplayType,
  TSelector,
  IMediaViewer,
  IFloatingOperationsButton,
  ICreateDialog,
  TInfoPanelTab,
};

/**
 * Portal-side actions available to a React plugin component.
 * Returned by [`usePluginActions`](hooks.md#usepluginactions).
 *
 * @example
 * ```tsx
 * function MyPanel() {
 *   const { showToast, showModal, closeModal } = usePluginActions();
 *
 *   return (
 *     <button onClick={() => showToast({ type: ToastType.success, title: "Done!" })}>
 *       Notify
 *     </button>
 *   );
 * }
 * ```
 */
export interface PluginActions {
  /**
   * Show a toast in the corner of the portal. It fades on its own.
   *
   * @example
   * ```ts
   * showToast({ type: ToastType.success, title: "File uploaded" });
   * ```
   */
  showToast(props: IToast): void;

  /**
   * Open a modal dialog. One at a time — a second call replaces the open one.
   *
   * @example
   * ```ts
   * showModal({ dialogHeader: "File details", dialogBodyComponent: Details });
   * ```
   */
  showModal(props: IModalDialog): void;

  /**
   * Close the open modal dialog. A no-op when none is open.
   *
   * @example
   * ```tsx
   * <button onClick={closeModal}>Cancel</button>
   * ```
   */
  closeModal(): void;

  /**
   * Open a selector for picking files, folders, rooms, users or groups.
   *
   * @example
   * ```ts
   * showSelector({
   *   type: SelectorType.Files,
   *   props: {
   *     submitButtonLabel: "Attach",
   *     onSubmit: ({ selectedIds }) => ({ actions: [Actions.closeSelector] }),
   *   },
   * });
   * ```
   */
  showSelector(props: TSelector): void;

  /**
   * Replace the props of the open selector, keeping it on screen. Use it to feed in
   * items once they load, or to flip the submit button.
   *
   * @example
   * ```ts
   * updateSelector({ ...selector, props: { ...selector.props, isLoading: false, items } });
   * ```
   */
  updateSelector(props: TSelector): void;

  /**
   * Close the open selector. A no-op when none is open.
   *
   * @example
   * ```ts
   * onSubmit: ({ selectedIds }) => { save(selectedIds); closeSelector(); }
   * ```
   */
  closeSelector(): void;

  /**
   * Open the portal's create-file dialog for a file the plugin owns: the portal
   * draws the dialog, and the callbacks on the props do the work. Answering one
   * of them with an
   * [`IMessage`](../interfaces/utils.md#imessage) carrying
   * `Actions.updateCreateDialogModal` is what changes the open dialog — its
   * title, its error text or the extension in the combo box.
   *
   * @param props - The dialog: its title, its starting value, the extension it
   * creates and the `onSave` / `onChange` / `onSelect` callbacks.
   *
   * @example
   * ```ts
   * showCreateDialog({
   *   isCreateDialog: true,
   *   title: "New report",
   *   startValue: "Report",
   *   extension: "docx",
   *   onSave: async (_, value) => {
   *     await api.post("/files/@my/file", { title: `${value}.docx` });
   *     return { actions: [Actions.showToast], toastProps: [{ type: ToastType.success, title: "Created" }] };
   *   },
   * });
   * ```
   */
  showCreateDialog(props: ICreateDialog): void;

  /**
   * Navigate the portal to another route, without a full page reload.
   *
   * @param path - Absolute portal path, e.g. `"/rooms/shared"`.
   *
   * @example
   * ```ts
   * navigate("/rooms/shared");
   * ```
   */
  navigate(path: string): void;

  /**
   * Open the info panel, optionally on a particular tab. Already open, it stays
   * open and switches to the tab.
   *
   * @param tab - The tab to show: one of the portal's own (`"info_details"`,
   * `"info_members"`, `"info_history"`, `"info_share"`) or the key of an
   * [info panel item](../interfaces/items/IInfoPanelItem.md) this plugin
   * registered. Always pass it: left out, the portal stores an invalid view,
   * opens the panel on its first tab and the user's remembered tab is lost.
   *
   * @example
   * ```ts
   * <button onClick={() => openInfoPanel("info_details")}>Show details</button>
   * <button onClick={() => openInfoPanel("info_history")}>Show history</button>
   * ```
   */
  openInfoPanel(tab?: TInfoPanelTab): void;

  /**
   * Open the media viewer over the portal, rendering the plugin's own content.
   *
   * @example
   * ```ts
   * showMediaViewer({ fileId: file.id, title: file.title, component: Preview });
   * ```
   */
  showMediaViewer(props: IMediaViewer): void;

  /**
   * Replace the props of the open media viewer, keeping it on screen.
   *
   * @example
   * ```ts
   * updateMediaViewer({ fileId: nextId, title: nextTitle, component: Preview });
   * ```
   */
  updateMediaViewer(props: IMediaViewer): void;

  /**
   * Close the open media viewer. A no-op when none is open.
   *
   * @example
   * ```ts
   * <button onClick={closeMediaViewer}>Done</button>
   * ```
   */
  closeMediaViewer(): void;

  /**
   * Add a floating button that tracks long-running operations. Buttons from all
   * plugins share one panel; `id` identifies this plugin's group.
   *
   * @example
   * ```ts
   * addFloatingOperationsButton({
   *   id: "export",
   *   operations: [{ id: "1", label: "Exporting", operation: FloatingOperationType.Other,
   *     alert: false, completed: false, percent: 0 }],
   * });
   * ```
   */
  addFloatingOperationsButton(props: IFloatingOperationsButton): void;

  /**
   * Push new progress into an existing floating button. Call it as work advances.
   *
   * @example
   * ```ts
   * updateFloatingOperationsButton({
   *   id: "export",
   *   operations: [{ id: "1", label: "Exporting", operation: FloatingOperationType.Other,
   *     alert: false, completed: false, percent: 60 }],
   * });
   * ```
   */
  updateFloatingOperationsButton(props: IFloatingOperationsButton): void;

  /**
   * Remove the plugin's floating button and its operations from the panel.
   *
   * @param id - The `id` the button was added with.
   *
   * @example
   * ```ts
   * removeFloatingOperationsButton("export");
   * ```
   */
  removeFloatingOperationsButton(id: string): void;

  /**
   * Redraw the plugin's context menu items.
   *
   * Every `update*Items` action below works the same way: mutate the item on the
   * plugin instance first, then call this so DocSpace re-reads the collection.
   * They exist because item metadata — labels, icons, visibility — lives on the
   * plugin class, outside the React tree, where `setState` cannot reach it.
   *
   * @example
   * ```ts
   * plugin.updateContextMenuItem({ ...item, label: "Convert (beta)" });
   * updateContextMenuItems();
   * ```
   */
  updateContextMenuItems(): void;

  /**
   * Redraw the plugin's info panel tabs.
   *
   * @example
   * ```ts
   * plugin.updateInfoPanelItem({ ...item, subMenu: { name: "Analysis (3)" } });
   * updateInfoPanelItems();
   * ```
   */
  updateInfoPanelItems(): void;

  /**
   * Redraw the plugin's main button entries.
   *
   * @example
   * ```ts
   * plugin.updateMainButtonItem({ ...item, label: "Import from Drive" });
   * updateMainButtonItems();
   * ```
   */
  updateMainButtonItems(): void;

  /**
   * Redraw the plugin's profile menu entries.
   *
   * @example
   * ```ts
   * plugin.updateProfileMenuItem({ ...item, label: "My reports (3)" });
   * updateProfileMenuItems();
   * ```
   */
  updateProfileMenuItems(): void;

  /**
   * Redraw the plugin's file items — the badges and actions shown on file rows.
   *
   * @example
   * ```ts
   * plugin.updateFileItem({ ...item, fileTypeName: "Signed" });
   * updateFileItems();
   * ```
   */
  updateFileItems(): void;

  /**
   * Re-register the plugin's event listeners, so added or removed ones take effect.
   *
   * @example
   * ```ts
   * plugin.addEventListenerItem({ key: "on-rename", eventType: Events.RENAME, eventHandler });
   * updateEventListenerItems();
   * ```
   */
  updateEventListenerItems(): void;

  /**
   * Redraw the plugin's article button items above the sidebar DevTools section.
   *
   * @example
   * ```ts
   * plugin.updateArticleButtonItem({ ...item, component: NextButton });
   * updateArticleButtonItems();
   * ```
   */
  updateArticleButtonItems(): void;

  /**
   * Redraw the plugin's navigation items in the sidebar, so a new `label` or `icon`
   * becomes visible.
   *
   * @example
   * ```ts
   * plugin.updateArticleNavigationItem({ ...item, label: "Reports (3)" });
   * updateArticleNavigationItems();
   * ```
   */
  updateArticleNavigationItems(): void;
}

/** The HTTP methods the portal API is reachable with. */
