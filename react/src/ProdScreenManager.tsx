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

  return ScreenComponent ? (
    <ScreenComponent key={screenName} />
  ) : (
    <div>Screen &quot;{screenName}&quot; not implemented yet</div>
  );
}
