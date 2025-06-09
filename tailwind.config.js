/** @type {import('tailwindcss').Config} */

// Theme color mappings to CSS variables
const themeColors = {
  "primary-button": "var(--ul-theme-color-primary-button)",
  "primary-button-label": "var(--ul-theme-color-primary-button-label)",
  "secondary-button-border": "var(--ul-theme-color-secondary-button-border)",
  "secondary-button-label": "var(--ul-theme-color-secondary-button-label)",
  "base-focus-color": "var(--ul-theme-color-base-focus-color)",
  "base-hover-color": "var(--ul-theme-color-base-hover-color)",
  "links-focused-components": "var(--ul-theme-color-links-focused-components)",
  header: "var(--ul-theme-color-header)",
  "body-text": "var(--ul-theme-color-body-text)",
  "widget-background": "var(--ul-theme-color-widget-background)",
  "widget-border": "var(--ul-theme-color-widget-border)",
  "input-labels-placeholders":
    "var(--ul-theme-color-input-labels-placeholders)",
  "input-filled-text": "var(--ul-theme-color-input-filled-text)",
  "input-border": "var(--ul-theme-color-input-border)",
  "input-background": "var(--ul-theme-color-input-background)",
  icons: "var(--ul-theme-color-icons)",
  error: "var(--ul-theme-color-error)",
  success: "var(--ul-theme-color-success)",

  // Legacy color mappings for backward compatibility
  primary: "var(--color-primary)",
  link: "var(--color-link)",
  warning: "var(--color-warning)",
  "text-default": "var(--color-text-default)",
  "text-secondary": "var(--color-text-secondary)",
  "background-page": "var(--color-background-page)",
  "background-widget": "var(--color-background-widget)",
  "gray-mid": "var(--color-gray-mid)",
  "gray-darkest": "var(--color-gray-darkest)",
};

const themeBorderRadius = {
  button: "var(--ul-theme-border-button-border-radius)",
  input: "var(--ul-theme-border-input-border-radius)",
  widget: "var(--ul-theme-border-widget-corner-radius)",
  DEFAULT: "var(--ul-theme-border-button-border-radius)",
};

const themeBorderWidth = {
  button: "var(--ul-theme-border-button-border-weight)",
  input: "var(--ul-theme-border-input-border-weight)",
  widget: "var(--ul-theme-border-widget-border-weight)",
  DEFAULT: "var(--ul-theme-border-button-border-weight)",
};

const themeFontSize = {
  title: "var(--ul-theme-font-title-size)",
  subtitle: "var(--ul-theme-font-subtitle-size)",
  "body-text": "var(--ul-theme-font-body-text-size)",
  "buttons-text": "var(--ul-theme-font-buttons-text-size)",
  "input-labels": "var(--ul-theme-font-input-labels-size)",
  links: "var(--ul-theme-font-links-size)",
  reference: "var(--ul-theme-font-reference-text-size)",
};

const themeFontWeight = {
  title: "var(--ul-theme-font-title-weight)",
  subtitle: "var(--ul-theme-font-subtitle-weight)",
  "body-text": "var(--ul-theme-font-body-text-weight)",
  "buttons-text": "var(--ul-theme-font-buttons-text-weight)",
  "input-labels": "var(--ul-theme-font-input-labels-weight)",
  links: "var(--ul-theme-font-links-weight)",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: themeColors,
      borderRadius: themeBorderRadius,
      borderWidth: themeBorderWidth,
      fontSize: themeFontSize,
      fontWeight: themeFontWeight,
    },
  },
  plugins: [],
};
