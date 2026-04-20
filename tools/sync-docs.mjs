// @ts-check
import { cpSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = join(__filename, "../..");

const DEST = join(
	ROOT,
	"../api.onlyoffice.com/site/docspace/plugins-sdk/usage-sdk/coding-plugin"
);

rmSync(DEST, { recursive: true, force: true });
cpSync(join(ROOT, "docs"), DEST, { recursive: true });
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
