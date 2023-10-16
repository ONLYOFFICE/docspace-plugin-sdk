import { IProfileMenuItem } from "../items";
/**
 * The plugin that is embedded in the profile menu.
 */
export interface IProfileMenuPlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the ProfileMenuItem objects.
   * A list for embedding into the profile menu is generated based on this collection.
   */
  profileMenuItems: Map<string, IProfileMenuItem>;

  /**
   * Add a new profile menu item.
   *
   * @param item Defines a profile menu item.
   */
  addProfileMenuItem(item: IProfileMenuItem): void;

  /**
   * Get all the profile menu items.
   *
   * @returns A collection of elements where the keys are the key parameters from the ProfileMenuItem objects.
   */
  getProfileMenuItems(): Map<string, IProfileMenuItem>;

  /**
   * Update the profile menu item.
   *
   * @param item Defines a new profile menu item.
   */
  updateProfileMenuItem(item: IProfileMenuItem): void;
}
