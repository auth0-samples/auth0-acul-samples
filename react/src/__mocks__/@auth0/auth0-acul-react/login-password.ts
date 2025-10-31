/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login password hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import {
  ErrorItem,
  type PasswordPolicy,
  type ScreenMembersOnLoginPassword,
  TransactionMembersOnLoginPassword,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the login-password instance
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  screen: ScreenMembersOnLoginPassword;
  transaction: TransactionMembersOnLoginPassword;
}

/**
 * Factory function to create a new mock instance for login-password functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordInstance =
  (): MockLoginPasswordInstance => ({
    login: jest.fn(),
    federatedLogin: jest.fn(),
    screen: {
      name: "login",
      texts: {
        pageTitle: "Enter your password to log in | My App",
        title: "Enter Your Password",
        description: "Enter your password for dev-abc to continue to My App",
        separatorText: "Or",
        buttonText: CommonTestData.commonTexts.continue,
        footerLinkText: "Sign up",
        signupActionLinkText: "Sign up",
        footerText: "Don't have an account?",
        signupActionText: "Don't have an account?",
        forgotPasswordText: "Forgot password?",
        passwordPlaceholder: "Password",
        usernamePlaceholder: "Username or email address",
        emailPlaceholder: "Email address",
        editEmailText: "Edit",
        editLinkScreenReadableText: "Edit email address",
        alertListTitle: "Alerts",
        devKeysAlertTitle: "Dev Keys",
        devKeysAlertMessage:
          "One or more of your connections are currently using Auth0 development keys and should not be used in production.",
        devKeysAlertUrl: "Dummy Url",
        devKeysAlertLinkText: "Learn More",
        invitationTitle: "You've Been Invited!",
        invitationDescription:
          "Log in to accept 's invitation to join test3 on My-react-application.",
        captchaCodePlaceholder: "Enter the code shown above",
        logoAltText: "test3",
        useBiometricsText: "Use Fingerprint or Face Recognition",
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
      editIdentifierLink: "/u/login/identifier?state=mocked_state123",
      data: {
        username: "testuser@testdomain.com",
      },
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
      isSignupEnabled: false,
      isForgotPasswordEnabled: false,
      isPasskeyEnabled: false,
      getPasswordPolicy: function (): PasswordPolicy | null {
        return {
          minLength: 8,
          policy: "good",
        };
      },
      getUsernamePolicy: jest.fn(),
      getAllowedIdentifiers: jest.fn(),
    },
  });

// Mock the login Password hooks and methods
const mockLoginPasswordInstance = createMockLoginPasswordInstance();

export const useLoginPassword = jest.fn(() => ({
  login: mockLoginPasswordInstance.login,
  federatedLogin: mockLoginPasswordInstance.federatedLogin,
}));

const mockErrors: ErrorItem[] = [];

// Mock the useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byKind: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

export const useScreen = jest.fn(() => mockLoginPasswordInstance.screen);
export const useTransaction = jest.fn(
  () => mockLoginPasswordInstance.transaction
);

// Export named functions for direct access in tests
export const login = mockLoginPasswordInstance.login;
export const federatedLogin = mockLoginPasswordInstance.federatedLogin;

export default jest
  .fn()
  .mockImplementation(() => createMockLoginPasswordInstance());
