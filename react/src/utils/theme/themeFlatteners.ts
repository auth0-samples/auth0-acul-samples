/**
 * This module handles the conversion of Auth0 branding data structures into
 * CSS custom properties (variables) with proper unit conversions and formatting.
 *
 * KEY RESPONSIBILITIES:
 * - Convert Auth0 nested objects to flat CSS variable mappings
 * - Apply proper unit conversions (percentages to rem, numbers to px, etc.)
 * - Handle special formatting for URLs, shadows, and layout values
 * - Maintain consistent naming convention: --ul-theme-{category}-{property}
 *
 * UNIT CONVERSION EXAMPLES:
 * - Font sizes: 150% → 1.5rem, 87.5% → 0.875rem
 * - Font weights: true → 700, false → 400
 * - URLs: "url" → "url" (quoted for CSS)
 *
 * USAGE FLOW:
 * Branding Data from ACUL SDK → Flattener Functions → CSS Variables → DOM Injection
 *
 */

import { applyAuth0Font } from "./fontLoader";

interface ColorData {
  primary_button?: string;
  primary_button_label?: string;
  secondary_button_border?: string;
  secondary_button_label?: string;
  base_focus_color?: string;
  base_hover_color?: string;
  links_focused_components?: string;
  header?: string;
  body_text?: string;
  widget_background?: string;
  widget_border?: string;
  input_labels_placeholders?: string;
  input_filled_text?: string;
  input_border?: string;
  input_background?: string;
  icons?: string;
  error?: string;
  success?: string;
  captcha_widget_theme?: string;
}

interface BorderData {
  button_border_radius?: number;
  buttons_style?: string;
  input_border_radius?: number;
  inputs_style?: string;
  widget_corner_radius?: number;
  button_border_weight?: number;
  input_border_weight?: number;
  widget_border_weight?: number;
  show_widget_shadow?: boolean;
}

interface FontData {
  reference_text_size?: number;
  font_url?: string;
  title?: {
    size?: number;
    bold?: boolean;
  };
  subtitle?: {
    size?: number;
    bold?: boolean;
  };
  body_text?: {
    size?: number;
    bold?: boolean;
  };
  buttons_text?: {
    size?: number;
    bold?: boolean;
  };
  input_labels?: {
    size?: number;
    bold?: boolean;
  };
  links?: {
    size?: number;
    bold?: boolean;
  };
  links_style?: string;
}

interface WidgetData {
  logo_position?: string;
  logo_url?: string;
  logo_height?: number;
  header_text_alignment?: string;
  social_buttons_layout?: string;
}

/**
 * Flatten color data to CSS variables
 */
export function flattenColors(colors: ColorData): Record<string, string> {
  const result: Record<string, string> = {};

  if (colors.primary_button)
    result["--ul-theme-color-primary-button"] = colors.primary_button;
  if (colors.primary_button_label)
    result["--ul-theme-color-primary-button-label"] =
      colors.primary_button_label;
  if (colors.secondary_button_border)
    result["--ul-theme-color-secondary-button-border"] =
      colors.secondary_button_border;
  if (colors.secondary_button_label)
    result["--ul-theme-color-secondary-button-label"] =
      colors.secondary_button_label;
  if (colors.base_focus_color)
    result["--ul-theme-color-base-focus-color"] = colors.base_focus_color;
  if (colors.base_hover_color)
    result["--ul-theme-color-base-hover-color"] = colors.base_hover_color;
  if (colors.links_focused_components)
    result["--ul-theme-color-links-focused-components"] =
      colors.links_focused_components;
  if (colors.header) result["--ul-theme-color-header"] = colors.header;
  if (colors.body_text) result["--ul-theme-color-body-text"] = colors.body_text;
  if (colors.widget_background)
    result["--ul-theme-color-widget-background"] = colors.widget_background;
  if (colors.widget_border)
    result["--ul-theme-color-widget-border"] = colors.widget_border;
  if (colors.input_labels_placeholders)
    result["--ul-theme-color-input-labels-placeholders"] =
      colors.input_labels_placeholders;
  if (colors.input_filled_text)
    result["--ul-theme-color-input-filled-text"] = colors.input_filled_text;
  if (colors.input_border)
    result["--ul-theme-color-input-border"] = colors.input_border;
  if (colors.input_background)
    result["--ul-theme-color-input-background"] = colors.input_background;
  if (colors.icons) result["--ul-theme-color-icons"] = colors.icons;
  if (colors.error) result["--ul-theme-color-error"] = colors.error;
  if (colors.success) result["--ul-theme-color-success"] = colors.success;
  if (colors.captcha_widget_theme)
    result["--ul-theme-color-captcha-widget-theme"] =
      colors.captcha_widget_theme;

  return result;
}

