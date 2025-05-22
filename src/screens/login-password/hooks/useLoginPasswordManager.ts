import { useState } from "react";
import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";
import { executeSafely } from "@/utils/executeSafely";

export const useLoginPasswordManager = () => {
  const [loginPasswordInstance] = useState(() => new LoginPasswordInstance());

  const editIdentifierLink =
    loginPasswordInstance.screen.editIdentifierLink || "";
  const username = loginPasswordInstance.screen.data?.username || "";

  const handleLogin = (options: {
    username: string;
    password: string;
    captcha?: string;
  }) => {
    const payload = {
      username: options.username,
      password: options.password,
      captcha: options.captcha,
    };
    executeSafely(
      `Login password with options: ${JSON.stringify(payload)}`,
      () => loginPasswordInstance.login(payload),
    );
  };

  return {
    loginPasswordInstance,
    handleLogin,
    editIdentifierLink,
    username,
  };
};
