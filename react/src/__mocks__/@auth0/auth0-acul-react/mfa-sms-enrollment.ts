import type { ScreenMembersOnMfaSmsEnrollment } from "@auth0/auth0-acul-react/mfa-sms-enrollment";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-sms-enrollment
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaSmsEnrollmentInstance {
  continueEnrollment: jest.Mock;
  pickCountryCode: jest.Mock;
  tryAnotherMethod: jest.Mock;
  screen: ScreenMembersOnMfaSmsEnrollment;
  transaction: {
    hasErrors: boolean;
    errors: Array<{ message: string; field?: string }>;
    state: string;
    locale: string;
    countryCode: string | null;
    countryPrefix: string | null;
  };
}

/**
 * Factory function to create a new mock instance for mfa-sms-enrollment functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaSmsEnrollmentInstance =
  (): MockMfaSmsEnrollmentInstance => ({
    continueEnrollment: jest.fn(),
    pickCountryCode: jest.fn(),
    tryAnotherMethod: jest.fn(),
    screen: {
      name: "mfa-sms-enrollment",
      texts: {
        pageTitle: "Secure Your Account - MFA",
        title: "Add Phone Number",
        description:
          "Enter your phone number below. An SMS will be sent to that number with a code to enter on the next screen.",
        placeholder: "Enter your phone number",
        buttonText: "Continue",
        tryAnotherMethodText: "Try another method",
        errorTitleText: "Error",
        logoAltText: "Application Logo",
      },
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      data: {},
      links: {
        helpLink: "/test-help",
      },
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-mfa-sms-enrollment-state",
      locale: "en",
      countryCode: "US",
      countryPrefix: "+1",
    },
  });

// Mock the mfa-sms-enrollment hooks and methods
const mockMfaSmsEnrollmentInstance = createMockMfaSmsEnrollmentInstance();

export const useMfaSmsEnrollment = jest.fn(() => ({
  continueEnrollment: mockMfaSmsEnrollmentInstance.continueEnrollment,
  pickCountryCode: mockMfaSmsEnrollmentInstance.pickCountryCode,
  tryAnotherMethod: mockMfaSmsEnrollmentInstance.tryAnotherMethod,
}));

export const useScreen = jest.fn(() => mockMfaSmsEnrollmentInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaSmsEnrollmentInstance.transaction
);

export const continueEnrollment =
  mockMfaSmsEnrollmentInstance.continueEnrollment;
export const pickCountryCode = mockMfaSmsEnrollmentInstance.pickCountryCode;
export const tryAnotherMethod = mockMfaSmsEnrollmentInstance.tryAnotherMethod;

export default jest
  .fn()
  .mockImplementation(() => createMockMfaSmsEnrollmentInstance());
