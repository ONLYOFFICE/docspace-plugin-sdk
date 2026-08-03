#!/usr/bin/env node

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

/**
 * Builds every sample under `samples/` and collects the resulting plugin
 * archives into a single folder, ready to be uploaded to DocSpace.
 *
 * Samples are discovered from the filesystem, so a new sample needs no
 * registration here: drop the folder into `samples/` and it is built.
 *
 * Usage: node scripts/build-samples.mjs [options]
 */

import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAMPLES_DIR = path.join(REPO_ROOT, "samples");
const SDK_PACKAGE_NAME = "@onlyoffice/docspace-plugin-sdk";

const USAGE = `Usage: node scripts/build-samples.mjs [options]

  --out <dir>       output folder (default: dist-plugins)
  --filter <text>   only build samples whose name contains <text> (repeatable)
  --jobs <n>        parallel builds (default: min(4, cpus))
  --no-install      skip the SDK build and the dependency install, just build samples
  --help`;

/**
 * @returns {{outDir: string, filters: string[], jobs: number, install: boolean}}
 */
function parseArgs(argv) {
  const options = {
    outDir: path.join(REPO_ROOT, "dist-plugins"),
    filters: [],
    jobs: Math.min(4, Math.max(1, os.cpus().length)),
    install: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    switch (arg) {
      case "--help":
      case "-h":
        console.log(USAGE);
        process.exit(0);
        break;
      case "--out":
        options.outDir = path.resolve(REPO_ROOT, argv[++i] ?? "");
        break;
      case "--filter":
        options.filters.push((argv[++i] ?? "").toLowerCase());
        break;
      case "--jobs":
        options.jobs = Math.max(1, Number.parseInt(argv[++i] ?? "1", 10) || 1);
        break;
      case "--no-install":
        options.install = false;
        break;
      default:
        console.error(`❌ Unknown option: ${arg}`);
        process.exit(1);
    }
  }

  return options;
}

/**
 * Every direct subfolder of `samples/` that is an npm package with a build script.
 * @returns {{name: string, dir: string}[]}
 */
function discoverSamples() {
  return fs
    .readdirSync(SAMPLES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "node_modules")
    .map((entry) => ({ name: entry.name, dir: path.join(SAMPLES_DIR, entry.name) }))
    .filter(({ dir }) => fs.existsSync(path.join(dir, "package.json")))
    .filter(({ name, dir }) => {
      const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf-8"));

      if (pkg.scripts?.build) return true;

      console.warn(`⏭️  Skipped ${name}: no "build" script in package.json`);
      return false;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Runs npm without a shell, reusing the npm that started this script when possible.
 * @returns {Promise<{code: number, output: string}>}
 */
function runNpm(args, cwd) {
  const execPath = process.env.npm_execpath;
  const usesNodeCli = execPath && execPath.endsWith(".js");

  const command = usesNodeCli ? process.execPath : process.platform === "win32" ? "npm.cmd" : "npm";
  const commandArgs = usesNodeCli ? [execPath, ...args] : args;

  // Node refuses to spawn a batch file without a shell (EINVAL, since 18.20/20.12/22),
  // and npm on Windows is `npm.cmd`. This path is taken when the script runs directly
  // rather than through npm. The arguments are fixed literals, so the shell is safe.
  const needsShell = command === "npm.cmd";

  return new Promise((resolve) => {
    const child = spawn(command, commandArgs, {
      cwd,
      windowsHide: true,
      shell: needsShell,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, npm_config_yes: "true" },
    });

    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));

    child.on("error", (error) => resolve({ code: 1, output: `${output}${error.message}` }));
    child.on("close", (code) => resolve({ code: code ?? 1, output }));
  });
}

/**
 * The samples depend on the SDK as `file:../..`, which npm installs as a link to the
 * repo root, so they compile against `dist/` there. That folder is not checked in, and
 * when it is missing the samples fail with unrelated-looking type errors, so build it
 * up front. Being a link, it never goes stale: the next build sees the current sources.
 */
