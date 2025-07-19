import { useState } from "react";

import type { ScreenMembersOnLoginId } from "@auth0/auth0-acul-js";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const [loginIdInstance] = useState(() => new LoginIdInstance());

  const { transaction, screen } = loginIdInstance;
  const { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled } =
    transaction;

  const { signupLink, resetPasswordLink, texts, captchaImage } = screen;

  const handleLoginId = async (
    loginId: string,
    captcha?: string
  ): Promise<void> => {
    const options: { username: string; captcha?: string } = {
      username: loginId?.trim() || "",
    };

    if (screen.isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }
    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options)
    );
  };

  const handleFederatedLogin = async (connectionName: string) => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginIdInstance.federatedLogin({ connection: connectionName })
    );
  };

  const handlePasskeyLogin = async () => {
    if (isPasskeyEnabled) {
      executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
    }
  };

  const handlePickCountryCode = async () => {
    executeSafely(`Pick country code`, () => loginIdInstance.pickCountryCode());
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleFederatedLogin,
    handlePasskeyLogin,
    handlePickCountryCode,
    texts: (texts || {}) as ScreenMembersOnLoginId["texts"],
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isPasskeyEnabled: isPasskeyEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: loginIdInstance.getError(),
    captchaImage,
    signupLink,
    resetPasswordLink,
  };
};
