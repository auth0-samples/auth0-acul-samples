/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login-passwordless-sms-otp hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 *
 */
import type {
  ScreenMembersOnLoginPasswordlessSmsOtp,
  TransactionMembersOnLoginPasswordlessSmsOtp,
} from "@auth0/auth0-acul-react/login-passwordless-sms-otp";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the login-passwordless-sms-otp
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockLoginPasswordlessSmsOtpInstance {
  submitOTP: jest.Mock;
  resendOTP: jest.Mock;
  screen: ScreenMembersOnLoginPasswordlessSmsOtp;
  transaction: TransactionMembersOnLoginPasswordlessSmsOtp;
}

/**
 * Factory function to create a new mock instance for login-passwordless-sms-otp functionality.
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
        buttonText: CommonTestData.commonTexts.submit,
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
        phone_number: "Mock Phone Number",
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

// Mock the login-passwordless-sms-otp hooks and methods
const mockLoginPasswordlessSmsOtpInstance =
  createMockLoginPasswordlessSmsOtpInstance();

export const useLoginPasswordlessSmsOtp = jest.fn(() => ({
  submitOTP: mockLoginPasswordlessSmsOtpInstance.submitOTP,
  resendOTP: mockLoginPasswordlessSmsOtpInstance.resendOTP,
}));

export const useScreen = jest.fn(
  () => mockLoginPasswordlessSmsOtpInstance.screen
);
export const useTransaction = jest.fn(
  () => mockLoginPasswordlessSmsOtpInstance.transaction
);
export const submitOTP = mockLoginPasswordlessSmsOtpInstance.submitOTP;
export const resendOTP = mockLoginPasswordlessSmsOtpInstance.resendOTP;

export default jest
  .fn()
  .mockImplementation(() => createMockLoginPasswordlessSmsOtpInstance());
