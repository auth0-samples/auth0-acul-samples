/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React Passkey Enrollment Local hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 *
 */
import type {
  ErrorItem,
  ScreenMembersOnPasskeyEnrollmentLocal,
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
        back: "/u/signup/identifier?state=mockedStateForPreservedTextsSignup_cl_mock_preservedTexts_vbn789_txId_lkj321",
      },
      data: {
        passkey: {
          public_key: {
            user: {
              id: "mocked_id_client",
              name: "foo1@bar.com",
              displayName: "foo1@bar.com",
            },
            rp: {
              id: "mocked_id_client",
              name: "mocked_id_client",
            },
            challenge: "mock_challenge",
            pubKeyCredParams: [
              {
                type: "public-key",
                alg: -8,
              },
            ],
            authenticatorSelection: {
              residentKey: "required",
              userVerification: "preferred",
            },
          },
        },
      },
      publicKey: null,
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

export const useScreen = jest.fn(
  () => mockPasskeyEnrollmentLocalInstance.screen
);
export const continuePasskeyEnrollment =
  mockPasskeyEnrollmentLocalInstance.continuePasskeyEnrollment;
export const abortPasskeyEnrollment =
  mockPasskeyEnrollmentLocalInstance.abortPasskeyEnrollment;

export default jest
  .fn()
  .mockImplementation(() => createMockPasskeyEnrollmentLocalInstance());
