import { act, render, screen } from "@testing-library/react";

import type { MockSignupIdInstance } from "@/__mocks__/@auth0/auth0-acul-react/signup-id";
import { createMockSignupIdInstance } from "@/__mocks__/@auth0/auth0-acul-react/signup-id";
import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";
import SignupIdScreen from "../index";

// Mock the useSignupIdManager hook
jest.mock("../hooks/useSignupIdManager", () => ({
  useSignupIdManager: jest.fn(),
}));

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("SignupIdScreen", () => {
  let mockInstance: MockSignupIdInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<SignupIdScreen />);
    });
    // Wait for primary action to ensure form is ready
    await screen.findByRole("button", {
      name: CommonTestData.commonTexts.continue,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockSignupIdInstance();

    // Mock the useSignupIdManager hook to return our mock data
    (useSignupIdManager as jest.Mock).mockReturnValue({
      signupId: mockInstance,
      handleSignup: mockInstance.signup,
      handleFederatedSignup: mockInstance.federatedSignup,
      handlePickCountryCode: mockInstance.pickCountryCode,
      texts: mockInstance.screen.texts,
      alternateConnections: mockInstance.transaction.alternateConnections,
      isCaptchaAvailable: mockInstance.screen.isCaptchaAvailable,
      loginLink: mockInstance.screen.loginLink,
      captchaImage: mockInstance.screen.captchaImage,
      errors: mockInstance.transaction.errors,
    });
  });

  it("should render screen with basic structure using CommonTestData", async () => {
    await renderScreen();

    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CommonTestData.commonTexts.continue })
    ).toBeInTheDocument();
    expect(screen.getByText(/Sign up to dev-tenant/)).toBeInTheDocument();
  });

  it("should render identifier fields with proper labels", async () => {
    await renderScreen();

    // Required field (phone) - should have asterisk
    expect(screen.getByLabelText("Phone Number*")).toBeInTheDocument();

    // Optional fields - should have (optional) suffix
    expect(
      screen.getByLabelText("Email Address (optional)")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username (optional)")).toBeInTheDocument();
  });

  it("should handle form submission with ScreenTestUtils", async () => {
    await renderScreen();

    // Fill form using ScreenTestUtils
    await ScreenTestUtils.fillInput(/Phone Number/i, "1234567890");
    await ScreenTestUtils.fillInput(/Email Address/i, "test@example.com");
    await ScreenTestUtils.fillInput(/Username/i, "testuser");

    // Submit using CommonTestData button text
    await ScreenTestUtils.clickButton(CommonTestData.commonTexts.continue);

    expect(mockInstance.signup).toHaveBeenCalledWith({
      phone: "1234567890",
      email: "test@example.com",
      username: "testuser",
      captcha: "",
    });
  });

  it("should render social connections from CommonTestData", async () => {
    await renderScreen();

    // Check for social connections using CommonTestData
    const connections = mockInstance.transaction.alternateConnections || [];
    const hasGoogle = connections.some((conn) => conn.strategy === "google");
    const hasGithub = connections.some((conn) => conn.strategy === "github");

    if (hasGoogle) {
      expect(screen.getByText(/Continue with.*Google/i)).toBeInTheDocument();
    }
    if (hasGithub) {
      expect(screen.getByText(/Continue with.*Github/i)).toBeInTheDocument();
    }
  });

  it("should handle federated signup using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Continue with.*Google/i);

    expect(mockInstance.federatedSignup).toHaveBeenCalledWith({
      connection: "google-oauth2",
    });
  });

  it("should display errors from CommonTestData", async () => {
    // Configure error using CommonTestData
    const errorData = [CommonTestData.errors.network];
    mockInstance.transaction.errors = errorData as any;
    mockInstance.transaction.hasErrors = true;

    (useSignupIdManager as jest.Mock).mockReturnValue({
      signupId: mockInstance,
      handleSignup: mockInstance.signup,
      handleFederatedSignup: mockInstance.federatedSignup,
      handlePickCountryCode: mockInstance.pickCountryCode,
      texts: mockInstance.screen.texts,
      alternateConnections: mockInstance.transaction.alternateConnections,
      isCaptchaAvailable: mockInstance.screen.isCaptchaAvailable,
      loginLink: mockInstance.screen.loginLink,
      captchaImage: mockInstance.screen.captchaImage,
      errors: errorData,
    });

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should render footer links using CommonTestData", async () => {
    await renderScreen();

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(
      screen.getByText(CommonTestData.commonTexts.login)
    ).toBeInTheDocument();
  });
});
