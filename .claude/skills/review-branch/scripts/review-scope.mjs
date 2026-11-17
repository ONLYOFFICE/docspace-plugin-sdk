#!/usr/bin/env node
/**
 * Resolve the review scope for the current branch: the base branch to diff
 * against, the commits on our side and the diffstat. Read-only except for
 * `--save`, which records the resolved base in git config.
 *
 * Usage (from the repo root):
 *   node .claude/skills/review-branch/scripts/review-scope.mjs
 *   node .claude/skills/review-branch/scripts/review-scope.mjs develop
 *   node .claude/skills/review-branch/scripts/review-scope.mjs --fetch --diff
 */

import { execFileSync } from "node:child_process";

const BASE_PATTERNS = ["release/*", "hotfix/*", "develop", "master", "main", "feature/*"];
const MAX_COMMITS_AHEAD = 500;
const DEFAULT_MAX_DIFF_LINES = 3000;

function git(args, { allowFail = false } = {}) {
  try {
    return execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 }).trim();
  } catch (e) {
    if (allowFail) return "";
    throw new Error(`git ${args.join(" ")} failed: ${e.message}`);
  }
}

const matches = (name, pattern) =>
  pattern.endsWith("/*") ? name.startsWith(pattern.slice(0, -1)) : name === pattern;

const patternRank = (name) => {
  const i = BASE_PATTERNS.findIndex((p) => matches(name, p));
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
};

function candidates(current) {
  return git(["for-each-ref", "--format=%(refname:short)", "refs/heads", "refs/remotes"])
    .split("\n")
    .filter((ref) => ref && !ref.endsWith("/HEAD"))
    .map((ref) => ({ ref, bare: ref.replace(/^origin\//, "") }))
    .filter(({ bare }) => bare !== current && patternRank(bare) !== Number.MAX_SAFE_INTEGER);
}

function detectBase(current) {
  const scored = [];
  for (const { bare, ref } of candidates(current)) {
    const mergeBase = git(["merge-base", ref, "HEAD"], { allowFail: true });
    if (!mergeBase) continue;
    const ahead = Number(git(["rev-list", "--count", `${mergeBase}..HEAD`]));
    if (!ahead || ahead > MAX_COMMITS_AHEAD) continue;
    scored.push({ bare, ref, ahead, rank: patternRank(bare), remote: ref.startsWith("origin/") });
  }
  scored.sort((a, b) => a.ahead - b.ahead || a.rank - b.rank || a.remote - b.remote);
  const seen = new Set();
  return scored.filter(({ bare }) => !seen.has(bare) && seen.add(bare));
}

function resolveBase(current, explicit) {
  if (explicit) return { base: explicit, source: "argument", ranked: [] };
  const pinned = git(["config", `branch.${current}.reviewBase`], { allowFail: true });
  if (pinned) return { base: pinned, source: `git config branch.${current}.reviewBase`, ranked: [] };
  const ranked = detectBase(current);
  return { base: ranked[0]?.ref ?? null, source: "auto-detected", ranked };
}

function parseArgs(argv) {
  const opts = { diff: false, save: false, fetch: false, maxDiffLines: DEFAULT_MAX_DIFF_LINES };
  let explicit = null;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--diff") opts.diff = true;
    else if (arg === "--save") opts.save = true;
    else if (arg === "--fetch") opts.fetch = true;
    else if (arg === "--max-diff-lines") opts.maxDiffLines = Number(argv[++i]) || opts.maxDiffLines;
    else if (arg.startsWith("--")) throw new Error(`unknown flag ${arg}`);
    else explicit = arg;
  }
  return { opts, explicit };
}

function main() {
  const { opts, explicit } = parseArgs(process.argv.slice(2));
  process.chdir(git(["rev-parse", "--show-toplevel"]));

  if (opts.fetch) {
    try {
      git(["fetch", "--all", "--quiet"]);
    } catch {
      console.log("WARNING: git fetch failed; origin/* refs may be stale.");
    }
  }

  const head = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (head === "HEAD") throw new Error("detached HEAD: check out the branch to review");

  const { base, source, ranked } = resolveBase(head, explicit);
  if (!base) throw new Error("no base branch found: pass one explicitly");

  const alts = ranked.slice(1, 4).map((c) => `${c.ref} (+${c.ahead})`).join(", ");
  console.log(`Branch: ${head}`);
  console.log(`Base: ${base}  [${source}]${alts ? `   runners-up: ${alts}` : ""}`);
  console.log(`Merge-base: ${git(["merge-base", base, "HEAD"])}`);

  if (!base.startsWith("origin/")) {
    const behind = Number(git(["rev-list", "--count", `${base}..origin/${base}`], { allowFail: true }) || 0);
    if (behind > 0) console.log(`WARNING: local ${base} is ${behind} commit(s) behind origin/${base}; rerun with --fetch or pass origin/${base}.`);
  }

  const range = `${base}...HEAD`;
  console.log(`\n--- commits (${base}..HEAD) ---`);
  console.log(git(["log", "--oneline", "--no-decorate", `${base}..HEAD`]) || "(none)");
  console.log("\n--- stat ---");
  console.log(git(["diff", "--stat", range]) || "(no changes)");

  if (opts.save) {
    git(["config", `branch.${head}.reviewBase`, base]);
    console.log(`\nSaved: branch.${head}.reviewBase = ${base}`);
  }

  if (opts.diff) {
    const diff = git(["diff", range]);
    const lines = diff ? diff.split("\n").length : 0;
    if (lines > opts.maxDiffLines) console.log(`\n--- diff omitted: ${lines} lines; use git diff ${range} -- <path> ---`);
    else if (diff) console.log(`\n--- diff (${range}) ---\n${diff}`);
  }
}

try {
  main();
} catch (e) {
  console.error(`[review-scope] ${e.message}`);
  process.exit(1);
}
