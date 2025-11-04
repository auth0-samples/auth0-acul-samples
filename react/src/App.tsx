import { Suspense } from "react";

import type { UniversalLoginContext } from "@/types/auth0-sdk";
import { getScreenComponent } from "@/utils/screen/screenLoader";

const isDev = import.meta.env.DEV;

// Export async factory function to create the appropriate App component
export default async function createApp() {
  if (isDev) {
    // DEV MODE: Use ul-context-inspector
    const { UniversalLoginContextPanel, useUniversalLoginContextSubscription } =
      await import("ul-context-inspector");

    return () => {
      const context = useUniversalLoginContextSubscription();
      const screenName = (context as UniversalLoginContext)?.screen?.name;
      const ScreenComponent = getScreenComponent(screenName);

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <UniversalLoginContextPanel />
          {ScreenComponent ? (
            <ScreenComponent key={screenName} />
          ) : (
            <div>Screen &quot;{screenName}&quot; not implemented yet</div>
          )}
        </Suspense>
      );
    };
  } else {
    // PRODUCTION MODE: Use Auth0 React SDK
    const { useCurrentScreen } = await import("@auth0/auth0-acul-react");

    return () => {
      const screenOptions = useCurrentScreen();
      const screenName = screenOptions?.screen?.name;
      const ScreenComponent = getScreenComponent(screenName);

      return (
        <Suspense fallback={<div>Loading...</div>}>
          {ScreenComponent ? (
            <ScreenComponent key={screenName} />
          ) : (
            <div>Screen &quot;{screenName}&quot; not implemented yet</div>
          )}
        </Suspense>
      );
    };
  }
}
