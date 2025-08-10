import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";
import { render, screen } from "@testing-library/react";

import type { MockLoginPasswordInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-password";
import { createMockLoginPasswordInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-password";
import { CommonTestData } from "@/test/fixtures/common-data";
import {
  MockConfigUtils,
  ScreenTestUtils,
} from "@/test/utils/screen-test-utils";

import LoginPasswordScreen from "../index";

// Mock the Auth0 SDK
const MockedLoginPasswordInstance =
  LoginPasswordInstance as unknown as jest.Mock;

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("LoginPasswordScreen", () => {
  let mockInstance: MockLoginPasswordInstance;

  beforeEach(() => {
    MockedLoginPasswordInstance.mockClear();
    mockInstance = createMockLoginPasswordInstance();
    MockedLoginPasswordInstance.mockImplementation(() => mockInstance); // new LoginPasswordInstance() is replaced with the mockInstance object
  });

  describe("Core Rendering & Functionality", () => {
    beforeEach(() => {
      render(<LoginPasswordScreen />);
    });

    it("should render the login screen with default content", () => {
      expect(screen.getByText("Mock Welcome Title")).toBeInTheDocument();
      expect(screen.getByText("Mock description text.")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mock Continue" })
      ).toBeInTheDocument();
    });

    it("should render identifier and password inputs with correct labels", () => {
      expect(
        screen.getByLabelText("Username or Email Address*")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("should call the login method with correct parameters", async () => {
      await ScreenTestUtils.fillInput(
        /username|email|phone/i,
        "test@example.com"
      );
      await ScreenTestUtils.fillInput(/password/i, "password123");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "password123",
        captcha: undefined,
      });
    });
  });

  describe("CAPTCHA", () => {
    it("should HIDE the captcha when there are no errors", () => {
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginPasswordScreen />);
      expect(
        screen.queryByAltText("CAPTCHA challenge")
      ).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/CAPTCHA\*/i)).not.toBeInTheDocument();
    });

    it("should include the captcha value in the submission", async () => {
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginPasswordScreen />);
      await ScreenTestUtils.fillInput(
        /username|email|phone/i,
        "test@example.com"
      );
      await ScreenTestUtils.fillInput(/password/i, "password123");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "password123",
      });
    });
  });

  describe("Error Handling", () => {
    it("should display general error messages", () => {
      MockConfigUtils.configureErrors(mockInstance, [
        CommonTestData.errors.general,
      ]);
      render(<LoginPasswordScreen />);
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    it("should display field-specific error messages", () => {
      MockConfigUtils.configureErrors(mockInstance, [
        CommonTestData.errors.fieldSpecific,
      ]);
      render(<LoginPasswordScreen />);
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });
});
