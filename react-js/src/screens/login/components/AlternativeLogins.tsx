import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginManager } from "../hooks/useLoginManager";

const AlternativeLogins = () => {
  const { handleFederatedLogin, transaction, locales } = useLoginManager();
  const { alternateConnections } = transaction;

  const handleConnectionLogin = (connection: SocialConnection): void => {
    handleFederatedLogin(connection.name);
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
            onClick={() => handleConnectionLogin(connection)}
          />
        );
      })}
    </div>
  );
};

export default AlternativeLogins;
