import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

export interface AlternativeLoginsProps {
  connections?: SocialConnection[] | undefined;
}

const AlternativeLogins = ({ connections }: AlternativeLoginsProps) => {
  const { handleFederatedLogin, handlePasskeyLogin, texts, isPasskeyEnabled } =
    useLoginIdManager();

  // Handle text fallbacks in component
  const passkeyButtonText =
    texts?.passkeyButtonText || "Continue with a passkey";

  return (
    <>
      <div className="space-y-3 mt-4">
        {isPasskeyEnabled && (
          <ULThemeSocialProviderButton
            key="passkey"
            displayName="Passkey"
            buttonText={passkeyButtonText}
            iconComponent={<span className="text-primary">{getIcon()}</span>}
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {connections?.map((connection: any) => {
          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `Continue with ${displayName}`;
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
