import type {
  ScreenMembersOnLoginId,
  TransactionMembersOnLoginId,
} from "@auth0/auth0-acul-js/types";
export interface MockLoginIdInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  getErrors: jest.Mock;
  getLoginIdentifiers: jest.Mock;
  screen: ScreenMembersOnLoginId;
  transaction: TransactionMembersOnLoginId;
}

/**
 * Factory function to create a new mock instance of the `LoginId` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginIdInstance = (): MockLoginIdInstance => {
  const mockInstance = {
    login: jest.fn(),
    federatedLogin: jest.fn(),
    passkeyLogin: jest.fn(),
    pickCountryCode: jest.fn(),
    getErrors: jest.fn(() => []), // Returns empty array by default
    getLoginIdentifiers: jest.fn(), // Will be set up below
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
  } as MockLoginIdInstance;

  // Make getLoginIdentifiers return the current allowedIdentifiers from transaction
  mockInstance.getLoginIdentifiers.mockImplementation(
    () => mockInstance.transaction.allowedIdentifiers
  );

  return mockInstance;
};

let mockLoginIdInstance = createMockLoginIdInstance();

export const resetMockLoginIdInstance = () => {
  mockLoginIdInstance = createMockLoginIdInstance();
};

export const getMockLoginIdInstance = () => mockLoginIdInstance;

export default jest.fn().mockImplementation(() => mockLoginIdInstance);
