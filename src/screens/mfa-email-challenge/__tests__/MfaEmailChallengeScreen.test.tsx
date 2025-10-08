import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import {
  continueMethod,
  resendCode,
} from "@/__mocks__/@auth0/auth0-acul-react/mfa-email-challenge";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MFAEmailChallengeScreen from "../index";

jest.mock("@/utils/theme/themeEngine");

describe("MFAEmailChallengeInstance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with header, form, and footer", () => {
    render(<MFAEmailChallengeScreen />);

    // Verify the page title is set properly
    expect(document.title).toBe(
      "Enter your email code to log in | MockApplication"
    );
    expect(screen.getByText(/verify your identity/i)).toBeInTheDocument();

    // Verify email field is disabled and shows masked email
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toHaveValue("xyz*****@abc******");

    // Verify code input field
    expect(screen.getByLabelText(/Enter the code/i)).toBeInTheDocument();

    // Verify continue button
    expect(
      screen.getByRole("button", {
        name: /continue/i,
      })
    ).toBeInTheDocument();
  });

  it("applies theme on load", () => {
    render(<MFAEmailChallengeScreen />);

    // Just verify theme was applied - actual instance structure is tested in hook
    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("displays the resend action text and triggers resendCode on click", async () => {
    render(<MFAEmailChallengeScreen />);

    const resendButton = screen.getByText("Resend");

    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(resendCode).toHaveBeenCalled();
    });
  });

  it("validates code input is required before submission", async () => {
    render(<MFAEmailChallengeScreen />);

    const submitButton = screen.getByRole("button", { name: /Continue/i });

    // Try to submit without entering code
    fireEvent.click(submitButton);

    // Should show validation error
    await screen.findByText(/please enter the verification code/i);

    // Should NOT call the SDK method
    expect(continueMethod).not.toHaveBeenCalled();
  });

  it("successfully submits form with valid code", async () => {
    render(<MFAEmailChallengeScreen />);

    const codeInput = screen.getByLabelText(/Enter the code/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    // Fill the code field
    fireEvent.change(codeInput, { target: { value: "654321" } });

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(continueMethod).toHaveBeenCalledTimes(1);
      expect(continueMethod).toHaveBeenCalledWith({
        code: "654321",
        rememberDevice: false,
      });
    });
  });

  it("submits form with remember device option when checkbox is checked", async () => {
    render(<MFAEmailChallengeScreen />);

    const codeInput = screen.getByLabelText(/Enter the code/i);
    const rememberDeviceCheckbox = screen.getByLabelText(
      /Remember this device for 30 days/i
    );
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    // Fill the code field
    fireEvent.change(codeInput, { target: { value: "123456" } });

    // Check remember device
    fireEvent.click(rememberDeviceCheckbox);

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(continueMethod).toHaveBeenCalledWith({
        code: "123456",
        rememberDevice: true,
      });
    });
  });
});
