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

const IProfileFieldPlugin = "IProfileFieldPlugin";
const IProfileFieldItem = "IProfileFieldItem";

const profileFieldItems = `
  profileFieldItems: Map<string, IProfileFieldItem> = new Map();`;

const addProfileFieldItem = `
  addProfileFieldItem = (item: IProfileFieldItem): void => {
    this.profileFieldItems.set(item.key, item);
  };`;

const getProfileFieldItems = `
  getProfileFieldItems = (): Map<string, IProfileFieldItem> => {
    return this.profileFieldItems;
  };`;

const updateProfileFieldItem = `
  updateProfileFieldItem = (item: IProfileFieldItem): void => {
    this.profileFieldItems.set(item.key, item);
  };`;

export const getProfileFieldTemp = (withProfileField) => {
  if (!withProfileField)
    return {
      IProfileFieldPlugin,
      IProfileFieldItem,

      profileFieldVars: "",
      profileFieldMeth: "",
    };

  let profileFieldVars = "";
  let profileFieldMeth = "";

  profileFieldVars = `
  ${profileFieldItems}`;

  profileFieldMeth = `
        ${addProfileFieldItem}
        ${getProfileFieldItems}
        ${updateProfileFieldItem}`;

  return {
    IProfileFieldPlugin,
    IProfileFieldItem,
    profileFieldVars,
    profileFieldMeth,
  };
};
