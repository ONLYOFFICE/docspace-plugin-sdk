#!/usr/bin/env node

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

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Path to the source file in the SDK template
  const sourcePath = path.resolve(__dirname, "../template/scripts/createZip.js");

  // Path to the destination file in the user's project
  const destPath = path.resolve(process.cwd(), "./scripts/createZip.js");

  if (!fs.existsSync(sourcePath)) {
    throw new Error("Source file not found in SDK template.");
  }

  // Ensure the destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(sourcePath, destPath);

  console.log("✅ Successfully updated scripts/createZip.js");
} catch (error) {
  console.error("❌ Error updating createZip.js:", error.message);
  process.exit(1);
}
