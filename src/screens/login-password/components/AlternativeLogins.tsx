import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

export interface AlternativeLoginsProps {
  connections?: SocialConnection[] | undefined;
}

const AlternativeLogins = ({ connections }: AlternativeLoginsProps) => {
  const { handleFederatedLogin } = useLoginPasswordManager();

  return (
    <>
      <div className="space-y-3 mt-4">
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
