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

const IArticlePlugin = "IArticlePlugin";
const IArticleItem = "IArticleItem";

const articleItems = `
  articleItems: Map<string, IArticleItem> = new Map();`;

const addArticleItem = `
  addArticleItem = (item: IArticleItem): void => {
    this.articleItems.set(item.key, item);
  };`;

const getArticleItems = `
  getArticleItems = (): Map<string, IArticleItem> => {
    return this.articleItems;
  };`;

const updateArticleItem = `
  updateArticleItem = (item: IArticleItem): void => {
    this.articleItems.set(item.key, item);
  };`;

export const getArticleTemp = (withArticle) => {
  if (!withArticle)
    return {
      IArticlePlugin,
      IArticleItem,

      articleVars: "",
      articleMeth: "",
    };

  let articleVars = "";
  let articleMeth = "";

  articleVars = `
  ${articleItems}`;

  articleMeth = `
        ${addArticleItem}
        ${getArticleItems}
        ${updateArticleItem}`;

  return {
    IArticlePlugin,
    IArticleItem,
    articleVars,
    articleMeth,
  };
};
