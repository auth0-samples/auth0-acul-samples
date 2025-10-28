export const submitOTP = jest.fn();
export const resendOTP = jest.fn();

export const useLoginPasswordlessSmsOtp = jest.fn(() => ({
  submitOTP,
  resendOTP,
}));

export const useScreen = jest.fn(() => ({
  name: "login-passwordless-sms-otp",
  texts: {
    pageTitle: "Mock Login with SMS OTP",
    description: "Mock description text.",
    otpPlaceholder: "Enter OTP",
    buttonText: "Continue",
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
    phone_number: "Mock Phone Number",
    username: "Mock Phone Number",
  },
  signupLink: null,
  resetPasswordLink: null,
  backLink: null,
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
