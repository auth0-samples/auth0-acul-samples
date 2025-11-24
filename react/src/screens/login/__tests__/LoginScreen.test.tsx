import {
  login,
  useErrors,
  useLoginIdentifiers,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login";
import { act, render, screen } from "@testing-library/react";

import { useCaptcha } from "@/hooks/useCaptcha";
import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginScreen from "../index";

jest.mock("@/hooks/useCaptcha", () => ({
  useCaptcha: jest.fn(),
}));

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

  beforeEach(() => {
    (useLoginIdentifiers as jest.Mock).mockReturnValue([
      { type: "phone", required: true },
      { type: "email", required: false },
      { type: "username", required: false },
    ]);
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

  it("should render captcha when available", async () => {
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    mockScreen.captcha = {
      provider: "auth0",
      image: "data:image/png;base64,test",
    };
    await renderScreen();

    expect(screen.getByText(/CAPTCHA/)).toBeInTheDocument();
  });

  it("should adapt form fields based on identifier configuration", async () => {
    await renderScreen();

    // Should show username field
    const usename = document.querySelector('input[name="username"]');
    expect(usename).toBeInTheDocument();

    // Should still render the form with submit button
    expect(
      screen.getByRole("button", { name: /^continue$/i })
    ).toBeInTheDocument();
  });

  it("should submit form and call login with credentials", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(
      "Username or Email Address*",
      "test@example.com"
    );
    await ScreenTestUtils.fillInput("Password*", "SecurePass123!");
    await ScreenTestUtils.fillInput("CAPTCHA", "mock-value");

    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        password: "SecurePass123!",
        captcha: "mock-value",
      })
    );
  });

  it("should call useErrors hook and verify error handling integration", async () => {
    await renderScreen();

    // Verify useErrors hook was called during render
    expect(useErrors).toHaveBeenCalled();

    expect(
      document.querySelector('input[name="password"]')
    ).toBeInTheDocument();

    // Verify submit button is available
    expect(
      screen.getByRole("button", { name: /^continue$/i })
    ).toBeInTheDocument();
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
        byType: jest.fn((kind: string) => {
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

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should show password toggle button", async () => {
    await renderScreen();

    const showPasswordButton = screen.getByLabelText("Show password");
    expect(showPasswordButton).toBeInTheDocument();
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
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = false;

    await renderScreen();
    expect(screen.queryByAltText("CAPTCHA challenge")).not.toBeInTheDocument();
  });
});
