/**
 * @file This mock provides the contract and default implementation for
 * MFA Login Options flows via the Auth0 ACUL React SDK.
 */

import type { TransactionMembers } from "@auth0/auth0-acul-react";
import type { ScreenMembersOnMfaLoginOptions } from "@auth0/auth0-acul-react/mfa-login-options";

/**
 * Represents a mocked instance of the MFA Login Options state.
 */
export interface MockMfaLoginOptionsInstance {
  handleEnroll: jest.Mock;
  screen: ScreenMembersOnMfaLoginOptions;
  transaction: TransactionMembers;
}

/**
 * Factory to generate a fresh instance of the MFA login options mock.
 */
export const createMockMfaLoginOptionsInstance =
  (): MockMfaLoginOptionsInstance => ({
    handleEnroll: jest.fn(),
    screen: {
      name: "mfa-login-options",
      texts: {
        title: "Select a method to verify your identity",
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
  });

// Default instance used for Jest mocks
const defaultMock = createMockMfaLoginOptionsInstance();

// Hook mocks
export const useMfaLoginOptionsManager = jest.fn(() => ({
  texts: defaultMock.screen.texts,
  errors: [],
  enrolledFactors: ["sms", "otp", "webauthn-roaming", "email"],
  handleEnroll: defaultMock.handleEnroll,
}));

export const useScreen = jest.fn(() => defaultMock.screen);
export const useTransaction = jest.fn(() => defaultMock.transaction);

// Exports for direct access in tests
export const handleEnroll = defaultMock.handleEnroll;

export default jest.fn(() => createMockMfaLoginOptionsInstance());
