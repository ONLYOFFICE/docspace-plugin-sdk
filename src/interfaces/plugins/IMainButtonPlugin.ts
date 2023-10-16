import { IMainButtonItem } from "../items";
/**
 * The plugin that is embedded in the main button.
 */
export interface IMainButtonPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the MainButtonItem objects.
   * A list for embedding into the main button menu is generated based on this collection.
   */
  mainButtonItems: Map<string, IMainButtonItem>;

  /**
   * Add a new main button item.
   *
   * @param item Defines a main button item.
   */
  addMainButtonItem(item: IMainButtonItem): void;

  /**
   * Get all the main button items.
   *
   * @returns A collection of elements where the keys are the key parameters from the MainButtonItem objects.
   */
  getMainButtonItems(): Map<string, IMainButtonItem>;

  /**
   * Update the main button item.
   *
   * @param item Defines a new main button item.
   */
  updateMainButtonItem(item: IMainButtonItem): void;
}
