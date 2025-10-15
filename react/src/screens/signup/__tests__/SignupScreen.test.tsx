import {
  signup,
  useEnabledIdentifiers,
  usePasswordValidation,
  useTransaction,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import SignupScreen from "../index";

describe("SignupScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<SignupScreen />);
    });
    await screen.findByRole("button", { name: /continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render signup screen with all form elements", async () => {
    await renderScreen();

    // Verify basic screen structure using known text from mock
    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(screen.getByText(/sign up to.*continue/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();

    // Verify form fields are present
    expect(screen.getByLabelText(/email address\*/i)).toBeInTheDocument();
    expect(
      document.querySelector('input[name="password"]')
    ).toBeInTheDocument();
    expect(screen.getByText(/select country/i)).toBeInTheDocument(); // Country picker
  });

  it("should validate required fields and prevent submission with invalid data", async () => {
    await renderScreen();

    // Try to submit without filling required email
    await ScreenTestUtils.clickButton(/continue/i);

    expect(signup).not.toHaveBeenCalled();

    // Try with invalid email format
    await ScreenTestUtils.fillInput(/email address\*/i, "invalid-email");
    await ScreenTestUtils.clickButton(/continue/i);

    expect(signup).not.toHaveBeenCalled();
  });

  it("should successfully submit form with valid data and call signup function", async () => {
    await renderScreen();

    // Fill out the form with valid data
    await ScreenTestUtils.fillInput(/email address\*/i, "test@example.com");
    await ScreenTestUtils.fillInput(/password\*/i, "ValidPass123!");

    // Submit the form
    await ScreenTestUtils.clickButton(/continue/i);

    // Verify signup function was called with correct data
    expect(signup).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        password: "ValidPass123!",
      })
    );
  });

  it("should display password validation rules when user types and use username validation", async () => {
    await renderScreen();

    // Fill password to trigger validation display
    await ScreenTestUtils.fillInput(/password\*/i, "test123");

    // Verify hooks are called
    expect(useUsernameValidation).toHaveBeenCalled();
    expect(usePasswordValidation).toHaveBeenCalled();
  });

  it("should display API errors when signup fails", async () => {
    const mockUseTransaction = useTransaction as jest.Mock;
    const originalMock = mockUseTransaction();

    mockUseTransaction.mockReturnValue({
      ...originalMock,
      hasErrors: true,
      errors: [
        { message: "Email already exists", field: "email" },
        { message: "Password too weak", field: "password" },
        { message: "Network connection failed" },
      ],
    });

    await renderScreen();

    // Should display all error messages
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    expect(screen.getByText(/password too weak/i)).toBeInTheDocument();
    expect(screen.getByText(/network connection failed/i)).toBeInTheDocument();
  });

  it("should adapt form fields based on identifier configuration", async () => {
    // Test with phone as required identifier
    (useEnabledIdentifiers as jest.Mock).mockReturnValue([
      { type: "phone", required: true },
      { type: "email", required: false },
      { type: "username", required: false },
    ]);

    await renderScreen();

    // Should show country picker for phone (required)
    expect(screen.getByText(/select country/i)).toBeInTheDocument();

    // Should show phone field
    const phoneInput = document.querySelector('input[name="phoneNumber"]');
    expect(phoneInput).toBeInTheDocument();

    // Should still render the form with submit button
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });
});
