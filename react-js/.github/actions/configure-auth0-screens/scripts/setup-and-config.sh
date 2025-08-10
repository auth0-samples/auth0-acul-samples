#!/bin/bash
set -euo pipefail

# Setup and Configuration Script (Optimized)
# Loads configurations, validates environment, and reads deployment config

source ".github/actions/configure-auth0-screens/scripts/utils.sh"

#############################################
# LOAD CONFIGURATIONS
#############################################

SCREEN_TO_PROMPT_MAP=$(load_js_module ".github/config/screen-to-prompt-mapping.js" "screenToPromptMap")
export SCREEN_TO_PROMPT_MAP

CONTEXT_CONFIG=$(load_js_module ".github/config/context-configuration.js" "contextConfig")
export CONTEXT_CONFIG

#############################################
# VALIDATE ENVIRONMENT
#############################################

CDN_BASE_URL="${CDN_URL}"
if [ -z "$CDN_BASE_URL" ]; then
  echo "::error::[SETUP] CDN_URL input is not set."
  exit 1
fi

if [[ "$CDN_BASE_URL" == */ ]]; then
   echo "::warning::[SETUP] CDN_URL ends with a slash. Removing it: $CDN_BASE_URL"
   CDN_BASE_URL=${CDN_BASE_URL%/}
fi

if [ ! -d "dist" ] || [ ! -d "dist/assets" ]; then
  echo "::error::[SETUP] Required dist/assets directory does not exist!"
  exit 1
fi

export CDN_BASE_URL

#############################################
# READ DEPLOYMENT CONFIGURATION
#############################################

TARGET_SCREENS_FROM_CONFIG_JSON="[]" 

if [[ -f "$DEPLOY_CONFIG_PATH" ]]; then
  TEMP_CONFIG_JSON=$(yq eval '.default_screen_deployment_status | to_entries | map(select(.value == true) | .key)' "$DEPLOY_CONFIG_PATH" -o json | jq -c '.' || echo "[]")
  if [[ -n "$TEMP_CONFIG_JSON" && "$TEMP_CONFIG_JSON" != "null" && "$TEMP_CONFIG_JSON" != "[]" ]]; then
    TARGET_SCREENS_FROM_CONFIG_JSON="$TEMP_CONFIG_JSON"
    echo "Screens targeted for deployment: $TARGET_SCREENS_FROM_CONFIG_JSON"
  else
    echo "No screens marked for deployment in $DEPLOY_CONFIG_PATH"
  fi
else
  echo "::warning::$DEPLOY_CONFIG_PATH not found. No screens will be deployed."
fi

if [[ "$TARGET_SCREENS_FROM_CONFIG_JSON" == "[]" ]]; then
  echo "No screens are targeted for deployment."
fi

export TARGET_SCREENS_FROM_CONFIG_JSON 