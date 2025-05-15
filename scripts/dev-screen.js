import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import VALID_SCREENS from "../src/constants/validScreens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenName = process.argv[2];

if (!screenName) {
  console.error("\x1b[31m%s\x1b[0m", "Error: No screen name provided.");
  console.log("Usage: npm run screen <screen-name>");
  process.exit(1);
}

if (!VALID_SCREENS.includes(screenName)) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Error: Invalid screen name: '${screenName}'.`,
  );
  console.log(
    "Please use one of the valid screen names. You can find the list in src/constants/validScreens.js or project documentation.",
  );
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, "..");
const mockDataPath = path.join(
  projectRoot,
  "src",
  "mock-data",
  `${screenName}.json`,
);

if (!fs.existsSync(mockDataPath)) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Error: Mock data file not found for screen '${screenName}'.`,
  );
  console.log(
    `Please create '${screenName}.json' in the 'src/mock-data/' directory.`,
  );
  process.exit(1);
}

process.env.VITE_SCREEN_NAME = screenName;

console.log(
  "\x1b[32m%s\x1b[0m",
  `Starting Vite dev server for screen: ${screenName}...`,
);

try {
  execSync("vite", { stdio: "inherit" });
} catch (error) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Vite server failed to start or exited with an error for screen: ${screenName}.`,
  );
  process.exit(1);
}
