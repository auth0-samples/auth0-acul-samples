import { Suspense } from "react";

import { useCurrentScreen } from "@auth0/auth0-acul-react";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const currentScreen = useCurrentScreen();
  const screenName =
    currentScreen?.screen?.name || "login-passwordless-sms-otp";
  const ScreenComponent = getScreenComponent(screenName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen &quot;{screenName}&quot; not implemented yet</div>
      )}
    </Suspense>
  );
};

export default App;
