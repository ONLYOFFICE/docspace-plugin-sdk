import { PluginStatus } from "../../enums";
/**
 * The default plugin.
 *
 * This interface must be implemented in every plugin, because without status it will not be built in.
 */
export interface IPlugin {
  /**
   * Stores the plugin status (active or hide).
   */
  status: PluginStatus;

  /**
   * Stores callback which will be executed when uploading the plugin to the portal.
   */
  onLoadCallback: () => Promise<void>;

  /**
   * Update the plugin status.
   *
   * @param status is a new plugin status.
   */
  updateStatus(status: PluginStatus): void;

  /**
   * Get current plugin status
   *
   * @returns status
   */
  getStatus(): PluginStatus;

  /**
   * Sets the onLoadCallback variable to the plugin.
   *
   * @param callback defines callback which will be executed when uploading the plugin to the portal.
   */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
