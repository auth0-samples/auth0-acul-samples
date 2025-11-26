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
  base: "./", // Use './' for relative paths
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      deny: ["dist"],
    },
  },
  clearScreen: false,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/screens": resolve(__dirname, "./src/screens"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/constants": resolve(__dirname, "./src/constants"),
      "@/assets": resolve(__dirname, "./src/assets"),
      "@/lib": resolve(__dirname, "./src/lib"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/test": resolve(__dirname, "./src/test"),
    },
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
            chunkName.startsWith(`${screen}-`)
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

        manualChunks: (id) => {
          if (!id.includes("node_modules")) {
            const absoluteId = resolve(id);
            const absoluteSrcScreensDir = resolve(__dirname, "src/screens");

            if (
              absoluteId.includes(resolve(__dirname, "src/")) &&
              !absoluteId.startsWith(absoluteSrcScreensDir + "/")
            ) {
              return "common";
            }
            return undefined;
          }

          // React core packages (no external dependencies) go to react-vendor
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")  // Keep React's internals together
          ) {
            return "react-vendor";
          }

          // All other node_modules go to vendor
          return "vendor";
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
