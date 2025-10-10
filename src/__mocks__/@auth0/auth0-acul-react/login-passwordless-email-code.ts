export const submitCode = jest.fn();
export const resendCode = jest.fn();

export const useLoginPasswordlessEmailCode = jest.fn(() => ({
  submitCode,
  resendCode,
}));

export const useScreen = jest.fn(() => ({
  name: "login-passwordless-email-code",
  texts: {
    pageTitle: "Mock Login with Email Code",
    description: "Mock description text.",
    otpPlaceholder: "Enter Email Code",
    buttonText: "Mock Submit",
    resendText: "Resend OTP",
    captchaCodePlaceholder: "Enter the code shown above",
  },
  isCaptchaAvailable: true,
  captchaProvider: null,
  captchaSiteKey: null,
  captchaImage: null,
  captcha: null,
  links: {
    helpLink: "/test-help",
  },
  data: {
    email: "foo1@bar.com",
    username: "mock user name",
  },
  backLink: null,
  signupLink: null,
  resetPasswordLink: null,
  editIdentifierLink: null,
}));

export const useTransaction = jest.fn(() => ({
  hasErrors: false,
  errors: [],
  state: "mock-state",
  locale: "en",
  isSignupEnabled: false,
  countryCode: null,
  countryPrefix: null,
  connectionStrategy: null,
  currentConnection: null,
  alternateConnections: null,
}));
