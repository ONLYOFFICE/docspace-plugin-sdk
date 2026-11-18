/*
* (c) Copyright Ascensio System SIA 2026
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

const IProfileTabPlugin = "IProfileTabPlugin";
const IProfileTabItem = "IProfileTabItem";

const profileTabItems = `
  profileTabItems: Map<string, IProfileTabItem> = new Map();`;

const addProfileTabItem = `
  addProfileTabItem = (item: IProfileTabItem): void => {
    this.profileTabItems.set(item.key, item);
  };`;

const getProfileTabItems = `
  getProfileTabItems = (): Map<string, IProfileTabItem> => {
    return this.profileTabItems;
  };`;

const updateProfileTabItem = `
  updateProfileTabItem = (item: IProfileTabItem): void => {
    this.profileTabItems.set(item.key, item);
  };`;

export const getProfileTabTemp = (withProfileTab) => {
  if (!withProfileTab)
    return {
      IProfileTabPlugin,
      IProfileTabItem,

      profileTabVars: "",
      profileTabMeth: "",
    };

  let profileTabVars = "";
  let profileTabMeth = "";

  profileTabVars = `
  ${profileTabItems}`;

  profileTabMeth = `
        ${addProfileTabItem}
        ${getProfileTabItems}
        ${updateProfileTabItem}`;

  return {
    IProfileTabPlugin,
    IProfileTabItem,
    profileTabVars,
    profileTabMeth,
  };
};
