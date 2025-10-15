// Import the mocked functions - they're already mocked by the __mocks__ folder
import {
  continueEnrollment,
  pickCountryCode,
  useScreen,
  useTransaction,
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

    expect(continueEnrollment).not.toHaveBeenCalled();

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
      expect(continueEnrollment).toHaveBeenCalledWith({
        phone: "1234567890",
      });
    });
  });

  it("should handle country code picker interaction", async () => {
    render(<MfaSmsEnrollmentScreen />);

    await ScreenTestUtils.clickButton(/select country/i);
    await waitFor(() => {
      expect(pickCountryCode).toHaveBeenCalledWith({});
    });
  });

  it("should display API errors when enrollment fails", () => {
    const mockUseTransaction = useTransaction as jest.Mock;
    const originalMock = mockUseTransaction();

    mockUseTransaction.mockReturnValue({
      ...originalMock,
      hasErrors: true,
      errors: [
        { message: "Phone number is already enrolled", field: "phone" },
        { message: "Invalid phone number format", field: "phone" },
        { message: "Network connection failed" },
      ],
    });

    render(<MfaSmsEnrollmentScreen />);

    // Should display all general error messages (field-specific errors are handled by form validation)
    expect(screen.getByText(/network connection failed/i)).toBeInTheDocument();
    // Note: Field-specific errors like "phone number is already enrolled" would be displayed
    // in the form field error area, not as general alerts
  });

  it("should set fallback title when texts is missing", () => {
    const mockUseScreen = useScreen as jest.Mock;
    const originalMock = mockUseScreen();

    mockUseScreen.mockReturnValue({
      ...originalMock,
      texts: null,
    });

    render(<MfaSmsEnrollmentScreen />);

    // Should use fallback title
    expect(document.title).toBe("Secure Your Account - MFA");
  });
});
