import {
  federatedSignup,
  signup,
  useTransaction,
} from "@auth0/auth0-acul-react/signup-id";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import SignupIdScreen from "../index";

// Mock extractTokenValue to return a default value
jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("SignupIdScreen", () => {
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

    expect(signup).toHaveBeenCalledWith({
      phone: "1234567890",
      email: "test@example.com",
      username: "testuser",
    });
  });

  it("should render social connections from CommonTestData", async () => {
    await renderScreen();

    const mockTransaction = (useTransaction as jest.Mock).mock.results[0]
      ?.value;

    // Check for social connections using CommonTestData
    const connections = mockTransaction?.alternateConnections || [];
    expect(connections.length).toBeGreaterThan(0);
  });

  it("should handle federated signup using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Continue with.*Google/i);

    expect(federatedSignup).toHaveBeenCalledWith({
      connection: "google-oauth2",
    });
  });

  it("should display errors", async () => {
    // Configure error using CommonTestData
    const errorData = [CommonTestData.errors.network];
    (useTransaction as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: errorData,
      state: "mock-state",
      locale: "en",
      requiredIdentifiers: ["phone"],
      optionalIdentifiers: ["email", "username"],
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: "database",
      currentConnection: null,
      alternateConnections: CommonTestData.socialConnections.slice(0, 2),
      isPasskeyEnabled: false,
      usernamePolicy: null,
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
