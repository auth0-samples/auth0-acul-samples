import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

async function initializeApp() {
  // Load context inspector styles only in dev mode
  if (import.meta.env.DEV) {
    await import("ul-context-inspector/style.css");
  }

  // Import the factory function and create the App component
  const { default: createApp } = await import("./App.tsx");
  const App = await createApp();

  /**
   * ACUL Integration Note:
   * The following lines handle the specific way this React application is integrated
   * into Auth0's Universal Login page. Auth0 provides the base HTML DOM.
   * This script then creates a 'div' (rootElement),
   * appends it to Auth0's document.body, and then mounts the React application onto this div.
   * This differs from typical setups where an index.html is bundled directly with the app.
   */
  const rootElement = document.createElement("div");
  rootElement.id = "root";

  document.body.appendChild(rootElement);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

initializeApp();
