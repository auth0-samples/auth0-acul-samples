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
  const { isPasskeyEnabled, alternateConnections } = transaction;

  const connections = alternateConnections as SocialConnection[] | undefined;

  // Handle text fallbacks using locales
  const passkeyButtonText =
    texts?.passkeyButtonText || locales.form.passkeyButton;

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
