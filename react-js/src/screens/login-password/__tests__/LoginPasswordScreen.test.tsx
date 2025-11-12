import { act, render, screen } from "@testing-library/react";

import type { MockLoginPasswordInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-password";
import {
  getMockLoginPasswordInstance,
  resetMockLoginPasswordInstance,
} from "@/__mocks__/@auth0/auth0-acul-js/login-password";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginPasswordScreen from "../index";

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("LoginPasswordScreen", () => {
  let mockInstance: MockLoginPasswordInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<LoginPasswordScreen />);
    });
    await screen.findByRole("button", { name: /mock continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resetMockLoginPasswordInstance();
    mockInstance = getMockLoginPasswordInstance();
  });

  it("should submit form with username and password", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(/password/i, "TestPass123!");
    await ScreenTestUtils.clickButton(/mock continue/i);

    expect(mockInstance.login).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test@example.com",
        password: "TestPass123!",
      })
    );
  });

  it("should display errors from SDK", async () => {
    mockInstance.getErrors.mockReturnValue([
      { message: "Invalid credentials", field: null },
      { message: "Invalid password", field: "password" },
    ]);
    await renderScreen();

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });

  it("should toggle password visibility", async () => {
    await renderScreen();

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    await act(async () => {
      await ScreenTestUtils.clickButton(/show password/i);
    });

    expect(passwordInput.type).toBe("text");
  });

  it("should display username from data as read-only", async () => {
    await renderScreen();

    const usernameInput = screen.getByDisplayValue(
      "test@example.com"
    ) as HTMLInputElement;
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("readonly");
  });

  it("should show edit link for username field", async () => {
    mockInstance.screen.links = { edit_identifier: "/edit" };
    await renderScreen();

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should conditionally render forgot password and signup links", async () => {
    // Test when enabled
    mockInstance.transaction.isForgotPasswordEnabled = true;
    mockInstance.transaction.isSignupEnabled = true;
    await renderScreen();

    expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should validate password min length based on policy", async () => {
    mockInstance.transaction.passwordPolicy = {
      minLength: 10,
      policy: "good",
    };
    await renderScreen();

    await ScreenTestUtils.fillInput(/password/i, "short");
    await ScreenTestUtils.clickButton(/mock continue/i);

    // Form validation should prevent submission for short password
    expect(mockInstance.login).not.toHaveBeenCalled();
  });
});
