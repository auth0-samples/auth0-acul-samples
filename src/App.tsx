import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import { getScreenComponent } from "@/utils/screenLoader";

const App = () => {
  const [screen, setScreen] = React.useState("login-id");
  
  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current!);
  }, []);

  const ScreenComponent = getScreenComponent(screen);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen "{screen}" not implemented yet</div>
      )}
    </Suspense>
  );
};

export default App;
