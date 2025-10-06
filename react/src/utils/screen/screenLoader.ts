// Auto-generated file
// Generated on: 2025-09-23T09:18:28.509Z
import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "passkey-enrollment": lazy(() => import("@/screens/passkey-enrollment")),
  "reset-password": lazy(() => import("@/screens/reset-password")),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
  "reset-password-error": lazy(() => import("@/screens/reset-password-error")),
  "reset-password-success": lazy(
    () => import("@/screens/reset-password-success")
  ),
  signup: lazy(() => import("@/screens/signup")),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
  "mfa-begin-enroll-options": lazy(
    () => import("@/screens/mfa-begin-enroll-options")
  ),
  "mfa-sms-challenge": lazy(() => import("@/screens/mfa-sms-challenge")),
  "mfa-sms-enrollment": lazy(() => import("@/screens/mfa-sms-enrollment")),
  "mfa-push-challenge-push": lazy(
    () => import("@/screens/mfa-push-challenge-push")
  ),
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};

// Available screens for reference
export const availableScreens = [
  "login-passwordless-email-code",
  "login-passwordless-sms-otp",
  "passkey-enrollment",
  "reset-password",
  "reset-password-email",
  "reset-password-error",
  "reset-password-success",
  "signup",
  "signup-id",
  "signup-password",
  "mfa-push-challenge-push",
] as const;
