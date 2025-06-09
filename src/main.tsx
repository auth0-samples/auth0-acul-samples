import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadAndSetMockContext } from "@/utils/screen/mockContextLoader";

async function initializeApp() {
  await loadAndSetMockContext();

  /**
   * ACUL Integration Note:
   * The following lines handle the specific way this React application is integrated
   * into Auth0's Universal Login page. Auth0 provides the base HTML DOM.
   * This script then dynamically creates a 'div' (rootElement),
   * appends it to Auth0's document.body, and then mounts the React application onto this div.
   * This differs from typical setups where an index.html is bundled directly with the app.
   */
  const rootElement = document.createElement("div");
  rootElement.id = "root";

  document.body.appendChild(rootElement);

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

initializeApp();