/**
 * Helper function to calculate border radius based on style
 */
function calculateBorderRadius(
  style: string,
  defaultRadius: number | undefined,
  fallbackRadius: number = 10
): number {
  switch (style) {
    case "pill":
      return 9999;
    case "sharp":
      return 0;
    case "rounded":
    default:
      return defaultRadius || fallbackRadius;
  }
}

/**
 * Flatten border data to CSS variables with proper unit conversions
 */
export function flattenBorders(borders: BorderData): Record<string, string> {
  const result: Record<string, string> = {};

  // Calculate border radius values based on style, with automatic assignment
  const buttonBorderRadius = borders.buttons_style
    ? calculateBorderRadius(borders.buttons_style, borders.button_border_radius)
    : borders.button_border_radius;

  const inputBorderRadius = borders.inputs_style
    ? calculateBorderRadius(borders.inputs_style, borders.input_border_radius)
    : borders.input_border_radius;

  if (buttonBorderRadius !== undefined)
    result["--ul-theme-border-button-border-radius"] =
      `${buttonBorderRadius}px`;
  if (inputBorderRadius !== undefined)
    result["--ul-theme-border-input-border-radius"] = `${inputBorderRadius}px`;
  if (borders.widget_corner_radius)
    result["--ul-theme-border-widget-corner-radius"] =
      `${borders.widget_corner_radius}px`;

  // Border weight values need px units
  if (borders.button_border_weight !== undefined)
    result["--ul-theme-border-button-border-weight"] =
      `${borders.button_border_weight}px`;
  if (borders.input_border_weight !== undefined)
    result["--ul-theme-border-input-border-weight"] =
      `${borders.input_border_weight}px`;
  if (borders.widget_border_weight !== undefined)
    result["--ul-theme-border-widget-border-weight"] =
      `${borders.widget_border_weight}px`;

  // Style values are already strings
  if (borders.buttons_style)
    result["--ul-theme-border-buttons-style"] = borders.buttons_style;
  if (borders.inputs_style)
    result["--ul-theme-border-inputs-style"] = borders.inputs_style;

  // Boolean/numeric values for shadow - convert boolean to actual shadow values
  if (borders.show_widget_shadow !== undefined)
    result["--ul-theme-border-show-widget-shadow"] = borders.show_widget_shadow
      ? "0px 12px 40px 0px rgba(0, 0, 0, 0.12)"
      : "none";

  return result;
}

/**
 * Flatten font data to CSS variables with proper unit conversions
 */
