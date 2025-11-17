// Import the mocked functions - they're already mocked by the __mocks__ folder
import {
  continueEnrollment,
  pickCountryCode,
  useErrors,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-sms-enrollment";
import { render, screen, waitFor } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaSmsEnrollmentScreen from "../index";

describe("MfaSmsEnrollmentScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render MFA SMS enrollment screen with all required elements", () => {
    render(<MfaSmsEnrollmentScreen />);

    // Verify basic screen structure using actual text from components
    expect(screen.getByText("Add Phone Number")).toBeInTheDocument();
    expect(
      screen.getByText(/enter your phone number below.*sms will be sent/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();

    // Verify form fields are present
    expect(
      screen.getByLabelText(/enter your phone number/i)
    ).toBeInTheDocument();

    // Country picker shows selected country from mock (US +1)
    expect(screen.getByText(/united states/i)).toBeInTheDocument();
  });

  it("should set document title correctly", () => {
    render(<MfaSmsEnrollmentScreen />);

    // Verify document title is set
    expect(document.title).toBe("Secure Your Account - MFA");
  });

  it("should validate phone number field and prevent submission with empty input", async () => {
    render(<MfaSmsEnrollmentScreen />);
    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueEnrollment).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter your phone number/i)
      ).toBeInTheDocument();
    });
  });

  it("should successfully submit form with valid phone number", async () => {
    render(<MfaSmsEnrollmentScreen />);
    await ScreenTestUtils.fillInput(/enter your phone number/i, "1234567890");
    await ScreenTestUtils.clickButton(/continue/i);

    await waitFor(() => {
      expect(continueEnrollment).toHaveBeenCalledWith({
        phone: "1234567890",
      });
    });
  });

  it("should handle country code picker interaction", async () => {
    render(<MfaSmsEnrollmentScreen />);

    // Click on the country picker button (shows "United States" from mock)
    await ScreenTestUtils.clickButton(/united states/i);

    await waitFor(() => {
      expect(pickCountryCode).toHaveBeenCalledWith({});
    });
  });

  it("should display API errors when enrollment fails", () => {
    const mockUseErrors = useErrors as jest.Mock;

    // Mock useErrors to return errors
    mockUseErrors.mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byKind: jest.fn(() => [
          { id: "1", message: "Network connection failed" },
        ]),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    render(<MfaSmsEnrollmentScreen />);

    // Should display general error messages
    expect(screen.getByText(/network connection failed/i)).toBeInTheDocument();
  });

  it("should set fallback title when texts is missing", () => {
    const mockUseScreen = useScreen as jest.Mock;
    const originalMock = mockUseScreen();

    mockUseScreen.mockReturnValue({
      ...originalMock,
      texts: null,
    });

    render(<MfaSmsEnrollmentScreen />);

    // Should use fallback title from locales
    expect(document.title).toBe("Secure Your Account - MFA");
  });
});
