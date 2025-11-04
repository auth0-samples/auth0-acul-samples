import {
  UniversalLoginContextPanel,
  useUniversalLoginContextSubscription,
} from "ul-context-inspector";

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

  return (
    <>
      <UniversalLoginContextPanel />
      {ScreenComponent ? (
        <ScreenComponent key={screenName} />
      ) : (
        <div>Screen &quot;{screenName}&quot; not implemented yet</div>
      )}
    </>
  );
}
