import { Devices, Events, UsersType } from "../../enums";
import { IMessage } from "../utils";
/**
 * Describes an item that allows the plugin to respond to the built-in DocSpace events (creating a room/file, etc.).
 * Each event can have several listeners. When the event is activated, the dialog cannot be hooked.
 */
export interface IEventListenerItem {
  /**
   * Defines the unique item identifier used by the service to recognize the item.
   */
  key: string;

  /**
   * Defines the event type which will be executed.
   * Presently the following events are available: CREATE, RENAME, ROOM_CREATE, ROOM_EDIT, CHANGE_COLUMN, CHANGE_USER_TYPE, CREATE_PLUGIN_FILE.
   */
  eventType: Events;

  /**
   * Defines a function that will be executed when the event is triggered.
   * This function can be asynchronous.
   * After the event is executed, only updating the items or displaying toast is possible, other actions are blocked.
  */
  eventHandler: () => Promise<IMessage> | IMessage | void;

  /**
   * Defines the types of users who have the access to the current item.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current item will be available for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * Defines the types of devices where the current item will be available.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current item will be available in any device types.
   */
  devices?: Devices[];
}
