/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React Passkey Enrollment Local hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 *
 */
import type {
  ScreenMembersOnPasskeyEnrollmentLocal,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the passkey-enrollment-local
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockPasskeyEnrollmentLocalInstance {
  continuePasskeyEnrollment: jest.Mock;
  abortPasskeyEnrollment: jest.Mock;
  screen: ScreenMembersOnPasskeyEnrollmentLocal;
  transaction: TransactionMembers;
}

/**
 * Factory function to create a new mock instance for passkey-enrollment-local functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockPasskeyEnrollmentLocalInstance =
  (): MockPasskeyEnrollmentLocalInstance => ({
    continuePasskeyEnrollment: jest.fn(),
    abortPasskeyEnrollment: jest.fn(),
    screen: {
      name: "passkey-enrollment-local",
      texts: {
        title: "Create a passkey for All Applications on this device",
        pageTitle: "Log in | All Applications",
        description: "Log in to continue to All Applications.",
        passkeyBenefit1Title: "Sign in quickly with this device",
        passkeyBenefit1ImgAltText: "Lock",
        passkeyBenefit1Description:
          "You won't need to use another device's passkey next time you sign in.",
        passkeyBenefit2Title: "No need to remember a password",
        passkeyBenefit2ImgAltText: "Webauthn platform icon",
        passkeyBenefit2Description:
          "With passkeys, you can use things like your fingerprint or face to login.",
        createButtonText: "Create a new passkey",
        continueButtonText: "Continue without a new passkey",
        checkboxText: "Don't show me this again",
        "passkey-enrollment-failure":
          "Something went wrong. Please try again later.",
        "passkey-enrollment-max-allowed-reached":
          "You have created the maximum number of passkeys for your account.",
      },
      isCaptchaAvailable: true,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: {
        helpLink: "/test-help-local",
      },
      data: {
        phone_number: "Mock Phone Number Local",
        username: "Mock Username Local",
      },
      publicKey: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state-local",
      locale: "en",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
  });

// Mock the passkey-enrollment-local hooks and methods
const mockPasskeyEnrollmentLocalInstance =
  createMockPasskeyEnrollmentLocalInstance();

export const usePasskeyEnrollmentLocal = jest.fn(() => ({
  continuePasskeyEnrollment:
    mockPasskeyEnrollmentLocalInstance.continuePasskeyEnrollment,
  abortPasskeyEnrollment:
    mockPasskeyEnrollmentLocalInstance.abortPasskeyEnrollment,
}));

export const useScreen = jest.fn(
  () => mockPasskeyEnrollmentLocalInstance.screen
);
export const useTransaction = jest.fn(
  () => mockPasskeyEnrollmentLocalInstance.transaction
);
export const continuePasskeyEnrollment =
  mockPasskeyEnrollmentLocalInstance.continuePasskeyEnrollment;
export const abortPasskeyEnrollment =
  mockPasskeyEnrollmentLocalInstance.abortPasskeyEnrollment;

export default jest
  .fn()
  .mockImplementation(() => createMockPasskeyEnrollmentLocalInstance());
