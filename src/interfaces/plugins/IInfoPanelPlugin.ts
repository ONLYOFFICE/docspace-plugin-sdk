import { IInfoPanelItem } from "../items";
/**
 * The plugin that is embedded as a separate tab in the file info panel.
 */
export interface IInfoPanelPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the InfoPanelItem objects.
   * A list for embedding into the info panel is generated based on this collection.
   */
  infoPanelItems: Map<string, IInfoPanelItem>;

  /**
   * Add a new info panel item.
   *
   * @param item Defines an info panel item.
   */
  addInfoPanelItem(item: IInfoPanelItem): void;

  /**
   * Get all the info panel items.
   *
   * @returns A collection of elements where the keys are the key parameters from the InfoPanelItem objects.
   */
  getInfoPanelItems(): Map<string, IInfoPanelItem>;

  /**
   * Update the info panel item.
   *
   * @param item Defines a new info panel item.
   */
  updateInfoPanelItem(item: IInfoPanelItem): void;
}
