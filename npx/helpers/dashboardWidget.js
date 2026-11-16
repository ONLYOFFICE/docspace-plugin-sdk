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

const IDashboardWidgetPlugin = "IDashboardWidgetPlugin";
const IDashboardWidgetItem = "IDashboardWidgetItem";

const dashboardWidgetItems = `
  dashboardWidgetItems: Map<string, IDashboardWidgetItem> = new Map();`;

const addDashboardWidgetItem = `
  addDashboardWidgetItem = (item: IDashboardWidgetItem): void => {
    this.dashboardWidgetItems.set(item.key, item);
  };`;

const getDashboardWidgetItems = `
  getDashboardWidgetItems = (): Map<string, IDashboardWidgetItem> => {
    return this.dashboardWidgetItems;
  };`;

const updateDashboardWidgetItem = `
  updateDashboardWidgetItem = (item: IDashboardWidgetItem): void => {
    this.dashboardWidgetItems.set(item.key, item);
  };`;

export const getDashboardWidgetTemp = (withDashboardWidget) => {
  if (!withDashboardWidget)
    return {
      IDashboardWidgetPlugin,
      IDashboardWidgetItem,

      dashboardWidgetVars: "",
      dashboardWidgetMeth: "",
    };

  let dashboardWidgetVars = "";
  let dashboardWidgetMeth = "";

  dashboardWidgetVars = `
  ${dashboardWidgetItems}`;

  dashboardWidgetMeth = `
        ${addDashboardWidgetItem}
        ${getDashboardWidgetItems}
        ${updateDashboardWidgetItem}`;

  return {
    IDashboardWidgetPlugin,
    IDashboardWidgetItem,
    dashboardWidgetVars,
    dashboardWidgetMeth,
  };
};
