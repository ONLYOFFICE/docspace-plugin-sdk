/**
 * A component that is used to embed an image not from the assets folder into a modal window or the settings page.
 */
export interface IImage {
  /**
   * Defines the full path to the image.
   */
  src: string;

  /**
   * Defines the image alt attribute.
   */
  alt: string;

  /**
   * Defines the image width.
   */
  width?: string;

  /**
   * Defines the image height.
   */
  height?: string;

  /**
   * Defines the image name.
   */
  name?: string;

  /**
   * Defines the image ID.
   */
  id?: string;

  /**
   * Defines the image style.
   */
  style?: { [key: string]: string };
}
