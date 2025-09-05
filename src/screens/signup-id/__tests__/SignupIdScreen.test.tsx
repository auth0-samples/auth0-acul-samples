import { render, screen } from "@testing-library/react";

import type { MockSignupIdInstance } from "@/__mocks__/@auth0/auth0-acul-react/signup-id";
import { createMockSignupIdInstance } from "@/__mocks__/@auth0/auth0-acul-react/signup-id";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";
import SignupIdScreen from "../index";

// Mock the useSignupIdManager hook
jest.mock("../hooks/useSignupIdManager", () => ({
  useSignupIdManager: jest.fn(),
}));

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("SignupIdScreen", () => {
  let mockInstance: MockSignupIdInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockSignupIdInstance();

    // Mock the useSignupIdManager hook to return our mock data
    (useSignupIdManager as jest.Mock).mockReturnValue({
      signupId: mockInstance,
      handleSignup: mockInstance.signup,
      handleFederatedSignup: mockInstance.federatedSignup,
      handlePickCountryCode: mockInstance.pickCountryCode,
      texts: mockInstance.screen.texts,
      alternateConnections: mockInstance.transaction.alternateConnections,
      isCaptchaAvailable: mockInstance.screen.isCaptchaAvailable,
      loginLink: mockInstance.screen.loginLink,
      captchaImage: mockInstance.screen.captchaImage,
      errors: mockInstance.transaction.errors,
    });
  });

  describe("Core Rendering & Functionality", () => {
    beforeEach(() => {
      render(<SignupIdScreen />);
    });

    it("should render the signup screen with default content", () => {
      expect(screen.getByText("Create Your Account")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Continue" })
      ).toBeInTheDocument();
    });

    it("should render required and optional identifier fields correctly", () => {
      // Required field (phone) - should have asterisk
      expect(screen.getByLabelText("Phone Number*")).toBeInTheDocument();

      // Optional fields - should have (optional) suffix
      expect(
        screen.getByLabelText("Email Address (optional)")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Username (optional)")).toBeInTheDocument();
    });

    it("should render country code picker for phone field", () => {
      expect(screen.getByText("Select Country")).toBeInTheDocument();
    });

    it("should call handleSignup with form data when form is submitted", async () => {
      // Fill in the required field
      await ScreenTestUtils.fillInput(/Phone Number/i, "1234567890");

      // Fill in optional fields
      await ScreenTestUtils.fillInput(/Email Address/i, "test@example.com");
      await ScreenTestUtils.fillInput(/Username/i, "testuser");

      // Submit the form
      await ScreenTestUtils.clickButton("Continue");

      expect(mockInstance.signup).toHaveBeenCalledWith({
        phone: "1234567890",
        email: "test@example.com",
        username: "testuser",
        captcha: ""
      });
    });
  });

  describe("Social Login & Alternative Connections", () => {
    it("should render social provider buttons when alternate connections are available", () => {
      render(<SignupIdScreen />);

      expect(screen.getByText(/Continue with.*Google/i)).toBeInTheDocument();
      expect(screen.getByText(/Continue with.*Github/i)).toBeInTheDocument();
    });

    it("should call federatedSignup when social provider button is clicked", async () => {
      render(<SignupIdScreen />);

      await ScreenTestUtils.clickButton(/Continue with.*Google/i);

      expect(mockInstance.federatedSignup).toHaveBeenCalledWith({
        connection: "google-oauth2",
      });
    });
  });

  describe("Footer Links", () => {
    it("should render login link in footer", () => {
      render(<SignupIdScreen />);

      expect(screen.getByText("Already have an account?")).toBeInTheDocument();
      expect(screen.getByText("Log in")).toBeInTheDocument();
    });
  });

  describe("Document Title", () => {
    it("should set the document title based on texts.pageTitle", () => {
      render(<SignupIdScreen />);
      expect(document.title).toBe("Mock Signup");
    });
  });

  describe("Error Handling", () => {
    it("should display general errors when present", () => {
      // Configure error state
      const errorData = [
        {
          message: "Something went wrong",
          code: "general_error",
          field: undefined,
        },
      ];
      mockInstance.transaction.errors = errorData as any;
      (useSignupIdManager as jest.Mock).mockReturnValue({
        ...useSignupIdManager(),
        errors: errorData,
      });

      render(<SignupIdScreen />);
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
