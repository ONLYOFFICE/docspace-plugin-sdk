import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: `${__dirname}src/index.tsx`,
      formats: ["es"],
      fileName: () => "plugin.js",
    },
    rollupOptions: {
      // Kept out of the bundle: DocSpace supplies its own copies at load time
      // and rewrites these specifiers to them. A second React arrives with its
      // own contexts, so every SDK hook throws; a second ui-kit fails more
      // quietly, reading an empty theme context and rendering light and
      // left-to-right whatever the portal is set to.
      //
      // The SDK root is bundled like any other dependency: string enums and
      // types, no module state. Only its React entry, which owns the runtime
      // context, has to be shared.
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
