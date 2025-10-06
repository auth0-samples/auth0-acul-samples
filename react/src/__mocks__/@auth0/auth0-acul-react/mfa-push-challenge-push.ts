import type { ScreenMembersOnMfaPushChallengePush } from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-push-challenge-push screen
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaPushChallengeInstance {
  continue: jest.Mock;
  resendPushNotification: jest.Mock;
  enterCodeManually: jest.Mock;
  tryAnotherMethod: jest.Mock;
  screen: ScreenMembersOnMfaPushChallengePush;
  transaction: {
    hasErrors: boolean;
    errors: Array<{ message: string; field?: string }>;
    state: string;
    locale: string;
  };
}

/**
 * Factory function to create a new mock instance for mfa-sms-enrollment functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaPushChallengeInstance =
  (): MockMfaPushChallengeInstance => ({
    continue: jest.fn(),
    resendPushNotification: jest.fn(),
    enterCodeManually: jest.fn(),
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
      links: {
        helpLink: "/test-help",
      },
      data: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-mfa-push-challenge-push-state",
      locale: "en",
    },
  });

// Mock the mfa-push-challenge hooks and methods
const mockMfaSmsEnrollmentInstance = createMockMfaPushChallengeInstance();

export const useMfaSmsEnrollment = jest.fn(() => ({
  continue: mockMfaSmsEnrollmentInstance.continue,
  resendPushNotification: mockMfaSmsEnrollmentInstance.resendPushNotification,
  enterCodeManually: mockMfaSmsEnrollmentInstance.enterCodeManually,
  tryAnotherMethod: mockMfaSmsEnrollmentInstance.tryAnotherMethod,
}));

export const useScreen = jest.fn(() => mockMfaSmsEnrollmentInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaSmsEnrollmentInstance.transaction
);

export default jest
  .fn()
  .mockImplementation(() => createMockMfaPushChallengeInstance());
