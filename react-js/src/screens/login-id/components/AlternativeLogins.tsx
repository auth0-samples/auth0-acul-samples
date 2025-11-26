import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

const AlternativeLogins = () => {
  const {
    handleFederatedLogin,
    handlePasskeyLogin,
    screen,
    transaction,
    locales,
  } = useLoginIdManager();
  const { texts } = screen;
  const { isPasskeyEnabled, showPasskeyAutofill, alternateConnections } =
    transaction;

  const connections = alternateConnections as SocialConnection[] | undefined;

  // Handle text fallbacks using locales
  const passkeyButtonText =
    texts?.passkeyButtonText || locales.form.passkeyButton;

  // Only show passkey button if passkeys are enabled AND autofill is NOT active
  // When showPasskeyAutofill is true, passkey selection happens via input autocomplete
  const showPasskeyButton = isPasskeyEnabled && !showPasskeyAutofill;

  return (
    <>
      <div className="space-y-3 mt-2">
        {showPasskeyButton && (
          <ULThemeSocialProviderButton
            key="passkey"
            displayName="Passkey"
            buttonText={passkeyButtonText}
            iconComponent={<span className="text-primary">{getIcon()}</span>}
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {connections?.map((connection: SocialConnection) => {
          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `${locales.social.continueWith} ${displayName}`;
          return (
            <ULThemeSocialProviderButton
              key={connection.name}
              displayName={displayName}
              buttonText={socialButtonText}
              iconComponent={iconComponent}
              onClick={() => handleFederatedLogin(connection.name)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AlternativeLogins;
