import {
  login,
  useErrors,
  useLoginIdentifiers,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-id";
import { act, render, screen } from "@testing-library/react";

import { useCaptcha } from "@/hooks/useCaptcha";
import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import LoginIdScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(),
}));

jest.mock("@/hooks/useCaptcha", () => ({
  useCaptcha: jest.fn(),
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

  it("should render captcha when available", async () => {
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    await renderScreen();

    expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
  });

  it("should submit form and call login with credentials", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(
      "Username or Email address*",
      "test@example.com"
    );
    await ScreenTestUtils.fillInput("CAPTCHA", "mock-value");

    await ScreenTestUtils.clickButton(/^continue$/i);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        captcha: "mock-value",
      })
    );
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

  it("should disable captcha rendering when not available", async () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...(useScreen as jest.Mock)(),
      isCaptchaAvailable: false,
    });

    await renderScreen();

    expect(screen.queryByAltText("CAPTCHA challenge")).not.toBeInTheDocument();
  });
});
