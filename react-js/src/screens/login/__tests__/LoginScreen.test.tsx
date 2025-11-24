import { act, fireEvent, render, screen } from "@testing-library/react";

import type { MockLoginInstance } from "@/__mocks__/@auth0/auth0-acul-js/login";
import {
  getMockLoginInstance,
  resetMockLoginInstance,
} from "@/__mocks__/@auth0/auth0-acul-js/login";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginScreen from "../index";

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("LoginScreen", () => {
  let mockInstance: MockLoginInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<LoginScreen />);
    });
    await screen.findByRole("button", { name: /mock continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resetMockLoginInstance();
    mockInstance = getMockLoginInstance();
  });

  it("should submit form with username and password", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(/username or email address\*/i, "testuser");
    await ScreenTestUtils.fillInput(/password\*/i, "TestPass123!");
    await ScreenTestUtils.clickButton(/mock continue/i);

    expect(mockInstance.login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser",
        password: "TestPass123!",
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
    await renderScreen();

    const googleButton = screen.getByTestId("social-provider-button-google");
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

    expect(
      screen.queryByTestId("social-provider-button-google")
    ).not.toBeInTheDocument();
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
    await ScreenTestUtils.fillInput(/password\*/i, "ValidPass123!");
    await ScreenTestUtils.fillInput(/enter the code shown above\*/i, "ABCD");
    await ScreenTestUtils.clickButton(/mock continue/i);

    expect(mockInstance.login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        password: "ValidPass123!",
        captcha: "ABCD",
      })
    );
  });

  it("should toggle password visibility", async () => {
    await renderScreen();

    const passwordInput = screen.getByLabelText(
      /password\*/i
    ) as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /show password/i }));
    });

    expect(passwordInput.type).toBe("text");
  });

  it("should adapt form fields based on identifier configuration", async () => {
    mockInstance.getLoginIdentifiers.mockReturnValue(["email"]);
    await renderScreen();

    expect(mockInstance.getLoginIdentifiers).toHaveBeenCalled();
    expect(
      document.querySelector('input[name="username"]')
    ).toBeInTheDocument();
  });

  it("should conditionally render forgot password and signup links", async () => {
    // Test when enabled
    mockInstance.transaction.isForgotPasswordEnabled = true;
    mockInstance.transaction.isSignupEnabled = true;
    await renderScreen();

    expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });
});
