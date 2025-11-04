import { Suspense, useEffect, useState } from "react";

import { getScreenComponent } from "@/utils/screen/screenLoader";

import type { UniversalLoginContext } from "./types/auth0-sdk";

const isDev = import.meta.env.DEV;

// Export async factory function to create the appropriate App component
export default async function createApp() {
  if (isDev) {
    // DEV MODE: Use ul-context-inspector
    const { UniversalLoginContextPanel, useUniversalLoginContextSubscription } =
      await import("ul-context-inspector");

    return () => {
      const context =
        useUniversalLoginContextSubscription<UniversalLoginContext>();
      const screenName = context?.screen?.name;
      const ScreenComponent = getScreenComponent(screenName);

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <UniversalLoginContextPanel />
          {ScreenComponent ? (
            <ScreenComponent />
          ) : (
            <div>Screen &quot;{screenName}&quot; not implemented yet</div>
          )}
        </Suspense>
      );
    };
  } else {
    // PRODUCTION MODE: Use Auth0 JS SDK
    const { getCurrentScreen } = await import("@auth0/auth0-acul-js");

    return () => {
      const [screen, setScreen] = useState<string | undefined>(undefined);

      useEffect(() => {
        const currentScreenDetails = getCurrentScreen();
        if (currentScreenDetails) {
          setScreen(currentScreenDetails);
        }
      }, []);

      const ScreenComponent = getScreenComponent(screen);

      return (
        <Suspense fallback={<div>Loading...</div>}>
          {ScreenComponent ? (
            <ScreenComponent />
          ) : (
            <div>Screen &quot;{screen}&quot; not implemented yet</div>
          )}
        </Suspense>
      );
    };
  }
}
