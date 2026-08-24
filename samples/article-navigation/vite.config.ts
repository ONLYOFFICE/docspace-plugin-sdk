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
      // Everything the DocSpace client already has loaded stays external: the
      // client rewrites these specifiers to its own copies when it imports the
      // plugin, so the bundle must not carry duplicates. A second React or a
      // second UI kit would arrive with its own contexts, and every hook — and
      // every themed component — would break.
      //
      // The SDK root is bundled like any other dependency: it holds string
      // enums and types and no module state, so a second copy is harmless.
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@onlyoffice/docspace-plugin-sdk/react",
        /^@docspace\/ui-kit(\/.*)?$/,
      ],
      output: {
        assetFileNames: (assetInfo: { name?: string }) =>
          assetInfo.name?.endsWith(".css") ? "plugin.css" : (assetInfo.name ?? "asset"),
      },
    },
  },
});
