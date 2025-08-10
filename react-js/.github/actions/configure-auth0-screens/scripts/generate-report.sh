#!/bin/bash
set -euo pipefail

# Generate Report Script  
# Generates deployment summary table and final status messages for targeted screens
# Usage: ./generate-report.sh

source ".github/actions/configure-auth0-screens/scripts/utils.sh"

#############################################
# COLLECT RESULTS
#############################################

# Convert JSON arrays back to bash arrays
SUCCESS_SCREENS=()
FAILED_SCREENS=()

# convert JSON to arrays
if [[ "$SUCCESS_SCREENS_JSON" != "[]" ]] && [[ "$SUCCESS_SCREENS_JSON" != "null" ]]; then
  while IFS= read -r screen; do
    if [[ -n "$screen" ]]; then
      SUCCESS_SCREENS+=("$screen")
    fi
  done < <(echo "$SUCCESS_SCREENS_JSON" | jq -r '.[]?' 2>/dev/null || true)
fi

if [[ "$FAILED_SCREENS_JSON" != "[]" ]] && [[ "$FAILED_SCREENS_JSON" != "null" ]]; then
  while IFS= read -r screen; do
    if [[ -n "$screen" ]]; then
      FAILED_SCREENS+=("$screen")
    fi
  done < <(echo "$FAILED_SCREENS_JSON" | jq -r '.[]?' 2>/dev/null || true)
fi

if [ ${#SUCCESS_SCREENS[@]} -eq 0 ]; then
  deployed_screens_output="None"
else
  deployed_screens_output=$(IFS=,; echo "${SUCCESS_SCREENS[*]}")
fi

if [ ${#FAILED_SCREENS[@]} -eq 0 ]; then
  failed_screens_output="None"
else
  failed_screens_output=$(IFS=,; echo "${FAILED_SCREENS[*]}")
fi

#############################################
# GENERATE SUMMARY TABLE
#############################################

echo "Auth0 ACUL Deployment Summary"
echo "┌────────────────┬────────────┐"
echo "│ Screen         │ Status     │"
echo "├────────────────┼────────────┤"

# Show status for each targeted screen
TARGETED_SCREENS_ARRAY=()
while IFS= read -r screen; do
  if [[ -n "$screen" ]]; then
    TARGETED_SCREENS_ARRAY+=("$screen")
  fi
done < <(echo "$TARGETED_SCREENS_JSON" | jq -r '.[]?' 2>/dev/null || true)

for screen_item in "${TARGETED_SCREENS_ARRAY[@]}"; do
  status_string="❓ Unknown"
  
  # Check if screen was successful
  is_success=false
  for s_screen in "${SUCCESS_SCREENS[@]}"; do 
    if [[ "$s_screen" == "$screen_item" ]]; then 
      is_success=true; break
    fi
  done
  
  # Check if screen failed
  is_failed=false
  for f_screen in "${FAILED_SCREENS[@]}"; do 
    if [[ "$f_screen" == "$screen_item" ]]; then 
      is_failed=true; break
    fi
  done

  if [[ "$is_success" == true ]]; then
    status_string="✅ Success"
  elif [[ "$is_failed" == true ]]; then
    status_string="❌ Failed"
  fi
  
  printf "│ %-14s │ %-7s │\n" "$screen_item" "$status_string"
done

echo "└────────────────┴────────────┘"

echo "deployed_screens=${deployed_screens_output}" >> $GITHUB_OUTPUT
echo "failed_screens=${failed_screens_output}" >> $GITHUB_OUTPUT

#############################################
# FINAL STATUS LOGIC
#############################################

if [ ${#FAILED_SCREENS[@]} -gt 0 ]; then
  if [ ${#SUCCESS_SCREENS[@]} -eq 0 ]; then
    echo "::error::All targeted screens failed to configure."
    exit 1
  else
    echo "::warning::Some targeted screens failed, but at least one succeeded."
    exit 1 
  fi
elif [ ${#SUCCESS_SCREENS[@]} -eq 0 ] && [ ${#TARGETED_SCREENS_ARRAY[@]} -gt 0 ]; then
  echo "::error::No screens were successfully configured out of the targeted screens."
  exit 1
else
  echo "✅ All targeted screens configured successfully."
fi 