/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React Passkey enrollment hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type {
  ErrorItem,
  ScreenMembersOnPasskeyEnrollment,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the passkey-enrollment instance
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockPasskeyEnrollmentInstance {
  continuePasskeyEnrollment: jest.Mock;
  abortPasskeyEnrollment: jest.Mock;
  screen: ScreenMembersOnPasskeyEnrollment;
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
        title: "Create a passkey for All Applications on this device",
        pageTitle: "Log in | All Applications",
        description:
          "Log in to your-tenant-name to continue to All Applications.",
        passkeyBenefit1Title: "No need to remember a password",
        passkeyBenefit1ImgAltText: "Webauthn platform icon",
        passkeyBenefit1Description:
          "With passkeys, you can use things like your fingerprint or face to login.",
        passkeyBenefit2Title: "Works on all of your devices",
        passkeyBenefit2ImgAltText: "Device globe",
        passkeyBenefit2Description:
          "Passkeys will automatically be available across your synced devices.",
        passkeyBenefit3Title: "Keep your account safer",
        passkeyBenefit3ImgAltText: "Shield with check mark",
        passkeyBenefit3Description:
          "Passkeys offer state-of-the-art phishing resistance.",
        createButtonText: "Create a passkey",
        continueButtonText: "Continue without passkeys",
        createButtonResetText: "Create a new passkey",
        usePasswordButtonText: "Create a new password",
        backButtonText: "Go back",
        checkboxText: "Don't show me this again",
        passkeyWithoutCustomDomainsAlertTitle:
          "Passkeys without a custom domain",
        passkeyWithoutCustomDomainsAlertMessage:
          "A Custom Domain should be configured so your users connect their Passkeys with your organization's brand.",
        badgeUrl:
          "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
        badgeAltText: "Link to the Auth0 website",
        error: "Error",
        qrCode: "QR Code",
        spinner_push_notification_label:
          "Waiting for push notification to be accepted",
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
      links: {
        login:
          "/u/login?state=mockedStateForPreservedTextsSignup_cl_mock_preservedTexts_vbn789_txId_lkj321",
        back: "/u/signup/identifier?state=mockedStateForPreservedTextsSignup_cl_mock_preservedTexts_vbn789_txId_lkj321",
      },
      backLink: null,
      loginLink: null,
      publicKey: null,
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      captcha: null,
    },
  });

// Mock the Passkey Enrollment hooks and methods
const mockPasskeyEnrollmentInstance = createMockPasskeyEnrollmentInstance();

export const usePasskeyEnrollment = jest.fn(() => ({
  continuePasskeyEnrollment:
    mockPasskeyEnrollmentInstance.continuePasskeyEnrollment,
  abortPasskeyEnrollment: mockPasskeyEnrollmentInstance.abortPasskeyEnrollment,
  screen: mockPasskeyEnrollmentInstance.screen,
}));

const mockErrors: ErrorItem[] = [];

// Mock the useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byType: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

export const useScreen = jest.fn(() => mockPasskeyEnrollmentInstance.screen);
// Export named functions for direct access in tests
export const continuePasskeyEnrollment =
  mockPasskeyEnrollmentInstance.continuePasskeyEnrollment;
export const abortPasskeyEnrollment =
  mockPasskeyEnrollmentInstance.abortPasskeyEnrollment;

export default jest
  .fn()
  .mockImplementation(() => createMockPasskeyEnrollmentInstance());
