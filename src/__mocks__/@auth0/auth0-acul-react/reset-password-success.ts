export const useResetPasswordSuccess = jest.fn(() => ({}));

export const useScreen = jest.fn(() => ({
  name: "reset-password-success",
  texts: {
    pageTitle: "Password Reset Complete",
    eventTitle: "Password Changed!",
    description: "Your password has been changed successfully.",
  },
  isCaptchaAvailable: false,
  captchaProvider: null,
  captchaSiteKey: null,
  captchaImage: null,
  captcha: null,
  links: null,
  data: {},
  backLink: null,
  loginLink: null,
}));

export const useTransaction = jest.fn(() => ({
  hasErrors: false,
  errors: [],
  state: "mock-state",
  locale: "en",
  countryCode: null,
  countryPrefix: null,
  connectionStrategy: null,
  currentConnection: null,
  alternateConnections: null,
}));
