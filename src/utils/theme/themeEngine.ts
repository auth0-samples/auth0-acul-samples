import {
  flattenColors,
  flattenBorders,
  flattenFonts,
  flattenPageBackground,
  flattenWidget,
} from "./themeFlatteners";

let currentThemeCache: Record<string, string> = {};

export function applyAuth0Theme(screenInstance: any): void {
  if (!screenInstance?.branding) {
    return;
  }

  clearThemeCache();
  const themeData = extractThemeData(screenInstance);
  applyThemeVariables(themeData);
}

function extractThemeData(screenInstance: any): Record<string, string> {
  const theme = screenInstance.branding?.themes?.default || {};

  // Precedence order: Settings (lowest) -> Theme (middle) -> Organization (highest)
  const settingsVars = extractSettingsOverrides(screenInstance);
  const themeVars = {
    ...flattenColors(theme.colors || {}),
    ...flattenBorders(theme.borders || {}),
    ...flattenFonts(theme.fonts || {}),
    ...flattenPageBackground(
      theme.pageBackground || theme.page_background || {},
    ),
    ...flattenWidget(theme.widget || {}),
  };
  const organizationVars = extractOrganizationOverrides(screenInstance);

  // Apply in precedence order: Settings -> Theme -> Organization
  return { ...settingsVars, ...themeVars, ...organizationVars };
}

function extractSettingsOverrides(screenInstance: any): Record<string, string> {
  const overrides: Record<string, string> = {};

  // Essential variable mappings for precedence overrides
  const variableMapping = {
    "colors.primary": "--ul-theme-color-primary-button",
    "colors.pageBackground": "--ul-theme-page-bg-background-color",
    logoUrl: "--ul-theme-widget-logo-url",
  };

  const settings = screenInstance?.branding?.settings;
  if (settings) {
    applyMappedOverrides(settings, variableMapping, overrides);
  }

  return overrides;
}

function extractOrganizationOverrides(
  screenInstance: any,
): Record<string, string> {
  const overrides: Record<string, string> = {};

  // Essential variable mappings for precedence overrides
  const variableMapping = {
    "colors.primary": "--ul-theme-color-primary-button",
    "colors.pageBackground": "--ul-theme-page-bg-background-color",
    logoUrl: "--ul-theme-widget-logo-url",
  };

  const org = screenInstance?.organization?.branding;
  if (org) {
    applyMappedOverrides(org, variableMapping, overrides);
  }

  return overrides;
}

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

function applyThemeVariables(newTheme: Record<string, string>): void {
  const changedVars = findChangedVariables(newTheme);

  if (Object.keys(changedVars).length === 0) {
    return;
  }

  updateDOMVariables(changedVars);
  updateThemeCache(changedVars);
}

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
