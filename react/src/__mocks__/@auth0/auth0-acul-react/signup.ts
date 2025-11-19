import type {
  ScreenMembersOnSignup,
  TransactionMembersOnSignup,
} from "@auth0/auth0-acul-react/types";

import { CommonTestData } from "@/test/fixtures/common-data";

/**
 * Defines the "contract" for our mock. It combines the methods from the signup
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockSignupInstance {
  signup: jest.Mock;
  federatedSignup: jest.Mock;
  pickCountryCode: jest.Mock;
  screen: ScreenMembersOnSignup;
  transaction: TransactionMembersOnSignup;
}

/**
 * Factory function to create a new mock instance for signup functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockSignupInstance = (): MockSignupInstance => ({
  signup: jest.fn(),
  federatedSignup: jest.fn(),
  pickCountryCode: jest.fn(),
  screen: {
    name: "signup",
    texts: {
      pageTitle: "Mock Signup",
      title: "Create Your Account",
      subtitle: "Sign up to Mock Company to continue to Mock App.",
      buttonText: CommonTestData.commonTexts.continue,
      separatorText: "OR",
      footerText: "Already have an account?",
      footerLinkText: CommonTestData.commonTexts.login,
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone number",
      usernamePlaceholder: "Username",
      passwordPlaceholder: "Password",
      passwordSecurityText: "Your password must contain:",
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
    data: {},
  },
  transaction: {
    hasErrors: false,
    errors: [],
    state: "mock-state",
    locale: "en",
    requiredIdentifiers: ["email"],
    optionalIdentifiers: ["phone", "username"],
    countryCode: null,
    countryPrefix: null,
    connectionStrategy: "database",
    currentConnection: null,
    alternateConnections: CommonTestData.socialConnections.slice(0, 2),
    isPasskeyEnabled: false,
    usernamePolicy: null,
    passwordPolicy: null,
  },
});

// Mock the signup hooks and methods
const mockSignupInstance = createMockSignupInstance();

export const useSignup = jest.fn(() => ({
  signup: mockSignupInstance.signup,
  federatedSignup: mockSignupInstance.federatedSignup,
  pickCountryCode: mockSignupInstance.pickCountryCode,
}));

export const useScreen = jest.fn(() => mockSignupInstance.screen);
export const useTransaction = jest.fn(() => mockSignupInstance.transaction);

// Mock the useSignupIdentifiers hook
export const useSignupIdentifiers = jest.fn(() => [
  { type: "email", required: true },
  { type: "phone", required: false },
  { type: "username", required: false },
]);

// Mock the useUsernameValidation hook
export const useUsernameValidation = jest.fn(() => ({
  isValid: true,
  errors: [],
}));

// Mock the usePasswordValidation hook - returns PasswordValidationResult
export const usePasswordValidation = jest.fn((password: string) => {
  const results = [
    {
      code: "password-policy-length-at-least",
      label: "At least 8 characters",
      status: (password && password.length >= 8 ? "valid" : "error") as
        | "valid"
        | "error",
      isValid: password ? password.length >= 8 : false,
    },
    {
      code: "password-policy-lower-case",
      label: "Lower case letters (a-z)",
      status: (password && /[a-z]/.test(password) ? "valid" : "error") as
        | "valid"
        | "error",
      isValid: password ? /[a-z]/.test(password) : false,
    },
    {
      code: "password-policy-upper-case",
      label: "Upper case letters (A-Z)",
      status: (password && /[A-Z]/.test(password) ? "valid" : "error") as
        | "valid"
        | "error",
      isValid: password ? /[A-Z]/.test(password) : false,
    },
    {
      code: "password-policy-numbers",
      label: "Numbers (0-9)",
      status: (password && /[0-9]/.test(password) ? "valid" : "error") as
        | "valid"
        | "error",
      isValid: password ? /[0-9]/.test(password) : false,
    },
    {
      code: "password-policy-special-characters",
      label: "Special characters (e.g. !@#$%^&*)",
      status: (password &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)
        ? "valid"
        : "error") as "valid" | "error",
      isValid: password
        ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password)
        : false,
    },
  ];

  const isValid = results.every((rule) => rule.isValid);

  return { isValid, results };
});

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

export const signup = mockSignupInstance.signup;
export const federatedSignup = mockSignupInstance.federatedSignup;
export const pickCountryCode = mockSignupInstance.pickCountryCode;

export default jest.fn().mockImplementation(() => createMockSignupInstance());
