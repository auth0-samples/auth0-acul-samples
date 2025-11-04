import {
  UniversalLoginContextPanel,
  useUniversalLoginContextSubscription,
} from "ul-context-inspector";

import { getScreenComponent } from "@/utils/screen/screenLoader";

import type { UniversalLoginContext } from "./types/auth0-sdk";

/**
 * Development Screen Manager (JS SDK)
 * Uses ul-context-inspector to allow runtime context manipulation and debugging
 */
export default function DevScreenManager() {
  const context = useUniversalLoginContextSubscription<UniversalLoginContext>();
  const screenName = context?.screen?.name;
  const ScreenComponent = getScreenComponent(screenName);

  return (
    <>
      <UniversalLoginContextPanel />
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen &quot;{screenName}&quot; not implemented yet</div>
      )}
    </>
  );
}
