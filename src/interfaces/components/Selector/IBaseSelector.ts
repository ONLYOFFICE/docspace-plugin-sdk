import { FilesExst, FilesSecurity, FilesType } from "../../../enums";
import { TReturnMessage } from "../../utils";

export type TSelectorItem = {
  label: string;
  id?: string | number;
} & Partial<TSelectorItemFile> &
  Partial<TSelectorItemInput> &
  Partial<TSelectorItemNew>;

export type TSelectorItemFile = {
  icon: string;
  fileExst: FilesExst | string;
  fileType: FilesType;
  security: FilesSecurity;
};

export type TSelectorItemInput = {
  isInputItem: boolean;
  defaultInputValue: string;
  onAcceptInput: (value: string) => TReturnMessage;
  onCancelInput: () => TReturnMessage;
};

export type TSelectorItemNew = {
  isCreateNewItem: boolean;
  onCreateClick: () => TReturnMessage;
};

export type TBreadCrumbItem = {
  label: string;
  id: string | number;
  isRoom?: boolean;
};

type TOnSelectParams = {
  selectedId?: string | number;
  isDoubleClick: boolean;
};

export type TSelectorBreadCrumbs = {
  withBreadCrumbs?: boolean;
  isBreadCrumbsLoading?: boolean;
  breadCrumbs?: TBreadCrumbItem[];
  onSelectBreadCrumb?: (id: string | number) => TReturnMessage;
};

export type TSelectorPagination = {
  items: TSelectorItem[];
  hasNextPage?: boolean;
  isNextPageLoading?: boolean;
  onLoadNextPage?: () => TReturnMessage;
  totalItems?: number;
};

export type TSelectorHeader = {
  withHeader?: boolean;
  headerProps?: {
    label: string;
    isCloseable?: boolean;
    onCloseClick?: () => TReturnMessage;
    withBackButton?: boolean;
    onBackClick?: () => TReturnMessage;
  };
};

export type TSelectorCheckbox = {
  withCheckbox?: boolean;
  footerCheckboxLabel?: string;
  isChecked?: boolean;
}

export type TSelectorCancelButton = {
  withCancelButton?: boolean;
  cancelButtonLabel?: string;
  onCancel?: () => TReturnMessage;
}

type TOnSubmitParams = {
  selectedIds: (string | number)[];
  fileName: string;
  isFooterCheckboxChecked: boolean;
}

export type TSelectorSubmitButton = {
  submitButtonLabel: string;
  disabledSubmitButton?: boolean;
  onSubmit: (params: TOnSubmitParams) => TReturnMessage;
}

export type TBaseSelector =
  TSelectorBreadCrumbs &
  TSelectorPagination &
  TSelectorHeader &
  TSelectorCancelButton &
  TSelectorSubmitButton &
  TSelectorCheckbox & {
    id?: string;
    className?: string;

    isLoading?: boolean;

    isMultiSelect?: boolean;
    maxSelectedItems?: number;
    selectedItems?: TSelectorItem[];

    descriptionText?: string;
    emptyScreenHeader?: string;
    emptyScreenDescription?: string;

    searchEmptyScreenHeader?: string;
    searchEmptyScreenDescription?: string;

    onLoad?: () => TReturnMessage;
    onSelect?: (params: TOnSelectParams) => TReturnMessage;
  };

