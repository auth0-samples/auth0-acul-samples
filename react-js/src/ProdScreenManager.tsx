import { useEffect, useState } from "react";

import { getCurrentScreen } from "@auth0/auth0-acul-js";

import { getScreenComponent } from "@/utils/screen/screenLoader";

/**
 * Production Screen Manager (JS SDK)
 * Uses Auth0 JS SDK to get current screen from Universal Login context
 */
export default function ProdScreenManager() {
  const [screen, setScreen] = useState<string | undefined>(undefined);

  useEffect(() => {
    const currentScreenDetails = getCurrentScreen();
    if (currentScreenDetails) {
      setScreen(currentScreenDetails);
    }
  }, []);

  const ScreenComponent = getScreenComponent(screen);

  if (!screen) {
    return null;
  }

  if (ScreenComponent) {
    return <ScreenComponent />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">
          Screen &quot;{screen}&quot; is not implemented
        </p>
      </div>
    </div>
  );
}
