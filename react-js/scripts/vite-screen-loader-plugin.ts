import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

/**
 * Generate screen loader content
 */
function generateScreenLoaderContent(screensDir: string): string {
  const existingScreens: string[] = [];

  if (fs.existsSync(screensDir)) {
    const screenDirs = fs
      .readdirSync(screensDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .filter((screenName) => {
        const indexFile = path.join(screensDir, screenName, "index.tsx");
        return fs.existsSync(indexFile);
      });

    existingScreens.push(...screenDirs);
  }

  const screenEntries = existingScreens
    .map((screen) => `  "${screen}": lazy(() => import("@/screens/${screen}"))`)
    .join(",\n");

  return `// Auto-generated file - Do not edit manually
// Generated on: ${new Date().toISOString()}

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
${screenEntries}
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
`;
}

export interface ScreenLoaderPluginOptions {
  /** Directory where screens are located */
  screensDir?: string;
  /** Output directory for generated files */
  outputDir?: string;
  /** Whether to watch for changes in development */
  watch?: boolean;
}

export function viteScreenLoaderPlugin(
  options: ScreenLoaderPluginOptions = {}
): Plugin {
  const {
    screensDir = "src/screens",
    outputDir = "src/utils/screen",
    watch = false,
  } = options;

  let root = "";

  const generateScreenLoader = () => {
    const fullScreensDir = path.resolve(root, screensDir);
    const fullOutputDir = path.resolve(root, outputDir);
    const outputFile = path.resolve(fullOutputDir, "screenLoader.ts");

    // Ensure output directory exists
    if (!fs.existsSync(fullOutputDir)) {
      fs.mkdirSync(fullOutputDir, { recursive: true });
    }

    // Generate and write content
    const content = generateScreenLoaderContent(fullScreensDir);
    fs.writeFileSync(outputFile, content, "utf8");
  };

  return {
    name: "vite-screen-loader",

    configResolved(config) {
      root = config.root;
    },

    buildStart() {
      console.log("🚀 Generating screen loader...");

      try {
        generateScreenLoader();
        console.log("✅ Screen loader generated!");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.error(`Failed to generate screen loader: ${errorMessage}`);
      }
    },

    configureServer(server) {
      if (!watch) return;

      const watchPath = path.resolve(root, screensDir);

      if (fs.existsSync(watchPath)) {
        server.watcher.add(watchPath);

        server.watcher.on("all", (event, filePath) => {
          if (
            filePath.includes(watchPath) &&
            (filePath.endsWith("index.tsx") ||
              event === "addDir" ||
              event === "unlinkDir")
          ) {
            console.log("🔄 Screen changes detected, regenerating...");

            try {
              generateScreenLoader();
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : String(error);
              console.error(`❌ Failed to regenerate: ${errorMessage}`);
            }
          }
        });
      }
    },
  };
}
