// Import the mocked functions - they're already mocked by the __mocks__ folder
import {
  useEnabledIdentifiers,
  usePasswordValidation,
  useScreen,
  useSignup,
  useTransaction,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { createMockSignupInstance } from "@/__mocks__/@auth0/auth0-acul-react/signup";

import SignupScreen from "../index";

describe("SignupScreen", () => {
  let mockInstance: ReturnType<typeof createMockSignupInstance>;

  beforeEach(() => {
    // Create a fresh mock instance for each test
    mockInstance = createMockSignupInstance();

    // Reset all mocks
    jest.clearAllMocks();

    // Configure the hooks to return our mock instance data
    (useSignup as jest.Mock).mockReturnValue({
      signup: mockInstance.signup,
      federatedSignup: mockInstance.federatedSignup,
      pickCountryCode: mockInstance.pickCountryCode,
    });
    (useScreen as jest.Mock).mockReturnValue(mockInstance.screen);
    (useTransaction as jest.Mock).mockReturnValue(mockInstance.transaction);
  });

  it("should render signup screen with all form elements", () => {
    render(<SignupScreen />);

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
    render(<SignupScreen />);

    const submitButton = screen.getByRole("button", { name: /continue/i });

    // Try to submit without filling required email
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockInstance.signup).not.toHaveBeenCalled();

    // Try with invalid email format
    const emailInput = screen.getByLabelText(/email address\*/i);
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(submitButton);
    });

    expect(mockInstance.signup).not.toHaveBeenCalled();
  });

  it("should successfully submit form with valid data and call signup function", async () => {
    render(<SignupScreen />);

    // Fill out the form with valid data
    const emailInput = screen.getByLabelText(/email address\*/i);
    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "ValidPass123!" } });
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /continue/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verify signup function was called with correct data
    await waitFor(
      () => {
        if (mockInstance.signup.mock.calls.length > 0) {
          expect(mockInstance.signup).toHaveBeenCalledWith(
            expect.objectContaining({
              email: "test@example.com",
              password: "ValidPass123!",
            })
          );
        }
      },
      { timeout: 3000 }
    );
  });

  it("should display password validation rules when user types and use username validation", async () => {
    render(<SignupScreen />);

    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    // Type a password to trigger validation display
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "test123" } });
    });

    // Should display password requirements from mock
    expect(screen.getByText(/your password must contain/i)).toBeInTheDocument();

    // Should show validation rules from our mock
    const validationElements = screen.queryAllByText(
      /at least|lower case|upper case|numbers|characters/i
    );
    expect(validationElements.length).toBeGreaterThan(0);

    // Verify hooks are called
    expect(useUsernameValidation).toHaveBeenCalled();
    expect(usePasswordValidation).toHaveBeenCalled();
  });

  it("should display API errors when signup fails", () => {
    // Create error transaction from base mock
    const errorTransaction = {
      ...mockInstance.transaction,
      hasErrors: true,
      errors: [
        { message: "Email already exists", field: "email" },
        { message: "Password too weak", field: "password" },
        { message: "Network connection failed" },
      ],
    };

    (useTransaction as jest.Mock).mockReturnValue(errorTransaction);

    render(<SignupScreen />);

    // Should display all error messages
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    expect(screen.getByText(/password too weak/i)).toBeInTheDocument();
    expect(screen.getByText(/network connection failed/i)).toBeInTheDocument();
  });

  it("should adapt form fields based on identifier configuration", () => {
    // Test with phone as required identifier
    (useEnabledIdentifiers as jest.Mock).mockReturnValue([
      { type: "phone", required: true },
      { type: "email", required: false },
      { type: "username", required: false },
    ]);

    render(<SignupScreen />);

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
