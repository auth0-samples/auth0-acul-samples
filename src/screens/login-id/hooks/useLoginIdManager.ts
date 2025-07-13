import { useState } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const [loginIdInstance] = useState(() => new LoginIdInstance());

  const { transaction, screen } = loginIdInstance;
  const { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled } =
    transaction;

  // Extract links for consumption by UI components
  const { signupLink, resetPasswordLink, texts, captchaImage } = screen;

  const handleLoginId = (loginId: string, captcha?: string): void => {
    const options = {
      username: loginId?.trim() || "",
      captcha: screen.isCaptchaAvailable ? captcha?.trim() : undefined,
    };
    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options),
    );
  };

  const handleFederatedLogin = (connectionName: string) => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginIdInstance.federatedLogin({ connection: connectionName }),
    );
  };

  const handlePasskeyLogin = () => {
    if (isPasskeyEnabled) {
      executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
    }
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleFederatedLogin,
    handlePasskeyLogin,
    // --- State & Data for UI ---
    // Raw texts object - let components handle their own fallbacks
    texts: texts || {},
    // Explicit state flags for conditional rendering
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isPasskeyEnabled: isPasskeyEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    // Derived data
    errors: transaction.errors || [],
    captchaImage,
    // Direct links for UI
    signupLink,
    resetPasswordLink,
  };
};
