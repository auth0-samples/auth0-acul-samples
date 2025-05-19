import React from "react";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getIcon } from "@/utils/iconUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

// No props needed as it uses hooks internally
const AlternativeLogins: React.FC = () => {
  const { loginIdInstance, handleSocialLogin, handlePasskeyLogin } =
    useLoginIdManager();

  const alternateConnections =
    loginIdInstance?.transaction?.alternateConnections;
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
            providerName={"Passkey"}
            icon={getIcon("passkey")}
            onClick={() => handlePasskeyLogin()}
          />
        )}
        {alternateConnections?.map((connection: any) => (
          <SocialProviderButton
            key={connection.name}
            providerName={
              connection.strategy
                ? connection.strategy?.charAt(0)?.toUpperCase() +
                  connection.strategy?.slice(1)
                : connection.name
            }
            icon={getIcon(connection.name)}
            onClick={() => handleSocialLogin(connection.name)}
          />
        ))}
      </div>
    </>
  );
};

export default AlternativeLogins;
