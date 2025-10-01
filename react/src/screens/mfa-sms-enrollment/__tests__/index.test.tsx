// Import the mocked functions - they're already mocked by the __mocks__ folder
import {
  useMfaSmsEnrollment,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-sms-enrollment";
import { render, screen, waitFor } from "@testing-library/react";

import { createMockMfaSmsEnrollmentInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-sms-enrollment";
// Test utilities
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

// Component under test
import MfaSmsEnrollmentScreen from "../index";

describe("MfaSmsEnrollmentScreen", () => {
  let mockInstance: ReturnType<typeof createMockMfaSmsEnrollmentInstance>;

  beforeEach(() => {
    // Create a fresh mock instance for each test
    mockInstance = createMockMfaSmsEnrollmentInstance();

    // Reset all mocks
    jest.clearAllMocks();

    // Configure the hooks to return our mock instance data
    (useMfaSmsEnrollment as jest.Mock).mockReturnValue({
      continueEnrollment: mockInstance.continueEnrollment,
      pickCountryCode: mockInstance.pickCountryCode,
      tryAnotherMethod: mockInstance.tryAnotherMethod,
    });
    (useScreen as jest.Mock).mockReturnValue(mockInstance.screen);
    (useTransaction as jest.Mock).mockReturnValue(mockInstance.transaction);
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
      screen.getByLabelText(/enter your phone number\*/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/select country/i)).toBeInTheDocument(); // Country picker
  });

  it("should set document title correctly", () => {
    render(<MfaSmsEnrollmentScreen />);

    // Verify document title is set
    expect(document.title).toBe("Secure Your Account - MFA");
  });

  it("should validate phone number field and prevent submission with empty input", async () => {
    render(<MfaSmsEnrollmentScreen />);
    await ScreenTestUtils.clickButton(/continue/i);

    expect(mockInstance.continueEnrollment).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter your phone number/i)
      ).toBeInTheDocument();
    });
  });

  it("should successfully submit form with valid phone number", async () => {
    render(<MfaSmsEnrollmentScreen />);
    await ScreenTestUtils.fillInput(/enter your phone number\*/i, "1234567890");
    await ScreenTestUtils.clickButton(/continue/i);
    await waitFor(() => {
      expect(mockInstance.continueEnrollment).toHaveBeenCalledWith({
        phone: "1234567890",
      });
    });
  });

  it("should handle country code picker interaction", async () => {
    render(<MfaSmsEnrollmentScreen />);

    await ScreenTestUtils.clickButton(/select country/i);
    await waitFor(() => {
      expect(mockInstance.pickCountryCode).toHaveBeenCalledWith({});
    });
  });

  it("should display API errors when enrollment fails", () => {
    const errorTransaction = {
      ...mockInstance.transaction,
      hasErrors: true,
      errors: [
        { message: "Phone number is already enrolled", field: "phone" },
        { message: "Invalid phone number format", field: "phone" },
        { message: "Network connection failed" },
      ],
    };

    (useTransaction as jest.Mock).mockReturnValue(errorTransaction);

    render(<MfaSmsEnrollmentScreen />);

    // Should display all general error messages (field-specific errors are handled by form validation)
    expect(screen.getByText(/network connection failed/i)).toBeInTheDocument();
    // Note: Field-specific errors like "phone number is already enrolled" would be displayed
    // in the form field error area, not as general alerts
  });

  it("should set fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValue({
      ...mockInstance.screen,
      texts: null,
    });

    render(<MfaSmsEnrollmentScreen />);

    // Should use fallback title
    expect(document.title).toBe("Secure Your Account - MFA");
  });
});
