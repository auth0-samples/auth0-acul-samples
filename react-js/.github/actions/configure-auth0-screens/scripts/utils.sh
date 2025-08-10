#!/bin/bash
set -euo pipefail

# Shared utilities for configure-auth0-screens action

# Load JavaScript/ES module and return JSON output
# Usage: load_js_module <file_path> <export_name>
load_js_module() {
  local file_path="$1"
  local export_name="$2"
  
  if [ ! -f "$file_path" ]; then
    echo "::error::[UTILS] File not found: $file_path"
    return 1
  fi
  
  local result
  result=$(node -e "
    import('$(pwd)/$file_path').then(module => {
      console.log(JSON.stringify(module.default || module.$export_name));
    }).catch(err => {
      console.error('Error loading $file_path:', err.message);
      process.exit(1);
    });
  ")
  
  if [ $? -ne 0 ] || [ -z "$result" ]; then
    echo "::error::[UTILS] Failed to load $export_name from $file_path"
    return 1
  fi
  
  echo "$result"
}

# Check if screen is targeted for deployment
# Usage: is_screen_targeted <screen_name> <target_screens_json>
is_screen_targeted() {
  local screen_name="$1"
  local target_screens_json="$2"
  
  echo "$target_screens_json" | jq -e --arg screen "$screen_name" '.[] | select(. == $screen)' > /dev/null
} 