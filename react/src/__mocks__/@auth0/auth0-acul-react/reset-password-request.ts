/**
 * @file Comprehensive mock for the useResetPasswordRequestManager hook.
 */

import {
  ScreenMembersOnResetPasswordRequest,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";
import { jest } from "@jest/globals";

import { ICaptcha } from "@/components/Captcha/index";

export interface ResetPasswordRequestManagerInstance {
  screen: ScreenMembersOnResetPasswordRequest;
  transaction: TransactionMembers;
  errors: string[];
  captcha: ICaptcha;
  isCaptchaAvailable: boolean;
  resetPassword: jest.Mock;
  backToLogin: jest.Mock;
  captchaImage: string | null;
  countryCode: string | null;
  countryPrefix: string | null;
}

/**
 * Factory function to create a fresh mock instance for useResetPasswordRequestManager.
 * Each test can call this for isolation and to customize return values.
 */
export const createMockResetPasswordRequestManagerInstance =
  (): ResetPasswordRequestManagerInstance => ({
    screen: {
      texts: {
        pageTitle: "Reset your password | My App",
        title: "Forgot Your Password?",
        backToLoginLinkText: "Back to My App",
        buttonText: "Continue",
        captchaCodePlaceholder: "Enter the code shown above",
        logoAltText: "Application Logo",
        usernameOrEmailPlaceholder: "Username or Email address",
        usernameOrEmailDescription:
          "Enter your Username or Email address and we will send you instructions to reset your password.",
        emailPlaceholder: "Email address",
        phonePlaceholder: "Phone number",
        descriptionEmail:
          "Enter your email address and we will send you instructions to reset your password.",
        phoneOrUsernameOrEmailDescription:
          "Enter your Phone number or Username or Email address and we will send you instructions to reset your password.",
      },
      data: null,
      name: "",
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
    },
    errors: [],
    captcha: {
      provider: "auth0_v2",
      siteKey: "0x4AAAAAAAQFNSW6xordsuIq",
    },
    isCaptchaAvailable: true,
    resetPassword: jest.fn(),
    backToLogin: jest.fn(),
    captchaImage: null,
    countryCode: "IN",
    countryPrefix: "91",
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

/**
 * Singleton mock instance — tests can reset or override it as needed.
 */
const mockInstance = createMockResetPasswordRequestManagerInstance();

export const useScreen = jest.fn(() => mockInstance.screen);
export const useTransaction = jest.fn(() => mockInstance.transaction);

export const resetPassword = mockInstance.resetPassword;
export const backToLogin = mockInstance.backToLogin;
// Mock the useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byKind: jest.fn(() => []),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));
// Mock the useLoginIdentifiers hook - returns list of active identifiers
export const useLoginIdentifiers = jest.fn(() => ["email", "phone"]);
export const useResetPasswordRequest = jest.fn(() => ({
  resetPassword,
  backToLogin,
}));

export default jest
  .fn()
  .mockImplementation(() => createMockResetPasswordRequestManagerInstance());
