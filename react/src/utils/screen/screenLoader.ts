import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
