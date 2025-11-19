import type {
  ScreenMembersOnResetPassword,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the full contract of a mocked reset-password instance
 * used in unit and integration tests.
 */
export interface MockResetPasswordInstance {
  resetPassword: jest.Mock;
  screen: ScreenMembersOnResetPassword;
  transaction: TransactionMembers;
}

/**
 * Factory to create a new mock Reset Password instance that simulates
 * the behavior and data provided by the Auth0 SDK during reset-password flows.
 *
 * This mock is based on the JSON input configuration from your app.
 */
export const createMockResetPasswordInstance =
  (): MockResetPasswordInstance => ({
    resetPassword: jest.fn(),

    screen: {
      name: "reset-password",
      texts: {
        pageTitle: "Reset your password | My-react-application",
        title: "Change Your Password",
        description: "Enter a new password below to change your password.",
        buttonText: "Reset password",
        passwordPlaceholder: "New password",
        reEnterpasswordPlaceholder: "Re-enter new password",
        passwordSecurityText: "Your password must contain:",
        logoAltText: "test3",
        showPasswordText: "Show password",
        hidePasswordText: "Hide password",
        accessibilityError: "Fail",
        accessibilityValid: "Pass",
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
      data: {
        username: "testuser",
      },
      links: null,
    },
    transaction: {
      state: "mockState",
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

const mockResetPasswordInstance = createMockResetPasswordInstance();

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

export const useScreen = jest.fn(() => mockResetPasswordInstance.screen);
export const useTransaction = jest.fn(
  () => mockResetPasswordInstance.transaction
);
// Mock useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byKind: jest.fn(() => []),
    byCode: jest.fn(() => []),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

/**
 * Mock password validation that returns PasswordValidationResult
 */
export const usePasswordValidation = jest.fn((password: string) => {
  const characterRules = [
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

  const containsAtLeastValid = password
    ? getValidCharacterTypesCount(password) >= 2
    : false;

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
      code: "password-policy-contains-at-least",
      label: "At least 2 of the following:",
      status: (containsAtLeastValid ? "valid" : "error") as "valid" | "error",
      isValid: containsAtLeastValid,
      items: characterRules,
    },
    {
      code: "password-policy-identical-chars",
      label: "No more than 2 identical characters in a row",
      status: (password && !/(.)\\1{2,}/.test(password) ? "valid" : "error") as
        | "valid"
        | "error",
      isValid: password ? !/(.)\\1{2,}/.test(password) : false,
    },
  ];

  const isValid = results.every((rule) => rule.isValid);

  return { isValid, results };
});

export const useResetPassword = jest.fn(() => mockResetPasswordInstance);

export const resetPassword = mockResetPasswordInstance.resetPassword;

export default jest
  .fn()
  .mockImplementation(() => createMockResetPasswordInstance());
