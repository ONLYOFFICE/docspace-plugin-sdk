import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: `${__dirname}src/index.ts`,
      formats: ["es"],
      fileName: () => "plugin.js",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "@onlyoffice/docspace-plugin-sdk",
        "@onlyoffice/docspace-plugin-sdk/react",
      ],
      output: {
        assetFileNames: (assetInfo: { name?: string }) =>
          assetInfo.name?.endsWith(".css") ? "plugin.css" : (assetInfo.name ?? "asset"),
      },
    },
  },
});
