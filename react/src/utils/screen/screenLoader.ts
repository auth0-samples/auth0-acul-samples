import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
  "reset-password": lazy(() => import("@/screens/reset-password")),
  "reset-password-success": lazy(
    () => import("@/screens/reset-password-success")
  ),
  "reset-password-error": lazy(() => import("@/screens/reset-password-error")),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
  signup: lazy(() => import("@/screens/signup")),
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
