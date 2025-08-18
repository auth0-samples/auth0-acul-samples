import { Suspense, useEffect, useState } from "react";

import { getCurrentScreen } from "@auth0/auth0-acul-js";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const [screen, setScreen] = useState({ screenName: "login-id" });

  useEffect(() => {
    const currentScreenDetails = getCurrentScreen();
    if (currentScreenDetails.screenName) {
      setScreen(currentScreenDetails as { screenName: string });
    }
  }, []);

  const ScreenComponent = getScreenComponent(screen.screenName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen &quot;{screen.screenName}&quot; not implemented yet</div>
      )}
    </Suspense>
  );
};

export default App;
