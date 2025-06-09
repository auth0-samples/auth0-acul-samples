import {
  flattenColors,
  flattenBorders,
  flattenFonts,
  flattenPageBackground,
  flattenWidget,
} from "./themeFlatteners";

// Cache to avoid unnecessary DOM updates
let currentThemeCache: Record<string, string> = {};

/**
 * Apply Auth0 theme from SDK screen instance
 * Main entry point for theme application
 */
export function applyAuth0Theme(screenInstance: any): void {
  if (!screenInstance?.branding?.themes?.default) {
    console.warn("Auth0 theme data not found in screen instance");
    return;
  }

  const themeData = extractThemeData(screenInstance);
  applyThemeVariables(themeData);
}

/**
 * Extract theme data from the screen instance
 */
function extractThemeData(screenInstance: any): Record<string, string> {
  const theme = screenInstance.branding.themes.default;

  const baseThemeVars = {
    ...flattenColors(theme.colors || {}),
    ...flattenBorders(theme.borders || {}),
    ...flattenFonts(theme.fonts || {}),
    ...flattenPageBackground(theme.page_background || {}),
    ...flattenWidget(theme.widget || {}),
  };

  // Apply precedence overrides (Organization > Settings > Theme)
  const overrideVars = extractPrecedenceOverrides(screenInstance);

  return { ...baseThemeVars, ...overrideVars };
}

function extractPrecedenceOverrides(
  screenInstance: any,
): Record<string, string> {
  const overrides: Record<string, string> = {};

  const variableMapping = {
    "colors.primary": "--ul-theme-color-primary-button",
    "colors.pageBackground": "--ul-theme-page-bg-background-color",
    logoUrl: "--ul-theme-widget-logo-url",
  };

  // Apply settings level (medium precedence)
  const settings = screenInstance?.branding?.settings;
  if (settings) {
    applyMappedOverrides(settings, variableMapping, overrides);
  }

  // Apply organization level (highest precedence)
  const org = screenInstance?.organization?.branding;
  if (org) {
    applyMappedOverrides(org, variableMapping, overrides);
  }

  return overrides;
}

/**
 * Apply the mapped overrides to the overrides object
 */
function applyMappedOverrides(
  source: any,
  mapping: Record<string, string>,
  overrides: Record<string, string>,
): void {
  Object.entries(mapping).forEach(([authPath, cssVar]) => {
    const value = getNestedValue(source, authPath);
    if (value) {
      overrides[cssVar] = value;
    }
  });
}

/**
 * Get a nested value from an object using a dot-separated path
 */
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Apply the theme variables to the DOM
 */
function applyThemeVariables(newTheme: Record<string, string>): void {
  const changedVars = findChangedVariables(newTheme);

  if (Object.keys(changedVars).length === 0) {
    return;
  }

  updateDOMVariables(changedVars);
  updateThemeCache(changedVars);
}

/**
 * Find variables that actually changed compared to cache
 */
function findChangedVariables(
  newTheme: Record<string, string>,
): Record<string, string> {
  const changed: Record<string, string> = {};

  Object.entries(newTheme).forEach(([varName, value]) => {
    if (currentThemeCache[varName] !== value) {
      changed[varName] = value;
    }
  });

  return changed;
}

/**
 * Update DOM with CSS variables using batched operations
 */
function updateDOMVariables(variables: Record<string, string>): void {
  requestAnimationFrame(() => {
    const documentStyle = document.documentElement.style;

    Object.entries(variables).forEach(([varName, value]) => {
      documentStyle.setProperty(varName, value);
    });
  });
}

/**
 * Update the theme cache with the new variables
 */
function updateThemeCache(changedVars: Record<string, string>): void {
  currentThemeCache = { ...currentThemeCache, ...changedVars };
}

/**
 * Clear the theme cache
 */
export function clearThemeCache(): void {
  currentThemeCache = {};
}
