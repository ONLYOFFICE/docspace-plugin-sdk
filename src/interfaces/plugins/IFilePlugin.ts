import { IFileItem } from "../items";
/**
 * The plugin that can interact with the file list.
 */
export interface IFilePlugin {
  /**
   * Stores a collection of elements where the keys are the key parameters from the FileItem objects.
   * A list for hooking interactions with files is generated based on this collection.
   */
  fileItems: Map<string, IFileItem>;

  /**
   * Add a new item for interactions with files.
   *
   * @param item Defines an item for interactions with files.
   */
  addFileItem(item: IFileItem): void;

  /**
   * Get all the items for interactions with files.
   *
   * @returns A collection of elements where the keys are the key parameters from the FileItem objects.
   */
  getFileItems(): Map<string, IFileItem>;

  /**
   * Update the item for interactions with files.
   *
   * @param item Defines an item for interactions with files.
   */
  updateFileItem(item: IFileItem): void;
}
