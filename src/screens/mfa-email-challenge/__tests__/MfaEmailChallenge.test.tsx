import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { createMockMfaEmailChallengeInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-email-challenge";

import MfaEmailChallengeForm from "../components/MfaEmailChallengeForm";
import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

// Mock the hook that returns handlers and data
jest.mock("../hooks/useMFAEmailChallengeManager");

describe("MfaEmailChallengeForm", () => {
  let mockInstance = createMockMfaEmailChallengeInstance();

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockMfaEmailChallengeInstance();

    // Mock the hook to return our mock data and handlers
    (useMfaEmailChallengeManager as jest.Mock).mockReturnValue({
      handleContinue: mockInstance.handleContinue,
      handleResendEmail: mockInstance.handleResendEmail,
      handleTryAnotherMethod: mockInstance.handleTryAnotherMethod,
      data: {
        showRememberDevice: true,
        email: "xyz*****@abc******",
      },
      errors: [], // no errors by default
      texts: {
        buttonText: "Continue",
        description: "We've sent an email with your code to",
        pickAuthenticatorText: "Try another method",
        placeholder: "Enter the code",
        rememberMeText: "Remember this device for 30 days",
        resendActionText: "Resend",
        resendText: "Didn't receive an email?",
      },
    });
  });

  test("renders form with initial values", () => {
    render(<MfaEmailChallengeForm />);
    // Email field (disabled)
    expect(screen.getByLabelText(/email/i)).toHaveValue(
      mockInstance.screen.data?.email
    );
    expect(screen.getByLabelText(/email/i)).toBeDisabled();

    // Code input field
    expect(screen.getByLabelText(/Enter the code/i)).toHaveValue("");

    // Submit button text
    expect(screen.getByRole("button")).toHaveTextContent(/Continue/i);
  });

  test("calls handleContinue with form data when submitted", async () => {
    render(<MfaEmailChallengeForm />);

    const codeInput = screen.getByLabelText(/Enter the code/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    // Fill the form fields
    fireEvent.change(codeInput, { target: { value: "654321" } });
    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockInstance.handleContinue).toHaveBeenCalledTimes(1);
      expect(mockInstance.handleContinue).toHaveBeenCalledWith("654321", false);
    });
  });

  test("validates code input required", async () => {
    render(<MfaEmailChallengeForm />);

    const submitButton = screen.getByRole("button", { name: /Continue/i });

    fireEvent.click(submitButton);

    await screen.findByText(/please enter the verification code/i);

    expect(mockInstance.handleContinue).not.toHaveBeenCalled();
  });
});
