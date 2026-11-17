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

const IArticleWidgetPlugin = "IArticleWidgetPlugin";
const IArticleWidgetItem = "IArticleWidgetItem";

const articleWidgetItem = `
  articleWidgetItem: IArticleWidgetItem | null = null;`;

const setArticleWidgetItem = `
  setArticleWidgetItem = (item: IArticleWidgetItem | null): void => {
    this.articleWidgetItem = item;
  };`;

const getArticleWidgetItem = `
  getArticleWidgetItem = (): IArticleWidgetItem | null => {
    return this.articleWidgetItem;
  };`;

export const getArticleWidgetTemp = (withArticleWidget) => {
  if (!withArticleWidget)
    return {
      IArticleWidgetPlugin,
      IArticleWidgetItem,
      articleWidgetVars: "",
      articleWidgetMeth: "",
    };

  return {
    IArticleWidgetPlugin,
    IArticleWidgetItem,
    articleWidgetVars: `
  ${articleWidgetItem}`,
    articleWidgetMeth: `
        ${setArticleWidgetItem}
        ${getArticleWidgetItem}`,
  };
};
