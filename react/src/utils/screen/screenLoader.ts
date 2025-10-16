// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  login: lazy(() => import("@/screens/login")),
  "login-id": lazy(() => import("@/screens/login-id")),
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
  "login-passwordless-sms-otp": lazy(
    () => import("@/screens/login-passwordless-sms-otp")
  ),
  "email-identifier-challenge": lazy(
    () => import("@/screens/email-identifier-challenge")
  ),
  "mfa-begin-enroll-options": lazy(
    () => import("@/screens/mfa-begin-enroll-options")
  ),
  "mfa-country-codes": lazy(() => import("@/screens/mfa-country-codes")),
  "mfa-email-challenge": lazy(() => import("@/screens/mfa-email-challenge")),
  "mfa-enroll-result": lazy(() => import("@/screens/mfa-enroll-result")),
  "mfa-login-options": lazy(() => import("@/screens/mfa-login-options")),
  "mfa-push-challenge-push": lazy(
    () => import("@/screens/mfa-push-challenge-push")
  ),
  "mfa-push-welcome": lazy(() => import("@/screens/mfa-push-welcome")),
  "mfa-push-list": lazy(() => import("@/screens/mfa-push-list")),
  "mfa-sms-challenge": lazy(() => import("@/screens/mfa-sms-challenge")),
  "mfa-sms-enrollment": lazy(() => import("@/screens/mfa-sms-enrollment")),
  "mfa-sms-list": lazy(() => import("@/screens/mfa-sms-list")),
  "passkey-enrollment": lazy(() => import("@/screens/passkey-enrollment")),
  "passkey-enrollment-local": lazy(
    () => import("@/screens/passkey-enrollment-local")
  ),
  "reset-password": lazy(() => import("@/screens/reset-password")),
  "reset-password-email": lazy(() => import("@/screens/reset-password-email")),
  "reset-password-error": lazy(() => import("@/screens/reset-password-error")),
  "reset-password-success": lazy(
    () => import("@/screens/reset-password-success")
  ),
  signup: lazy(() => import("@/screens/signup")),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
