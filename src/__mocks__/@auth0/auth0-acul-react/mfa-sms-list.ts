/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React mfa-sms-list hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type { TransactionMembers } from "@auth0/auth0-acul-react";

/**
 * Screen-specific types for MFA SMS List
 */
export interface ScreenMembersOnMfaSmsList {
  name: string;
  texts: {
    pageTitle?: string;
    backText?: string;
    title?: string;
    badgeUrl?: string;
    badgeAltText?: string;
    error?: string;
  };
  data: {
    message_type?: string;
    show_remember_device?: boolean;
  };
}

export interface UserMembers {
  id?: string;
  email?: string;
  picture?: string;
  enrolled_factors?: string[];
  enrolledPhoneNumbers?: Array<{
    id: number;
    phoneNumber: string;
  }>;
}

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-sms-list
 * with the `screen`, `transaction`, and `user` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaSmsListInstance {
  backAction: jest.Mock;
  selectPhoneNumber: jest.Mock;
  screen: ScreenMembersOnMfaSmsList;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance for mfa-sms-list functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaSmsListInstance = (): MockMfaSmsListInstance => ({
  backAction: jest.fn(),
  selectPhoneNumber: jest.fn(),
  screen: {
    name: "mfa-sms-list",
    texts: {
      pageTitle: "List of available phone numbers | All Applications",
      backText: "Go back",
      title: "Enrolled Phone Numbers",
      badgeUrl:
        "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
      badgeAltText: "Link to the Auth0 website",
      error: "Error",
    },
    data: {
      message_type: "sms",
      show_remember_device: true,
    },
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
    id: "auth0|68e4bad589ab12f537e9cc8c",
    email: "amber.kamboj@atko.email",
    picture:
      "https://s.gravatar.com/avatar/ebade76ba7c85b1d8d3a4bd8d35d713e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fam.png",
    enrolled_factors: ["sms"],
    enrolledPhoneNumbers: [
      {
        id: 0,
        phoneNumber: "XXXXXXXXX1360",
      },
      {
        id: 1,
        phoneNumber: "XXXXXXXXX3364",
      },
    ],
  },
});

// Mock the mfa-sms-list hooks and methods
const mockMfaSmsListInstance = createMockMfaSmsListInstance();

export const useMfaSmsList = jest.fn(() => ({
  backAction: mockMfaSmsListInstance.backAction,
  selectPhoneNumber: mockMfaSmsListInstance.selectPhoneNumber,
}));

export const useScreen = jest.fn(() => mockMfaSmsListInstance.screen);
export const useTransaction = jest.fn(() => mockMfaSmsListInstance.transaction);
export const useUser = jest.fn(() => mockMfaSmsListInstance.user);

// Export named functions for direct access in tests
export const backAction = mockMfaSmsListInstance.backAction;
export const selectPhoneNumber = mockMfaSmsListInstance.selectPhoneNumber;

export default jest.fn(() => ({
  useMfaSmsList,
  useScreen,
  useTransaction,
  useUser,
  backAction,
  selectPhoneNumber,
}));
