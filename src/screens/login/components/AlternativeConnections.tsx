import React from "react";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getSocialProviderDetails } from "@/utils/socialUtils";
import type { SocialConnection } from "@/utils/socialUtils";
import { useLoginManager } from "../hooks/useLoginManager";

const AlternativeConnections: React.FC = () => {
  const { loginInstance, handleSocialLogin } = useLoginManager();
  const alternateConnections = loginInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;

  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  return (
    <>
      <Separator text="OR" />
      <div className="space-y-3 mt-4">
        {alternateConnections.map((connection) => {
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

export default AlternativeConnections;
