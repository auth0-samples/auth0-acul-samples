import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// Dynamically discover screen directories
const screensDir = resolve(__dirname, "src/screens");
const screenEntries: Record<string, string> = {};

// Only add screens that exist in the src/screens directory
if (fs.existsSync(screensDir)) {
  const screenDirs = fs
    .readdirSync(screensDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Create an entry point for each screen
  screenDirs.forEach((screen) => {
    const entryFile = resolve(screensDir, screen, "index.tsx");
    if (fs.existsSync(entryFile)) {
      screenEntries[screen] = entryFile;
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false,
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      input: {
        ...screenEntries,
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // Screen-specific entries
        entryFileNames: (chunkInfo) =>
          screenEntries[chunkInfo.name]
            ? `assets/${chunkInfo.name}/index.[hash].js`
            : "assets/main.[hash].js",

        // Chunks naming strategy
        chunkFileNames: (chunkInfo) => {
          const chunkName = chunkInfo.name || "";

          // For screen-specific chunks
          const screenMatch = Object.keys(screenEntries).find((screen) =>
            chunkName.startsWith(`${screen}-`),
          );

          if (screenMatch) {
            return `assets/${screenMatch}/chunk.[hash].js`;
          }

          // For shared chunks, use a simplified naming scheme
          return "assets/shared/[name].[hash].js";
        },

        // Assets naming (CSS, images, etc)
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || "";
          if (info.endsWith(".css")) {
            return "assets/shared/style.[hash][extname]";
          }
          return "assets/shared/[name].[hash][extname]";
        },

        // Simplified manual chunks strategy with forced common chunk
        manualChunks: (id) => {
          // All node_modules dependencies go into a single vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Everything in src/ but NOT in src/screens/ goes to common
          // Note: resolve(id) converts to absolute path for reliable checking
          const absoluteId = resolve(id);
          const absoluteSrcScreensDir = resolve(__dirname, "src/screens");

          if (
            absoluteId.includes(resolve(__dirname, "src/")) &&
            !absoluteId.startsWith(absoluteSrcScreensDir + "/")
          ) {
            return "common";
          }

          // For screen-specific code or other cases, let Rollup decide
          return undefined;
        },
      },
    },
    minify: true,
    emptyOutDir: true,
    cssCodeSplit: false, // Keep CSS in a single file
    sourcemap: true,
  },
  logLevel: "info",
});
