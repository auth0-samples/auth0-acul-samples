import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadAndSetMockContext } from "./utils/mockContextLoader";

declare global {
  interface Window {
    universal_login_context: any;
  }
}

async function initializeApp() {
  await loadAndSetMockContext();

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
