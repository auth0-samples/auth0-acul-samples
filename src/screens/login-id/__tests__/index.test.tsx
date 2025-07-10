import { render, screen } from "@testing-library/react";
import LoginIdScreen from "../index";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import {
  ScreenTestUtils,
  MockConfigUtils,
  CommonTestData,
} from "@/test/utils/screen-test-utils";
import { MockLoginIdInstance } from "@/__mocks__/@auth0/auth0-acul-js/login-id";

// Mock the Auth0 SDK
const MockedLoginIdInstance = LoginIdInstance as unknown as jest.Mock;

describe("LoginIdScreen", () => {
  let mockInstance: MockLoginIdInstance;

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

    it("should render forgot password link when available", () => {
      expect(screen.getByText("Can't log in?")).toBeInTheDocument();
    });

    it("should render signup link when available", () => {
      expect(screen.getByText("Sign up")).toBeInTheDocument();
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

  describe("Form Submission", () => {
    describe("with a standard login", () => {
      beforeEach(() => {
        render(<LoginIdScreen />);
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

    describe("when a captcha is present", () => {
      beforeEach(() => {
        mockInstance.screen.captcha = {
          provider: "auth0",
          image: "data:image/png;base64,mockimage",
        };
        render(<LoginIdScreen />);
      });

      it("should include the captcha value in the submission", async () => {
        await ScreenTestUtils.fillInput(
          /username|email|phone/i,
          "test@example.com",
        );
        await ScreenTestUtils.fillInput(
          /enter the code shown above/i,
          "ABC123",
        );
        await ScreenTestUtils.clickButton("Mock Continue");

        expect(mockInstance.login).toHaveBeenCalledWith({
          username: "test@example.com",
          captcha: "ABC123",
        });
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

  describe("CAPTCHA Functionality", () => {
    describe("when configured with an image", () => {
      beforeEach(() => {
        mockInstance.screen.captcha = {
          provider: "auth0",
          image: "data:image/png;base64,mockimage",
        };
        render(<LoginIdScreen />);
      });

      it("should show the CAPTCHA image and input field", () => {
        expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
        expect(
          screen.getByRole("textbox", { name: /enter the code shown above/i }),
        ).toBeInTheDocument();
      });
    });

    describe("when the captcha data is null", () => {
      beforeEach(() => {
        mockInstance.screen.captcha = null;
        render(<LoginIdScreen />);
      });

      it("should not show the CAPTCHA", () => {
        expect(
          screen.queryByAltText("CAPTCHA challenge"),
        ).not.toBeInTheDocument();
      });
    });

    describe("when the captcha image is an empty string", () => {
      beforeEach(() => {
        mockInstance.screen.captcha = {
          provider: "auth0",
          image: "",
        };
        render(<LoginIdScreen />);
      });

      it("should not show the CAPTCHA", () => {
        expect(
          screen.queryByAltText("CAPTCHA challenge"),
        ).not.toBeInTheDocument();
      });
    });

    describe("when a specific image is provided", () => {
      const testImage = "data:image/png;base64,testimage123";

      beforeEach(() => {
        mockInstance.screen.captcha = {
          provider: "auth0",
          image: testImage,
        };
        render(<LoginIdScreen />);
      });

      it("should show the CAPTCHA with the correct image source", () => {
        const captchaImage = screen.getByAltText("CAPTCHA challenge");
        expect(captchaImage).toHaveAttribute("src", testImage);
      });
    });
  });

  describe("Social Login", () => {
    describe("when social connections are available", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          alternateConnections: CommonTestData.socialConnections,
        });
        render(<LoginIdScreen />);
      });

      it("should show all social login buttons", () => {
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

      it("should show the separator", () => {
        expect(screen.getByText("Or")).toBeInTheDocument();
      });
    });

    describe("when a social login button is clicked", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          alternateConnections: [CommonTestData.socialConnections[0]],
        });
        render(<LoginIdScreen />);
      });

      it("should call the federatedLogin method", async () => {
        await ScreenTestUtils.clickButton(/continue with google/i);

        expect(mockInstance.federatedLogin).toHaveBeenCalledWith({
          connection: "google-oauth2",
        });
      });
    });

    describe("when no social connections or passkey are available", () => {
      beforeEach(() => {
        MockConfigUtils.configureTransaction(mockInstance, {
          alternateConnections: [],
        });
        MockConfigUtils.configureScreenData(mockInstance, {});
        render(<LoginIdScreen />);
      });

      it("should not show the separator", () => {
        expect(screen.queryByText("Or")).not.toBeInTheDocument();
      });
    });
  });

  describe("Passkey Login", () => {
    describe("when passkey is available", () => {
      beforeEach(() => {
        MockConfigUtils.configureScreenData(mockInstance, {
          passkey: {
            public_key: {
              challenge: "mock-challenge",
            },
          },
        });
        render(<LoginIdScreen />);
      });

      it("should show the passkey button", () => {
        expect(
          screen.getByRole("button", { name: /continue with a passkey/i }),
        ).toBeInTheDocument();
      });

      it("should call the passkeyLogin method when the button is clicked", async () => {
        await ScreenTestUtils.clickButton(/continue with a passkey/i);
        expect(mockInstance.passkeyLogin).toHaveBeenCalled();
      });

      it("should show the separator", () => {
        expect(screen.getByText("Or")).toBeInTheDocument();
      });
    });

    describe("when passkey is not available", () => {
      beforeEach(() => {
        MockConfigUtils.configureScreenData(mockInstance, {});
        render(<LoginIdScreen />);
      });

      it("should not show the passkey button", () => {
        expect(
          screen.queryByRole("button", { name: /continue with a passkey/i }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Combined Authentication Methods", () => {
    describe("when all methods are available", () => {
      beforeEach(() => {
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
      });

      it("should show all relevant UI elements", () => {
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
        await ScreenTestUtils.fillInput(
          /username|email|phone/i,
          "test@example.com",
        );
        await ScreenTestUtils.fillInput(
          /enter the code shown above/i,
          "ABC123",
        );
        await ScreenTestUtils.clickButton("Mock Continue");

        expect(mockInstance.login).toHaveBeenCalledWith({
          username: "test@example.com",
          captcha: "ABC123",
        });
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
});
