import { IMessage } from "../utils";
import { IBox } from "./IBox";

/**
 * The supported modal dialog types.
 */
export const enum ModalDisplayType {
  modal = "modal",
  aside = "aside",
}

/**
 * Modal dialog.
 */
export interface IModalDialog {
  /**
   * Defines the modal dialog display type.
   */
  displayType: ModalDisplayType;

  /**
   * Defines the modal dialog header.
   */
  dialogHeader: string;

  /**
   * Defines the modal dialog body.
   */
  dialogBody: IBox;

  /**
   * Defines the modal dialog footer.
   */
  dialogFooter?: IBox;

  /**
   * Specifies whether the "max-width: auto" property is set.
   */
  autoMaxWidth?: boolean;

  /**
   * Specifies whether the "max-height: auto" property is set.
   */
  autoMaxHeight?: boolean;

  /**
   * Specifies whether the border betweeen the body and footer is displayed.
   */
  withFooterBorder?: boolean;

  /**
   * Defines the event listeners.
   */
  eventListeners?: {
    /**
     * Defines the event listener name.
     */
    name: string;

    /**
     * Sets a function which is triggered whenever the event listener is processed.
     */
    onAction: () => Promise<IMessage> | IMessage | Promise<void> | void;
  }[];

  /**
   * Sets a function which is triggered whenever the "Close" button in the modal dialog is clicked.
   */
  onClose: () => Promise<IMessage> | IMessage | Promise<void> | void;

  /**
   * Sets a function which is triggered whenever the modal dialog is loaded.
   */
  onLoad: () => Promise<{
    /**
     * Defines a new modal dialog header.
     */
    newDialogHeader: string;

    /**
     * Defines a new modal dialog body.
     */
    newDialogBody: IBox;

    /**
     * Defines a new modal dialog footer.
     */
    newDialogFooter?: IBox;
  }>;
}
