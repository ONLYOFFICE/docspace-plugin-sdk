// @ts-check
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, "../..");

const SRC = join(ROOT, "docs");
const DEST_REPO = join(ROOT, "../api.onlyoffice.com");
const DEST = join(DEST_REPO, "site/docspace/plugins-sdk/usage-sdk/coding-plugin");

// Both checks must run before rmSync below wipes the destination.
if (!existsSync(SRC)) {
	console.error("❌ docs/ not found — run `npm run docs` first");
	process.exit(1);
}

if (!existsSync(join(DEST_REPO, ".git"))) {
	console.error(`❌ Target repository not found: ${DEST_REPO}`);
	process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
cpSync(SRC, DEST, { recursive: true });
rmSync(join(DEST, "index.md"), { force: true });
writeFileSync(
	join(DEST, "_category_.json"),
	JSON.stringify(
		{ link: { type: "doc", id: "docspace/plugins-sdk/usage-sdk/coding-plugin" } },
		null,
		2
	) + "\n",
	"utf-8"
);

console.log("✅  Docs synced to api.onlyoffice.com.");
