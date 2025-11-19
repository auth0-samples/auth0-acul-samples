/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login passwordless email code hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type {
  ErrorItem,
  ScreenMembersOnLoginPasswordlessEmailCode,
  TransactionMembersOnLoginPasswordlessEmailCode,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the login-passwordless-email-code instance
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordlessEmailCodeInstance {
  submitCode: jest.Mock;
  resendCode: jest.Mock;
  resendManager: jest.Mock;
  screen: ScreenMembersOnLoginPasswordlessEmailCode;
  transaction: TransactionMembersOnLoginPasswordlessEmailCode;
}

/**
 * Factory function to create a new mock instance for login-passwordless-email-code functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordlessEmailCodeInstance =
  (): MockLoginPasswordlessEmailCodeInstance => ({
    submitCode: jest.fn(),
    resendCode: jest.fn(),
    resendManager: jest.fn(),
    screen: {
      name: "login-passwordless-email-code",
      texts: {
        pageTitle: "Enter your email code to log in | My App",
        title: "Verify Your Identity",
        description: "We've sent an email with your code to:",
        buttonText: CommonTestData.commonTexts.continue,
        editText: "Edit",
        editLinkScreenReadableText: "Edit email address",
        placeholder: "Enter the code",
        resendActionText: "Resend",
        resendText: "Didn't receive an email?",
        logoAltText: "test3",
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
      data: {
        email: "foo1@bar.com",
        username: "foo1@bar.com",
      },
      editIdentifierLink: null,
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
      isSignupEnabled: null,
    },
  });

// Mock the login Passwordless hooks and methods
const mockLoginPasswordlessEmailCodeInstance =
  createMockLoginPasswordlessEmailCodeInstance();

export const useLoginPasswordlessEmailCode = jest.fn(() => ({
  submitCode: mockLoginPasswordlessEmailCodeInstance.submitCode,
  resendCode: mockLoginPasswordlessEmailCodeInstance.resendCode,
  resendManager: mockLoginPasswordlessEmailCodeInstance.resendManager,
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

// Mock useResend hook
export const useResend = jest.fn(() => ({
  remaining: 0,
  disabled: false,
  startResend: jest.fn(),
}));

export const useScreen = jest.fn(
  () => mockLoginPasswordlessEmailCodeInstance.screen
);
export const useTransaction = jest.fn(
  () => mockLoginPasswordlessEmailCodeInstance.transaction
);

// Export named functions for direct access in tests
export const submitCode = mockLoginPasswordlessEmailCodeInstance.submitCode;
export const resendCode = mockLoginPasswordlessEmailCodeInstance.resendCode;
export const resendManager =
  mockLoginPasswordlessEmailCodeInstance.resendManager;

export default jest
  .fn()
  .mockImplementation(() => createMockLoginPasswordlessEmailCodeInstance());
