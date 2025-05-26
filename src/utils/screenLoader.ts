import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, any> = {
  login: lazy(() => import("../screens/login")),
  "login-id": lazy(() => import("../screens/login-id")),
  "login-password": lazy(() => import("../screens/login-password")),
};

export const getScreenComponent = (screenName: string) => {
  return SCREEN_COMPONENTS[screenName] || null;
};
