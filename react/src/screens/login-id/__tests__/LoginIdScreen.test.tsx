import {
  login,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-id";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import LoginIdScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(),
}));

describe("LoginIdScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<LoginIdScreen />);
    });
    // Wait for the screen to be fully rendered
    await screen.findByText("Welcome");
  };
  const mockExtractTokenValue = extractTokenValue as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractTokenValue.mockReset();
  });

  it("should render login-id screen with all form elements", async () => {
    await renderScreen();

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(
      screen.getByText(/Log in to dev-abc to continue to All Applications/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^continue$/i })
    ).toBeInTheDocument();
  });

  it("should set document title from screen data", async () => {
    await renderScreen();
    expect(document.title).toBe("Log in | my app");
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

    await ScreenTestUtils.fillInput(
      "Username or Email address*",
      "test@example.com"
    );
    await ScreenTestUtils.fillInput("Enter the code shown above*", "ABC123");

    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
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
          message: "Invalid username",
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

    expect(screen.getByText("Invalid username")).toBeInTheDocument();
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

  it("should render login with passkey when enabled", async () => {
    mockExtractTokenValue.mockReturnValue("top");
    (useTransaction as jest.Mock).mockReturnValue({
      ...(useTransaction as jest.Mock)(),
      isPasskeyEnabled: true,
    });
    await renderScreen();

    const passkeyButton = screen.getByRole("button", {
      name: /continue with a passkey/i,
    });
    expect(passkeyButton).toBeInTheDocument();
  });

  it("should render username/email field based on active identifiers", async () => {
    await renderScreen();

    const usernameField = screen.getByRole("textbox", {
      name: /username or email address/i,
    });
    expect(usernameField).toBeInTheDocument();
    expect(usernameField).not.toBeDisabled();
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
});
