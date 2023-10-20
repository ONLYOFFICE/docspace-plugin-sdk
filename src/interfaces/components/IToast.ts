/**
 * The supported toast types.
 */
export const enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

/**
 * Toast.
 */
export interface IToast {
  /**
   * Defines the toast type, which determines the toast color and icon.
   */
  type: ToastType;

  /**
   * Defines the toast title.
   */
  title: string;

  /**
   * Specifies whether the "Close" button will be displayed in the toast to close it (true).
   * Otherwise, the toast will disappear after clicking on any toast area (false).
   */
  withCross?: boolean;

  /**
   * Defines the time (in milliseconds) for showing the toast.
   * Setting the value to 0 allows the toast to be displayed continuously until clicking on it.
   */
  timeout?: number;
}
