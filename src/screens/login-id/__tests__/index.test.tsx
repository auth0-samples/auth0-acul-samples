import { render, screen, fireEvent, act } from "@testing-library/react";
import LoginIdScreen from "../index";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import {
  ScreenTestUtils,
  MockConfigUtils,
} from "@/test/utils/screen-test-utils";
import { CommonTestData } from "@/test/fixtures/common-data";
import type { MockLoginIdInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-id";
import { createMockLoginIdInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-id";

// Mock the Auth0 SDK
const MockedLoginIdInstance = LoginIdInstance as unknown as jest.Mock;

describe("LoginIdScreen", () => {
  let mockInstance: MockLoginIdInstance;

  beforeEach(() => {
    MockedLoginIdInstance.mockClear();
    mockInstance = createMockLoginIdInstance();
    MockedLoginIdInstance.mockImplementation(() => mockInstance); // new LoginIdInstance() is replaced with the mockInstance object
  });

  describe("Core Rendering & Functionality", () => {
    beforeEach(() => {
      render(<LoginIdScreen />);
    });

    it("should render the login screen with default content", () => {
      expect(screen.getByText("Mock Welcome Title")).toBeInTheDocument();
      expect(screen.getByText("Mock description text.")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mock Continue" }),
      ).toBeInTheDocument();
    });

    it("should render identifier input with correct label", () => {
      expect(
        screen.getByLabelText("Username or Email Address*"),
      ).toBeInTheDocument();
    });

    it("should call the login method with correct parameters", async () => {
      await ScreenTestUtils.fillInput(
        /username|email|phone/i,
        "test@example.com",
      );
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        captcha: undefined,
      });
    });
  });

  describe("Sign-up & Forgot Password Links", () => {
    it("should render forgot password link when available", () => {
      render(<LoginIdScreen />);
      expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    });

    it("should HIDE the forgot password link when isForgotPasswordEnabled is false", () => {
      mockInstance.transaction.isForgotPasswordEnabled = false;
      render(<LoginIdScreen />);
      expect(screen.queryByText("Can't log in?")).not.toBeInTheDocument();
    });

    it("should render signup link when available", () => {
      render(<LoginIdScreen />);
      expect(screen.getByText("Sign up")).toBeInTheDocument();
    });

    it("should HIDE the signup link when isSignupEnabled is false", () => {
      mockInstance.transaction.isSignupEnabled = false;
      render(<LoginIdScreen />);
      expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
    });
  });

  describe("Identifier Input Variations", () => {
    describe("when only email is allowed", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          allowedIdentifiers: CommonTestData.identifierTypes.emailOnly,
        });
        render(<LoginIdScreen />);
      });

      it("should show email-only input", () => {
        expect(screen.getByLabelText("Email Address*")).toBeInTheDocument();
      });
    });

    describe("when only username is allowed", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          allowedIdentifiers: CommonTestData.identifierTypes.usernameOnly,
        });
        render(<LoginIdScreen />);
      });

      it("should show username-only input", () => {
        expect(screen.getByLabelText("Username*")).toBeInTheDocument();
      });
    });

    describe("when only phone is allowed", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          allowedIdentifiers: CommonTestData.identifierTypes.phoneOnly,
        });
        render(<LoginIdScreen />);
      });

      it("should show phone-only input", () => {
        expect(screen.getByLabelText("Phone Number*")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    describe("when there are general errors", () => {
      beforeEach(() => {
        MockConfigUtils.configureErrors(mockInstance, [
          CommonTestData.errors.general,
        ]);
        render(<LoginIdScreen />);
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
        render(<LoginIdScreen />);
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
        render(<LoginIdScreen />);
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
      render(<LoginIdScreen />);
      expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /enter the code shown above/i }),
      ).toBeInTheDocument();
    });

    it("should HIDE the captcha when isCaptchaAvailable is false", () => {
      mockInstance.screen.isCaptchaAvailable = false;
      render(<LoginIdScreen />);
      expect(
        screen.queryByAltText("CAPTCHA challenge"),
      ).not.toBeInTheDocument();
    });

    it("should not show the CAPTCHA when the captcha image is an empty string", () => {
      mockInstance.screen.isCaptchaAvailable = true; // Still "available"
      mockInstance.screen.captchaImage = ""; // But the component should handle empty image
      render(<LoginIdScreen />);
      expect(
        screen.queryByAltText("CAPTCHA challenge"),
      ).not.toBeInTheDocument();
    });

    it("should include the captcha value in the submission", async () => {
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginIdScreen />);
      await ScreenTestUtils.fillInput(
        /username|email|phone/i,
        "test@example.com",
      );
      await ScreenTestUtils.fillInput(/enter the code shown above/i, "ABC123");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        captcha: "ABC123",
      });
    });
  });

  describe("Social Login", () => {
    it("should show all social login buttons when available", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });
      render(<LoginIdScreen />);
      expect(
        screen.getByRole("button", { name: /continue with google/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /continue with github/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /continue with facebook/i }),
      ).toBeInTheDocument();
    });

    it("should call the federatedLogin method when clicked", async () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: [CommonTestData.socialConnections[0]],
      });
      render(<LoginIdScreen />);
      await ScreenTestUtils.clickButton(/continue with google/i);

      expect(mockInstance.federatedLogin).toHaveBeenCalledWith({
        connection: "google-oauth2",
      });
    });
  });

  describe("Passkey Login", () => {
    it("should SHOW the passkey button when isPasskeyEnabled is true", () => {
      mockInstance.transaction.isPasskeyEnabled = true;
      mockInstance.screen.publicKey = { challenge: "mock-challenge" };
      render(<LoginIdScreen />);
      expect(
        screen.getByRole("button", { name: /continue with a passkey/i }),
      ).toBeInTheDocument();
    });

    it("should HIDE the passkey button when isPasskeyEnabled is false", () => {
      mockInstance.transaction.isPasskeyEnabled = false;
      render(<LoginIdScreen />);
      expect(
        screen.queryByRole("button", { name: /continue with a passkey/i }),
      ).not.toBeInTheDocument();
    });

    it("should call the passkeyLogin method when the button is clicked", async () => {
      mockInstance.transaction.isPasskeyEnabled = true;
      mockInstance.screen.publicKey = { challenge: "mock-challenge" };
      render(<LoginIdScreen />);
      await ScreenTestUtils.clickButton(/continue with a passkey/i);
      expect(mockInstance.passkeyLogin).toHaveBeenCalled();
    });
  });

  describe("Alternative Logins Separator", () => {
    it("should show the separator when social connections are available", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });
      render(<LoginIdScreen />);
      expect(screen.getByText("Or")).toBeInTheDocument();
    });

    it("should show the separator when passkey is available", () => {
      mockInstance.transaction.isPasskeyEnabled = true;
      render(<LoginIdScreen />);
      expect(screen.getByText("Or")).toBeInTheDocument();
    });

    it("should HIDE the separator when no alternative logins are available", () => {
      mockInstance.transaction.isPasskeyEnabled = false;
      mockInstance.transaction.alternateConnections = [];
      render(<LoginIdScreen />);
      expect(screen.queryByText("Or")).not.toBeInTheDocument();
    });
  });

  describe("Combined Authentication Methods", () => {
    it("should show all relevant UI elements when all methods are available", () => {
      // Enable Passkey
      mockInstance.transaction.isPasskeyEnabled = true;
      mockInstance.screen.publicKey = { challenge: "mock-challenge" };
      // Enable Social Connections
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });
      // Enable CAPTCHA
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginIdScreen />);

      // Primary form
      expect(screen.getByText("Mock Welcome Title")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mock Continue" }),
      ).toBeInTheDocument();
      expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();

      // Alternative methods
      expect(
        screen.getByRole("button", { name: /continue with a passkey/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /continue with google/i }),
      ).toBeInTheDocument();

      // Separator
      expect(screen.getByText("Or")).toBeInTheDocument();
    });

    it("should handle form submission correctly", async () => {
      // Enable CAPTCHA
      mockInstance.screen.isCaptchaAvailable = true;
      mockInstance.screen.captchaImage = "data:image/png;base64,mockimage";
      render(<LoginIdScreen />);

      await ScreenTestUtils.fillInput(
        /username|email|phone/i,
        "test@example.com",
      );
      await ScreenTestUtils.fillInput(/enter the code shown above/i, "ABC123");
      await ScreenTestUtils.clickButton("Mock Continue");

      expect(mockInstance.login).toHaveBeenCalledWith({
        username: "test@example.com",
        captcha: "ABC123",
      });
    });
  });

  describe("Page Title", () => {
    it("should set the document title from SDK texts", () => {
      MockConfigUtils.configureTexts(mockInstance, {
        pageTitle: "Custom Login Title",
      });
      render(<LoginIdScreen />);
      expect(document.title).toBe("Custom Login Title");
    });
  });

  describe("Country Code Picker Conditional Display", () => {
    it("should NOT show country picker when phone is mixed with other identifiers", () => {
      mockInstance.transaction.allowedIdentifiers = ["email", "phone"];
      render(<LoginIdScreen />);

      // Should not show country picker when phone is mixed with email
      expect(screen.queryByText("Select Country")).not.toBeInTheDocument();
    });

    it("should NOT show country picker when username and phone are both allowed", () => {
      mockInstance.transaction.allowedIdentifiers = ["username", "phone"];
      render(<LoginIdScreen />);

      // Should not show country picker when phone is mixed with username
      expect(screen.queryByText("Select Country")).not.toBeInTheDocument();
    });

    it("should SHOW country picker ONLY when phone is the sole identifier", () => {
      mockInstance.transaction.allowedIdentifiers = ["phone"];
      mockInstance.transaction.countryCode = null;
      mockInstance.transaction.countryPrefix = null;
      render(<LoginIdScreen />);

      expect(screen.getByText("Select Country")).toBeInTheDocument();
    });

    it("should call pickCountryCode when clicked in phone-only mode", async () => {
      mockInstance.transaction.allowedIdentifiers = ["phone"];
      mockInstance.transaction.countryCode = null;
      mockInstance.transaction.countryPrefix = null;
      render(<LoginIdScreen />);

      const countryPicker = screen
        .getByText("Select Country")
        .closest("button");
      await act(async () => {
        fireEvent.click(countryPicker!);
      });
      expect(mockInstance.pickCountryCode).toHaveBeenCalled();
    });
  });
});
