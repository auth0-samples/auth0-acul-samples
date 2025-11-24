import { useMemo } from "react";

import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import type {
  LoginOptions,
  ScreenMembersOnLoginId,
  TransactionMembersOnLoginId,
} from "@auth0/auth0-acul-js/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locale/en.json";

export const useLoginIdManager = () => {
  const loginIdInstance = useMemo(() => new LoginIdInstance(), []);

  const {
    transaction,
    screen,
  }: {
    transaction: TransactionMembersOnLoginId;
    screen: ScreenMembersOnLoginId;
  } = loginIdInstance;

  const handleLoginId = async (payload: LoginOptions): Promise<void> => {
    const options: LoginOptions = {
      username: payload.username?.trim() || "",
    };

    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options)
    );
  };

  const handleFederatedLogin = async (
    connectionName: string
  ): Promise<void> => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginIdInstance.federatedLogin({ connection: connectionName })
    );
  };

  const handlePasskeyLogin = async (): Promise<void> => {
    executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
  };

  const handlePickCountryCode = async (): Promise<void> => {
    executeSafely(`Pick country code`, () => loginIdInstance.pickCountryCode());
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleFederatedLogin,
    handlePasskeyLogin,
    handlePickCountryCode,
    screen,
    transaction,
    locales,
  };
};
