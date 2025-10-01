/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React mfa-sms-challenge hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type { TransactionMembers } from "@auth0/auth0-acul-react";
import type { ScreenMembersOnMfaSmsChallenge } from "@auth0/auth0-acul-react/mfa-sms-challenge";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-sms-challenge
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaSmsChallengeInstance {
  continueMfaSmsChallenge: jest.Mock;
  resendCode: jest.Mock;
  getACall: jest.Mock;
  pickSms: jest.Mock;
  tryAnotherMethod: jest.Mock;
  screen: ScreenMembersOnMfaSmsChallenge;
  transaction: TransactionMembers;
}

/**
 * Factory function to create a new mock instance for mfa-sms-challenge functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaSmsChallengeInstance =
  (): MockMfaSmsChallengeInstance => ({
    continueMfaSmsChallenge: jest.fn(),
    resendCode: jest.fn(),
    getACall: jest.fn(),
    pickSms: jest.fn(),
    tryAnotherMethod: jest.fn(),
    screen: {
      name: "mfa-sms-challenge",
      texts: {
        pageTitle: "Verify Your Identity - MFA",
        title: "Verify Your Identity",
        description: "We've sent a text message to:",
        placeholder: "Enter the 6-digit code",
        buttonText: CommonTestData.commonTexts.continue,
        rememberDeviceText: "Remember this device for 30 days",
        resendText: "Didn't receive a code?",
        resendLinkText: "Resend",
        getCallText: "Get a call",
        tryAnotherMethodText: "Try another method",
        captchaCodePlaceholder: "Enter the code shown above",
        logoAltText: "Application Logo",
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
        phoneNumber: "XXXXXXXXX1360",
        showRememberDevice: true,
        showLinkVoice: true,
      },
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state",
      locale: "en",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
  });

// Mock the mfa-sms-challenge hooks and methods
const mockMfaSmsChallengeInstance = createMockMfaSmsChallengeInstance();

export const useMfaSmsChallenge = jest.fn(() => ({
  continueMfaSmsChallenge: mockMfaSmsChallengeInstance.continueMfaSmsChallenge,
  resendCode: mockMfaSmsChallengeInstance.resendCode,
  getACall: mockMfaSmsChallengeInstance.getACall,
  pickSms: mockMfaSmsChallengeInstance.pickSms,
  tryAnotherMethod: mockMfaSmsChallengeInstance.tryAnotherMethod,
}));

export const useScreen = jest.fn(() => mockMfaSmsChallengeInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaSmsChallengeInstance.transaction
);

// Export named functions for direct access in tests
export const continueMfaSmsChallenge =
  mockMfaSmsChallengeInstance.continueMfaSmsChallenge;
export const resendCode = mockMfaSmsChallengeInstance.resendCode;
export const getACall = mockMfaSmsChallengeInstance.getACall;
export const pickSms = mockMfaSmsChallengeInstance.pickSms;
export const tryAnotherMethod = mockMfaSmsChallengeInstance.tryAnotherMethod;

export default jest
  .fn()
  .mockImplementation(() => createMockMfaSmsChallengeInstance());
