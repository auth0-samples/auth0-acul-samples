/**
 * This module is the main orchestrator for the Auth0 theme system.
 *
 * KEY RESPONSIBILITIES:
 * - Extract theme data from Auth0 screen instances with proper precedence
 * - Coordinate theme flattening and CSS variable generation
 * - Handle precedence system: Organization > Theme > Settings
 *
 * PRECEDENCE SYSTEM:
 * 1. Settings (lowest priority) - screenInstance.branding.settings
 * 2. Theme (medium priority) - screenInstance.branding.themes.default
 * 3. Organization (highest priority) - screenInstance.organization.branding
 *
 * USAGE PATTERN:
 * ```typescript
 * // In any Auth0 screen component
 * import { applyAuth0Theme } from "@/utils/theme";
 *
 * function LoginScreen() {
 *   const { screenInstance } = useScreenManager();
 *   applyAuth0Theme(screenInstance); // Apply theme when screen loads
 *   return <div>...</div>;
 * }
 * ```
 *
 * FLOW:
 * Screen Instance from ACUL SDK → Theme Extraction → Flattening → Change Detection → DOM Update
 */

import {
  flattenColors,
  flattenBorders,
  flattenFonts,
  flattenPageBackground,
  flattenWidget,
} from "./themeFlatteners";

// Cache for performance optimization - tracks current theme state
let currentThemeCache: Record<string, string> = {};

// Essential variable mappings for precedence overrides
// Maps Auth0 data paths to CSS variable names
const PRECEDENCE_VARIABLE_MAPPING = {
  "colors.primary": "--ul-theme-color-primary-button",
  "colors.page_background": "--ul-theme-page-bg-background-color",
  logoUrl: "--ul-theme-widget-logo-url",
} as const;

/**
 * Main theme application function
 * Applies Auth0 branding data as CSS variables with proper precedence
 * USAGE PATTERN:
 * ```typescript
 * // In any Auth0 screen component
 * import { applyAuth0Theme } from "@/utils/theme";
 *
 * function LoginScreen() {
 *   const { screenInstance } = useScreenManager();
 *   applyAuth0Theme(screenInstance); // Apply theme when screen loads
 *   return <div>...</div>;
 * }
 * ```
 */
export function applyAuth0Theme(screenInstance: any): void {
  if (!screenInstance?.branding) {
    return;
  }

  clearThemeCache();
  const themeData = extractThemeData(screenInstance);
  applyThemeVariables(themeData);
}

/**
 * Extracts and merges theme data with precedence handling
 * Precedence order (lowest to highest): Settings -> Theme -> Organization
 */
function extractThemeData(screenInstance: any): Record<string, string> {
  const theme = screenInstance.branding?.themes?.default || {};

  const settingsVars = extractBrandingOverrides(
    screenInstance.branding?.settings,
  );
  const themeVars = extractThemeVariables(theme);
  const organizationVars = extractBrandingOverrides(
    screenInstance.organization?.branding,
  );

  return { ...settingsVars, ...themeVars, ...organizationVars };
}

/**
 * Extracts core theme variables from theme object
 */
function extractThemeVariables(theme: any): Record<string, string> {
  return {
    ...flattenColors(theme.colors || {}),
    ...flattenBorders(theme.borders || {}),
    ...flattenFonts(theme.fonts || {}),
    ...flattenPageBackground(
      theme.pageBackground || theme.page_background || {},
    ),
    ...flattenWidget(theme.widget || {}),
  };
}

/**
 * Extracts branding overrides from settings or organization data
 * Handles both settings and organization sources with the same logic
 */
function extractBrandingOverrides(brandingSource: any): Record<string, string> {
  const overrides: Record<string, string> = {};

  if (brandingSource) {
    applyMappedOverrides(
      brandingSource,
      PRECEDENCE_VARIABLE_MAPPING,
      overrides,
    );
  }

  return overrides;
}

/**
 * Applies mapped overrides from source object to overrides object
 * Handles special formatting for specific CSS variables
 */
function applyMappedOverrides(
  source: any,
  mapping: Record<string, string>,
  overrides: Record<string, string>,
): void {
  Object.entries(mapping).forEach(([authPath, cssVar]) => {
    const value = getNestedValue(source, authPath);
    if (value) {
      // Handle special formatting for specific variables
      if (cssVar === "--ul-theme-widget-logo-url") {
        overrides[cssVar] = `"${value}"`;
      } else if (cssVar === "--ul-theme-widget-logo-height") {
        // Logo height needs px units
        overrides[cssVar] = typeof value === "number" ? `${value}px` : value;
      } else {
        overrides[cssVar] = value;
      }
    }
  });
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Applies theme variables to DOM with performance optimization
 * Only updates variables that have actually changed
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
 * Identifies which variables have changed compared to cache
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
 * Updates CSS custom properties in the DOM
 */
function updateDOMVariables(variables: Record<string, string>): void {
  const documentStyle = document.documentElement.style;

  Object.entries(variables).forEach(([varName, value]) => {
    documentStyle.setProperty(varName, value);
  });
}

function updateThemeCache(changedVars: Record<string, string>): void {
  currentThemeCache = { ...currentThemeCache, ...changedVars };
}

export function clearThemeCache(): void {
  currentThemeCache = {};
}
