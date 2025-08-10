import { useMemo } from "react";

import type { ScreenMembersOnLoginPassword } from "@auth0/auth0-acul-js";
import LoginPassword from "@auth0/auth0-acul-js/login-password";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Custom hook to manage the LoginPassword screen functionality.
 * This hook provides methods and properties to handle login with password,
 * federated login, and other related functionalities like CAPTCHA and error handling.
 */
export const useLoginPasswordManager = () => {
  // Initialize the LoginPassword instance
  const loginPasswordInstance = useMemo(() => new LoginPassword(), []);

  // Extract transaction and screen properties from the LoginPassword instance
  const { transaction, screen } = loginPasswordInstance;

  // Extract relevant flags from the transaction object
  const { isSignupEnabled, isForgotPasswordEnabled, isPasskeyEnabled } =
    transaction;

  // Extract relevant properties from the screen object
  const {
    signupLink,
    resetPasswordLink,
    texts,
    captchaImage,
    editIdentifierLink,
    links,
    data,
  } = screen;

  /**
   * Handles the login process using a username and password.
   * Optionally includes a CAPTCHA value if required.
   *
   * @param loginId - The username or email address of the user.
   * @param password - The password of the user.
   * @param captcha - (Optional) The CAPTCHA value if required.
   * @returns A promise that resolves when the login process is complete.
   */
  const handleLoginPassword = async (
    loginId: string,
    password: string,
    captcha?: string
  ): Promise<void> => {
    const options: { username: string; password: string; captcha?: string } = {
      username: loginId?.trim() || "",
      password: password?.trim() || "",
    };

    // Include CAPTCHA in the options if available and provided
    if (screen.isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }

    // Execute the login process safely and log any errors
    executeSafely(
      `LoginPassword with options: ${JSON.stringify(options)}`,
      () => loginPasswordInstance.login(options)
    );
  };

  return {
    loginPasswordInstance,
    handleLoginPassword,
    texts: (texts || {}) as ScreenMembersOnLoginPassword["texts"],
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isPasskeyEnabled: isPasskeyEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: loginPasswordInstance.getError(),
    links,
    editIdentifierLink,
    signupLink,
    resetPasswordLink,
    captchaImage,
    data,
  };
};
