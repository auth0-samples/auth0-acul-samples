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
 * Determines the appropriate label, input type, and autocomplete attribute
 * for an identifier field based on active connection attributes and screen texts.
 *
 * @param connectionAttributes - The connection attributes from the transaction object.
 * @returns An object containing the label, type, and autoComplete string for the identifier field.
 */
export const getIdentifierDetails = (
  connectionAttributes?: IdentifierType[],
): IdentifierDetails => {
  // Initialize with the most common / general defaults
  let finalLabel = "Username or Email Address";
  let finalType = "text";
  let finalAutoComplete: IdentifierType | string = "username";

  if (connectionAttributes) {
    const e = !!connectionAttributes.includes("email");
    const p = !!connectionAttributes.includes("phone");
    const u = !!connectionAttributes.includes("username");

    // Create a key based on active identifiers (e.g., "101" for email & username)
    const key = `${Number(e)}${Number(p)}${Number(u)}`;

    const configMap: Record<string, IdentifierConfig> = {
      "100": {
        // Email only
        labelKey: "emailPlaceholder",
        labelFallback: "Email Address",
        type: "email",
        autoComplete: "email",
      },
      "010": {
        // Phone only
        labelKey: "phonePlaceholder",
        labelFallback: "Phone Number",
        type: "tel",
        autoComplete: "tel",
      },
      "001": {
        // Username only
        labelKey: "usernameOnlyPlaceholder",
        labelFallback: "Username",
        autoComplete: "username", // type is default "text"
      },
      "110": {
        // Email and Phone
        labelKey: "phoneOrEmailPlaceholder",
        labelFallback: "Phone Number or Email Address",
        autoComplete: "username", // Default for mixed input
      },
      "101": {
        // Email and Username
        labelKey: "usernameOrEmailPlaceholder",
        labelFallback: "Username or Email Address",
        autoComplete: "username", // Default for mixed input
      },
      "011": {
        // Phone and Username
        labelKey: "phoneOrUsernamePlaceholder",
        labelFallback: "Phone Number or Username",
        autoComplete: "username", // Default for mixed input
      },
      "111": {
        // All three
        labelKey: "phoneOrUsernameOrEmailPlaceholder",
        labelFallback: "Phone, Username, or Email",
        autoComplete: "username", // Default for mixed input
      },
    };

    const config = configMap[key];

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
