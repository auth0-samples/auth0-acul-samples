import {
  useLoginPassword,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-password";
import type {
  FederatedLoginOptions,
  LoginPasswordOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginPasswordManager = () => {
  const loginPassword = useLoginPassword();
  const screen = useScreen();
  const transaction = useTransaction();

  const { alternateConnections } = transaction;
  const {
    isCaptchaAvailable,
    texts,
    captchaImage,
    signupLink,
    resetPasswordLink,
    editIdentifierLink,
    data,
  } = screen;

  const { isSignupEnabled, isForgotPasswordEnabled } = transaction;

  const handleLoginPassword = async (
    payload: LoginPasswordOptions
  ): Promise<void> => {
    // Clean and prepare data
    const options: LoginPasswordOptions = {
      username: payload?.username.trim(),
      password: payload?.password?.trim(),
    };

    if (screen.isCaptchaAvailable && payload?.captcha?.trim()) {
      options.captcha = payload?.captcha.trim();
    }

    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(
      `Login Password with options: ${JSON.stringify(logOptions)}`,
      () => loginPassword.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Federated login with connection: ${payload.connection}`,
      () => loginPassword.federatedLogin(payload)
    );
  };

  return {
    loginPassword,
    texts,
    isSignupEnabled,
    isForgotPasswordEnabled,
    isCaptchaAvailable,
    alternateConnections,
    captchaImage,
    signupLink,
    resetPasswordLink,
    editIdentifierLink,
    data,
    errors: transaction.errors,
    handleLoginPassword,
    handleFederatedLogin,
    passwordPolicy: transaction.getPasswordPolicy(),
  };
};
