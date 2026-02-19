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
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DOCS_DIR = join(process.cwd(), "..", "plugin-sdk-doc", "docs", "docspace", "plugins-sdk", "usage-sdk");

/**
 * Recursively processes all index.md files in the directory
 * @param {string} dir - Directory to process
 */
function processDirectory(dir) {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry === "index.md") {
      fixTitle(fullPath);
    }
  }
}

/**
 * Fixes the title in an index.md file
 * @param {string} filePath - Path to the index.md file
 */
function fixTitle(filePath) {
  let content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  
  if (lines.length === 0 || !lines[0].startsWith("# ")) {
    return; // No title to fix
  }
  
  const originalTitle = lines[0];
  
  // Extract the title (remove "# " prefix)
  const fullTitle = originalTitle.substring(2);
  
  // Check if title contains path separators
  if (!fullTitle.includes("/")) {
    return; // Title is already clean
  }
  
  // Extract the last part of the path as the new title
  const parts = fullTitle.split("/");
  const newTitle = parts[parts.length - 1];
  
  // Replace the first line with the new title
  lines[0] = `# ${newTitle}`;
  
  // Write back to file
  const newContent = lines.join("\n");
  writeFileSync(filePath, newContent, "utf-8");
  
  console.log(`✅ Fixed: ${filePath}`);
  console.log(`   ${originalTitle} → # ${newTitle}`);
}

try {
  console.log(`📂 Processing directory: ${DOCS_DIR}\n`);
  processDirectory(DOCS_DIR);
  console.log("\n✅ All titles fixed successfully!");
} catch (error) {
  console.error("❌ Error fixing titles:", error);
  process.exit(1);
}
