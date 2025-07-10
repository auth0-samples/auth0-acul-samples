import { render, screen } from "@testing-library/react";
import LoginIdScreen from "../index";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import {
  ScreenTestUtils,
  MockConfigUtils,
  CommonTestData,
} from "@/test/utils/screen-test-utils";

// Mock the Auth0 SDK
const MockedLoginIdInstance = LoginIdInstance as unknown as jest.Mock;

describe("LoginIdScreen", () => {
  let mockInstance: any;

  beforeEach(() => {
    MockedLoginIdInstance.mockClear();
    mockInstance = {
      login: jest.fn(),
      federatedLogin: jest.fn(),
      passkeyLogin: jest.fn(),
      pickCountryCode: jest.fn(),
      screen: {
        name: "login-id",
        texts: {
          title: "Mock Welcome Title",
          description: "Mock description text.",
          usernameOrEmailPlaceholder: "Username or Email Address",
          buttonText: "Mock Continue",
          forgotPasswordText: "Can't log in?",
          separatorText: "Or",
          passkeyButtonText: "Continue with a passkey",
          captchaCodePlaceholder: "Enter the code shown above",
        },
        captcha: null,
        links: {
          reset_password: "/test-reset",
          signup: "/test-signup",
        },
        data: {},
      },
      transaction: {
        errors: [],
        allowedIdentifiers: ["email", "username"],
        alternateConnections: [],
      },
    };
    MockedLoginIdInstance.mockImplementation(() => mockInstance);
  });

  describe("Basic Screen Rendering", () => {
    it("should render the login screen with default content", () => {
      render(<LoginIdScreen />);

      expect(screen.getByText("Mock Welcome Title")).toBeInTheDocument();
      expect(screen.getByText("Mock description text.")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mock Continue" }),
      ).toBeInTheDocument();
    });

    it("should render identifier input with correct label", () => {
      render(<LoginIdScreen />);

      expect(
        screen.getByLabelText("Username or Email Address*"),
      ).toBeInTheDocument();
    });

    it("should render forgot password link when available", () => {
      render(<LoginIdScreen />);

      expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    });

    it("should render signup link when available", () => {
      render(<LoginIdScreen />);

      expect(screen.getByText("Sign up")).toBeInTheDocument();
    });
  });

  describe("Identifier Input Variations", () => {
    it("should show email-only input when only email is allowed", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        allowedIdentifiers: CommonTestData.identifierTypes.emailOnly,
      });

      render(<LoginIdScreen />);

      expect(screen.getByLabelText("Email Address*")).toBeInTheDocument();
    });

    it("should show username-only input when only username is allowed", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        allowedIdentifiers: CommonTestData.identifierTypes.usernameOnly,
      });

      render(<LoginIdScreen />);

      expect(screen.getByLabelText("Username*")).toBeInTheDocument();
    });

    it("should show phone-only input when only phone is allowed", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        allowedIdentifiers: CommonTestData.identifierTypes.phoneOnly,
      });

      render(<LoginIdScreen />);

      expect(screen.getByLabelText("Phone Number*")).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("should call login method with correct parameters", async () => {
      render(<LoginIdScreen />);

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

    it("should include captcha value when present", async () => {
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      };

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

  describe("Error Handling", () => {
    it("should display general error messages", () => {
      MockConfigUtils.configureErrors(mockInstance, [
        CommonTestData.errors.general,
      ]);

      render(<LoginIdScreen />);

      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    it("should display field-specific error messages", () => {
      MockConfigUtils.configureErrors(mockInstance, [
        CommonTestData.errors.fieldSpecific,
      ]);

      render(<LoginIdScreen />);

      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    it("should display multiple error messages", () => {
      MockConfigUtils.configureErrors(mockInstance, [
        CommonTestData.errors.general,
        CommonTestData.errors.fieldSpecific,
      ]);

      render(<LoginIdScreen />);

      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  describe("CAPTCHA Functionality", () => {
    it("should show captcha when configured with image", () => {
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      };

      render(<LoginIdScreen />);

      expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /enter the code shown above/i }),
      ).toBeInTheDocument();
    });

    it("should not show captcha when null", () => {
      mockInstance.screen.captcha = null;

      render(<LoginIdScreen />);

      expect(
        screen.queryByAltText("CAPTCHA challenge"),
      ).not.toBeInTheDocument();
    });

    it("should not show captcha when image is empty", () => {
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: "",
      };

      render(<LoginIdScreen />);

      expect(
        screen.queryByAltText("CAPTCHA challenge"),
      ).not.toBeInTheDocument();
    });

    it("should show captcha with correct image source", () => {
      const testImage = "data:image/png;base64,testimage123";
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: testImage,
      };

      render(<LoginIdScreen />);

      const captchaImage = screen.getByAltText("CAPTCHA challenge");
      expect(captchaImage).toHaveAttribute("src", testImage);
    });
  });

  describe("Social Login", () => {
    it("should show social login buttons when connections available", () => {
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

    it("should call federatedLogin method when button clicked", async () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: [CommonTestData.socialConnections[0]],
      });

      render(<LoginIdScreen />);

      await ScreenTestUtils.clickButton(/continue with google/i);

      expect(mockInstance.federatedLogin).toHaveBeenCalledWith({
        connection: "google-oauth2",
      });
    });

    it("should show separator when social connections available", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });

      render(<LoginIdScreen />);

      expect(screen.getByText("Or")).toBeInTheDocument();
    });

    it("should not show separator when no connections and no passkey", () => {
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: [],
      });
      MockConfigUtils.configureScreenData(mockInstance, {});

      render(<LoginIdScreen />);

      expect(screen.queryByText("Or")).not.toBeInTheDocument();
    });
  });

  describe("Passkey Login", () => {
    it("should show passkey button when data available", () => {
      MockConfigUtils.configureScreenData(mockInstance, {
        passkey: {
          public_key: {
            challenge: "mock-challenge",
          },
        },
      });

      render(<LoginIdScreen />);

      expect(
        screen.getByRole("button", { name: /continue with a passkey/i }),
      ).toBeInTheDocument();
    });

    it("should not show passkey button when data not available", () => {
      MockConfigUtils.configureScreenData(mockInstance, {});

      render(<LoginIdScreen />);

      expect(
        screen.queryByRole("button", { name: /continue with a passkey/i }),
      ).not.toBeInTheDocument();
    });

    it("should call passkeyLogin method when button clicked", async () => {
      MockConfigUtils.configureScreenData(mockInstance, {
        passkey: {
          public_key: {
            challenge: "mock-challenge",
          },
        },
      });

      render(<LoginIdScreen />);

      await ScreenTestUtils.clickButton(/continue with a passkey/i);

      expect(mockInstance.passkeyLogin).toHaveBeenCalled();
    });

    it("should show separator when passkey available", () => {
      MockConfigUtils.configureScreenData(mockInstance, {
        passkey: {
          public_key: {
            challenge: "mock-challenge",
          },
        },
      });

      render(<LoginIdScreen />);

      expect(screen.getByText("Or")).toBeInTheDocument();
    });
  });

  describe("Combined Authentication Methods", () => {
    it("should show all methods when all available", () => {
      MockConfigUtils.configureScreenData(mockInstance, {
        passkey: {
          public_key: { challenge: "mock-challenge" },
        },
      });
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      };

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

    it("should handle form submission with all methods present", async () => {
      MockConfigUtils.configureScreenData(mockInstance, {
        passkey: { public_key: { challenge: "mock-challenge" } },
      });
      MockConfigUtils.configureTransaction(mockInstance, {
        alternateConnections: CommonTestData.socialConnections,
      });
      mockInstance.screen.captcha = {
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      };

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
    it("should set document title from SDK texts", () => {
      MockConfigUtils.configureTexts(mockInstance, {
        pageTitle: "Custom Login Title",
      });

      render(<LoginIdScreen />);

      expect(document.title).toBe("Custom Login Title");
    });
  });
});
