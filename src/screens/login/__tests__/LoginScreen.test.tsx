import {
  login,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginScreen from "../index";

describe("LoginScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<LoginScreen />);
    });
    // Wait for the screen to be fully rendered
    await screen.findByText("Welcome");
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login screen with all form elements", async () => {
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

    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("should submit form and call login with credentials", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(
      "Username or Email Address*",
      "test@example.com"
    );
    await ScreenTestUtils.fillInput("Password*", "SecurePass123!");
    await ScreenTestUtils.fillInput("Enter the code shown above*", "ABC123");

    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        password: "SecurePass123!",
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
          message: "Invalid username or password",
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

    expect(
      screen.getByText("Invalid username or password")
    ).toBeInTheDocument();
  });

  it("should show password toggle button", async () => {
    await renderScreen();

    const showPasswordButton = screen.getByLabelText("Show password");
    expect(showPasswordButton).toBeInTheDocument();
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
