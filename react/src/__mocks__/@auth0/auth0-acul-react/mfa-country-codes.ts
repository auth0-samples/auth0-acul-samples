/**
 * @file This file provides a comprehensive mock for the Auth0 ACUL React mfa-country-codes hooks.
 * It is designed to be structurally aligned with the official React SDK, enabling robust
 * and isolated testing of our components.
 */
import type { TransactionMembers } from "@auth0/auth0-acul-react";

/**
 * Screen-specific types for MFA Country Codes
 */
export interface ScreenMembersOnMfaCountryCodes {
  name: string;
  texts: {
    pageTitle?: string;
    backText?: string;
    title?: string;
    searchPlaceholder?: string;
    noResultsText?: string;
    badgeUrl?: string;
    badgeAltText?: string;
    error?: string;
  };
  data: {
    phone_prefixes?: Array<{
      country: string;
      country_code: string;
      phone_prefix: string;
    }>;
  };
}

/**
 * Defines the "contract" for our mock. It combines the methods from the mfa-country-codes
 * with the `screen` and `transaction` data structures.
 * This provides a single, type-safe object to control in our tests.
 */
export interface MockMfaCountryCodesInstance {
  goBack: jest.Mock;
  selectCountryCode: jest.Mock;
  screen: ScreenMembersOnMfaCountryCodes;
  transaction: TransactionMembers;
}

/**
 * Factory function to create a new mock instance for mfa-country-codes functionality.
 * This ensures each test gets a clean, isolated mock object that is
 * structurally aligned with the official SDK documentation.
 */
export const createMockMfaCountryCodesInstance =
  (): MockMfaCountryCodesInstance => ({
    goBack: jest.fn(),
    selectCountryCode: jest.fn(),
    screen: {
      name: "mfa-country-codes",
      texts: {
        pageTitle: "Select your country code | All Applications",
        backText: "Go back",
        title: "Select your country code",
        searchPlaceholder: "Search",
        noResultsText: "No countries found",
        badgeUrl:
          "https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget",
        badgeAltText: "Link to the Auth0 website",
        error: "Error",
      },
      data: {
        phone_prefixes: [
          {
            country: "Afghanistan",
            country_code: "AF",
            phone_prefix: "93",
          },
          {
            country: "Albania",
            country_code: "AL",
            phone_prefix: "355",
          },
          {
            country: "Algeria",
            country_code: "DZ",
            phone_prefix: "213",
          },
          {
            country: "United States",
            country_code: "US",
            phone_prefix: "1",
          },
          {
            country: "United Kingdom",
            country_code: "GB",
            phone_prefix: "44",
          },
        ],
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
  });

/**
 * The shared mock instance used across all tests
 */
let mockInstance: MockMfaCountryCodesInstance =
  createMockMfaCountryCodesInstance();

/**
 * Mock implementation of the useMfaCountryCodes hook
 */
export const useMfaCountryCodes = jest.fn(() => ({
  goBack: mockInstance.goBack,
  selectCountryCode: mockInstance.selectCountryCode,
}));

/**
 * Mock implementation of the useScreen hook
 */
export const useScreen = jest.fn(() => mockInstance.screen);

/**
 * Mock implementation of the useTransaction hook
 */
export const useTransaction = jest.fn(() => mockInstance.transaction);

/**
 * Direct exports of the mocked SDK methods
 */
export const goBack = mockInstance.goBack;
export const selectCountryCode = mockInstance.selectCountryCode;

/**
 * Helper function for tests to reset mocks to a clean state
 */
export const resetMfaCountryCodesMocks = () => {
  mockInstance = createMockMfaCountryCodesInstance();
  useMfaCountryCodes.mockImplementation(() => ({
    goBack: mockInstance.goBack,
    selectCountryCode: mockInstance.selectCountryCode,
  }));
  useScreen.mockImplementation(() => mockInstance.screen);
  useTransaction.mockImplementation(() => mockInstance.transaction);
};

// Initialize the mocks
resetMfaCountryCodesMocks();
