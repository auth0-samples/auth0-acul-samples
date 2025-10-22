import {
  useLoginId,
  useLoginIdentifiers,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-id";
import type {
  FederatedLoginOptions,
  LoginOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const loginId = useLoginId();
  const screen = useScreen();
  const transaction = useTransaction();
  const activeIdentifiers = useLoginIdentifiers();

  const { alternateConnections } = transaction;
  const {
    isCaptchaAvailable,
    texts,
    captchaImage,
    signupLink,
    resetPasswordLink,
  } = screen;
  const {
    isSignupEnabled,
    isForgotPasswordEnabled,
    isPasskeyEnabled,
    countryCode,
    countryPrefix,
  } = transaction;

  const handleLoginId = async (payload: LoginOptions): Promise<void> => {
    // Clean and prepare data
    const options: LoginOptions = {
      username: payload.username.trim(),
    };

    if (screen.isCaptchaAvailable && payload?.captcha?.trim()) {
      options.captcha = payload?.captcha.trim();
    }

    const logOptions = {
      ...options,
    };

    executeSafely(`LoginId with options: ${JSON.stringify(logOptions)}`, () =>
      loginId.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Federated login with connection: ${payload.connection}`,
      () => loginId.federatedLogin(payload)
    );
  };

  const handlePasskeyLogin = async () => {
    if (isPasskeyEnabled) {
      executeSafely(`Passkey login`, () => loginId.passkeyLogin());
    }
  };

  const handlePickCountryCode = async () => {
    executeSafely(`Pick country code`, () => loginId.pickCountryCode());
  };

  return {
    loginId,
    handleLoginId,
    handleFederatedLogin,
    handlePasskeyLogin,
    handlePickCountryCode,
    texts,
    isSignupEnabled,
    isForgotPasswordEnabled,
    isPasskeyEnabled,
    isCaptchaAvailable,
    errors: transaction.errors,
    activeIdentifiers,
    alternateConnections,
    captchaImage,
    signupLink,
    resetPasswordLink,
    countryCode,
    countryPrefix,
  };
};
