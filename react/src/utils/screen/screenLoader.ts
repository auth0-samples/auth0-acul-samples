import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
