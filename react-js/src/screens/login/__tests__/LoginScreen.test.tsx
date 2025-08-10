import LoginInstance from "@auth0/auth0-acul-js/login";
import { act, fireEvent, render, screen } from "@testing-library/react";

import type { MockLoginInstance } from "@/__mocks__/@auth0/auth0-acul-js/login";
import { createMockLoginInstance } from "@/__mocks__/@auth0/auth0-acul-js/login";
import { CommonTestData } from "@/test/fixtures/common-data";
import {
  MockConfigUtils,
  ScreenTestUtils,
} from "@/test/utils/screen-test-utils";

import LoginScreen from "../index";

// Mock the Auth0 SDK
const MockedLoginInstance = LoginInstance as unknown as jest.Mock;

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("LoginScreen", () => {
  let mockInstance: MockLoginInstance;

  beforeEach(() => {
    MockedLoginInstance.mockClear();
    mockInstance = createMockLoginInstance();
    MockedLoginInstance.mockImplementation(() => mockInstance); // new LoginInstance() is replaced with the mockInstance object
  });

  describe("Core Rendering & Functionality", () => {
    beforeEach(() => {
      render(<LoginScreen />);
    });

    it("should render the login screen with default content", () => {
      expect(screen.getByText("Mock Welcome Title")).toBeInTheDocument();
      expect(screen.getByText("Mock description text.")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mock Continue" })
      ).toBeInTheDocument();
    });

    it("should render username and password inputs with correct labels", () => {
      expect(
        screen.getByLabelText("Username or Email Address*")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Password*")).toBeInTheDocument();
    });

    it("should call the login method with correct parameters", async () => {
      await ScreenTestUtils.fillInput(/username.*email/i, "test@example.com");
      await ScreenTestUtils.fillInput(/password/i, "password123");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "password123",
      });
    });
  });

  describe("Sign-up & Forgot Password Links", () => {
    it("should render forgot password link when available", () => {
      render(<LoginScreen />);
      expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    });

    it("should HIDE the forgot password link when isForgotPasswordEnabled is false", () => {
      mockInstance.transaction.isForgotPasswordEnabled = false;
      render(<LoginScreen />);
      expect(screen.queryByText("Can't log in?")).not.toBeInTheDocument();
    });

    it("should render signup link when available", () => {
      render(<LoginScreen />);
      expect(screen.getByText("Sign up")).toBeInTheDocument();
    });

    it("should HIDE the signup link when isSignupEnabled is false", () => {
      mockInstance.transaction.isSignupEnabled = false;
      render(<LoginScreen />);
      expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    describe("when there are general errors", () => {
      beforeEach(() => {
        MockConfigUtils.configureErrors(mockInstance, [
          CommonTestData.errors.general,
        ]);
        render(<LoginScreen />);
      });

      it("should display the general error message", () => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });
    });

    describe("when there are field-specific errors", () => {
      beforeEach(() => {
        MockConfigUtils.configureErrors(mockInstance, [
          CommonTestData.errors.fieldSpecific,
        ]);
        render(<LoginScreen />);
      });

      it("should display the field-specific error message", () => {
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      });
    });

    describe("when there are multiple errors", () => {
      beforeEach(() => {
        MockConfigUtils.configureErrors(mockInstance, [
          CommonTestData.errors.general,
          CommonTestData.errors.fieldSpecific,
        ]);
        render(<LoginScreen />);
      });

      it("should display all error messages", () => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      });
    });
  });

  describe("CAPTCHA", () => {
    it("should SHOW the captcha when isCaptchaAvailable is true", () => {
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginScreen />);
      expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /enter the code shown above/i })
      ).toBeInTheDocument();
    });

    it("should HIDE the captcha when isCaptchaAvailable is false", () => {
      mockInstance.screen.isCaptchaAvailable = false;
      render(<LoginScreen />);
      expect(
        screen.queryByAltText("CAPTCHA challenge")
      ).not.toBeInTheDocument();
    });

    it("should not show the CAPTCHA when the captcha image is an empty string", () => {
      mockInstance.screen.isCaptchaAvailable = true; // Still "available"
      mockInstance.screen.captchaImage = ""; // But the component should handle empty image
      render(<LoginScreen />);
      expect(
        screen.queryByAltText("CAPTCHA challenge")
      ).not.toBeInTheDocument();
    });

    it("should include the captcha value in the submission", async () => {
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginScreen />);

      await ScreenTestUtils.fillInput(/username.*email/i, "test@example.com");
      await ScreenTestUtils.fillInput(/password/i, "password123");
      await ScreenTestUtils.fillInput(/enter the code shown above/i, "ABCD");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "password123",
        captcha: "ABCD",
      });
    });
  });

  describe("Social Providers", () => {
    it("should render social provider buttons when alternate connections are available", () => {
      render(<LoginScreen />);
      expect(screen.getByText("Continue with Google")).toBeInTheDocument();
      expect(screen.getByText("Continue with Github")).toBeInTheDocument();
    });

    it("should HIDE social providers when no alternate connections are available", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: [],
      });
      render(<LoginScreen />);
      expect(
        screen.queryByText("Continue with Google")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Continue with Github")
      ).not.toBeInTheDocument();
    });

    it("should call federatedLogin when social provider button is clicked", async () => {
      render(<LoginScreen />);

      const googleButton = screen.getByText("Continue with Google");
      await act(async () => {
        fireEvent.click(googleButton);
      });

      expect(mockInstance.federatedLogin).toHaveBeenCalledWith({
        connection: "google-oauth2",
      });
    });
  });

  describe("Form Validation", () => {
    beforeEach(() => {
      render(<LoginScreen />);
    });

    it("should require username field", async () => {
      await ScreenTestUtils.fillInput(/password/i, "password123");
      await ScreenTestUtils.clickButton("Mock Continue");

      // The form validation would show error, but we need to check the actual error message
      // Let's just verify the form doesn't submit without username
      expect(mockInstance.login).not.toHaveBeenCalled();
    });

    it("should require password field", async () => {
      await ScreenTestUtils.fillInput(/username.*email/i, "test@example.com");
      await ScreenTestUtils.clickButton("Mock Continue");

      // The form validation would show error, but we need to check the actual error message
      // Let's just verify the form doesn't submit without password
      expect(mockInstance.login).not.toHaveBeenCalled();
    });
  });

  describe("Password Visibility Toggle", () => {
    it("should toggle password visibility when eye icon is clicked", async () => {
      render(<LoginScreen />);

      // Find the password input
      const passwordInput = screen.getByLabelText(
        "Password*"
      ) as HTMLInputElement;
      expect(passwordInput.type).toBe("password");

      // Find and click the toggle button
      const toggleButton = screen.getByRole("button", {
        name: /show password/i,
      });
      await act(async () => {
        fireEvent.click(toggleButton);
      });

      // Password should now be visible (type="text")
      expect(passwordInput.type).toBe("text");

      // Button text should change
      expect(
        screen.getByRole("button", { name: /hide password/i })
      ).toBeInTheDocument();
    });
  });
});
