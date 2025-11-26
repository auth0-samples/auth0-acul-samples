import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

const AlternativeLogins = () => {
  const {
    texts,
    locales,
    isPasskeyEnabled,
    showPasskeyAutofill,
    alternateConnections,
    handleFederatedLogin,
    handlePasskeyLogin,
  } = useLoginIdManager();

  // Handle text fallbacks in component
  const passkeyButtonText =
    texts?.passkeyButtonText || locales?.alternativeLogins?.passkeyButtonText;

  const handleConnectionLogin = (connection: SocialConnection) => {
    const federatedLoginOptions = {
      connection: connection.name,
      ...(connection.metadata || {}),
    };

    handleFederatedLogin(federatedLoginOptions);
  };

  // Only show passkey button if passkeys are enabled AND autofill is NOT active
  // When showPasskeyAutofill is true, passkey selection happens via input autocomplete
  const showPasskeyButton = isPasskeyEnabled && !showPasskeyAutofill;

  return (
    <>
      <div className="space-y-3 mt-2">
        {showPasskeyButton && (
          <ULThemeSocialProviderButton
            key="passkey"
            displayName={locales?.alternativeLogins?.passkeyLabel}
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
    </>
  );
};

export default AlternativeLogins;
