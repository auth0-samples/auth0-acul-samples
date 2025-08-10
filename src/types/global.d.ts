import type { UniversalLoginContext } from "./auth0-sdk";

declare global {
  interface Window {
    universal_login_context: UniversalLoginContext;
  }
}

export {};
