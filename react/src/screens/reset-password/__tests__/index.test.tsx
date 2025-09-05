import { render, screen } from "@testing-library/react";

import {
  createMockResetPasswordInstance,
  MockResetPasswordInstance,
} from "@/__mocks__/reset-password";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";
import ResetPasswordScreen from "../index";

// Mock the hook
jest.mock("../hooks/useResetPasswordManager", () => ({
  useResetPasswordManager: jest.fn(),
}));

// Mock child components
jest.mock("../components/Header", () => () => (
  <div data-testid="reset-header">Mock Header</div>
));
jest.mock("../components/IdentifierForm", () => () => (
  <div data-testid="reset-form">Mock Form</div>
));

describe("ResetPasswordScreen", () => {
  let mockInstance: MockResetPasswordInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockResetPasswordInstance();

    (useResetPasswordManager as jest.Mock).mockReturnValue({
      resetPassword: mockInstance,
      handleSubmitPassword: mockInstance.handleSubmitPassword,
      texts: {
        pageTitle: "Reset Password Page",
        buttonText: "Reset Password",
        title: "Change Your Password",
        description: "Enter a new password below.",
        passwordPlaceholder: "New Password",
        reEnterpasswordPlaceholder: "Confirm Password",
        logoAltText: "Mock Logo",
      },
      errors: [],
    });
  });

  describe("Core Rendering & Functionality", () => {
    beforeEach(() => {
      render(<ResetPasswordScreen />);
    });

    it("should render the header and form", () => {
      expect(screen.getByTestId("reset-header")).toBeInTheDocument();
      expect(screen.getByTestId("reset-form")).toBeInTheDocument();
    });

    it("should set the document title from texts.pageTitle", () => {
      expect(document.title).toBe("Reset Password Page");
    });
  });

  describe("Fallbacks and Edge Cases", () => {
    it("should fallback to default title when texts.pageTitle is missing", () => {
      (useResetPasswordManager as jest.Mock).mockReturnValue({
        resetPassword: mockInstance,
        handleSubmitPassword: jest.fn(),
        texts: null,
        errors: [],
      });

      render(<ResetPasswordScreen />);
      expect(document.title).toBe("Login");
    });
  });
});
