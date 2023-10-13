import { PluginStatus } from "../../enums";
/**
 * The default plugin.
 *
 * This interface must be implemented in each plugin because without the plugin status it will not be built in.
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
   * @param status Defines a new plugin status (active or hide).
   */
  updateStatus(status: PluginStatus): void;

  /**
   * Get the current plugin status.
   *
   * @returns The current plugin status.
   */
  getStatus(): PluginStatus;

  /**
   * Sets the onLoadCallback variable to the plugin.
   *
   * @param callback Defines callback which will be executed when uploading the plugin to the portal.
   */
  setOnLoadCallback(callback: () => Promise<void>): void;
}
