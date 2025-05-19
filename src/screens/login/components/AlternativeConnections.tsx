import React from "react";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getIcon } from "@/utils/iconUtils";
import { useLoginManager } from "../hooks/useLoginManager";

const AlternativeConnections: React.FC = () => {
  const { loginInstance, handleSocialLogin } = useLoginManager();
  const alternateConnections = loginInstance?.transaction?.alternateConnections;

  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  return (
    <>
      <Separator text="OR" />
      <div className="space-y-3">
        {alternateConnections.map((connection: any) => (
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

export default AlternativeConnections;
