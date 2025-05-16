import fs from "fs";
import path from "path";
import VALID_SCREENS from "../src/constants/validScreens.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataRootDir = path.join(__dirname, "..", "src", "mock-data");

const screenNameArg = process.argv[2];

if (!screenNameArg) {
  console.error("ERROR: No screen name provided for validation.");
  process.exit(1);
}

console.log(
  `Validating screen name and mock data file for: ${screenNameArg}...`,
);

const validScreenSet = new Set(VALID_SCREENS);

if (!validScreenSet.has(screenNameArg)) {
  console.error(
    `ERROR: Invalid screen name provided: '${screenNameArg}'. It\'s not in the list of VALID_SCREENS.`,
  );
  process.exit(1);
}

const mockFilePath = path.join(mockDataRootDir, `${screenNameArg}.json`);

if (!fs.existsSync(mockFilePath)) {
  console.error(
    `ERROR: Mock data file not found for screen '${screenNameArg}'. Expected at: ${mockFilePath}`,
  );
  process.exit(1);
}

console.log(
  `Screen name '${screenNameArg}' and its mock data file '${screenNameArg}.json' are valid. ✅`,
);
process.exit(0);
