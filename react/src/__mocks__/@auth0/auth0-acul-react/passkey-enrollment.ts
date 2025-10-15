export const continuePasskeyEnrollment = jest.fn();
export const abortPasskeyEnrollment = jest.fn();

export const usePasskeyEnrollment = jest.fn(() => ({
  continuePasskeyEnrollment,
  abortPasskeyEnrollment,
}));

export const useScreen = jest.fn(() => ({
  name: "passkey-enrollment",
  texts: {
    pageTitle: "Mock Passkey Enrollment",
    description: "Mock description text.",
    otpPlaceholder: "Enter OTP",
    buttonText: "Submit",
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
  backLink: null,
  loginLink: null,
  publicKey: null,
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
