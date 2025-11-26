import {
  useLoginId,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-id";
import type {
  FederatedLoginOptions,
  LoginIdMembers,
  LoginOptions,
  ScreenMembersOnLoginId,
  TransactionMembersOnLoginId,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/login-id/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const loginId: LoginIdMembers = useLoginId();
  const screen: ScreenMembersOnLoginId = useScreen();
  const transaction: TransactionMembersOnLoginId = useTransaction();

  const { alternateConnections } = transaction;
  const { isCaptchaAvailable, texts, captcha, signupLink, resetPasswordLink } =
    screen;
  const {
    isSignupEnabled,
    isForgotPasswordEnabled,
    isPasskeyEnabled,
    showPasskeyAutofill,
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

    executeSafely(
      `Perform Login operation with options: ${JSON.stringify(logOptions)}`,
      () => loginId.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Perform Federated login with connection: ${payload.connection}`,
      () => loginId.federatedLogin(payload)
    );
  };

  const handlePasskeyLogin = async () => {
    if (isPasskeyEnabled) {
      executeSafely(`Perform passkey login`, () => loginId.passkeyLogin());
    }
  };

  const handlePickCountryCode = async () => {
    executeSafely(`Invoked Pick country code`, () => loginId.pickCountryCode());
  };

  return {
    loginId,
    handleLoginId,
    handleFederatedLogin,
    handlePasskeyLogin,
    handlePickCountryCode,
    texts,
    locales,
    isSignupEnabled,
    isForgotPasswordEnabled,
    isPasskeyEnabled,
    showPasskeyAutofill,
    isCaptchaAvailable,
    captcha,
    alternateConnections,
    signupLink,
    resetPasswordLink,
    countryCode,
    countryPrefix,
  };
};
