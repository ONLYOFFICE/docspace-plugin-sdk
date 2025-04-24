/*
* (c) Copyright Ascensio System SIA 2025
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const IInfoPanelPlugin = "IInfoPanelPlugin";
const IInfoPanelItem = "IInfoPanelItem";

const infoPanelItems = `
  infoPanelItems: Map<string, IInfoPanelItem> = new Map();`;

const addInfoPanelItem = `
  addInfoPanelItem = (item: IInfoPanelItem ): void => {
    this.infoPanelItems.set(item.key, item);
  };`;

const getInfoPanelItems = `
  getInfoPanelItems = (): Map<string, IInfoPanelItem > => {
    return this.infoPanelItems;
  };`;

const updateInfoPanelItem = `
  updateInfoPanelItem = (item: IInfoPanelItem): void => {
    this.infoPanelItems.set(item.key, item);
  };`;

export const getInfoPanelTemp = (withInfoPanel) => {
  if (!withInfoPanel)
    return {
      IInfoPanelPlugin,
      IInfoPanelItem,

      infoPanelVars: "",
      infoPanelMeth: "",
    };

  let infoPanelVars = "";
  let infoPanelMeth = "";

  infoPanelVars = `
  ${infoPanelItems}`;

  infoPanelMeth = `
        ${addInfoPanelItem}
        ${getInfoPanelItems}
        ${updateInfoPanelItem}`;

  return {
    IInfoPanelPlugin,
    IInfoPanelItem,

    infoPanelVars,
    infoPanelMeth,
  };
};
