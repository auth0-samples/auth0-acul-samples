/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login identifier hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type {
  ErrorItem,
  ScreenMembersOnLoginId,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the login-id instance
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginIdInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  getLoginIdentifiers: jest.Mock;
  screen: ScreenMembersOnLoginId;
  transaction: TransactionMembers;
}

/**
 * Factory function to create a new mock instance for login-id functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginIdInstance = (): MockLoginIdInstance => ({
  login: jest.fn(),
  federatedLogin: jest.fn(),
  passkeyLogin: jest.fn(),
  pickCountryCode: jest.fn(),
  getLoginIdentifiers: jest.fn(),
  screen: {
    name: "login",
    texts: {
      pageTitle: "Log in | my app",
      title: "Welcome",
      description: "Log in to dev-abc to continue to All Applications.",
      separatorText: "Or",
      buttonText: CommonTestData.commonTexts.continue,
      footerLinkText: "Sign up",
      forgotPasswordText: "Can't log in to your account?",
      signupActionLinkText: "Sign up",
      footerText: "Don't have an account?",
      signupActionText: "Don't have an account?",
      passwordPlaceholder: "Password",
      usernamePlaceholder: "Username or email address",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone number",
      usernameOnlyPlaceholder: "Username",
      phoneOrUsernameOrEmailPlaceholder: "Phone or Username or Email",
      phoneOrEmailPlaceholder: "Phone number or Email address",
      phoneOrUsernamePlaceholder: "Phone Number or Username",
      usernameOrEmailPlaceholder: "Username or Email address",
      editEmailText: "Edit",
      alertListTitle: "Alerts",
      devKeysAlertTitle: "Dev Keys",
      devKeysAlertMessage:
        "One or more of your connections are currently using Auth0 development keys and should not be used in production.",
      devKeysAlertUrl: "https://auth0.com/docs/connections/social/devkeys",
      devKeysAlertLinkText: "Learn More",
      logoAltText: "dev-tenant",
      passkeyButtonText: "Continue with a passkey",
      badgeUrl:
        "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
      badgeAltText: "Link to the Auth0 website",
      error: "Error",
      captchaCodePlaceholder: "Enter the code shown above",
      qrCode: "QR Code",
      spinner_push_notification_label:
        "Waiting for push notification to be accepted",
    },
    isCaptchaAvailable: true,
    captchaProvider: "auth0",
    captchaSiteKey: null,
    captchaImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiPg==",
    captcha: null,
    links: {
      resetPassword:
        "/u/login/password-reset-start/Username-Password-Authentication?state=mocked_state123",
      signup: "/u/signup?state=mocked_state123",
    },
    signupLink: "/u/signup?state=mocked_state123",
    resetPasswordLink:
      "/u/login/password-reset-start/Username-Password-Authentication?state=mocked_state123",
    data: {},
    publicKey: null,
  },
  transaction: {
    hasErrors: false,
    errors: [],
    state: "mocked_state",
    locale: "en",
    countryCode: null,
    countryPrefix: null,
    connectionStrategy: null,
    currentConnection: null,
    alternateConnections: [
      {
        name: "google-oauth2",
        strategy: "google",
        options: {
          displayName: "Google",
          showAsButton: true,
        },
      },
      {
        name: "hugging-face",
        strategy: "oauth2",
        options: {
          displayName: "Hugging Face",
          showAsButton: true,
        },
      },
      {
        name: "didit",
        strategy: "oidc",
        options: {
          displayName: "Didit",
          showAsButton: true,
        },
      },
    ],
  },
});

// Mock the login Id hooks and methods
const mockLoginIdInstance = createMockLoginIdInstance();

export const useLoginId = jest.fn(() => ({
  login: mockLoginIdInstance.login,
  federatedLogin: mockLoginIdInstance.federatedLogin,
  passkeyLogin: mockLoginIdInstance.passkeyLogin,
  pickCountryCode: mockLoginIdInstance.pickCountryCode,
}));

// Mock the useLoginIdentifiers hook - returns array of identifier objects
export const useLoginIdentifiers = jest.fn(() => [
  { type: "username" as const, required: true },
]);

const mockErrors: ErrorItem[] = [];

// Mock the useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byType: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

// Mock the usePasskeyAutofill hook
export const usePasskeyAutofill = jest.fn(() => ({
  inputRef: HTMLInputElement,
}));

export const useScreen = jest.fn(() => mockLoginIdInstance.screen);
export const useTransaction = jest.fn(() => mockLoginIdInstance.transaction);

// Export named functions for direct access in tests
export const login = mockLoginIdInstance.login;
export const federatedLogin = mockLoginIdInstance.federatedLogin;

export default jest.fn().mockImplementation(() => createMockLoginIdInstance());
