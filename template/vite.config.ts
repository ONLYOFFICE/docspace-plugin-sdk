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
      // Kept out of the bundle: DocSpace supplies its own copies at load
      // time and rewrites these specifiers to them. A second React or a
      // second react-dom arrives with its own contexts and its own event
      // system, and every hook breaks.
      //
      // The SDK root is deliberately absent: it holds string enums and types
      // and no module state, so a bundled copy behaves exactly like the
      // host's. Only the React entry, which owns the runtime context, has to
      // be shared.
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