async function buildSdk() {
  console.log(`🔧 Building ${SDK_PACKAGE_NAME} from source...`);

  const { code, output } = await runNpm(["run", "build"], REPO_ROOT);

  if (code !== 0) {
    console.error(output);
    console.error("❌ SDK build failed.");
    process.exit(1);
  }

  console.log("✅ SDK ready.\n");
}

/**
 * A sample added since the last install is missing from the lockfile, and so are its
 * dependencies. Workspace entries are keyed by folder name in `packages`.
 * @returns {string[]} names of samples the lockfile does not know about
 */
function findUnlockedSamples(samples) {
  const lockPath = path.join(SAMPLES_DIR, "package-lock.json");

  if (!fs.existsSync(lockPath)) return samples.map((sample) => sample.name);

  const locked = new Set(Object.keys(JSON.parse(fs.readFileSync(lockPath, "utf-8")).packages ?? {}));

  return samples.filter((sample) => !locked.has(sample.name)).map((sample) => sample.name);
}

async function installDependencies(samples) {
  const missing = !fs.existsSync(path.join(SAMPLES_DIR, "node_modules"));
  const unlocked = findUnlockedSamples(samples);

  if (!missing && unlocked.length === 0) return;

  console.log(
    missing
      ? "📦 Installing shared dependencies for all samples..."
      : `📦 New sample(s) detected (${unlocked.join(", ")}), updating dependencies...`
  );

  const { code, output } = await runNpm(["install"], SAMPLES_DIR);

  if (code !== 0) {
    console.error(output);
    console.error("❌ Dependency installation failed.");
    process.exit(1);
  }

  console.log("✅ Dependencies ready.\n");
}

/**
 * @returns {Promise<{name: string, ok: boolean, output: string, zip?: string}>}
 */
async function buildSample(sample, outDir) {
  const { code, output } = await runNpm(["run", "build"], sample.dir);

  if (code !== 0) return { name: sample.name, ok: false, output };

  const zip = path.join(sample.dir, "dist", "plugin.zip");

  if (!fs.existsSync(zip)) {
    return { name: sample.name, ok: false, output: `${output}\ndist/plugin.zip was not produced.` };
  }

  const target = path.join(outDir, `${sample.name}.zip`);
  fs.copyFileSync(zip, target);

  return { name: sample.name, ok: true, output, zip: target };
}

/**
 * Runs `worker` over `items` with at most `limit` in flight.
 * @returns {Promise<any[]>}
 */
async function mapWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const discovered = discoverSamples();
  const samples = options.filters.length
    ? discovered.filter((s) => options.filters.some((f) => s.name.toLowerCase().includes(f)))
    : discovered;

  if (samples.length === 0) {
    console.error("❌ No samples matched.");
    process.exit(1);
  }

  if (options.install) {
    await buildSdk();
    // Checked against every sample, not just the filtered ones: the lockfile covers them all.
    await installDependencies(discovered);
  }

  fs.mkdirSync(options.outDir, { recursive: true });

  // Drop archives from a previous run so removed samples do not linger. Only a full
  // build knows the complete set, so a filtered run leaves the other archives alone.
  if (!options.filters.length) {
    for (const file of fs.readdirSync(options.outDir)) {
      if (file.endsWith(".zip")) fs.rmSync(path.join(options.outDir, file));
    }
  }

  console.log(`🔨 Building ${samples.length} sample(s) with ${options.jobs} parallel job(s)...\n`);

  let done = 0;
  const results = await mapWithLimit(samples, options.jobs, async (sample) => {
    const result = await buildSample(sample, options.outDir);

    console.log(
      `${result.ok ? "✅" : "❌"} [${++done}/${samples.length}] ${sample.name}`
    );

    return result;
  });

  const failed = results.filter((result) => !result.ok);

  for (const result of failed) {
    console.error(`\n───── ${result.name} ─────\n${result.output.trim()}`);
  }

  console.log(
    `\n📁 ${results.length - failed.length}/${results.length} plugin(s) in ${path.relative(process.cwd(), options.outDir) || "."}`
  );

  if (failed.length) {
    console.error(`❌ Failed: ${failed.map((result) => result.name).join(", ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});
