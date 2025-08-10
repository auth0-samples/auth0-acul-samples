/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL JS LoginPassword screen.
 * It is designed to be structurally aligned with the official SDK, enabling robust
 * and isolated testing of our components.
 *
 * It mocks the following core parts of the SDK:
 * - `LoginPassword` class: {@link https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPassword.html}
 * - `ScreenMembersOnLoginPassword`: {@link https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPassword.html}
 * - `TransactionMembersOnLoginPassword`: {@link https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginPassword.html}
 */
import type {
  PasswordPolicy,
  ScreenMembersOnLoginPassword,
  TransactionMembersOnLoginPassword,
  UsernamePolicy,
} from "@auth0/auth0-acul-js";

/**
 * Defines the "contract" for our mock. It combines the methods from the main
 * `LoginPassword` class with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  getError: jest.Mock;
  screen: ScreenMembersOnLoginPassword;
  transaction: TransactionMembersOnLoginPassword;
}

/**
 * Factory function to create a new mock instance of the `LoginPassword` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordInstance =
  (): MockLoginPasswordInstance => ({
    login: jest.fn(),
    federatedLogin: jest.fn(),
    passkeyLogin: jest.fn(),
    pickCountryCode: jest.fn(),
    getError: jest.fn(() => []), // Returns empty array by default
    screen: {
      name: "login-password",
      texts: {
        title: "Mock Welcome Title",
        description: "Mock description text.",
        usernameOrEmailPlaceholder: "Username or Email Address",
        passwordPlaceholder: "Password",
        buttonText: "Mock Continue",
        forgotPasswordText: "Can't log in?",
        separatorText: "Or",
        passkeyButtonText: "Continue with a passkey",
        captchaCodePlaceholder: "Enter the code shown above",
      },
      // Structurally correct captcha properties
      isCaptchaAvailable: true,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      // Use direct link properties
      signupLink: "/test-signup",
      resetPasswordLink: "/test-reset",
      // Base properties that must exist
      links: {},
      data: {
        username: "Mock UserId",
      },
      editIdentifierLink: null,
    },
    transaction: {
      // Declarative boolean flags for UI logic
      isSignupEnabled: true,
      isForgotPasswordEnabled: true,
      isPasskeyEnabled: false,
      hasErrors: false,
      // Default transaction state
      errors: [],
      getAllowedIdentifiers() {
        return [];
      },
      alternateConnections: [],
      locale: "en",
      state: "g-state",
      countryCode: null,
      countryPrefix: null,
      currentConnection: null,
      connectionStrategy: null,
      getPasswordPolicy: function (): PasswordPolicy | null {
        return {
          minLength: 8,
          policy: "good",
        };
      },
      getUsernamePolicy: function (): UsernamePolicy | null {
        throw new Error("Function not implemented.");
      },
    },
  });

export default jest
  .fn()
  .mockImplementation(() => createMockLoginPasswordInstance());
