/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React login-passwordless-sms-otp hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 *
 */
import type {
  ScreenMembersOnPasskeyEnrollment,
  TransactionMembers,
} from "@auth0/auth0-acul-react/passkey-enrollment";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the passkey-enrollment
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockPasskeyEnrollmentInstance {
  continuePasskeyEnrollment: jest.Mock;
  abortPasskeyEnrollment: jest.Mock;
  screen: ScreenMembersOnPasskeyEnrollment;
  transaction: TransactionMembers;
}

/**
 * Factory function to create a new mock instance for passkey-enrollment functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockPasskeyEnrollmentInstance =
  (): MockPasskeyEnrollmentInstance => ({
    continuePasskeyEnrollment: jest.fn(),
    abortPasskeyEnrollment: jest.fn(),
    screen: {
      name: "passkey-enrollment",
      texts: {
        pageTitle: "Mock Passkey Enrollment",
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
      backLink: null,
      loginLink: null,
      publicKey: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state",
      locale: "en",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
  });

// Mock the login-passwordless-sms-otp hooks and methods
const mockPasskeyEnrollmentInstance = createMockPasskeyEnrollmentInstance();

export const usePasske = jest.fn(() => ({
  continuePasskeyEnrollment:
    mockPasskeyEnrollmentInstance.continuePasskeyEnrollment,
  abortPasskeyEnrollment: mockPasskeyEnrollmentInstance.abortPasskeyEnrollment,
}));

export const useScreen = jest.fn(() => mockPasskeyEnrollmentInstance.screen);
export const useTransaction = jest.fn(
  () => mockPasskeyEnrollmentInstance.transaction
);
export const continuePasskeyEnrollment =
  mockPasskeyEnrollmentInstance.continuePasskeyEnrollment;
export const resendOTP = mockPasskeyEnrollmentInstance.abortPasskeyEnrollment;

export default jest
  .fn()
  .mockImplementation(() => createMockPasskeyEnrollmentInstance());
