import type {
  Connection,
  EnterpriseConnection,
} from "@auth0/auth0-acul-react/types";

import { getIcon } from "./iconUtils";

export type SocialConnection = Connection | EnterpriseConnection;

interface SocialProviderDetails {
  displayName: string;
  iconComponent: React.ReactNode | null;
}

/**
 * Generates a display name for a social connection.
 * Prefers a direct map from connection.name, then falls back to capitalizing it.
 * If name is unavailable, it attempts to use the strategy.
 */
const generateDisplayName = (connection: SocialConnection): string => {
  // Check if it's an EnterpriseConnection with options.displayName
  if ("options" in connection && connection.options?.displayName) {
    return connection.options.displayName;
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
  connection: SocialConnection
): SocialProviderDetails => {
  const displayName = generateDisplayName(connection);
  const iconComponent = getIcon();

  return {
    displayName,
    iconComponent,
  };
};
