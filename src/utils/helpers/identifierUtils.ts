import type { IdentifierType } from "@auth0/auth0-acul-js";

interface IdentifierDetails {
  label: string;
  type: string; // HTML input type
  autoComplete: IdentifierType | string; // Prefer IdentifierType when applicable
}

// Specific keys for placeholder texts for better type safety in the config map
type PlaceholderKey =
  | "usernameOrEmailPlaceholder"
  | "emailPlaceholder"
  | "phonePlaceholder"
  | "usernameOnlyPlaceholder"
  | "phoneOrEmailPlaceholder"
  | "phoneOrUsernamePlaceholder"
  | "phoneOrUsernameOrEmailPlaceholder";

interface IdentifierConfig {
  labelKey: PlaceholderKey;
  labelFallback: string;
  type?: string; // HTML input type
  autoComplete?: IdentifierType | string; // Prefer IdentifierType when applicable
}

/**
 * Helper function to create a descriptive key for identifier combinations
 */
const createIdentifierKey = (
  hasEmail: boolean,
  hasPhone: boolean,
  hasUsername: boolean,
): string => {
  const identifiers = [];
  if (hasEmail) identifiers.push("email");
  if (hasPhone) identifiers.push("phone");
  if (hasUsername) identifiers.push("username");
  return identifiers.join("-");
};

/**
 * Determines the appropriate label, input type, and autocomplete attribute
 * for an identifier field based on active connection attributes and screen texts.
 *
 * @param connectionAttributes - The connection attributes from the transaction object.
 * @param screenTexts - The screen.texts object from Auth0 SDK instance.
 * @returns An object containing the label, type, and autoComplete string for the identifier field.
 */
export const getIdentifierDetails = (
  connectionAttributes?: IdentifierType[],
  screenTexts?: any, // Auth0 screen.texts object
): IdentifierDetails => {
  // Initialize with the most common / general defaults
  let finalLabel =
    screenTexts?.usernameOrEmailPlaceholder || "Username or Email Address";
  let finalType = "text";
  let finalAutoComplete: IdentifierType | string = "username";

  if (connectionAttributes) {
    const hasEmail = connectionAttributes.includes("email");
    const hasPhone = connectionAttributes.includes("phone");
    const hasUsername = connectionAttributes.includes("username");

    // Create a descriptive key based on active identifiers
    const identifierKey = createIdentifierKey(hasEmail, hasPhone, hasUsername);

    const configMap: Record<string, IdentifierConfig> = {
      email: {
        labelKey: "emailPlaceholder",
        labelFallback: screenTexts?.emailPlaceholder || "Email Address",
        type: "email",
        autoComplete: "email",
      },
      phone: {
        labelKey: "phonePlaceholder",
        labelFallback: screenTexts?.phonePlaceholder || "Phone Number",
        type: "tel",
        autoComplete: "tel",
      },
      username: {
        labelKey: "usernameOnlyPlaceholder",
        labelFallback: screenTexts?.usernameOnlyPlaceholder || "Username",
        autoComplete: "username",
      },
      "email-phone": {
        labelKey: "phoneOrEmailPlaceholder",
        labelFallback:
          screenTexts?.phoneOrEmailPlaceholder ||
          "Phone Number or Email Address",
        autoComplete: "username",
      },
      "email-username": {
        labelKey: "usernameOrEmailPlaceholder",
        labelFallback:
          screenTexts?.usernameOrEmailPlaceholder ||
          "Username or Email Address",
        autoComplete: "username",
      },
      "phone-username": {
        labelKey: "phoneOrUsernamePlaceholder",
        labelFallback:
          screenTexts?.phoneOrUsernamePlaceholder || "Phone Number or Username",
        autoComplete: "username",
      },
      "email-phone-username": {
        labelKey: "phoneOrUsernameOrEmailPlaceholder",
        labelFallback:
          screenTexts?.phoneOrUsernameOrEmailPlaceholder ||
          "Phone, Username, or Email",
        autoComplete: "username",
      },
    };

    const config = configMap[identifierKey];

    if (config) {
      finalLabel = config.labelFallback;
      if (config.type) {
        finalType = config.type;
      }
      if (config.autoComplete) {
        finalAutoComplete = config.autoComplete;
      }
    }
  }

  // Append asterisk for required field indication, common pattern
  if (!finalLabel.endsWith("*")) {
    finalLabel += "*";
  }

  return {
    label: finalLabel,
    type: finalType,
    autoComplete: finalAutoComplete,
  };
};
