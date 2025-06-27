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

/**
 * Flatten color data to CSS variables
 */
export function flattenColors(colors: any): Record<string, string> {
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
 * Flatten border data to CSS variables with proper unit conversions
 */
export function flattenBorders(borders: any): Record<string, string> {
  const result: Record<string, string> = {};

  // Border radius values need px units
  if (borders.button_border_radius)
    result["--ul-theme-border-button-border-radius"] =
      `${borders.button_border_radius}px`;
  if (borders.input_border_radius)
    result["--ul-theme-border-input-border-radius"] =
      `${borders.input_border_radius}px`;
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
      ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      : "none";

  return result;
}

/**
 * Flatten font data to CSS variables with proper unit conversions
 */
export function flattenFonts(fonts: any): Record<string, string> {
  const result: Record<string, string> = {};

  // Reference text size is in pixels
  if (fonts.reference_text_size)
    result["--ul-theme-font-reference-text-size"] =
      `${fonts.reference_text_size}px`;

  // Helper function to process font size and weight for each font type
  const processFontType = (fontData: any, fontType: string): void => {
    if (fontData?.size) {
      const sizePercent = fontData.size as number;
      const remValue = sizePercent / 100;
      result[`--ul-theme-font-${fontType}-size`] = `${remValue}rem`;
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

  return result;
}

/**
 * Flatten page background data to CSS variables
 */
export function flattenPageBackground(
  pageBackground: any,
): Record<string, string> {
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
    result["--ul-theme-page-bg-page-layout"] = pageBackground.page_layout;

    // Convert to CSS justify-content values for use with arbitrary properties
    const layoutMap: Record<string, string> = {
      center: "center",
      left: "flex-start",
      right: "flex-end",
    };
    result["--justify-page-layout"] =
      layoutMap[pageBackground.page_layout] || "center";
  }

  return result;
}

/**
 * Flatten widget data to CSS variables with proper unit conversions
 */
export function flattenWidget(widget: any): Record<string, string> {
  const result: Record<string, string> = {};

  // Logo position: convert Auth0 values to Tailwind justify values
  if (widget.logo_position) {
    result["--ul-theme-widget-logo-position"] = widget.logo_position;

    // Convert to Tailwind semantic variable
    const positionMap: Record<string, string> = {
      center: "center",
      left: "flex-start",
      right: "flex-end",
      none: "none",
    };
    result["--justify-widget-logo"] =
      positionMap[widget.logo_position] || "center";
  }
  if (widget.logo_url)
    result["--ul-theme-widget-logo-url"] = `"${widget.logo_url}"`;

  // Logo height needs px units
  if (widget.logo_height)
    result["--ul-theme-widget-logo-height"] = `${widget.logo_height}px`;

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
