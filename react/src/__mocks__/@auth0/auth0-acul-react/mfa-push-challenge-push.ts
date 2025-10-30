import type {
  ErrorItem,
  ScreenMembersOnMfaPushChallengePush,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-push-challenge-push screen
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaPushChallengePushInstance {
  continue: jest.Mock;
  resendPushNotification: jest.Mock;
  enterCodeManually: jest.Mock;
  tryAnotherMethod: jest.Mock;
  screen: ScreenMembersOnMfaPushChallengePush;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance form mfa-push-challenge-push functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaPushChallengePushInstance =
  (): MockMfaPushChallengePushInstance => ({
    continue: jest.fn(),
    resendPushNotification: jest.fn(),
    enterCodeManually: jest.fn(),
    tryAnotherMethod: jest.fn(),
    screen: {
      name: "mfa-push-challenge-push",
      texts: {
        pageTitle: "Accept the push notification to log in | My App",
        title: "Verify Your Identity",
        description:
          "We’ve sent a notification to the following device via the Auth0 Guardian app:",
        buttonText: "I've responded on my device",
        pickAuthenticatorText: "Try another method",
        rememberMeText: "Remember this device for 30 days",
        resendActionText: "Resend",
        resendText: "Didn't receive a notification?",
        enterOtpCode: "Manually Enter Code",
        separatorText: "OR",
        logoAltText: "dev-abc",
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
      data: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-mfa-push-challenge-push-state",
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

// Mock the mfa-push-challenge-push hooks and methods
const mockMfaPushChallengePushInstance =
  createMockMfaPushChallengePushInstance();

export const useMfaPushChallengePush = jest.fn(() => ({
  continue: mockMfaPushChallengePushInstance.continue,
  resendPushNotification:
    mockMfaPushChallengePushInstance.resendPushNotification,
  enterCodeManually: mockMfaPushChallengePushInstance.enterCodeManually,
  tryAnotherMethod: mockMfaPushChallengePushInstance.tryAnotherMethod,
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

export const useScreen = jest.fn(() => mockMfaPushChallengePushInstance.screen);
export const useUser = jest.fn(() => mockMfaPushChallengePushInstance.user);
export const useTransaction = jest.fn(
  () => mockMfaPushChallengePushInstance.transaction
);

// Export named functions for direct access in tests
export const resendPushNotification =
  mockMfaPushChallengePushInstance.resendPushNotification;
export const enterCodeManually =
  mockMfaPushChallengePushInstance.enterCodeManually;
export const tryAnotherMethod =
  mockMfaPushChallengePushInstance.tryAnotherMethod;

export default jest
  .fn()
  .mockImplementation(() => createMockMfaPushChallengePushInstance());
