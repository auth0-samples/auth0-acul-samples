import { getIcon } from "./iconUtils";

export interface SocialConnection {
  name: string;
  strategy?: string;
}

interface SocialProviderDetails {
  displayName: string;
  iconComponent: React.ReactNode | null;
}

const nameToDisplayNameMap: Record<string, string> = {
  "google-oauth2": "Google",
  linkedin: "LinkedIn",
  "klarna-social-connection": "Klarna",
  facebook: "Facebook",
  apple: "Apple",
  github: "GitHub",
  twitter: "Twitter",
  microsoft: "Microsoft",
  windowslive: "Microsoft",
  azureadv2: "Microsoft",
  amazon: "Amazon",
  paypal: "PayPal",
  "hugging-face": "Hugging Face",
  digitalocean: "DigitalOcean",
};

/**
 * Generates a display name for a social connection.
 * Prefers a direct map from connection.name, then falls back to capitalizing it.
 * If name is unavailable, it attempts to use the strategy.
 */
const generateDisplayName = (connection: SocialConnection): string => {
  if (connection.name && nameToDisplayNameMap[connection.name]) {
    return nameToDisplayNameMap[connection.name];
  }
  // Fallback to capitalizing the connection.name if not in map
  if (connection.name) {
    return connection.name
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  // Last resort: use strategy if name is totally missing
  if (connection.strategy) {
    return (
      connection.strategy.charAt(0).toUpperCase() + connection.strategy.slice(1)
    );
  }
  return "Login Provider";
};

/**
 * Gets the display details (displayName, iconComponent) for a social connection.
 */
export const getSocialProviderDetails = (
  connection: SocialConnection,
): SocialProviderDetails => {
  const displayName = generateDisplayName(connection);

  const iconComponent =
    getIcon(connection.name) ||
    getIcon(connection.strategy || "default") ||
    null;

  return {
    displayName,
    iconComponent,
  };
};
