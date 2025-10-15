export const useResetPasswordError = jest.fn(() => ({}));

export const useScreen = jest.fn(() => ({
  name: "reset-password-error",
  texts: {
    pageTitle: "Password Reset Failed",
    eventTitle: "An Error Occurred",
    description:
      "Something went wrong. Please return to the login page and select 'Forgot Your Password' to try again.",
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
