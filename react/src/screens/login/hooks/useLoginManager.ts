import {
  useLogin,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";
import type {
  FederatedLoginOptions,
  LoginMembers,
  LoginPayloadOptions,
  ScreenMembersOnLogin,
  TransactionMembersOnLogin,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/login/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginManager = () => {
  const login: LoginMembers = useLogin();
  const screen: ScreenMembersOnLogin = useScreen();
  const transaction: TransactionMembersOnLogin = useTransaction();

  const { alternateConnections, countryCode, countryPrefix } = transaction;
  const { isCaptchaAvailable, captcha, texts, links } = screen;

  const handleLogin = async (payload: LoginPayloadOptions): Promise<void> => {
    // Clean and prepare data
    const options: LoginPayloadOptions = {
      username: payload.username.trim(),
      password: payload.password.trim(),
    };

    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(
      `Perform Login operation with options: ${JSON.stringify(logOptions)}`,
      () => login.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Perform federated login with connection: ${payload.connection}`,
      () => login.federatedLogin(payload)
    );
  };

  const handlePickCountryCode = async () => {
    executeSafely(`Invoked Pick country code`, () => login.pickCountryCode());
  };

  return {
    login,
    handleLogin,
    handleFederatedLogin,
    handlePickCountryCode,
    texts,
    locales,
    isCaptchaAvailable,
    alternateConnections,
    captcha,
    resetPasswordLink: links?.reset_password,
    signupLink: links?.signup,
    countryCode,
    countryPrefix,
  };
};
