import type {
  ErrorItem,
  ScreenMembers,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-push-list
 * with the `screen`, `transaction`, and `user` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaPushListInstance {
  goBack: jest.Mock;
  selectMfaPushDevice: jest.Mock;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance for mfa-push-list functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaPushListInstance = (): MockMfaPushListInstance => ({
  goBack: jest.fn(),
  selectMfaPushDevice: jest.fn(),
  screen: {
    name: "mfa-push-list",
    texts: {
      pageTitle: "List of available devices | My App",
      backText: "Go back",
      title: "Registered Devices",
      badgeUrl:
        "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
      badgeAltText: "Link to the Auth0 website",
      error: "Error",
    },
    captchaImage: null,
    captchaSiteKey: null,
    captchaProvider: null,
    isCaptchaAvailable: false,
    data: null,
    links: null,
    captcha: null,
  },
  transaction: {
    hasErrors: false,
    errors: [],
    state: "mock-state",
    locale: "en",
    countryCode: null,
    countryPrefix: null,
    connectionStrategy: null,
    currentConnection: null,
    alternateConnections: null,
  },
  user: {
    id: "mocked_id_client",
    email: "foo1@bar.com",
    picture: "mock_picture_url",
    enrolledFactors: ["push-notification", "recovery-code"],
    enrolledDevices: [
      {
        id: 0,
        device: "Test Device 1",
      },
      {
        id: 1,
        device: "Test Device 2",
      },
    ],
    username: null,
    phoneNumber: null,
    enrolledEmails: null,
    enrolledPhoneNumbers: null,
    organizations: null,
    userMetadata: null,
    appMetadata: null,
  },
});

// Mock the mfa-push-list hooks and methods
const mockMfaPushListInstance = createMockMfaPushListInstance();

export const useMfaPushList = jest.fn(() => ({
  goBack: mockMfaPushListInstance.goBack,
  selectMfaPushDevice: mockMfaPushListInstance.selectMfaPushDevice,
}));

const mockErrors: ErrorItem[] = [];

// Mock the useErrors hook
export const useErrors = jest.fn(() => ({
  errors: {
    byField: jest.fn(() => []),
    byKind: jest.fn().mockReturnValue(mockErrors),
  },
  hasError: false,
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));

export const useScreen = jest.fn(() => mockMfaPushListInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaPushListInstance.transaction
);
export const useUser = jest.fn(() => mockMfaPushListInstance.user);

// Export named functions for direct access in tests
export const goBack = mockMfaPushListInstance.goBack;
export const selectMfaPushDevice = mockMfaPushListInstance.selectMfaPushDevice;

export default jest.fn(() => ({
  useMfaPushList,
  useScreen,
  useTransaction,
  useUser,
  goBack,
  selectMfaPushDevice,
}));
