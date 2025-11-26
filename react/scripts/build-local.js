// This script generates build output in a specific HTML format that can be directly copied to Auth0 Dashboard for custom authentication screens - a productivity boost for developers
import { execSync } from "child_process";
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
const ANSI_RESET = "\x1b[0m";

const screenName = process.argv[2];
const port = process.env.PORT || "8080";

if (!screenName) {
  console.error(
    `${ANSI_RED}%s${ANSI_RESET}`,
    "Error: No screen name provided."
  );
  console.log("Usage: npm run build:local <screen-name>");
  process.exit(1);
}

if (!VALID_SCREENS.includes(screenName)) {
  console.error(
    `${ANSI_RED}%s${ANSI_RESET}`,
    `Error: Invalid screen name: '${screenName}'.`
  );
  console.log(
    "Please use one of the valid screen names. You can find the list in src/constants/validScreens.js or project documentation."
  );
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, "..");

// Check if the screen actually exists in src/screens directory
const screenPath = path.join(projectRoot, "src", "screens", screenName);
if (!fs.existsSync(screenPath)) {
  console.error(
    `${ANSI_RED}%s${ANSI_RESET}`,
    `Error: Screen directory not found: '${screenName}'.`
  );
  console.log(
    `The screen '${screenName}' doesn't exist in src/screens/ directory.`
  );
  process.exit(1);
}

const distDir = path.join(projectRoot, "dist");

console.log(
  `${ANSI_GREEN}%s${ANSI_RESET}`,
  `Building for screen: ${screenName}...`
);

try {
  // Run the build
  execSync("npm run build", { stdio: "inherit", cwd: projectRoot });

  console.log(
    `${ANSI_GREEN}%s${ANSI_RESET}`,
    `Build completed. Generating local development HTML for screen: ${screenName}...`
  );

  // Find all generated assets
  const assetsDir = path.join(distDir, "assets");

  if (!fs.existsSync(assetsDir)) {
    console.error(
      `${ANSI_RED}%s${ANSI_RESET}`,
      `Error: Assets directory not found at ${assetsDir}.`
    );
    process.exit(1);
  }

  // Function to recursively find files
  const findFiles = (dir, extension) => {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findFiles(fullPath, extension));
      } else if (item.endsWith(extension)) {
        files.push(path.relative(distDir, fullPath));
      }
    }

    return files;
  };

  // Find all CSS and JS files
  const cssFiles = findFiles(assetsDir, ".css");
  const jsFiles = findFiles(assetsDir, ".js");

  console.log(`Found CSS files:`, cssFiles);
  console.log(`Found JS files:`, jsFiles);

  // Generate the local development HTML format
  const generateLocalHTML = (screenName, cssFiles, jsFiles, port) => {
    const baseUrl = `http://localhost:${port}`;

    let html = `<meta name="viewport" content="width=device-width, initial-scale=1">\n`;

    // Add CSS files (should be just one shared style file)
    cssFiles.forEach((cssFile) => {
      html += `<link rel="stylesheet" href="${baseUrl}/${cssFile}">\n`;
    });

    // Find JS files
    const mainFile = jsFiles.find(
      (file) => file.includes("main.") && !file.includes("shared/")
    );
    const reactVendorFile = jsFiles.find((file) =>
      file.includes("shared/react-vendor.")
    );
    const vendorFile = jsFiles.find((file) => file.includes("shared/vendor."));
    const commonFile = jsFiles.find((file) => file.includes("shared/common."));
    const screenFile = jsFiles.find((file) =>
      file.includes(`${screenName}/index.`)
    );

    // Add all script tags
    [reactVendorFile, vendorFile, commonFile, screenFile, mainFile].forEach((file) => {
      if (file) {
        html += `<script src="${baseUrl}/${file}" type="module"></script>\n`;
      }
    });

    return html;
  };

  const localHTML = generateLocalHTML(screenName, cssFiles, jsFiles, port);

  // Output the result
  console.log(
    `${ANSI_YELLOW}%s${ANSI_RESET}`,
    `\nPaste following HTML to Customize authentication screens on Dashboard (screen: ${screenName}):`
  );
  console.log("=====================================");
  console.log(localHTML);
  console.log("=====================================");
} catch (error) {
  console.error(
    `${ANSI_RED}%s${ANSI_RESET}`,
    `Build failed for screen: ${screenName}.`
  );
  console.error(error.message);
  process.exit(1);
}
