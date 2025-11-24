import { ErrorItem } from "@auth0/auth0-acul-react/types";

// Mocks for SDK functions
export const continuePhoneEnrollment = jest.fn();
export const returnToPrevious = jest.fn();

export const usePhoneIdentifierEnrollment = jest.fn(() => ({
  continuePhoneEnrollment,
  returnToPrevious,
}));

// Screen hook mock
export const useScreen = jest.fn(() => ({
  name: "phone-identifier-enrollment",
  texts: {
    pageTitle: "Use your phone number to log in | My App",
    title: "Verify Your Identity",
    description: "We will send a 6-digit code to the following phone number:",
    continueButtonText: "Continue",
    changePhoneText: "Choose another phone number.",
    smsButtonText: "Text message",
    voiceButtonText: "Voice call",
    chooseMessageTypeText: "How do you want to receive the code?",
    backButtonText: "Go back",
    placeholder: "Enter your phone number",
    logoAltText: "tanya-test",
    badgeUrl:
      "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
    badgeAltText: "Link to the Auth0 website",
    error: "Error",
    qrCode: "QR Code",
    spinner_push_notification_label:
      "Waiting for push notification to be accepted",
  },
  data: {
    message_type: "text",
    phone_number: "+12323455",
  },
  links: {
    edit_identifier: "/u/signup/identifier?state=mockState",
  },
  isCaptchaAvailable: false,
  captchaProvider: null,
  captchaSiteKey: null,
  captchaImage: null,
  captcha: null,
  backLink: null,
  loginLink: null,
}));

// Transaction hook mock
export const useTransaction = jest.fn(() => ({
  hasErrors: false,
  errors: [],
  state: "mockState",
  locale: "en",
  countryCode: null,
  countryPrefix: null,
  connectionStrategy: null,
  currentConnection: null,
  alternateConnections: null,
}));

const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byType: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
}));
