/**
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
 *
 * @license
 */

// @ts-check
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PATH_PREFIX = "docspace/plugins-sdk/usage-sdk";
const SIDEBAR_FILE = join(process.cwd(), "docs", "typedoc-sidebar.cjs");
const CONFIG_FILE = join(process.cwd(), "typedoc.config.mjs");
const DEFAULT_BRANCH = "master";

try {
  // Update sidebar IDs with path prefix
  let sidebarContent = readFileSync(SIDEBAR_FILE, "utf-8");
  
  sidebarContent = sidebarContent.replace(
    /id:\s*"([^"]+)"/g,
    (_, id) => {
      // Don't add prefix if already present
      if (id.startsWith(PATH_PREFIX)) {
        return `id: "${id}"`;
      }
      return `id: "${PATH_PREFIX}/${id}"`;
    }
  );
  
  writeFileSync(SIDEBAR_FILE, sidebarContent, "utf-8");
  console.log(`✅ Updated sidebar IDs with prefix: ${PATH_PREFIX}`);

  // Revert git revision to default branch
  let configContent = readFileSync(CONFIG_FILE, "utf-8");
  configContent = configContent.replace(
    /gitRevision:\s*["'][^"']*["']/,
    `gitRevision: "${DEFAULT_BRANCH}"`
  );
  writeFileSync(CONFIG_FILE, configContent, "utf-8");
  console.log(`✅ Reverted git revision to: ${DEFAULT_BRANCH}`);
} catch (error) {
  console.error("❌ Error updating sidebar:", error);
  process.exit(1);
}
