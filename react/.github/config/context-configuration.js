/**
 * Auth0 Universal Login Context Configuration
 * Defines which Auth0 context data is available to custom screens via universal_login_context.
 */

const contextConfig = [
  // Branding and theming
  "branding.settings",
  "branding.themes.default",

  // Screen content
  "screen.texts",

  // The following items are commented out for now - can be enabled as needed:

  // Client information
  // "client.logo_uri",
  // "client.description",
  // "client.metadata.[keyName]",

  // Organization branding (B2B scenarios)
  // "organization.display_name",
  // "organization.branding",
  // "organization.metadata.[keyName]",

  // Tenant information
  // "tenant.name",
  // "tenant.friendly_name",
  // "tenant.enabled_locales",

  // Form and request data (validate on server)
  // "untrusted_data.submitted_form_data",
  // "untrusted_data.authorization_params.ui_locales",
  // "untrusted_data.authorization_params.login_hint",
  // "untrusted_data.authorization_params.screen_hint",
  // "untrusted_data.authorization_params.ext-[keyName]",

  // User information (when available)
  // "user.organizations",
  // "user.app_metadata.[keyName]",
  // "user.user_metadata.[keyName]",
];

export default contextConfig;
