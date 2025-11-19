/**
 * @file This mock provides the contract and default implementation for
 * MFA Login Options flows via the Auth0 ACUL React SDK.
 */

import type {
  ErrorItem,
  ScreenMembersOnMfaLoginOptions,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Represents a mocked instance of the MFA Login Options state.
 */
export interface MockMfaLoginOptionsInstance {
  enroll: jest.Mock;
  screen: ScreenMembersOnMfaLoginOptions;
  transaction: TransactionMembers;
  user?: {
    enrolledFactors?: string[];
  };
}

/**
 * Factory to generate a fresh instance of the MFA login options mock.
 */
export const createMockMfaLoginOptionsInstance =
  (): MockMfaLoginOptionsInstance => ({
    enroll: jest.fn(),
    screen: {
      name: "mfa-login-options",
      texts: {
        pageTitle: "Choose authentication method | All Applications",
        title: "Choose an authentication method",
        authenticatorNamesSMS: "SMS",
        authenticatorNamesOTP: "OTP App",
        authenticatorNamesWebauthnRoaming: "Security Key",
        authenticatorNamesEmail: "Email",
        authenticatorNamesDUO: "Notification via DUO app",
        backText: "Go back",
      },
      data: {
        enrolled_factors: [],
      },
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
    },
    transaction: {
      state: "mock-state",
      locale: "en",
      hasErrors: false,
      errors: [],
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
    user: {
      enrolledFactors: ["sms", "otp", "webauthn-roaming", "email"],
    },
  });

// Default instance used for Jest mocks
const defaultMock = createMockMfaLoginOptionsInstance();

export const useScreen = jest.fn(() => defaultMock.screen);
export const useTransaction = jest.fn(() => defaultMock.transaction);
export const useMfaLoginOptions = jest.fn(() => defaultMock);
const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byKind: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
}));

export const enroll = defaultMock.enroll;

export default jest.fn(() => createMockMfaLoginOptionsInstance());
