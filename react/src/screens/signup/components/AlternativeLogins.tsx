import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useSignupManager } from "../hooks/useSignupManager";

const AlternativeLogins = () => {
  const { alternateConnections, handleFederatedSignup, locales } =
    useSignupManager();

  const handleConnectionSignup = (connection: SocialConnection) => {
    const federatedSignupOptions = {
      connection: connection.name,
      // Include any additional metadata if available
      ...(connection.metadata || {}),
    };

    handleFederatedSignup(federatedSignupOptions);
  };

  // Early return if no connections are available
  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mt-2">
      {alternateConnections.map((connection: SocialConnection) => {
        // Skip connections without valid names
        if (!connection?.name) {
          return null;
        }

        const { displayName, iconComponent } =
          getSocialProviderDetails(connection);
        const socialButtonText = `${locales.social.continueWith} ${displayName}`;

        return (
          <ULThemeSocialProviderButton
            key={connection.name}
            displayName={displayName}
            buttonText={socialButtonText}
            iconComponent={iconComponent}
            onClick={() => handleConnectionSignup(connection)}
          />
        );
      })}
    </div>
  );
};

export default AlternativeLogins;
