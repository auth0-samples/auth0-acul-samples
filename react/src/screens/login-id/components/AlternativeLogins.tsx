import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

const AlternativeLogins = () => {
  const {
    handleFederatedLogin,
    handlePasskeyLogin,
    texts,
    isPasskeyEnabled,
    alternateConnections,
  } = useLoginIdManager();

  // Handle text fallbacks in component
  const passkeyButtonText =
    texts?.passkeyButtonText || "Continue with a passkey";

  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  const handleConnectionLogin = (connection: SocialConnection) => {
    const federatedLoginOptions = {
      connection: connection.name,
      ...(connection.metadata || {}),
    };

    handleFederatedLogin(federatedLoginOptions);
  };

  return (
    <>
      <div className="space-y-3 mt-2">
        {isPasskeyEnabled && (
          <ULThemeSocialProviderButton
            key="passkey"
            displayName="Passkey"
            buttonText={passkeyButtonText}
            iconComponent={<span className="text-primary">{getIcon()}</span>}
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {alternateConnections?.map((connection: SocialConnection) => {
          if (!connection?.name) {
            return null;
          }

          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `Continue with ${displayName}`;
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
    </>
  );
};

export default AlternativeLogins;
