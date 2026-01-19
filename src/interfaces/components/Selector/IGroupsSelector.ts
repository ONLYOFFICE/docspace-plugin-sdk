import { TReturnMessage } from "../../utils";
import { TSelectorHeader } from "./IBaseSelector";


type TOnSubmitParams = {
    selectedIds: (string | number)[];
    fileName?: string;
    isFooterCheckboxChecked?: boolean;
}

export type TGroupsSelector = TSelectorHeader & {
    className?: string;
    onLoad?: () => TReturnMessage;
    onSubmit: (params: TOnSubmitParams) => TReturnMessage;
}