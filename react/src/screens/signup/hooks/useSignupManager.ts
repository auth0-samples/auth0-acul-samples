import {
  useScreen,
  useSignup,
  useTransaction,
} from "@auth0/auth0-acul-react/signup";
import type {
  FederatedSignupOptions,
  ScreenMembersOnSignup,
  SignupPayloadOptions,
  TransactionMembersOnSignup,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useSignupManager = () => {
  const signup = useSignup();

  const screen: ScreenMembersOnSignup = useScreen();
  const transaction: TransactionMembersOnSignup = useTransaction();
  const { alternateConnections } = transaction;

  const { isCaptchaAvailable, texts, loginLink, captcha } = screen;

  const handleSignup = async (payload: SignupPayloadOptions): Promise<void> => {
    // Clean and prepare data, transforming phoneNumber to phone for SDK
    const options: SignupPayloadOptions = {};

    if (payload.email?.trim()) {
      options.email = payload.email.trim();
    }
    // Transform phoneNumber to phone for SDK
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

    // Password redacted from logs
    const logOptions = {
      ...options,
      password: options.password ? "[REDACTED]" : undefined,
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
    transaction,
    handleSignup,
    handleFederatedSignup,
    handlePickCountryCode,
    texts,
    isCaptchaAvailable,
    loginLink,
    alternateConnections,
    captcha,
    locales,
  };
};
