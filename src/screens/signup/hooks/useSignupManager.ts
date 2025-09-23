import type {
  FederatedSignupOptions,
  SignupOptions,
} from "@auth0/auth0-acul-react/signup";
import {
  useScreen,
  useSignup,
  useTransaction,
} from "@auth0/auth0-acul-react/signup";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupManager = () => {
  const signup = useSignup();

  const screen = useScreen();
  const transaction = useTransaction();
  const { alternateConnections } = transaction;

  const { isCaptchaAvailable, texts, loginLink, captchaImage } = screen;

  const handleSignup = async (payload: SignupOptions): Promise<void> => {
    // Clean and prepare data like login-id pattern
    const options: SignupOptions = {};

    if (payload.email?.trim()) {
      options.email = payload.email.trim();
    }
    if (payload.phoneNumber?.trim()) {
      options.phoneNumber = payload.phoneNumber.trim();
    }
    if (payload.username?.trim()) {
      options.username = payload.username.trim();
    }
    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }
    if (payload.password) {
      options.password = payload.password;
    }

    // ✅ Password redacted from logs
    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(`Signup with options: ${JSON.stringify(logOptions)}`, () =>
      signup.signup(options)
    );
  };

  const handleFederatedSignup = async (payload: FederatedSignupOptions) => {
    executeSafely(
      `Federated signup with connection: ${payload.connection}`,
      () => signup.federatedSignup(payload)
    );
  };

  const handlePickCountryCode = async (): Promise<void> => {
    executeSafely(`Pick country code`, () => signup.pickCountryCode());
  };

  return {
    signup,
    handleSignup,
    handleFederatedSignup,
    handlePickCountryCode,
    texts,
    isCaptchaAvailable,
    loginLink,
    alternateConnections,
    captchaImage,
    errors: transaction.errors,
  };
};
