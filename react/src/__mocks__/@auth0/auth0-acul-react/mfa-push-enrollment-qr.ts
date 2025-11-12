import type {
  ErrorItem,
  ScreenMembersOnMfaPushEnrollmentQr,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-push-enrollment-qr screen
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaPushEnrollmentQRInstance {
  pickAuthenticator: jest.Mock;
  screen: ScreenMembersOnMfaPushEnrollmentQr;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance for mfa-push-enrollment-qr functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaPushEnrollmentQRInstance =
  (): MockMfaPushEnrollmentQRInstance => ({
    pickAuthenticator: jest.fn(),
    screen: {
      name: "mfa-push-enrollment-qr",
      texts: {
        pageTitle:
          "Scan the code to log in using a push notification | All Applications",
        title: "Secure Your Account",
        description:
          "Scan the QR Code below using the Auth0 Guardian app on your mobile device.",
        pickAuthenticatorText: "Try another method",
        buttonText: "Continue",
        logoAltText: "Logo Dummy Text",
        descriptionDeeplink:
          "Click the link or scan the QR code below to add your account to your authenticator",
        useDeeplinkText: "Add account to your authenticator",
        deepLinkSeparatorText: "Or scan the QR code",
        copyCodeLinkText: "Copy as code",
        badgeUrl:
          "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
        badgeAltText: "Link to the Auth0 website",
        error: "Error",
        qrCode: "QR Code",
        spinner_push_notification_label:
          "Waiting for push notification to be accepted",
      },
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: {
        helpLink: "/test-help",
      },
      data: {
        qrUri: "mocked_qr_uri",
        showCodeCopy: true,
        qrCode: "mocked_qr_data_url",
      },
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-mfa-push-enrollment-qr-state",
      locale: "en",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
    user: {
      id: "dummy_id",
      email: null,
      username: null,
      phoneNumber: null,
      picture: null,
      enrolledFactors: ["phone_notification", "otp"],
      enrolledEmails: null,
      enrolledPhoneNumbers: null,
      enrolledDevices: null,
      organizations: null,
      userMetadata: null,
      appMetadata: null,
    },
  });

// Mock the mfa-push-enrollment hooks and methods
const mockMfaPushEnrollmentQRInstance = createMockMfaPushEnrollmentQRInstance();

export const pickAuthenticator =
  mockMfaPushEnrollmentQRInstance.pickAuthenticator;

export const useMfaPushEnrollmentQr = jest.fn(() => ({
  screen: mockMfaPushEnrollmentQRInstance.screen,
  pickAuthenticator: mockMfaPushEnrollmentQRInstance.pickAuthenticator,
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

// Mock the useMfaPolling hook
export const useMfaPolling = jest.fn(() => ({
  isRunning: true,
  startPolling: jest.fn(),
  stopPolling: jest.fn(),
}));

export const useScreen = jest.fn(() => mockMfaPushEnrollmentQRInstance.screen);
export const useUser = jest.fn(() => mockMfaPushEnrollmentQRInstance.user);
export const useTransaction = jest.fn(
  () => mockMfaPushEnrollmentQRInstance.transaction
);

export default jest
  .fn()
  .mockImplementation(() => createMockMfaPushEnrollmentQRInstance());
