import { ButtonGroup, IBox } from "../components";
/**
 * Defines the administator or owner settings block that is embedded in the modal window with the plugin description.
 */
export interface ISettings {
  /**
   * Defines the administator or owner settings.
   */
  settings: IBox;

  /**
   * Defines the button to save the settings.
   */
  saveButton: ButtonGroup;

  /**
   * Specifies if the settings block will be displayed as a loader icon or not.
   */
  isLoading?: boolean;

  /**
   * Defines a function that is triggered whenever the settings block is loaded.
   */
  onLoad?: () => Promise<{ settings: IBox; saveButton?: ButtonGroup }>;
}
