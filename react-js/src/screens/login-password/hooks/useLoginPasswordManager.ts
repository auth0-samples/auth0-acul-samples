import { useMemo } from "react";

import LoginPassword from "@auth0/auth0-acul-js/login-password";
import type { LoginPasswordOptions } from "@auth0/auth0-acul-js/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locale/en.json";

/**
 * Custom hook to manage the LoginPassword screen functionality.
 * Returns only the SDK instance and essential handlers.
 * Components access SDK primitives directly via loginPasswordInstance.
 */
export const useLoginPasswordManager = () => {
  // Initialize the LoginPassword instance
  const loginPasswordInstance = useMemo(() => new LoginPassword(), []);

  // Extract transaction and screen properties from the LoginPassword instance
  const { transaction, screen } = loginPasswordInstance;

  /**
   * Handles the login process using a username and password.
   *
   * @param data - The form data containing username, password, and optional CAPTCHA.
   * @returns A promise that resolves when the login process is complete.
   */
  const handleLoginPassword = async (
    data: LoginPasswordOptions
  ): Promise<void> => {
    const options: LoginPasswordOptions = {
      username: data.username?.trim() || "",
      password: data.password?.trim() || "",
    };

    // Include CAPTCHA in the options if available and provided
    if (screen.isCaptchaAvailable && data.captcha?.trim()) {
      options.captcha = data.captcha.trim();
    }

    // Execute the login process safely and log any errors
    await executeSafely(
      `LoginPassword with options: ${JSON.stringify(options)}`,
      () => loginPasswordInstance.login(options)
    );
  };

  return {
    loginPasswordInstance,
    handleLoginPassword,
    screen,
    transaction,
    locales,
  };
};
