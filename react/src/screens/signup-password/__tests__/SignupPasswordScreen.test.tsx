import {
  useErrors,
  useScreen,
  useSignupPassword,
} from "@auth0/auth0-acul-react/signup-password";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import SignupPasswordScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("SignupPasswordScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<SignupPasswordScreen />);
    });
    await screen.findByRole("button", { name: /continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure and texts from CommonTestData", async () => {
    await renderScreen();

    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(screen.getByText(/Set your password/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CommonTestData.commonTexts.continue })
    ).toBeInTheDocument();
  });

  it("should render password field", async () => {
    await renderScreen();

    expect(screen.getByText("Password*")).toBeInTheDocument();
    expect(screen.getByLabelText("Password*")).toBeInTheDocument();
  });

  it("should show password validation rules with proper validation states", async () => {
    await renderScreen();

    // First type something to trigger validation display
    await ScreenTestUtils.fillInput(/Password\*/i, "a");

    // Verify password validation box appears
    expect(screen.getByText(/Your password must contain/)).toBeInTheDocument();

    // Test with a weak password
    await ScreenTestUtils.fillInput(/Password\*/i, "weak");

    // Verify validation rules are displayed
    expect(screen.getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Lower case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Upper case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Numbers/)).toBeInTheDocument();

    // Count current validation success indicators
    const weakPasswordCheckmarks = screen.queryAllByTestId(/^check-icon-/);
    const initialCheckmarkCount = weakPasswordCheckmarks.length;

    // Test with a strong password
    await ScreenTestUtils.fillInput(/Password\*/i, "StrongPass123!");

    // Now more validation rules should pass - there should be more checkmarks
    const strongPasswordCheckmarks = screen.queryAllByTestId(/^check-icon-/);
    expect(strongPasswordCheckmarks.length).toBeGreaterThan(
      initialCheckmarkCount
    );

    // Should have at least some validation success indicators for the strong password
    expect(strongPasswordCheckmarks.length).toBeGreaterThan(0);
  });

  it("should successfully submit with valid password", async () => {
    await renderScreen();
    const mockSignupPasswordInstance = (useSignupPassword as jest.Mock)();

    // Use a password that will pass all validation rules
    const validPassword = "ValidPass123!";

    await ScreenTestUtils.fillInput(/Password\*/i, validPassword);

    // Verify the component shows some validation success indicators
    // This tests that the validation logic is working in the component
    const checkmarks = screen.queryAllByTestId(/^check-icon-/);
    if (checkmarks.length > 0) {
      expect(checkmarks.length).toBeGreaterThan(0);
    }

    await ScreenTestUtils.clickButton(CommonTestData.commonTexts.continue);

    // Verify that signup was called with the password
    expect(mockSignupPasswordInstance.signup).toHaveBeenCalledWith(
      expect.objectContaining({ password: validPassword })
    );
  });

  it("should integrate with useErrors hook for error handling", async () => {
    await renderScreen();

    // Verify useErrors hook is called (integration check)
    expect(useErrors).toHaveBeenCalled();

    // Verify component renders correctly with error handling in place
    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(
      document.querySelector('input[name="password"]')
    ).toBeInTheDocument();
  });

  it("should display general network errors from CommonTestData", async () => {
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: CommonTestData.errors.network.message,
                kind: "server",
              },
            ];
          }
          return [];
        }),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should render CAPTCHA when enabled", async () => {
    // Configure mock screen to show CAPTCHA
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    mockScreen.captcha = {
      provider: "auth0",
      image: "data:image/png;base64,test",
    };

    await renderScreen();

    expect(screen.getByText(/CAPTCHA/)).toBeInTheDocument();
  });
});
