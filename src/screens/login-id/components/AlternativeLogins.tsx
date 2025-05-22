import React from "react";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getSocialProviderDetails } from "@/utils/socialUtils";
import type { SocialConnection } from "@/utils/socialUtils";
import { getIcon } from "@/utils/iconUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

// No props needed as it uses hooks internally
const AlternativeLogins: React.FC = () => {
  const { loginIdInstance, handleSocialLogin, handlePasskeyLogin } =
    useLoginIdManager();

  const alternateConnections = loginIdInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;
  const isPasskeyAvailable = !!loginIdInstance?.screen?.data?.passkey;

  const showSeparator =
    isPasskeyAvailable ||
    (alternateConnections && alternateConnections.length > 0);

  return (
    <>
      {showSeparator && <Separator text={"OR"} />}

      <div className="space-y-3 mt-4">
        {isPasskeyAvailable && (
          <SocialProviderButton
            key="passkey"
            displayName={"Passkey"}
            iconComponent={getIcon("passkey")}
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {alternateConnections?.map((connection) => {
          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          return (
            <SocialProviderButton
              key={connection.name}
              displayName={displayName}
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
