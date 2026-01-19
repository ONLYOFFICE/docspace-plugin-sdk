import { FilesExst, FilesSecurity, Security } from "../../../enums";
import { TReturnMessage } from "../../utils";
import { TBreadCrumbItem, TSelectorHeader } from "./IBaseSelector";

type TSelectedFileInfo = {
  id: string | number;
  title: string;
  fileExst?: FilesExst | string;
};

type TOnSubmitParams = {
  selectedItemId: string | number | undefined;
  folderTitle: string;
  fileName: string;
  isChecked: boolean;
  selectedFileInfo: TSelectedFileInfo | null;
  breadCrumbs?: TBreadCrumbItem[];
};

type TGetIsDisabledParams = {
  selectedItemId: string | number | undefined;
  selectedItemType?: "rooms" | "files";
  selectedItemSecurity?: FilesSecurity | Security;
  selectedFileInfo: TSelectedFileInfo | null;
  isFirstLoad: boolean;
  isDisabledFolder?: boolean;
  isRoot: boolean;
};

export type TFilesSelector = TSelectorHeader & {
  id?: string;

  // selector options
  isMultiSelect?: boolean;
  withSearch?: boolean;
  withBreadCrumbs?: boolean;
  withCreate?: boolean;

  currentFolderId?: string | number;
  isRoomsOnly?: boolean;
  openRoot?: boolean;

  withCancelButton?: boolean;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;

  descriptionText?: string;
  withFooterInput?: boolean;
  footerInputHeader?: string;
  currentFooterInputValue?: string;
  withFooterCheckbox?: boolean;
  footerCheckboxLabel?: string;


  getIsDisabled: (params: TGetIsDisabledParams) => boolean;
  onLoad?: () => TReturnMessage;
  onSubmit?: (params: TOnSubmitParams) => TReturnMessage;
  onSelectItem?: (id: string | number | undefined) => TReturnMessage;
  onCancel?: () => TReturnMessage;
};
