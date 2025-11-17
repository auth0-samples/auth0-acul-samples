import { useCurrentScreen } from "@auth0/auth0-acul-react";

import { getScreenComponent } from "@/utils/screen/screenLoader";

/**
 * Production Screen Manager
 * Uses Auth0 React SDK to get current screen from Universal Login context
 */
export default function ProdScreenManager() {
  const screenOptions = useCurrentScreen();
  const screenName = screenOptions?.screen?.name;
  const ScreenComponent = getScreenComponent(screenName);

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
}
