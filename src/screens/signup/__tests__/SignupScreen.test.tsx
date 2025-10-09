import {
  signup,
  useEnabledIdentifiers,
  usePasswordValidation,
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

import SignupScreen from "../index";

describe("SignupScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

    expect(signup).not.toHaveBeenCalled();

    // Try with invalid email format
    const emailInput = screen.getByLabelText(/email address\*/i);
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(submitButton);
    });

    expect(signup).not.toHaveBeenCalled();
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
        expect(signup).toHaveBeenCalledWith(
          expect.objectContaining({
            email: "test@example.com",
            password: "ValidPass123!",
          })
        );
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
