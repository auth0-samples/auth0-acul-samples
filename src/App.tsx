import { useEffect, Suspense, useState } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const [screen, setScreen] = useState("login-id");

  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current || "login-id");
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
