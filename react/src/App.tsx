import { Suspense, useEffect, useState } from "react";

import { useCurrentScreen } from "@auth0/auth0-acul-react";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const [screenName, setScreenName] = useState("login-passwordless-sms-otp");
  const currentScreen = useCurrentScreen();

  useEffect(() => {
    if (currentScreen?.screenName !== screenName) {
      setScreenName(currentScreen?.screenName ?? "login-passwordless-sms-otp");
    }
  }, [currentScreen?.screenName, screenName]);

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
