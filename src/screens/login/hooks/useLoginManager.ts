import type {
  FederatedLoginOptions,
  LoginOptions,
} from "@auth0/auth0-acul-react/login";
import {
  useActiveIdentifiers,
  useLogin,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginManager = () => {
  const login = useLogin();
  const screen = useScreen();
  const transaction = useTransaction();
  const activeIdentifiers = useActiveIdentifiers();

  const { alternateConnections } = transaction;
  const { isCaptchaAvailable, texts, links, captchaImage } = screen;

  const handleLogin = async (payload: LoginOptions): Promise<void> => {
    // Clean and prepare data
    const options: LoginOptions = {
      username: payload.username.trim(),
      password: payload.password,
    };

    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(`Login with options: ${JSON.stringify(logOptions)}`, () =>
      login.login(options)
    );
  };

  const handleFederatedLogin = async (payload: FederatedLoginOptions) => {
    executeSafely(
      `Federated login with connection: ${payload.connection}`,
      () => login.federatedLogin(payload)
    );
  };

  return {
    login,
    handleLogin,
    handleFederatedLogin,
    texts,
    isCaptchaAvailable,
    alternateConnections,
    captchaImage,
    activeIdentifiers,
    resetPasswordLink: links?.reset_password,
    signupLink: links?.signup,
    errors: transaction.errors,
  };
};
