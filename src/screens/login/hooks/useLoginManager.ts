import { useMemo } from "react";

import type { ScreenMembersOnLogin } from "@auth0/auth0-acul-js";
import LoginInstance from "@auth0/auth0-acul-js/login";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginManager = () => {
  const loginInstance = useMemo(() => new LoginInstance(), []);

  const { transaction, screen } = loginInstance;
  const { isSignupEnabled, isForgotPasswordEnabled, passwordPolicy } =
    transaction;

  const { signupLink, resetPasswordLink, texts, captchaImage } = screen;

  const handleLogin = async (
    username: string,
    password: string,
    captcha?: string
  ): Promise<void> => {
    const options: { username: string; password: string; captcha?: string } = {
      username: username?.trim() || "",
      password: password || "",
    };

    if (screen.isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }

    executeSafely(`Login with options: ${JSON.stringify(options)}`, () =>
      loginInstance.login(options)
    );
  };

  const handleFederatedLogin = async (connectionName: string) => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginInstance.federatedLogin({ connection: connectionName })
    );
  };

  return {
    loginInstance,
    handleLogin,
    handleFederatedLogin,
    texts: (texts || {}) as ScreenMembersOnLogin["texts"],
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: loginInstance.getError(),
    captchaImage,
    signupLink,
    resetPasswordLink,
    allowedIdentifiers: transaction.allowedIdentifiers || [],
    passwordPolicy,
  };
};
