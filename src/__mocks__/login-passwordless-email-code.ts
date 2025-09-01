import type {
  ScreenMembersOnLoginPasswordlessEmailCode,
  TransactionMembersOnLoginPasswordlessEmailCode,
} from "@auth0/auth0-acul-react";

/**
 * Defines the "contract" for our mock. It combines the methods from the main
 * `useLoginPasswordlessEmailCode` hook with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordlessEmailCodeInstance {
  submitCode: jest.Mock;
  resendCode: jest.Mock;
  screen: ScreenMembersOnLoginPasswordlessEmailCode;
  transaction: TransactionMembersOnLoginPasswordlessEmailCode;
}

/**
 * Factory function to create a new mock instance of the `useLoginPasswordlessEmailCode` hook.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordlessEmailCodeInstance =
  (): MockLoginPasswordlessEmailCodeInstance => ({
    submitCode: jest.fn(),
    resendCode: jest.fn(),
    screen: {
      name: "login-passwordless-email-code",
      texts: {
        pageTitle: "Mock Login with Email Code",
        description: "Mock description text.",
        otpPlaceholder: "Enter Email Code",
        buttonText: "Mock Submit",
        resendText: "Resend OTP",
        captchaCodePlaceholder: "Enter the code shown above",
      },
      isCaptchaAvailable: true,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: {
        helpLink: "/test-help",
      },
      data: {
        email: "foo1@bar.com",
        username: "mock user name",
      },
      signupLink: null,
      resetPasswordLink: null,
      editIdentifierLink: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state",
      locale: "en",
      isSignupEnabled: false,
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
  });

export default jest
  .fn()
  .mockImplementation(() => createMockLoginPasswordlessEmailCodeInstance());
