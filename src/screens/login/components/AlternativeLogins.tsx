import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginManager } from "../hooks/useLoginManager";

export interface AlternativeLoginsProps {
  connections?: SocialConnection[] | undefined;
}

const AlternativeLogins = ({ connections }: AlternativeLoginsProps) => {
  const { handleFederatedLogin } = useLoginManager();

  return (
    <>
      <div className="space-y-3 mt-2">
        {connections?.map((connection: SocialConnection) => {
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
