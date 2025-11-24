/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type {
  ErrorItem,
  ScreenMembersOnLogin,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the login
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  getLoginIdentifiers: jest.Mock;
  screen: ScreenMembersOnLogin;
  transaction: TransactionMembers;
  activeIdentifiers: string[];
}

/**
 * Factory function to create a new mock instance for login functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginInstance = (): MockLoginInstance => ({
  login: jest.fn(),
  federatedLogin: jest.fn(),
  getLoginIdentifiers: jest.fn(),
  screen: {
    name: "login",
    texts: {
      pageTitle: "Log in | my app",
      title: "Welcome",
      description: "Log in to dev-abc to continue to All Applications.",
      separatorText: "OR",
      buttonText: CommonTestData.commonTexts.continue,
      footerLinkText: "Sign up",
      signupActionLinkText: "Sign up",
      footerText: "Don't have an account?",
      signupActionText: "Don't have an account?",
      forgotPasswordText: "Forgot password?",
      passwordPlaceholder: "Password",
      usernamePlaceholder: "Username or Email address",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone number",
      usernameOnlyPlaceholder: "Username",
      captchaCodePlaceholder: "Enter the code shown above",
      logoAltText: "dev-abc",
      showPasswordText: "Show password",
      hidePasswordText: "Hide password",
      badgeUrl:
        "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
      badgeAltText: "Link to the Auth0 website",
      error: "Error",
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
  activeIdentifiers: ["email", "username"],
});

// Mock the login hooks and methods
const mockLoginInstance = createMockLoginInstance();

export const useLogin = jest.fn(() => ({
  login: mockLoginInstance.login,
  federatedLogin: mockLoginInstance.federatedLogin,
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

export const useScreen = jest.fn(() => mockLoginInstance.screen);
export const useTransaction = jest.fn(() => mockLoginInstance.transaction);

// Export named functions for direct access in tests
export const login = mockLoginInstance.login;
export const federatedLogin = mockLoginInstance.federatedLogin;

export default jest.fn().mockImplementation(() => createMockLoginInstance());
