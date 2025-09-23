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

import JSZip from "jszip";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/**
 * Dynamically reads information from the installed SDK package.
 * @returns {{minDocSpaceVersion: string}}
 */
function getSdkInfo() {
  try {
    // Find the package.json of the installed SDK
    const sdkPackageUrl = new URL("../package.json", import.meta.url);
    const sdkPackagePath = fileURLToPath(sdkPackageUrl);

    const sdkPackage = JSON.parse(fs.readFileSync(sdkPackagePath, "utf8"));

    const minDocSpaceVersion = sdkPackage.minDocSpaceVersion;

    return { minDocSpaceVersion };
  } catch (error) {
    console.error(
      `❌ Error: Could not read information from '@onlyoffice/docspace-plugin-sdk'.`
    );
    console.error(
      "   Please make sure the package is installed correctly (`npm install`)."
    );
    process.exit(1);
  }
}

/**
 * Builds the plugin zip file from the current directory
 */
async function buildPlugin() {
  const currentDir = process.cwd();

  // Check if required files exist
  const pluginJsPath = path.join(currentDir, "dist", "plugin.js");
  const packageJsonPath = path.join(currentDir, "package.json");

  if (!fs.existsSync(pluginJsPath)) {
    console.error(
      "❌ Error: dist/plugin.js not found. Please build your plugin first."
    );
    process.exit(1);
  }

  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ Error: package.json not found in current directory.");
    process.exit(1);
  }

  console.log("🔨 Building plugin...");

  const zip = new JSZip();

  // Read plugin.js
  const jsData = fs.readFileSync(pluginJsPath, "utf-8");

  // Read package.json
  const jsonData = fs.readFileSync(packageJsonPath, "utf-8");
  const jsonDataObj = JSON.parse(jsonData);

  // Get the latest SDK info directly from the source
  const sdkInfo = getSdkInfo();

  // Create config.json for the plugin
  const docspace = {
    name: jsonDataObj.name.toLowerCase(),
    version: jsonDataObj.version || DEFAULT_PLUGIN_VERSION,
    minDocSpaceVersion: sdkInfo.minDocSpaceVersion || "",
    description: jsonDataObj.description || "",
    license: jsonDataObj.license || "",
    author: jsonDataObj.author || "",
    pluginName: jsonDataObj.pluginName || "",
    homePage: jsonDataObj.homepage || "",
    image: jsonDataObj.logo || "",
    scopes: jsonDataObj.scopes ? jsonDataObj.scopes.join(",") : "",
    cspDomains: (jsonDataObj.cspDomains && jsonDataObj.cspDomains.join(",")) || "",
  };

  // Add files to zip
  zip.file("plugin.js", jsData);
  zip.file("config.json", JSON.stringify(docspace, null, 2));

  // Add assets if they exist
  const assetsPath = path.join(currentDir, "assets");
  if (fs.existsSync(assetsPath)) {
    const assetsFiles = fs.readdirSync(assetsPath);

    assetsFiles.forEach((file) => {
      const filePath = path.join(assetsPath, file);
      const data = fs.readFileSync(filePath, "base64");
      zip.file(`assets/${file}`, data, { base64: true });
    });

    console.log(`📁 Added ${assetsFiles.length} asset(s) to plugin`);
  }

  // Ensure dist directory exists
  const distPath = path.join(currentDir, "dist");
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Generate and save the zip file
  try {
    const content = await zip.generateAsync({ type: "nodebuffer" });
    const outputPath = path.join(distPath, "plugin.zip");
    fs.writeFileSync(outputPath, content);

    console.log(`✅ Plugin built successfully: ${outputPath}`);
    console.log(`📦 Plugin name: ${docspace.name}`);
    console.log(`🔢 Version: ${docspace.version}`);
    console.log(`🎯 Min DocSpace version: ${docspace.minDocSpaceVersion}`);
  } catch (error) {
    console.error("❌ Error generating plugin zip:", error);
    process.exit(1);
  }
}

// Run the build process
buildPlugin().catch((error) => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});
