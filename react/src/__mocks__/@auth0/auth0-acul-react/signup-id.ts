/**
 * @file Mock for Auth0 ACUL React signup-id hooks and methods.
 * This file provides a comprehensive mock for the Auth0 ACUL React signup-id hooks.
 *
 */
import type {
  ScreenMembersOnSignupId,
  TransactionMembersOnSignupId,
} from "@auth0/auth0-acul-react/signup-id";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the signup-id
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockSignupIdInstance {
  signup: jest.Mock;
  federatedSignup: jest.Mock;
  pickCountryCode: jest.Mock;
  screen: ScreenMembersOnSignupId;
  transaction: TransactionMembersOnSignupId;
}

/**
 * Factory function to create a new mock instance for signup-id functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockSignupIdInstance = (): MockSignupIdInstance => ({
  signup: jest.fn(),
  federatedSignup: jest.fn(),
  pickCountryCode: jest.fn(),
  screen: {
    name: "signup-id",
    texts: {
      pageTitle: "Mock Signup",
      title: "Create Your Account",
      subtitle: "Sign up to Mock Company to continue to Mock App.",
      buttonText: CommonTestData.commonTexts.continue,
      separatorText: "OR",
      footerText: "Already have an account?",
      footerLinkText: CommonTestData.commonTexts.login,
    },
    isCaptchaAvailable: false,
    captchaProvider: null,
    captchaSiteKey: null,
    captchaImage: null,
    captcha: null,
    links: {
      helpLink: "/test-help",
    },
    loginLink: "/login",
    data: {},
  },
  transaction: {
    hasErrors: false,
    errors: [],
    state: "mock-state",
    locale: "en",
    requiredIdentifiers: ["phone"],
    optionalIdentifiers: ["email", "username"],
    countryCode: null,
    countryPrefix: null,
    connectionStrategy: "database",
    currentConnection: null,
    alternateConnections: CommonTestData.socialConnections.slice(0, 2), // Just Google and Github
    isPasskeyEnabled: false,
    usernamePolicy: null,
  },
});

// Mock the signup-id hooks and methods
const mockSignupIdInstance = createMockSignupIdInstance();

export const useSignupId = jest.fn(() => ({
  signup: mockSignupIdInstance.signup,
  federatedSignup: mockSignupIdInstance.federatedSignup,
  pickCountryCode: mockSignupIdInstance.pickCountryCode,
}));

export const useScreen = jest.fn(() => mockSignupIdInstance.screen);
export const useTransaction = jest.fn(() => mockSignupIdInstance.transaction);
export const signup = mockSignupIdInstance.signup;
export const federatedSignup = mockSignupIdInstance.federatedSignup;
export const pickCountryCode = mockSignupIdInstance.pickCountryCode;

export default jest.fn().mockImplementation(() => createMockSignupIdInstance());
