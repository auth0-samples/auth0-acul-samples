import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
  "reset-password": lazy(() => import("@/screens/reset-password")),
  "reset-password-success": lazy(
    () => import("@/screens/reset-password-success")
  ),
  "signup-id": lazy(() => import("@/screens/signup-id")),
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
