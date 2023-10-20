import { Devices, UsersType } from "../../enums";
import { IMessage } from "../utils";
/**
 * Describes an item that will be embedded in the "More" item of the main button menu.
 * It is available only inside a room (folder) and is not available for the room list.
 */
export interface IMainButtonItem {
  /**
   * Defines the unique item identifier used by the service to recognize the item.
   */
  key: string;

  /**
   * Defines the item display name.
   */
  label: string;

  /**
   * Defines the item display icon. The icon image must be uploaded to the assets folder.
   * Only the image name with the extension must be specified in this field.
   * The required icon size is 16x16 px. Otherwise, it will be compressed to this size.
   */
  icon: string;

  /**
   * Defines a function that takes the file/folder/room id as an argument.
   * This function can be asynchronous.
   */
  onClick?: (id: number) => Promise<IMessage> | IMessage | void;

  /**
   * Defines the types of users who will see the current item in the main button menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current main button item will be displayed for all user types.
   */
  usersType?: UsersType[];

  /**
   * Defines the main button items that are added to the current item as a drop-down list.
   * In this case, the onClick event does not work.
   */
  items?: IMainButtonItem[];

  /**
   * Defines the types of devices where the current item will be displayed in the main button menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current main button item will be displayed in any device types.
   */
  devices?: Devices[];
}
