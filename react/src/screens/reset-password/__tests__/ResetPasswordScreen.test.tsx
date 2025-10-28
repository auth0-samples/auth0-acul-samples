import {
  resetPassword,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

// Mock theme application
jest.mock("@/utils/theme/themeEngine", () => ({
  applyAuth0Theme: jest.fn(),
}));

import { applyAuth0Theme } from "@/utils/theme/themeEngine";

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
});