export function flattenFonts(fonts: FontData): Record<string, string> {
  const result: Record<string, string> = {};

  // Reference text size is in pixels
  if (fonts.reference_text_size)
    result["--ul-theme-font-reference-text-size"] =
      `${fonts.reference_text_size}px`;

  // Helper function to process font size and weight for each font type
  const processFontType = (
    fontData: { size?: number; bold?: boolean } | undefined,
    fontType: string
  ): void => {
    if (fontData?.size) {
      const sizePercent = fontData.size as number;

      // Universal percentage-based sizing: ALL font types calculate as percentage of reference_text_size
      if (fonts.reference_text_size) {
        const referenceSize = fonts.reference_text_size as number;
        const calculatedSize = (referenceSize * sizePercent) / 100;
        result[`--ul-theme-font-${fontType}-size`] = `${calculatedSize}px`;
      } else {
        // Fallback: convert percentage to rem if no reference size available
        const remValue = sizePercent / 100;
        result[`--ul-theme-font-${fontType}-size`] = `${remValue}rem`;
      }
    }

    if (fontData?.bold !== undefined) {
      result[`--ul-theme-font-${fontType}-weight`] = fontData.bold
        ? "700"
        : "400";
    }
  };

  processFontType(fonts.title, "title");
  processFontType(fonts.subtitle, "subtitle");
  processFontType(fonts.body_text, "body-text");
  processFontType(fonts.buttons_text, "buttons-text");
  processFontType(fonts.input_labels, "input-labels");
  processFontType(fonts.links, "links");

  // Links style (normal/italic)
  if (fonts.links_style)
    result["--ul-theme-font-links-style"] = fonts.links_style;

  // Set Custom Font Size for Lists based on body_text size
  // If body_text size is defined, calculate list font size as (body_text.size + 15) / 100 rem
  if (fonts?.body_text?.size !== undefined) {
    result["--ul-theme-font-list-text-size"] =
      `${(fonts.body_text.size + 15) / 100}rem`;
  }

  // Process Dynamic Font family url via tenant settings (must be a woff2 or woff file)
  if ((fonts as FontData).font_url) {
    applyAuth0Font(fonts.font_url);
  }

  return result;
}

/**
 * Flatten page background data to CSS variables
 */
export function flattenPageBackground(pageBackground: {
  background_color?: string;
  background_image_url?: string;
  page_layout?: string;
}): Record<string, string> {
  const result: Record<string, string> = {};

  if (pageBackground.background_color)
    result["--ul-theme-page-bg-background-color"] =
      pageBackground.background_color;
  if (pageBackground.background_image_url) {
    result["--ul-theme-page-bg-background-image-url"] =
      pageBackground.background_image_url === null ||
      pageBackground.background_image_url === ""
        ? "none"
        : `url("${pageBackground.background_image_url}")`;
  }
  if (pageBackground.page_layout) {
    // Convert to CSS justify-content values for use with arbitrary properties
    const layoutMap: Record<string, string> = {
      center: "center",
      left: "flex-start",
      right: "flex-end",
    };
    result["--ul-theme-page-bg-page-layout"] =
      layoutMap[pageBackground.page_layout] || "center";
  }

  return result;
}

/**
 * Flatten widget data to CSS variables with proper unit conversions
 */
export function flattenWidget(widget: WidgetData): Record<string, string> {
  const result: Record<string, string> = {};

  // Logo Source URL
  if (widget.logo_url)
    result["--ul-theme-widget-logo-url"] = `"${widget.logo_url}"`;

  // Logo height needs px units
  if (widget.logo_height)
    result["--ul-theme-widget-logo-height"] = `${widget.logo_height}px`;

  // Logo position: convert Auth0 values to Tailwind justify values
  if (widget.logo_position) {
    // Convert to Tailwind semantic variable
    const positionMap: Record<string, string> = {
      center: "center",
      left: "flex-start",
      right: "flex-end",
      none: "none",
    };
    result["--ul-theme-widget-logo-position"] =
      positionMap[widget.logo_position] || "center";
  }

  // Header text alignment: convert Auth0 values to CSS text-align values
  if (widget.header_text_alignment) {
    result["--ul-theme-widget-header-text-alignment"] =
      widget.header_text_alignment;

    // Convert to CSS text-align values for use with arbitrary properties
    const alignmentMap: Record<string, string> = {
      center: "center",
      left: "left",
      right: "right",
    };
    result["--text-align-header"] =
      alignmentMap[widget.header_text_alignment] || "center";
  }
  if (widget.social_buttons_layout)
    result["--ul-theme-widget-social-buttons-layout"] =
      widget.social_buttons_layout;

  return result;
}
