import type {
  ErrorItem,
  ScreenMembersOnMfaEmailChallenge,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the full contract of a mocked MFA Email Challenge instance
 * used in unit tests.
 */
export interface MockMfaEmailChallengeInstance {
  handleContinue: jest.Mock;
  handleResendEmail: jest.Mock;
  handleTryAnotherMethod: jest.Mock;
  screen: ScreenMembersOnMfaEmailChallenge;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory to create a new mock MFA Email Challenge instance that simulates
 * the behavior and data provided by the Auth0 React SDK during MFA email challenge flows.
 *
 * This mock is based on the JSON configuration.
 */
export const createMockMfaEmailChallengeInstance =
  (): MockMfaEmailChallengeInstance => ({
    handleContinue: jest.fn(),
    handleResendEmail: jest.fn(),
    handleTryAnotherMethod: jest.fn(),
    screen: {
      name: "mfa-email-challenge",
      texts: {
        pageTitle: "Enter your email code to log in | MockApplication",
        backText: "Go Back",
        buttonText: "Continue",
        description: "We've sent an email with your code to",
        pickAuthenticatorText: "Try another method",
        placeholder: "Enter the code",
        rememberMeText: "Remember this device for 30 days",
        resendActionText: "Resend",
        resendText: "Didn't receive an email?",
        title: "Verify Your Identity",
        logoAltText: "test3",
        badgeUrl:
          "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
        badgeAltText: "Link to the Auth0 website",
        error: "Error",
        qrCode: "QR Code",
        spinner_push_notification_label:
          "Waiting for push notification to be accepted",
      },
      data: {
        showRememberDevice: true,
        email: "xyz*****@abc******",
      },
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
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
      id: null,
      email: null,
      username: null,
      phoneNumber: null,
      picture: null,
      enrolledFactors: null,
      enrolledEmails: [{ id: 0, email: "xyz*****@abc******" }],
      enrolledPhoneNumbers: null,
      enrolledDevices: null,
      organizations: null,
      userMetadata: null,
      appMetadata: null,
    },
  });

const mockMfaEmailChallengeInstance = createMockMfaEmailChallengeInstance();

export const useScreen = jest.fn(() => mockMfaEmailChallengeInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaEmailChallengeInstance.transaction
);
export const useUser = jest.fn(() => mockMfaEmailChallengeInstance.user);
const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byType: jest.fn().mockReturnValue(mockErrors),
    byField: jest.fn().mockReturnValue([]),
  },
  hasError: false,
  dismiss: jest.fn(),
}));
export const useResend = jest.fn(() => ({
  remaining: 30,
  disabled: false,
  startResend: jest.fn(),
}));

export const useMfaEmailChallenge = jest.fn(() => ({
  handleContinue: mockMfaEmailChallengeInstance.handleContinue,
  handleResendEmail: mockMfaEmailChallengeInstance.handleResendEmail,
  handleTryAnotherMethod: mockMfaEmailChallengeInstance.handleTryAnotherMethod,
}));

// Export SDK methods directly
export const continueMethod = mockMfaEmailChallengeInstance.handleContinue;
export const resendCode = mockMfaEmailChallengeInstance.handleResendEmail;
export const tryAnotherMethod =
  mockMfaEmailChallengeInstance.handleTryAnotherMethod;

/**
 * Default export for Jest mock injection using `jest.mock(...)`.
 */
export default jest
  .fn()
  .mockImplementation(() => createMockMfaEmailChallengeInstance());
