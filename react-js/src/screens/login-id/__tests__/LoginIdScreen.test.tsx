import { act, fireEvent, render, screen } from "@testing-library/react";

import type { MockLoginIdInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-id";
import {
  getMockLoginIdInstance,
  resetMockLoginIdInstance,
} from "@/__mocks__/@auth0/auth0-acul-js/login-id";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginIdScreen from "../index";

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("LoginIdScreen", () => {
  let mockInstance: MockLoginIdInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<LoginIdScreen />);
    });
    await screen.findByRole("button", { name: /mock continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resetMockLoginIdInstance();
    mockInstance = getMockLoginIdInstance();
  });

  it("should submit form with identifier", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(
      /username or email address\*/i,
      "test@example.com"
    );
    await ScreenTestUtils.clickButton(/mock continue/i);

    expect(mockInstance.login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
      })
    );
  });

  it("should display errors from SDK", async () => {
    mockInstance.getErrors.mockReturnValue([
      { message: "Invalid credentials", field: null },
      { message: "Invalid email format", field: "username" },
    ]);
    await renderScreen();

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  it("should render social login buttons and handle federated login", async () => {
    mockInstance.transaction.alternateConnections = [
      {
        name: "google-oauth2",
        strategy: "google",
        options: { displayName: "Google", showAsButton: true },
      },
    ];
    await renderScreen();

    const googleButton = screen.getByRole("button", {
      name: /continue with google/i,
    });
    expect(googleButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(googleButton);
    });

    expect(mockInstance.federatedLogin).toHaveBeenCalledWith({
      connection: "google-oauth2",
    });
  });

  it("should hide social providers when no connections available", async () => {
    mockInstance.transaction.alternateConnections = [];
    await renderScreen();

    expect(screen.queryByText(/continue with/i)).not.toBeInTheDocument();
  });

  it("should show CAPTCHA and include it in submission", async () => {
    mockInstance.screen.isCaptchaAvailable = true;
    mockInstance.screen.captcha = {
      provider: "auth0",
      image: "data:image/png;base64,mockimage",
    };
    await renderScreen();

    // Check that CAPTCHA image is rendered
    const captchaImage = screen.getByAltText("CAPTCHA challenge");
    expect(captchaImage).toBeInTheDocument();
    expect(captchaImage).toHaveAttribute(
      "src",
      "data:image/png;base64,mockimage"
    );

    await ScreenTestUtils.fillInput(
      /username or email address\*/i,
      "test@example.com"
    );
    await ScreenTestUtils.fillInput(/enter the code shown above\*/i, "ABCD");
    await ScreenTestUtils.clickButton(/mock continue/i);

    expect(mockInstance.login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        captcha: "ABCD",
      })
    );
  });

  it("should adapt form fields based on identifier configuration", async () => {
    mockInstance.transaction.allowedIdentifiers = ["email"];
    await renderScreen();

    expect(mockInstance.getLoginIdentifiers).toHaveBeenCalled();
    expect(
      document.querySelector('input[name="username"]')
    ).toBeInTheDocument();
  });

  it("should show passkey button and handle passkey login", async () => {
    mockInstance.transaction.isPasskeyEnabled = true;
    mockInstance.screen.publicKey = { challenge: "mock-challenge" };
    await renderScreen();

    const passkeyButton = screen.getByRole("button", {
      name: /continue with a passkey/i,
    });
    expect(passkeyButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(passkeyButton);
    });

    expect(mockInstance.passkeyLogin).toHaveBeenCalled();
  });

  it("should conditionally render forgot password and signup links", async () => {
    // Test when enabled
    mockInstance.transaction.isForgotPasswordEnabled = true;
    mockInstance.transaction.isSignupEnabled = true;
    await renderScreen();

    expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should show country picker for phone-only identifier", async () => {
    mockInstance.transaction.allowedIdentifiers = ["phone"];
    await renderScreen();

    expect(screen.getByText("Select Country")).toBeInTheDocument();

    const countryPicker = screen.getByText("Select Country").closest("button");
    await act(async () => {
      fireEvent.click(countryPicker!);
    });

    expect(mockInstance.pickCountryCode).toHaveBeenCalled();
  });
});
