import { Devices, FilesExst, FilesType, UsersType } from "../../enums";
/**
 * Describes an item that will be embedded in the profile/main button/context menu.
 */
interface ISeparatorItem {
  /**
   * Defines the unique item identifier used by the service to recognize the item.
   */
  key: string;

  /**
   * Specifies if the current item is a separator or not.
   */
  isSeparator: true;

  /**
   * Defines the extensions of files where the current item will be displayed.
   * It only works if the FilesType.Files is specified in the fileType parameter.
   * If this parameter is not specified, then the current item will be displayed in any file extension.
   */
  FilesExst?: FilesExst[];

  /**
   * Defines the types of files where the current item will be displayed.
   * Presently the following file types are available: room, file, folder, image, video.
   * If this parameter is not specified, then the current  item will be displayed in any file type.
   */
  FilesType?: FilesType[];

  /**
   * Defines the types of users who will see the current item.
   * Currently the following user types are available: owner, docSpaceAdmin, roomAdmin, collaborator, user.
   * If this parameter is not specified, then the current item will be displayed for all user types.
   */
  userTypes?: UsersType[];

  /**
   * Defines the types of devices where the current item will be displayed.
   * At the moment the following device types are available: mobile, tablet, desktop.
   * If this parameter is not specified, then the current item will be displayed in any device types.
   */
  devices?: Devices[];
}
