import { ErrorItem } from "@auth0/auth0-acul-react/types";

export const resendEmail = jest.fn();

export const useResetPasswordEmail = jest.fn(() => ({
  resendEmail,
}));

export const useScreen = jest.fn(() => ({
  name: "reset-password-email",
  texts: {
    pageTitle: "Mock Password Reset Email",
    title: "Check your email",
    description: "We've sent a password reset link to your email.",
    resendLinkText: "Resend email",
  },
  isCaptchaAvailable: false,
  captchaProvider: null,
  captchaSiteKey: null,
  captchaImage: null,
  captcha: null,
  links: null,
  data: {
    email: "test@example.com",
  },
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

const mockErrors: ErrorItem[] = [];

export const useErrors = jest.fn(() => ({
  errors: {
    byKind: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
}));
