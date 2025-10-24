import type {
  ScreenMembersOnSignupPassword,
  TransactionMembersOnSignupPassword,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the signup-password
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockSignupPasswordInstance {
  signup: jest.Mock;
  screen: ScreenMembersOnSignupPassword;
  transaction: TransactionMembersOnSignupPassword;
}

/**
 * Factory function to create a new mock instance for signup-password functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockSignupPasswordInstance =
  (): MockSignupPasswordInstance => ({
    signup: jest.fn(),
    screen: {
      name: "signup-password",
      texts: {
        pageTitle: "Create a password to sign up | All Applications",
        title: "Create Your Account",
        description:
          "Set your password for dev-tenant to continue to All Applications",
        buttonText: CommonTestData.commonTexts.continue,
        footerText: "Already have an account?",
        footerLinkText: CommonTestData.commonTexts.login,
        passwordPlaceholder: "Password",
        passwordSecurityText: "Your password must contain:",
        emailPlaceholder: "Email address",
        phonePlaceholder: "Phone number",
        usernamePlaceholder: "Username",
        editEmailText: "Edit",
        editPhoneText: "Edit",
        editUsernameText: "Edit",
        showPasswordText: "Show password",
        hidePasswordText: "Hide password",
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
      editLink: "/edit-identifier",
      data: {
        email: "test@example.com",
        username: "testuser",
        phoneNumber: "+1234567890",
      },
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state",
      locale: "en",
      isPasskeyEnabled: false,
      passwordPolicy: null,
      requiredIdentifiers: [],
      optionalIdentifiers: [],
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: "database",
      currentConnection: null,
      alternateConnections: [],
    },
  });

// Mock the signup-password hooks and methods
const mockSignupPasswordInstance = createMockSignupPasswordInstance();

export const useSignupPassword = jest.fn(() => ({
  signup: mockSignupPasswordInstance.signup,
}));

export const useScreen = jest.fn(() => mockSignupPasswordInstance.screen);
export const useTransaction = jest.fn(
  () => mockSignupPasswordInstance.transaction
);
/**
 * Mock password validation that returns realistic validation rules
 * Compatible with passwordValidator.ts utilities
 */
export const usePasswordValidation = jest.fn((password: string) => [
  {
    code: "password-policy-length-at-least",
    policy: "At least 8 characters",
    isValid: password ? password.length >= 8 : false,
  },
  {
    code: "password-policy-contains-at-least",
    policy: "At least 2 of the following:",
    isValid: password ? getValidCharacterTypesCount(password) >= 2 : false,
  },
  {
    code: "password-policy-lower-case",
    policy: "Lower case letters (a-z)",
    isValid: password ? /[a-z]/.test(password) : false,
  },
  {
    code: "password-policy-upper-case",
    policy: "Upper case letters (A-Z)",
    isValid: password ? /[A-Z]/.test(password) : false,
  },
  {
    code: "password-policy-numbers",
    policy: "Numbers (0-9)",
    isValid: password ? /[0-9]/.test(password) : false,
  },
  {
    code: "password-policy-special-characters",
    policy: "Special characters (e.g. !@#$%^&*)",
    isValid: password
      ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)
      : false,
  },
  {
    code: "password-policy-identical-chars",
    policy: "No more than 2 identical characters in a row",
    isValid: password ? !/(.)\\1{2,}/.test(password) : false,
  },
]);

/**
 * Helper function to count valid character types for contains-at-least rule
 */
function getValidCharacterTypesCount(password: string): number {
  let count = 0;
  if (/[a-z]/.test(password)) count++;
  if (/[A-Z]/.test(password)) count++;
  if (/[0-9]/.test(password)) count++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) count++;
  return count;
}

export const signup = mockSignupPasswordInstance.signup;

export default jest
  .fn()
  .mockImplementation(() => createMockSignupPasswordInstance());
