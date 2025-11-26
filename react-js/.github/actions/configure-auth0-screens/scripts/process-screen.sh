#!/bin/bash
set -euo pipefail

# Process Screen Script (Optimized)
# Processes a single screen: settings generation and Auth0 CLI integration
# Usage: ./process-screen.sh <screen_name>

SCREEN_NAME="$1"

# Look up the prompt name for this screen
PROMPT_NAME=$(echo "$SCREEN_TO_PROMPT_MAP" | jq -r --arg screen "$SCREEN_NAME" '.[$screen] // $screen')

if [ "$PROMPT_NAME" == "null" ] || [ -z "$PROMPT_NAME" ]; then
  echo "::warning::No prompt mapping found for screen '$SCREEN_NAME', using screen name as prompt"
  PROMPT_NAME="$SCREEN_NAME"
fi

echo "Processing $SCREEN_NAME → $PROMPT_NAME"

# Discover assets using dedicated script
source ".github/actions/configure-auth0-screens/scripts/discover-assets.sh" "$SCREEN_NAME"

SETTINGS_FILE=$(mktemp settings_XXXXXX.json)
trap 'echo "ERR TRAP: Removing $SETTINGS_FILE due to error processing $SCREEN_NAME"; rm -f "$SETTINGS_FILE"; trap - ERR' ERR

#############################################
# SETTINGS FILE GENERATION
#############################################

JSON_CONTENT=$(jq -n --argjson cfg "$CONTEXT_CONFIG" '{ rendering_mode: "advanced", context_configuration: $cfg, default_head_tags_disabled: false, head_tags: [ { tag: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1" } } ] }')
if [ $? -ne 0 ]; then 
  echo "::error::Failed to create base JSON content for $SCREEN_NAME"
  rm -f "$SETTINGS_FILE"; trap - ERR
  exit 1
fi

# Add CSS files
for css_file in "${SHARED_CSS_FILES[@]}" "${SCREEN_CSS_FILES[@]}"; do 
  css_basename=$(basename "$css_file")
  if [[ ! "$css_basename" =~ ^[^a-zA-Z0-9] ]]; then 
    relative_path="${css_file#dist/}"
    JSON_CONTENT=$(echo "$JSON_CONTENT" | jq --arg url "${CDN_BASE_URL}/${relative_path}" '.head_tags += [{ tag: "link", attributes: { rel: "stylesheet", href: $url } }]')
  fi
done

# Add JS files in correct dependency order: react-vendor → vendor → common → screen-specific → main
# First collect files by type
MAIN_JS_FILE=""
REACT_VENDOR_JS_FILE=""
VENDOR_JS_FILE=""
COMMON_JS_FILE=""

# Find main.js in root assets
for js_file in "${ROOT_JS_FILES[@]}"; do
  js_basename=$(basename "$js_file")
  if [[ "$js_basename" == main.*.js ]]; then
    MAIN_JS_FILE="$js_file"
    break
  fi
done

# Find react-vendor, vendor, and common in shared assets
for js_file in "${SHARED_JS_FILES[@]}"; do
  js_basename=$(basename "$js_file")
  if [[ "$js_basename" == react-vendor.*.js ]]; then
    REACT_VENDOR_JS_FILE="$js_file"
  elif [[ "$js_basename" == vendor.*.js ]]; then
    VENDOR_JS_FILE="$js_file"
  elif [[ "$js_basename" == common.*.js ]]; then
    COMMON_JS_FILE="$js_file"
  fi
done

# Add scripts in dependency order: react-vendor → vendor → common → screen entry → main
for js_file in "$REACT_VENDOR_JS_FILE" "$VENDOR_JS_FILE" "$COMMON_JS_FILE" "$SCREEN_ENTRY_FILE" "$MAIN_JS_FILE"; do
  if [ -z "$js_file" ]; then continue; fi
  js_basename=$(basename "$js_file")
  if [[ ! "$js_basename" =~ ^[^a-zA-Z0-9] ]]; then 
    relative_path="${js_file#dist/}"
    JSON_CONTENT=$(echo "$JSON_CONTENT" | jq --arg url "${CDN_BASE_URL}/${relative_path}" '.head_tags += [{ tag: "script", attributes: { src: $url, type: "module" } }]')
  fi
done

echo "$JSON_CONTENT" > "$SETTINGS_FILE" || {
  echo "::error::Failed to write settings file for $SCREEN_NAME"
  rm -f "$SETTINGS_FILE"; trap - ERR
  exit 1
}

echo "Settings for $SCREEN_NAME:"
cat "$SETTINGS_FILE"

#############################################
# AUTH0 CLI INTEGRATION
#############################################

if ! command -v auth0 &> /dev/null; then 
  echo "::error::auth0 CLI not found"
  rm -f "$SETTINGS_FILE"; trap - ERR
  exit 1
fi

AUTH0_OUTPUT="" 
AUTH0_EXIT_CODE=0
set +e 
AUTH0_OUTPUT=$(auth0 ul customize --rendering-mode advanced --prompt "$PROMPT_NAME" --screen "$SCREEN_NAME" --settings-file "$SETTINGS_FILE" 2>&1)
AUTH0_EXIT_CODE=$?
set -e 

if [ $AUTH0_EXIT_CODE -eq 0 ]; then
  echo "✅ Successfully configured: $SCREEN_NAME"
  rm -f "$SETTINGS_FILE"; trap - ERR
  exit 0
else
  echo "::error::Failed to configure $PROMPT_NAME for screen $SCREEN_NAME (Exit Code: $AUTH0_EXIT_CODE)"
  echo "$AUTH0_OUTPUT"
  rm -f "$SETTINGS_FILE"; trap - ERR
  exit 1
fi 