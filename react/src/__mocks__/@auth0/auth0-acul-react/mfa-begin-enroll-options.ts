import type {
  ScreenMembers,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the full contract of a mocked MFA Begin Enroll Options instance
 * used in unit tests.
 */
export interface MockMfaBeginEnrollOptionsInstance {
  enroll: jest.Mock;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  user?: {
    enrolledFactors?: string[];
  };
}

/**
 * Factory to create a new mock MFA Begin Enroll Options instance that simulates
 * the behavior and data provided by the Auth0 React SDK during MFA enrollment flows.
 */
export const createMockMfaBeginEnrollOptionsInstance =
  (): MockMfaBeginEnrollOptionsInstance => ({
    enroll: jest.fn(),
    screen: {
      name: "mfa-begin-enroll-options",
      texts: {
        pageTitle: "Add another authentication method | All Applications",
        authenticatorNamesSMS: "SMS",
        authenticatorNamesPhone: "Phone",
        authenticatorNamesPushNotification: "Push Notification",
        authenticatorNamesOTP: "Authenticator App",
        authenticatorNamesWebauthnRoaming: "Security Key",
        authenticatorNamesEmail: "Email",
      },
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
      data: {
        enrollmentOptions: ["sms", "otp", "webauthn-roaming", "email"],
      },
    },
    transaction: {
      state: "",
      locale: "",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      hasErrors: false,
      errors: null,
      currentConnection: null,
      alternateConnections: null,
    },
    user: {
      enrolledFactors: ["sms", "otp", "webauthn-roaming", "email"],
    },
  });

const mockMfaBeginEnrollOptionsInstance =
  createMockMfaBeginEnrollOptionsInstance();

export const useScreen = jest.fn(
  () => mockMfaBeginEnrollOptionsInstance.screen
);
export const useTransaction = jest.fn(
  () => mockMfaBeginEnrollOptionsInstance.transaction
);
export const useMfaBeginEnrollOptions = jest.fn(
  () => mockMfaBeginEnrollOptionsInstance
);

// Export SDK method directly
export const enroll = mockMfaBeginEnrollOptionsInstance.enroll;

/**
 * Default export for Jest mock injection using `jest.mock(...)`.
 */
export default jest
  .fn()
  .mockImplementation(() => createMockMfaBeginEnrollOptionsInstance());
