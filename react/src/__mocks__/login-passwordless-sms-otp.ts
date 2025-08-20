import type {
  ScreenMembersOnLoginPasswordlessSmsOtp,
  TransactionMembersOnLoginPasswordlessSmsOtp,
} from "@auth0/auth0-acul-react";

/**
 * Defines the "contract" for our mock. It combines the methods from the main
 * `useLoginPasswordlessSmsOtp` hook with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordlessSmsOtpInstance {
  submitOTP: jest.Mock;
  resendOTP: jest.Mock;
  screen: ScreenMembersOnLoginPasswordlessSmsOtp;
  transaction: TransactionMembersOnLoginPasswordlessSmsOtp;
}

/**
 * Factory function to create a new mock instance of the `useLoginPasswordlessSmsOtp` hook.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockLoginPasswordlessSmsOtpInstance =
  (): MockLoginPasswordlessSmsOtpInstance => ({
    submitOTP: jest.fn(),
    resendOTP: jest.fn(),
    screen: {
      name: "login-passwordless-sms-otp",
      texts: {
        pageTitle: "Mock Login with SMS OTP",
        description: "Mock description text.",
        otpPlaceholder: "Enter OTP",
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
        username: "Mock Phone Number",
      },
      signupLink: null,
      resetPasswordLink: null,
      backLink: null,
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
  .mockImplementation(() => createMockLoginPasswordlessSmsOtpInstance());
