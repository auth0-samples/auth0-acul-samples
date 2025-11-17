import {
  UniversalLoginContextPanel,
  useUniversalLoginContextSubscription,
} from "@auth0/ul-context-inspector";

import type { UniversalLoginContext } from "@/types/auth0-sdk";
import { getScreenComponent } from "@/utils/screen/screenLoader";

/**
 * Development Screen Manager
 * Uses ul-context-inspector to allow runtime context manipulation and debugging
 */
export default function DevScreenManager() {
  const context = useUniversalLoginContextSubscription();
  const screenName = (context as UniversalLoginContext)?.screen?.name;
  const ScreenComponent = getScreenComponent(screenName);

  const renderContent = () => {
    if (!screenName) {
      return null;
    }

    if (ScreenComponent) {
      return <ScreenComponent key={screenName} />;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <p className="text-lg text-gray-600">
            Screen &quot;{screenName}&quot; is not implemented
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <UniversalLoginContextPanel />
      {renderContent()}
    </>
  );
}
