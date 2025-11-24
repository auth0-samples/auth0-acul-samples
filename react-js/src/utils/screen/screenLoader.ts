// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  login: lazy(() => import("@/screens/login")),
  "login-id": lazy(() => import("@/screens/login-id")),
  "login-password": lazy(() => import("@/screens/login-password")),
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
