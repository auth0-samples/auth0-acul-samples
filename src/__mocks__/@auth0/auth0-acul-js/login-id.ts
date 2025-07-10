/**
 * This interface defines the "contract" for our mock. It ensures our mock object
 * has the same shape as the real LoginIdInstance from the SDK. If the real SDK
 * changes in a future update, this type will cause a compile-error, alerting
 * us that our mock needs to be updated.
 */
export interface MockLoginIdInstance {
  login: jest.Mock;
  federatedLogin: jest.Mock;
  passkeyLogin: jest.Mock;
  pickCountryCode: jest.Mock;
  screen: {
    name: "login-id";
    texts: {
      [key: string]: string | undefined;
    };
    captcha?: {
      provider: string;
      image: string;
    } | null;
    links: {
      [key: string]: string | undefined;
    };
    data?: {
      passkey?: {
        public_key: {
          challenge: string;
        };
      };
    };
  };
  transaction: {
    errors: Array<{ message: string; field?: string }>;
    allowedIdentifiers: string[];
    alternateConnections?: Array<{ name: string; strategy: string }>;
  };
}

const mockLoginIdInstance: MockLoginIdInstance = {
  login: jest.fn(),
  federatedLogin: jest.fn(),
  passkeyLogin: jest.fn(),
  pickCountryCode: jest.fn(),
  screen: {
    name: "login-id",
    texts: {
      title: "Mock Welcome Title",
      description: "Mock description text.",
      usernameOrEmailPlaceholder: "Username or Email Address",
      buttonText: "Mock Continue",
      forgotPasswordText: "Can't log in?",
      separatorText: "Or",
      passkeyButtonText: "Continue with a passkey",
      captchaCodePlaceholder: "Enter the code shown above",
    },
    captcha: null,
    links: {
      reset_password: "/test-reset",
      signup: "/test-signup",
    },
    data: {},
  },
  transaction: {
    errors: [],
    allowedIdentifiers: ["email", "username"],
    alternateConnections: [],
  },
};

export default jest.fn().mockImplementation(() => mockLoginIdInstance);
