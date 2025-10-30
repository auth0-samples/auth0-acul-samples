import type {
  ScreenMembersOnLoginPassword,
  TransactionMembersOnLoginPassword,
} from "@auth0/auth0-acul-js/types";

export interface MockLoginPasswordInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  getErrors: jest.Mock;
  screen: ScreenMembersOnLoginPassword;
  transaction: TransactionMembersOnLoginPassword;
}

/**
 * Factory function to create a new mock instance of the `LoginPassword` class.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordInstance =
  (): MockLoginPasswordInstance => {
    const mockInstance = {
      login: jest.fn(),
      federatedLogin: jest.fn(),
      passkeyLogin: jest.fn(),
      pickCountryCode: jest.fn(),
      getErrors: jest.fn(() => []), // Returns empty array by default
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
        isCaptchaAvailable: false,
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
          username: "test@example.com",
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
        getAllowedIdentifiers: jest.fn(() => []),
        alternateConnections: [],
        locale: "en",
        state: "g-state",
        countryCode: null,
        countryPrefix: null,
        currentConnection: null,
        connectionStrategy: null,
        getPasswordPolicy: jest.fn(() => ({
          minLength: 8,
          policy: "good",
        })),
        getUsernamePolicy: jest.fn(() => null),
      },
    } as MockLoginPasswordInstance;

    return mockInstance;
  };

let mockLoginPasswordInstance = createMockLoginPasswordInstance();

export const resetMockLoginPasswordInstance = () => {
  mockLoginPasswordInstance = createMockLoginPasswordInstance();
};

export const getMockLoginPasswordInstance = () => mockLoginPasswordInstance;

export default jest.fn().mockImplementation(() => mockLoginPasswordInstance);
