/**
 * @file Tests for the ResetPasswordRequest screen components.
 */
import { useLoginIdentifiers } from "@auth0/auth0-acul-react/reset-password-request";
import {
  backToLogin,
  resetPassword,
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/reset-password-request";
import { render, screen } from "@testing-library/react";

import { useCaptcha } from "@/hooks/useCaptcha";
import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import ResetPasswordRequestScreen from "../index";

jest.mock("@/hooks/useCaptcha", () => ({
  useCaptcha: jest.fn(),
}));

describe("ResetPasswordRequestScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedUseCaptcha = useCaptcha as jest.Mock;
    mockedUseCaptcha.mockReturnValue({
      captchaConfig: {
        siteKey: "mock-key",
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      },
      captchaProps: { label: "CAPTCHA" },
      captchaValue: "mock-value",
    });
  });

  it("sets document title from SDK texts", () => {
    render(<ResetPasswordRequestScreen />);

    expect(document.title).toBe("Reset your password | My App");
  });

  it("renders correctly with title and description", () => {
    render(<ResetPasswordRequestScreen />);

    expect(screen.getByText(/Forgot Your Password\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter your Username or Email address and we will send you instructions/i
      )
    ).toBeInTheDocument();
  });

  it("renders ResetPasswordRequestForm and submits successfully", async () => {
    render(<ResetPasswordRequestScreen />);

    await ScreenTestUtils.clickButton(/Continue/i);

    expect(resetPassword).toHaveBeenCalledWith({ username: "abc@xyz.com" });
  });

  it("renders CAPTCHA field when available", () => {
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    render(<ResetPasswordRequestScreen />);
    expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
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
          if (kind === "server") {
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

    render(<ResetPasswordRequestScreen />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("renders Footer and calls back-to-login action", async () => {
    render(<ResetPasswordRequestScreen />);
    await ScreenTestUtils.clickButton(/Back to My App/i);
    expect(backToLogin).toHaveBeenCalled();
  });

  it("renders correct description for phone-only identifier", () => {
    (useLoginIdentifiers as jest.Mock).mockReturnValue(["phone"]);

    render(<ResetPasswordRequestScreen />);
    expect(
      screen.getByText(
        /Enter your Phone number and we will send you instructions to reset your password/i
      )
    ).toBeInTheDocument();
  });
});
