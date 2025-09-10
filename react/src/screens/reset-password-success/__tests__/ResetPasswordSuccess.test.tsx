import { render, screen } from "@testing-library/react";

import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordSuccessManager } from "../hooks/resetPasswordSuccessManager";
import ResetPasswordSuccessScreen from "../index";

// Mock the core components and hooks to control their behavior and props
jest.mock("../hooks/resetPasswordSuccessManager", () => ({
  useResetPasswordSuccessManager: jest.fn(),
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
  CircleCheck: jest.fn(({ color, size }) => (
    <svg data-testid="mock-circle-check" data-color={color} data-size={size} />
  )),
}));

describe("ResetPasswordSuccessScreen", () => {
  // Mock data for the hook's return value
  const mockTexts = {
    pageTitle: "Password Reset Complete",
    eventTitle: "Password Changed!",
    description: "Your password has been changed successfully.",
  };

  const mockUseResetPasswordSuccessManager =
    useResetPasswordSuccessManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseResetPasswordSuccessManager.mockReturnValue({
      resetPasswordSuccess: {},
      texts: mockTexts,
    });
  });

  // Test suite for core rendering and functionality
  describe("Core Rendering & Functionality", () => {
    it("should set the document title based on texts.pageTitle", () => {
      render(<ResetPasswordSuccessScreen />);
      expect(document.title).toBe(mockTexts.pageTitle);
    });

    it("should render the correct success messages", () => {
      render(<ResetPasswordSuccessScreen />);

      // Verify the header's title and subtitle
      expect(screen.getByText(mockTexts.eventTitle)).toBeInTheDocument();
      expect(screen.getByText(mockTexts.description)).toBeInTheDocument();
    });

    it("should render the CircleCheck icon with the correct color and size", () => {
      const mockColor = "#4CAF50";
      const mockSize = 80;
      (extractTokenValue as jest.Mock).mockReturnValue(mockColor);

      render(<ResetPasswordSuccessScreen />);

      const circleCheckIcon = screen.getByTestId("mock-circle-check");
      expect(circleCheckIcon).toHaveAttribute("data-color", mockColor);
      expect(circleCheckIcon).toHaveAttribute("data-size", String(mockSize));
    });

    it("should use fallback text when texts are not provided", () => {
      mockUseResetPasswordSuccessManager.mockReturnValue({
        resetPasswordSuccess: {},
        texts: null,
      });

      render(<ResetPasswordSuccessScreen />);

      expect(document.title).toBe("Password reset successful");
      expect(screen.getByText("Password Changed!")).toBeInTheDocument();
      expect(
        screen.getByText("Your password has been changed successfully.")
      ).toBeInTheDocument();
    });
  });
});
