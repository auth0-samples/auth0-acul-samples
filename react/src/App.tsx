import { Suspense } from "react";

import { useCurrentScreen } from "@auth0/auth0-acul-react";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const screenOptions = useCurrentScreen();
  const screenName = screenOptions?.screen?.name;
  
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
