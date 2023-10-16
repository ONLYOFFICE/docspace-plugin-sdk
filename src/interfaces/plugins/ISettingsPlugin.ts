import { ISettings } from "../settings/ISettings";
/**
 * The plugin that manages settings for the administrator or owner.
 */
export interface ISettingsPlugin {
  // userPluginSettings: ISettings | null;

  /**
   * Stores the administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  adminPluginSettings: ISettings | null;

  // setUserPluginSettings(settings: ISettings | null): void;

  // getUserPluginSettings(): ISettings | null;

  /**
   * Update the administator or owner plugin settings.
   *
   * @param settings Defines the administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  setAdminPluginSettings(settings: ISettings | null): void;

  /**
   * Get the administator or owner plugin settings.
   *
   * @returns The administator or owner settings block that is embedded in the modal window with the plugin description.
   */
  getAdminPluginSettings(): ISettings | null;
}
