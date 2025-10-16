/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React mfa-email-list hooks.
 */

import type { TransactionMembers } from "@auth0/auth0-acul-react";

export interface ScreenMembersOnMfaEmailList {
  name: string;
  texts: {
    pageTitle?: string;
    backText?: string;
    title?: string;
    badgeUrl?: string;
    badgeAltText?: string;
    error?: string;
    qrCode?: string;
    spinner_push_notification_label?: string;
  };
  data: {
    show_remember_device?: boolean;
  };
}

export interface UserMembers {
  id?: string;
  email?: string;
  picture?: string;
  enrolled_factors?: string[];
  enrolled_emails?: Array<{
    id: number;
    email: string;
  }>;
}

export interface MockMfaEmailListInstance {
  goBack: jest.Mock;
  selectMfaEmail: jest.Mock;
  screen: ScreenMembersOnMfaEmailList;
  transaction: TransactionMembers;
  user: UserMembers;
}

/**
 * Factory function to create a new mock instance for mfa-email-list functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaEmailListInstance = (): MockMfaEmailListInstance => ({
  goBack: jest.fn(),
  selectMfaEmail: jest.fn(),
  screen: {
    name: "mfa-email-list",
    texts: {
      pageTitle: "List of available email addresses | My App",
      backText: "Go back",
      title: "Enrolled Email Addresses",
      badgeUrl:
        "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
      badgeAltText: "Link to the Auth0 website",
      error: "Error",
      qrCode: "QR Code",
      spinner_push_notification_label:
        "Waiting for push notification to be accepted",
    },
    data: {
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
    id: "userID",
    email: "abc.xyz@atko.email",
    picture:
      "https://s.gravatar.com/avatar/27ae96d2af8133df20dad5f3fcb8cbcf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fta.png",
    enrolled_factors: ["otp", "push-notification", "email"],
    enrolled_emails: [
      { id: 0, email: "tany******@atko******" },
      { id: 1, email: "test*@atko******" },
      { id: 2, email: "test*@atko******" },
      { id: 3, email: "test*@atko******" },
      { id: 4, email: "tany*****@atko******" },
    ],
  },
});

// Mock the mfa-email-list hooks and methods
const mockMfaEmailListInstance = createMockMfaEmailListInstance();

export const useMfaEmailList = jest.fn(() => ({
  goBack: mockMfaEmailListInstance.goBack,
  selectMfaEmail: mockMfaEmailListInstance.selectMfaEmail,
}));

export const useScreen = jest.fn(() => mockMfaEmailListInstance.screen);
export const useTransaction = jest.fn(
  () => mockMfaEmailListInstance.transaction
);
export const useUser = jest.fn(() => ({
  ...mockMfaEmailListInstance.user,
  enrolledEmails: mockMfaEmailListInstance.user.enrolled_emails,
}));

// Export named functions for direct use in test
export const goBack = mockMfaEmailListInstance.goBack;
export const selectMfaEmail = mockMfaEmailListInstance.selectMfaEmail;

export default jest.fn(() => ({
  useMfaEmailList,
  useScreen,
  useTransaction,
  useUser,
  goBack,
  selectMfaEmail,
}));
