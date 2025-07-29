import { useState } from "react";

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
  const [loginPasswordInstance] = useState(() => new LoginPassword());

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

  /**
   * Handles federated login for a specific social connection.
   *
   * @param connectionName - The name of the social connection (e.g., "google-oauth2").
   * @returns A promise that resolves when the federated login process is complete.
   */
  const handleFederatedLogin = async (connectionName: string) => {
    executeSafely(`Federated login with connection: ${connectionName}`, () =>
      loginPasswordInstance.federatedLogin({ connection: connectionName })
    );
  };

  return {
    // Instance of the LoginPassword class
    loginPasswordInstance,

    // Method to handle login with username and password
    handleLoginPassword,

    // Method to handle federated login
    handleFederatedLogin,

    // Texts and labels for the screen
    texts: (texts || {}) as ScreenMembersOnLoginPassword["texts"],

    // Flags indicating the availability of various features
    isSignupEnabled: isSignupEnabled === true,
    isForgotPasswordEnabled: isForgotPasswordEnabled === true,
    isPasskeyEnabled: isPasskeyEnabled === true,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,

    // Error messages from the LoginPassword instance
    errors: loginPasswordInstance.getError(),

    // Links for editing identifier, signing up, and resetting password
    links,
    editIdentifierLink,
    signupLink,
    resetPasswordLink,

    // CAPTCHA image if available
    captchaImage,

    // Other Data
    data,
  };
};
