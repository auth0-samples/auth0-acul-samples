import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginManager } from "../hooks/useLoginManager";

const AlternativeLogins = () => {
  const { locales, alternateConnections, handleFederatedLogin } =
    useLoginManager();

  const handleConnectionLogin = (connection: SocialConnection) => {
    const federatedLoginOptions = {
      connection: connection.name,
      ...(connection.metadata || {}),
    };

    handleFederatedLogin(federatedLoginOptions);
  };

  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mt-2">
      {alternateConnections.map((connection: SocialConnection) => {
        if (!connection?.name) {
          return null;
        }

        const { displayName, iconComponent } =
          getSocialProviderDetails(connection);
        const socialButtonText = `${locales?.alternativeLogins?.continueWithText} ${displayName}`;

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
