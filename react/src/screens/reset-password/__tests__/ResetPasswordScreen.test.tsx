import {
  resetPassword,
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/reset-password";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

// Mock theme application
jest.mock("@/utils/theme", () => ({
  applyAuth0Theme: jest.fn(),
}));

import { CommonTestData } from "@/test/fixtures/common-data";
import { applyAuth0Theme } from "@/utils/theme";

import ResetPasswordScreen from "../index";

describe("ResetPasswordScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with reset password form", () => {
    render(<ResetPasswordScreen />);

    // Verify key elements are displayed using heading role
    expect(
      screen.getByRole("heading", { name: /Change Your Password/i })
    ).toBeInTheDocument();
  });

  it("applies theme on load", () => {
    render(<ResetPasswordScreen />);

    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("calls resetPassword SDK method when form is submitted with valid passwords", async () => {
    render(<ResetPasswordScreen />);

    // Fill in password fields using ScreenTestUtils
    await ScreenTestUtils.fillInput(/New password/i, "NewPassword123!");
    await ScreenTestUtils.fillInput(
      /Re-enter new password/i,
      "NewPassword123!"
    );

    // Click the submit button
    await ScreenTestUtils.clickButton(/Reset password/i);

    expect(resetPassword).toHaveBeenCalledWith({
      "password-reset": "NewPassword123!",
      "re-enter-password": "NewPassword123!",
    });
  });

  it("renders submit button", () => {
    render(<ResetPasswordScreen />);

    // Verify submit button is present
    expect(
      screen.getByRole("button", { name: /Reset password/i })
    ).toBeInTheDocument();
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordScreen />);

    expect(document.title).toBe("Reset your password | My-react-application");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "reset-password",
      texts: undefined,
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      data: { username: "testuser" },
      links: null,
    });

    render(<ResetPasswordScreen />);

    expect(document.title).toBe("Reset your password");
  });

  it("should display general errors", async () => {
    // Configure mock transaction to have general error
    const mockTransaction = (useTransaction as jest.Mock)();
    mockTransaction.errors = [CommonTestData.errors.network];
    mockTransaction.hasErrors = true;
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byKind: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: CommonTestData.errors.network.message,
                kind: "server",
              },
            ];
          }
          return [];
        }),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    render(<ResetPasswordScreen />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should show password validation rules with proper validation states", async () => {
    render(<ResetPasswordScreen />);

    // First type something to trigger validation display
    await ScreenTestUtils.fillInput(/New password/i, "a");

    // Verify password validation box appears
    expect(screen.getByText(/Your password must contain/)).toBeInTheDocument();

    // Test with a weak password
    await ScreenTestUtils.fillInput(/New password\*/i, "weak");

    // Verify validation rules are displayed
    expect(screen.getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Lower case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Upper case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Numbers/)).toBeInTheDocument();

    // Count current validation success indicators
    const weakPasswordCheckmarks = screen.queryAllByTestId(/^check-icon-/);
    const initialCheckmarkCount = weakPasswordCheckmarks.length;

    // Test with a strong password
    await ScreenTestUtils.fillInput(/New password\*/i, "StrongPass123!");

    // Now more validation rules should pass - there should be more checkmarks
    const strongPasswordCheckmarks = screen.queryAllByTestId(/^check-icon-/);
    expect(strongPasswordCheckmarks.length).toBeGreaterThan(
      initialCheckmarkCount
    );

    // Should have at least some validation success indicators for the strong password
    expect(strongPasswordCheckmarks.length).toBeGreaterThan(0);
  });
});
