import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, any> = {
  "login-id": lazy(() => import("@/screens/login-id")),
};

export const getScreenComponent = (screenName: string) => {
  return SCREEN_COMPONENTS[screenName] || null;
};
