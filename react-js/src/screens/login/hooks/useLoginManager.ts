import { useMemo } from "react";

import LoginInstance from "@auth0/auth0-acul-js/login";
import type {
  LoginPayloadOptions,
  ScreenMembersOnLogin,
  TransactionMembersOnLogin,
} from "@auth0/auth0-acul-js/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locale/en.json";

export const useLoginManager = () => {
  const loginInstance = useMemo(() => new LoginInstance(), []);

  const {
    transaction,
    screen,
  }: { transaction: TransactionMembersOnLogin; screen: ScreenMembersOnLogin } =
    loginInstance;

  const handleLogin = async (payload: LoginPayloadOptions): Promise<void> => {
    const options: LoginPayloadOptions = {
      username: payload.username?.trim() || "",
      password: payload.password || "",
    };

    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    executeSafely(`Login with options: ${JSON.stringify(options)}`, () =>
      loginInstance.login(options)
    );
  };

  const handleFederatedLogin = async (
    connectionName: string
  ): Promise<void> => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginInstance.federatedLogin({ connection: connectionName })
    );
  };

  return {
    loginInstance,
    handleLogin,
    handleFederatedLogin,
    screen,
    transaction,
    locales,
  };
};
