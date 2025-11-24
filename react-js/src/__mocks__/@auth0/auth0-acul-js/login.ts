import type {
  ScreenMembersOnLogin,
  TransactionMembersOnLogin,
} from "@auth0/auth0-acul-js/types";
export interface MockLoginInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  getErrors: jest.Mock;
  getLoginIdentifiers: jest.Mock;
  screen: ScreenMembersOnLogin;
  transaction: TransactionMembersOnLogin;
}

/**
 * Factory function to create a new mock instance of the `Login` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginInstance = (): MockLoginInstance => {
  const mockInstance = {
    login: jest.fn(),
    federatedLogin: jest.fn(),
    getErrors: jest.fn(() => []), // Returns empty array by default
    getLoginIdentifiers: jest.fn(), // Will be set up below
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
  } as MockLoginInstance;

  // Make getLoginIdentifiers return the current allowedIdentifiers from transaction
  mockInstance.getLoginIdentifiers.mockImplementation(
    () => mockInstance.transaction.allowedIdentifiers
  );

  return mockInstance;
};

let mockLoginInstance = createMockLoginInstance();

export const resetMockLoginInstance = () => {
  mockLoginInstance = createMockLoginInstance();
};

export const getMockLoginInstance = () => mockLoginInstance;

export default jest.fn().mockImplementation(() => mockLoginInstance);
