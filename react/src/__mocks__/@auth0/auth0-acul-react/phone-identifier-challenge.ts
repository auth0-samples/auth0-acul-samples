/**
 * @file This file provides a comprehensive mock for the usePhoneIdentifierChallengeManager hook.
 */

import {
  ErrorItem,
  ScreenMembersOnPhoneIdentifierChallenge,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";
import { jest } from "@jest/globals";

export interface PhoneIdentifierTexts {
  resendText?: string;
  resendActionText?: string;
  resendVoiceActionText?: string;
  resendSmsActionText?: string;
  resendLimitReachedText?: string;
  backButtonText?: string;
  smsDescription?: string;
  voiceDescription?: string;
  logoAltText?: string;
  title?: string;
  buttonText?: string;
  placeholder?: string;
  resendSmsActionSeparatorTextBefore?: string;
}

export interface PhoneIdentifierData {
  phone?: string;
  messageType?: "text" | "voice" | string;
}

export interface PhoneIdentifierChallengeManagerInstance {
  screen: ScreenMembersOnPhoneIdentifierChallenge;
  transaction: TransactionMembers;
  resendCode: jest.Mock;
  returnToPrevious: jest.Mock;
  submitPhoneChallenge: jest.Mock;
  errors: string[];
}

/**
 * Factory function to create a new mock instance for usePhoneIdentifierChallengeManager.
 * Each test can get a fresh isolated mock instance that reflects the expected SDK shape.
 */
export const createMockPhoneIdentifierChallengeManagerInstance =
  (): PhoneIdentifierChallengeManagerInstance => ({
    screen: {
      texts: {
        resendText: "Didn't receive a code?",
        resendActionText: "Resend",
        resendVoiceActionText: "Call me instead",
        resendSmsActionText: "Send a text instead",
        resendLimitReachedText: "Code has been resent.",
        backButtonText: "Go back",
        smsDescription: "We've sent a text message",
        voiceDescription: "We've sent a voice call",
        logoAltText: "App Logo",
        title: "Verify Your Identity",
        buttonText: "Continue",
        placeholder: "Enter the 6-digit code",
        resendSmsActionSeparatorTextBefore: "or",
      },
      data: {
        phone: "+1234567890",
        messageType: "text",
      },
      name: "",
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
    },
    resendCode: jest.fn(),
    returnToPrevious: jest.fn(),
    submitPhoneChallenge: jest.fn(),
    errors: [],
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

const mockInstance = createMockPhoneIdentifierChallengeManagerInstance();

export const useScreen = jest.fn(() => mockInstance.screen);
export const useTransaction = jest.fn(() => mockInstance.transaction);
const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byKind: jest.fn().mockReturnValue(mockErrors),
    byField: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
}));

export const useResend = jest.fn(() => ({
  remaining: 0,
  disabled: false,
  startResend: jest.fn(),
}));

export const resendCode = mockInstance.resendCode;
export const returnToPrevious = mockInstance.returnToPrevious;
export const submitPhoneChallenge = mockInstance.submitPhoneChallenge;
export const usePhoneIdentifierChallenge = jest.fn(() => ({
  resendCode,
  returnToPrevious,
  submitPhoneChallenge,
}));

export default jest
  .fn()
  .mockImplementation(() =>
    createMockPhoneIdentifierChallengeManagerInstance()
  );
