import {
  login,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-password";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import LoginPasswordScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(),
}));

describe("LoginPasswordScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<LoginPasswordScreen />);
    });
    // Wait for the screen to be fully rendered
    await screen.findByText("Enter Your Password");
  };
  const mockExtractTokenValue = extractTokenValue as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractTokenValue.mockReset();
  });

  it("should render login-password screen with all form elements", async () => {
    await renderScreen();

    expect(screen.getByText("Enter Your Password")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your password for dev-abc to continue to My App")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^continue$/i })
    ).toBeInTheDocument();
  });

  it("should set document title from screen data", async () => {
    await renderScreen();
    expect(document.title).toBe("Enter your password to log in | My App");
  });

  it("should render footer with signup link", async () => {
    await renderScreen();

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
  });

  it("should render social login buttons", async () => {
    mockExtractTokenValue.mockReturnValue("top");
    await renderScreen();

    expect(
      screen.getByTestId("social-provider-button-google")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("social-provider-button-hugging-face")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("social-provider-button-didit")
    ).toBeInTheDocument();
  });

  it("should submit form and call login with credentials", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput("Password", "test123");
    await ScreenTestUtils.fillInput("Enter the code shown above*", "ABC123");

    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser@testdomain.com",
        password: "test123",
        captcha: "ABC123",
      })
    );
  });

  it("should display error messages when authentication fails", async () => {
    (useTransaction as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: [
        {
          code: "invalid_credentials",
          message: "Invalid password",
        },
      ],
      alternateConnections: [
        {
          name: "google-oauth2",
          strategy: "google",
          options: {
            displayName: "Google",
            showAsButton: true,
          },
        },
      ],
    });

    await renderScreen();

    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });

  it("should render captcha when available", async () => {
    await renderScreen();

    const captchaField = screen.getByRole("textbox", {
      name: /enter the code shown above/i,
    });
    expect(captchaField).toBeInTheDocument();

    const captchaImage = screen.getByAltText("CAPTCHA challenge");
    expect(captchaImage).toBeInTheDocument();
  });

  it("should disable captcha rendering when not available", async () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...(useScreen as jest.Mock)(),
      isCaptchaAvailable: false,
    });

    await renderScreen();

    const captchaField = screen.queryByRole("textbox", {
      name: /enter the code shown above/i,
    });
    expect(captchaField).not.toBeInTheDocument();
  });

  it("should display error when password does not meet minimum length", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput("Password*", "123");
    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });
});
