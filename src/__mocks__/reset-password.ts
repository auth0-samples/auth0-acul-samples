import type {
  ScreenMembersOnResetPassword,
  TransactionMembers,
} from "@auth0/auth0-acul-react/reset-password";

/**
 * Defines the full contract of a mocked reset-password instance
 * used in unit and integration tests.
 */
export interface MockResetPasswordInstance {
  handleSubmitPassword: jest.Mock;
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
    handleSubmitPassword: jest.fn(),

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

/**
 * Default export for Jest mock injection using `jest.mock(...)`.
 */
export default jest
  .fn()
  .mockImplementation(() => createMockResetPasswordInstance());
