/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL JS Login screen.
 * It is designed to be structurally aligned with the official SDK, enabling robust
 * and isolated testing of our components.
 *
 * It mocks the following core parts of the SDK:
 * - `Login` class: {@link https://auth0.github.io/universal-login/classes/Classes.Login.html}
 * - `ScreenMembersOnLogin`: {@link https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLogin.html}
 * - `TransactionMembersOnLogin`: {@link https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLogin.html}
 */
import type {
  ScreenMembersOnLogin,
  TransactionMembersOnLogin,
} from "@auth0/auth0-acul-js";

/**
 * Defines the "contract" for our mock. It combines the methods from the main
 * `Login` class with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  getError: jest.Mock;
  screen: ScreenMembersOnLogin;
  transaction: TransactionMembersOnLogin;
}

/**
 * Factory function to create a new mock instance of the `Login` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginInstance = (): MockLoginInstance => ({
  login: jest.fn(),
  federatedLogin: jest.fn(),
  getError: jest.fn(() => []), // Returns empty array by default
  screen: {
    name: "login",
    texts: {
      title: "Mock Welcome Title",
      description: "Mock description text.",
      usernamePlaceholder: "Username",
      emailPlaceholder: "Email Address",
      usernameOrEmailPlaceholder: "Username or Email Address",
      passwordPlaceholder: "Password",
      buttonText: "Mock Continue",
      forgotPasswordText: "Can't log in?",
      separatorText: "Or",
      signupActionLinkText: "Sign up",
      captchaCodePlaceholder: "Enter the code shown above",
    },
    // Structurally correct captcha properties
    isCaptchaAvailable: false,
    captchaProvider: null,
    captchaSiteKey: null,
    captchaImage: null,
    captcha: null,
    // Use direct link properties
    signupLink: "/signup",
    resetPasswordLink: "/reset",
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
    // Default transaction state
    errors: [],
    alternateConnections: [
      {
        name: "google-oauth2",
        strategy: "google",
        options: { displayName: "Google", showAsButton: true },
      },
      {
        name: "github",
        strategy: "github",
        options: { displayName: "Github", showAsButton: true },
      },
    ],
    locale: "en",
    state: "g-state",
    currentConnection: null,
    connectionStrategy: null,
    passwordPolicy: {
      minLength: 8,
      policy: "good",
    },
    allowedIdentifiers: ["email", "username"],
    countryCode: null,
    countryPrefix: null,
  },
});

// Default mock implementation
const createDefaultMock = () => createMockLoginInstance();

export default jest.fn().mockImplementation(createDefaultMock);
