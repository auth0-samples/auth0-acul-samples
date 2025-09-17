import { render, screen } from "@testing-library/react";

import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";
import ResetPasswordErrorScreen from "../index";

// Mock the core components and hooks to control their behavior and props
jest.mock("../hooks/resetPasswordErrorManager", () => ({
  useResetPasswordErrorManager: jest.fn(),
}));

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "mock-color"),
}));

// Mock the child components to verify their props without rendering their internals
jest.mock("@/components/ULThemeTitle", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-title">{children}</div>
  );
});

jest.mock("@/components/ULThemeSubtitle", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-subtitle">{children}</div>
  );
});

jest.mock("lucide-react", () => ({
  CircleX: jest.fn(({ color, size }) => (
    <svg data-testid="mock-circle-x" data-color={color} data-size={size} />
  )),
}));

describe("ResetPasswordErrorScreen", () => {
  // Mock data for the hook's return value
  const mockTexts = {
    pageTitle: "Password Reset Failed",
    eventTitle: "An Error Occurred",
    description:
      "Something went wrong. Please return to the login page and select 'Forgot Your Password' to try again.",
  };

  const mockUseResetPasswordErrorManager =
    useResetPasswordErrorManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseResetPasswordErrorManager.mockReturnValue({
      resetPasswordError: {},
      texts: mockTexts,
    });
  });

  // Test suite for core rendering and functionality
  describe("Core Rendering & Functionality", () => {
    it("should set the document title based on texts.pageTitle", () => {
      render(<ResetPasswordErrorScreen />);
      expect(document.title).toBe(mockTexts.pageTitle);
    });

    it("should render the correct error messages", () => {
      render(<ResetPasswordErrorScreen />);

      // Verify the header's title
      expect(screen.getByText(mockTexts.eventTitle)).toBeInTheDocument();
    });

    it("should render the CircleX icon with the correct color and size", () => {
      const mockColor = "#F44336"; // Example color for a failed state
      const mockSize = 80;
      (extractTokenValue as jest.Mock).mockReturnValue(mockColor);

      render(<ResetPasswordErrorScreen />);

      const circleXIcon = screen.getByTestId("mock-circle-x");
      expect(circleXIcon).toHaveAttribute("data-color", mockColor);
      expect(circleXIcon).toHaveAttribute("data-size", String(mockSize));
    });

    it("should use fallback text when texts are not provided", () => {
      mockUseResetPasswordErrorManager.mockReturnValue({
        resetPasswordError: {},
        texts: null,
      });

      render(<ResetPasswordErrorScreen />);

      // Check fallback for document title
      expect(document.title).toBe("Password reset error");

      // Check fallback for eventTitle
      expect(screen.getByText("Please Try Again")).toBeInTheDocument();

      // Check fallback for description
      expect(
        screen.getByText(
          'Something went wrong. Please return to the login page and select "Forgot Your Password" to try again.'
        )
      ).toBeInTheDocument();
    });
  });
});
