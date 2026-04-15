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

const IArticleButtonPlugin = "IArticleButtonPlugin";
const IArticleButtonItem = "IArticleButtonItem";

const articleButtonItems = `
  articleButtonItems: Map<string, IArticleButtonItem> = new Map();`;

const addArticleButtonItem = `
  addArticleButtonItem = (item: IArticleButtonItem): void => {
    this.articleButtonItems.set(item.key, item);
  };`;

const getArticleButtonItems = `
  getArticleButtonItems = (): Map<string, IArticleButtonItem> => {
    return this.articleButtonItems;
  };`;

const updateArticleButtonItem = `
  updateArticleButtonItem = (item: IArticleButtonItem): void => {
    this.articleButtonItems.set(item.key, item);
  };`;

export const getArticleTemp = (withArticle) => {
  if (!withArticle)
    return {
      IArticleButtonPlugin,
      IArticleButtonItem,

      articleButtonVars: "",
      articleButtonMeth: "",
    };

  let articleButtonVars = "";
  let articleButtonMeth = "";

  articleButtonVars = `
  ${articleButtonItems}`;

  articleButtonMeth = `
        ${addArticleButtonItem}
        ${getArticleButtonItems}
        ${updateArticleButtonItem}`;

  return {
    IArticleButtonPlugin,
    IArticleButtonItem,
    articleButtonVars,
    articleButtonMeth,
  };
};
