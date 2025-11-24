#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import VALID_SCREENS from "../src/constants/validScreens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI escape codes for console colors
const ANSI_RED = "\x1b[31m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_YELLOW = "\x1b[33m";
const ANSI_BLUE = "\x1b[34m";
const ANSI_RESET = "\x1b[0m";

const projectRoot = path.resolve(__dirname, "..");
const screensDir = path.join(projectRoot, "src", "screens");
const outputDir = path.join(projectRoot, "src", "utils", "screen");
const outputFile = path.join(outputDir, "screenLoader.ts");

/**
 * Generate screen loader that dynamically imports all available screens
 */
function generateScreenLoader() {
  console.log(`${ANSI_BLUE}Generating screen loader...${ANSI_RESET}`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all existing screen directories
  const existingScreens = [];
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

  // Validate screens against VALID_SCREENS
  const invalidScreens = existingScreens.filter(
    (screen) => !VALID_SCREENS.includes(screen)
  );

  if (invalidScreens.length > 0) {
    console.warn(
      `${ANSI_YELLOW}Warning: Found screens not in VALID_SCREENS: ${invalidScreens.join(", ")}${ANSI_RESET}`
    );
  }

  // Generate TypeScript content with the simple format
  const screenEntries = existingScreens
    .map((screen) => `  "${screen}": lazy(() => import("@/screens/${screen}"))`)
    .join(",\n");

  const content = `// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
${screenEntries}
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
`;

  // Write the file
  fs.writeFileSync(outputFile, content, "utf8");

  console.log(
    `${ANSI_GREEN}✅ Screen loader generated successfully!${ANSI_RESET}`
  );
  console.log(`   📄 File: ${path.relative(projectRoot, outputFile)}`);
  console.log(`   🖥️  Screens found: ${existingScreens.length}`);
  console.log(`   📋 Screens: ${existingScreens.join(", ")}`);

  return {
    outputFile,
    existingScreens,
    invalidScreens,
  };
}

/**
 * Validate screen structure
 */
function validateScreenStructure() {
  console.log(`${ANSI_BLUE}Validating screen structure...${ANSI_RESET}`);

  const issues = [];

  VALID_SCREENS.forEach((screenName) => {
    const screenPath = path.join(screensDir, screenName);
    const indexFile = path.join(screenPath, "index.tsx");
    const componentsDir = path.join(screenPath, "components");
    const hooksDir = path.join(screenPath, "hooks");

    if (!fs.existsSync(screenPath)) {
      // This is not an issue - screen might not be implemented yet
      return;
    }

    if (!fs.existsSync(indexFile)) {
      issues.push(`Missing index.tsx for screen: ${screenName}`);
    }

    if (!fs.existsSync(componentsDir)) {
      issues.push(`Missing components directory for screen: ${screenName}`);
    }

    if (!fs.existsSync(hooksDir)) {
      issues.push(`Missing hooks directory for screen: ${screenName}`);
    }
  });

  if (issues.length > 0) {
    console.warn(`${ANSI_YELLOW}Structure issues found:${ANSI_RESET}`);
    issues.forEach((issue) => console.warn(`  ⚠️  ${issue}`));
  } else {
    console.log(
      `${ANSI_GREEN}✅ Screen structure validation passed${ANSI_RESET}`
    );
  }

  return issues;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const shouldValidate = args.includes("--validate");

  if (shouldValidate) {
    validateScreenStructure();
  }

  generateScreenLoader();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateScreenLoader, validateScreenStructure };
