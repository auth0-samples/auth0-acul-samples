import React from "react";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getIcon } from "@/utils/helpers/iconUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

// No props needed as it uses hooks internally
const AlternativeLogins: React.FC = () => {
  const { loginIdInstance, handleSocialLogin, handlePasskeyLogin, texts } =
    useLoginIdManager();

  const alternateConnections = loginIdInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;
  const isPasskeyAvailable = !!loginIdInstance?.screen?.data?.passkey;

  // Handle text fallbacks in component
  const separatorText = texts?.separatorText || "OR";
  const passkeyButtonText =
    texts?.passkeyButtonText || "Continue with a passkey";

  const showSeparator =
    isPasskeyAvailable ||
    (alternateConnections && alternateConnections.length > 0);

  return (
    <>
      {showSeparator && <Separator text={separatorText} />}

      <div className="space-y-3 mt-4">
        {isPasskeyAvailable && (
          <SocialProviderButton
            key="passkey"
            displayName="Passkey"
            buttonText={passkeyButtonText}
            iconComponent={
              <span className="text-primary">{getIcon("passkey")}</span>
            }
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {alternateConnections?.map((connection) => {
          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `Continue with ${displayName}`;
          return (
            <SocialProviderButton
              key={connection.name}
              displayName={displayName}
              buttonText={socialButtonText}
              iconComponent={iconComponent}
              onClick={() => handleSocialLogin(connection.name)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AlternativeLogins;
