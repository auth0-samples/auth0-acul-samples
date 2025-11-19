export const resendCode = jest.fn();
export const returnToPrevious = jest.fn();
export const submitEmailChallenge = jest.fn();

export const useEmailIdentifierChallenge = jest.fn(() => ({
  resendCode,
  returnToPrevious,
  submitEmailChallenge,
}));

export const useScreen = jest.fn(() => ({
  name: "email-identifier-challenge",
  texts: {
    pageTitle: "Enter your email code to log in | my app",
    title: "Verify Your Identity",
    description: "We've sent an email with your code to: mock_email@gmail.com",
    placeholder: "Enter the 6-digit code",
    buttonText: "Continue",
    resendText: "Didn't receive a code?",
    resendActionText: "Resend",
    resendLimitReachedText: "Code has been resent.",
    backButtonText: "Go back",
    captchaCodePlaceholder: "Enter the code shown above",
    logoAltText: "dev-abc",
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
  links: null,
  data: {
    message_type: "email",
    email: "mock_email@gmail.com",
  },
  backLink: null,
  loginLink: null,
}));

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

// Mock useResend hook
export const useResend = jest.fn(() => ({
  remaining: 0,
  disabled: false,
  startResend: jest.fn(),
}));

export const useTransaction = jest.fn(() => ({
  hasErrors: false,
  errors: [],
  state: "mocked_state",
  locale: "en",
  countryCode: null,
  countryPrefix: null,
  connectionStrategy: null,
  currentConnection: null,
  alternateConnections: null,
}));
