import { IMessage } from "../utils";
import { IComboBoxItem } from "./IComboBox";

/**
 * Modal dialog for creating certain item (file, folder, etc.).
 * The user gets the full acess to the functionality but cannot control the layout.
 */
export interface ICreateDialog {
  /**
   * Defines the modal dialog title.
   */
  title: string;

  /**
   * Defines the modal dialog start value.
   */
  startValue: string;

  /**
   * Specifies if the modal dialog is visible or not.
   */
  visible: boolean;

  /**
   * Defines an array of the modal dialog options.
   */
  options?: IComboBoxItem[];

  /**
   * Defines the selected modal dialog option.
   */
  selectedOption?: IComboBoxItem;

  /**
   * Sets a function which is triggered whenever the modal dialog option is selected.
   */
  onSelect?: (option: IComboBoxItem) => IMessage | void;

  /**
   * Sets a function which is triggered whenever the data in the modal dialog is saved.
   */
  onSave?: (
    e: any,
    value: string
  ) => Promise<IMessage> | Promise<void> | IMessage | void;

  /**
   * Sets a function which is triggered whenever an action in the modal dialog is canceled.
   */
  onCancel?: (e: any) => void;

  /**
   * Sets a function which is triggered whenever the modal dialog is closed.
   */
  onClose?: (e: any) => void;

  /**
   * Specifies if this modal dialog is for creating certain item (file, folder, etc.).
   */
  isCreateDialog: boolean;

  /**
   * Defines an extension of an item which will be created (file, folder, etc.).
   */
  extension?: string;
}
