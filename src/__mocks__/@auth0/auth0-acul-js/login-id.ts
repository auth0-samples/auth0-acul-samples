/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL JS LoginId screen.
 * It is designed to be structurally aligned with the official SDK, enabling robust
 * and isolated testing of our components.
 *
 * It mocks the following core parts of the SDK:
 * - `LoginId` class: {@link https://auth0.github.io/universal-login/classes/Classes.LoginId.html}
 * - `ScreenMembersOnLoginId`: {@link https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginId.html}
 * - `TransactionMembersOnLoginId`: {@link https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginId.html}
 */
import type {
  ScreenMembersOnLoginId,
  TransactionMembersOnLoginId,
} from "@auth0/auth0-acul-js";

/**
 * Defines the "contract" for our mock. It combines the methods from the main
 * `LoginId` class with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginIdInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  screen: ScreenMembersOnLoginId;
  transaction: TransactionMembersOnLoginId;
}

/**
 * Factory function to create a new mock instance of the `LoginId` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginIdInstance = (): MockLoginIdInstance => ({
  login: jest.fn(),
  federatedLogin: jest.fn(),
  passkeyLogin: jest.fn(),
  pickCountryCode: jest.fn(),
  screen: {
    name: "login-id",
    texts: {
      title: "Mock Welcome Title",
      description: "Mock description text.",
      usernameOrEmailPlaceholder: "Username or Email Address",
      buttonText: "Mock Continue",
      forgotPasswordText: "Can't log in?",
      separatorText: "Or",
      passkeyButtonText: "Continue with a passkey",
      captchaCodePlaceholder: "Enter the code shown above",
    },
    // Structurally correct captcha properties
    isCaptchaAvailable: false,
    captchaProvider: null,
    captchaSiteKey: null,
    captchaImage: null,
    captcha: null,
    // Structurally correct passkey property
    publicKey: null,
    // Use direct link properties
    signupLink: "/test-signup",
    resetPasswordLink: "/test-reset",
    // Base properties that must exist
    links: {},
    data: {},
  },
  transaction: {
    // Declarative boolean flags for UI logic
    isSignupEnabled: true,
    isForgotPasswordEnabled: true,
    isPasskeyEnabled: false,
    hasErrors: false,
    isUsernameRequired: false,
    // Default transaction state
    errors: [],
    allowedIdentifiers: ["email", "username"],
    alternateConnections: [],
    locale: "en",
    state: "g-state",
    countryCode: null,
    countryPrefix: null,
    currentConnection: null,
    connectionStrategy: null,
    usernamePolicy: null,
  },
});

export default jest.fn().mockImplementation(() => createMockLoginIdInstance());
