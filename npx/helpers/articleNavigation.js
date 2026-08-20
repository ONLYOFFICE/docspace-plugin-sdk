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

const IArticleNavigationPlugin = "IArticleNavigationPlugin";
const IArticleNavigationItem = "IArticleNavigationItem";

const articleNavigationItems = `
  articleNavigationItems: Map<string, IArticleNavigationItem> = new Map();`;

const addArticleNavigationItem = `
  addArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };`;

const getArticleNavigationItems = `
  getArticleNavigationItems = (): Map<string, IArticleNavigationItem> => {
    return this.articleNavigationItems;
  };`;

const updateArticleNavigationItem = `
  updateArticleNavigationItem = (item: IArticleNavigationItem): void => {
    this.articleNavigationItems.set(item.key, item);
  };`;

export const getArticleNavigationTemp = (withArticleNavigation) => {
  if (!withArticleNavigation)
    return {
      IArticleNavigationPlugin,
      IArticleNavigationItem,

      articleNavigationVars: "",
      articleNavigationMeth: "",
    };

  let articleNavigationVars = "";
  let articleNavigationMeth = "";

  articleNavigationVars = `
  ${articleNavigationItems}`;

  articleNavigationMeth = `
        ${addArticleNavigationItem}
        ${getArticleNavigationItems}
        ${updateArticleNavigationItem}`;

  return {
    IArticleNavigationPlugin,
    IArticleNavigationItem,
    articleNavigationVars,
    articleNavigationMeth,
  };
};
