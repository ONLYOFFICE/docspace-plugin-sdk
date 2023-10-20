/**
 * A component that is used to embed a third-party website into a modal window or the settings page.
 */
export interface IFrame {
  /**
   * Defines the base URL to a modal window or the settings page. It is used to generate links.
   */
  src: string;

  /**
   * Defines the frame width measured in percent.
   */
  width?: string;

  /**
   * Defines the frame height measured in percent.
   */
  height?: string;

  /**
   * Defines the name of the object inserted into the page.
   */
  name?: string;

  /**
   * Defines the frame sandbox.
   */
  sandbox?: string;

  /**
   * Defines the element ID.
   */
  id?: string;

  /**
   * Defines the frame style.
   */
  style?: { [key: string]: string };
}
