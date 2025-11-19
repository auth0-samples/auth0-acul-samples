#!/bin/bash
set -euo pipefail

# Asset Discovery Script
# Discovers and categorizes JS/CSS assets for a specific screen
# Usage: ./discover-assets.sh <screen_name>

SCREEN_NAME="$1"
SCREEN_ASSETS_DIR="dist/assets/$SCREEN_NAME"
SHARED_ASSETS_DIR="dist/assets/shared"
ROOT_ASSETS_DIR="dist/assets"

if [ ! -d "$SCREEN_ASSETS_DIR" ]; then
  echo "::error::Screen directory not found: $SCREEN_ASSETS_DIR"
  exit 1
fi

ALL_ASSETS=$(find "dist/assets" -type f \( -name "*.js" -o -name "*.css" \) ! -name "*.map.js" 2>/dev/null | sort)
SCREEN_JS_FILES=(); SHARED_JS_FILES=(); ROOT_JS_FILES=(); SCREEN_CSS_FILES=(); SHARED_CSS_FILES=()

while IFS= read -r file_asset; do 
  if [[ -z "$file_asset" ]]; then continue; fi
  if [[ "$file_asset" == *".js" ]]; then
    if [[ "$file_asset" == "$SCREEN_ASSETS_DIR/"* ]]; then SCREEN_JS_FILES+=("$file_asset")
    elif [[ "$file_asset" == "$SHARED_ASSETS_DIR/"* ]]; then SHARED_JS_FILES+=("$file_asset")
    elif [[ "$file_asset" == "$ROOT_ASSETS_DIR/main."*".js" ]]; then ROOT_JS_FILES+=("$file_asset")
    fi
  elif [[ "$file_asset" == *".css" ]]; then
    if [[ "$file_asset" == "$SCREEN_ASSETS_DIR/"* ]]; then SCREEN_CSS_FILES+=("$file_asset")
    elif [[ "$file_asset" == "$SHARED_ASSETS_DIR/"* ]]; then SHARED_CSS_FILES+=("$file_asset")
    fi
  fi
done <<< "$ALL_ASSETS"

if [ ${#SCREEN_JS_FILES[@]} -eq 0 ]; then
  echo "::error::No JavaScript files found for screen: $SCREEN_NAME"
  exit 1
fi

# Find entry point
SCREEN_ENTRY_FILE=""
for file_js_entry in "${SCREEN_JS_FILES[@]}"; do 
  base_name=$(basename "$file_js_entry")
  if [[ "$base_name" == "index.js" || "$base_name" == "main.js" || "$base_name" == index.*.js || "$base_name" == main.*.js ]]; then
    SCREEN_ENTRY_FILE="$file_js_entry"; break
  fi
done

if [ -z "$SCREEN_ENTRY_FILE" ]; then
  SCREEN_ENTRY_FILE="${SCREEN_JS_FILES[0]}"
fi

# Export for use by calling script
export SCREEN_JS_FILES SHARED_JS_FILES ROOT_JS_FILES SCREEN_CSS_FILES SHARED_CSS_FILES SCREEN_ENTRY_FILE 