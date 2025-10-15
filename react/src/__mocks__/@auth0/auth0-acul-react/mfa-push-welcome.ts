import type {
  ScreenMembersOnMfaPushWelcome,
  UserMembers,
} from "@auth0/auth0-acul-react/mfa-push-welcome";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-push-welcome screen
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaPushWelcomeInstance {
  enroll: jest.Mock;
  pickAuthenticator: jest.Mock;
  screen: ScreenMembersOnMfaPushWelcome;
  transaction: {
    hasErrors: boolean;
    errors: Array<{ message: string; field?: string }>;
    state: string;
    locale: string;
  };
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance for mfa-sms-enrollment functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaPushWelcomeInstance =
  (): MockMfaPushWelcomeInstance => ({
    enroll: jest.fn(),
    pickAuthenticator: jest.fn(),
    screen: {
      name: "mfa-push-welcome",
      texts: {
        pageTitle: "Install the application | All Applications",
        title: "Secure Your Account",
        description:
          "In order to continue, install the Auth0 Guardian app via the app store from your mobile device.",
        androidButtonText: "Google Play",
        buttonText: "Continue",
        iosButtonText: "App Store",
        pickAuthenticatorText: "Try another method",
        logoAltText: "Logo Dummy Text",
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
        ios: "mock_ios_link",
        android: "mock_android_link",
      },
      data: null,
      screen: {
        name: "",
        links: {
          ios: "mock-ios-link",
          android: "mock-android-link",
        },
      },
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-mfa-push-welcome-state",
      locale: "en",
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

// Mock the mfa-push-welcome hooks and methods
const mockMfaWelcomeInstance = createMockMfaPushWelcomeInstance();

export const enroll = mockMfaWelcomeInstance.enroll;
export const pickAuthenticator = mockMfaWelcomeInstance.pickAuthenticator;

export const useMfaPushWelcome = jest.fn(() => ({
  enroll: mockMfaWelcomeInstance.enroll,
  pickAuthenticator: mockMfaWelcomeInstance.pickAuthenticator,
}));

export const useScreen = jest.fn(() => mockMfaWelcomeInstance.screen);
export const useUser = jest.fn(() => mockMfaWelcomeInstance.user);
export const useTransaction = jest.fn(() => mockMfaWelcomeInstance.transaction);

export default jest
  .fn()
  .mockImplementation(() => createMockMfaPushWelcomeInstance());
