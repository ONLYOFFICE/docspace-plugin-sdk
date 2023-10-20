import { Devices, FilesExst, FilesType, UsersType } from "../../enums";
import { IMessage } from "../utils";
/**
 * Describes an item that will be embedded in the "Actions" item of the file context menu.
 */
export interface IContextMenuItem {
  /**
   * Defines the unique item identifier used by the service to recognize the item.
   */
  key: string;

  /**
   * Defines the item display name.
   */
  label: string;

  /**
   * Defines the item display icon. The icon image must be uploaded to the "assets" folder.
   * Only the image name with the extension must be specified in this field. The required icon size is 16x16 px.
   * Otherwise, it will be compressed to this size.
   */
  icon: string;

  /**
   * Defines a function that takes the file/folder/room id as an argument. This function can be asynchronous.
   */
  onClick: (id: number) => Promise<IMessage> | IMessage | void;

  /**
   * Specifies whether to add the action state to the item in the file list when the onClick event is triggered.
   */
  withActiveItem?: boolean;

  /**
   * Defines the extensions of files where the current item will be displayed in the context menu.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current context menu item will be displayed in any file extension.
   */
  fileExt?: (FilesExst | string)[];

  /**
   * Defines the types of files where the current item will be displayed in the context menu.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current context menu item will be displayed in any file type.
   */
  fileType?: FilesType[];

  /**
   * Defines the types of users who will see the current item in the context menu.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current context menu item will be displayed for all user types.
   */
  usersTypes?: UsersType[];

  /**
   * Defines the types of devices where the current item will be displayed in the context menu.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current context menu item will be displayed in any device types.
   */
  devices?: Devices[];
}
