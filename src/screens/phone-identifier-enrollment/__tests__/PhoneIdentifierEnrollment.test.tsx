import {
  continuePhoneEnrollment,
  returnToPrevious,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/phone-identifier-enrollment";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Footer from "../components/Footer";
import PhoneIdentifierEnrollmentForm from "../components/PhoneEnrollmentForm";
import PhoneEnrollmentHeader from "../components/PhoneEnrollmentHeader";

describe("Phone Enrollment Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Go Back button with text from texts.backButtonText", () => {
    render(<Footer />);
    expect(
      screen.getByRole("button", { name: /Go Back/i })
    ).toBeInTheDocument();
  });

  it("calls handleReturnToPrevious on button click", async () => {
    render(<Footer />);
    const button = screen.getByRole("button", { name: /Go back/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(returnToPrevious).toHaveBeenCalledTimes(1);
  });

  it("falls back to default texts if missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      texts: undefined,
    });

    render(<PhoneEnrollmentHeader />);
    expect(screen.getByText(/Verify Your Identity/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We will send a 6-digit code to the following phone number:/i
      )
    ).toBeInTheDocument();
  });

  it("renders form with default values and buttons", () => {
    render(<PhoneIdentifierEnrollmentForm />);
    expect(
      screen.getByRole("button", { name: /Text Message/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Voice Call/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continue/i })
    ).toBeInTheDocument();
  });

  it("displays general errors if present", () => {
    (useTransaction as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: [{ message: "General error", field: null }],
    });

    render(<PhoneIdentifierEnrollmentForm />);
    expect(screen.getByText(/General error/i)).toBeInTheDocument();
  });

  it("calls continueEnrollment with selected message type on submit", async () => {
    render(<PhoneIdentifierEnrollmentForm />);
    // Click voice button to select 'voice'
    const voiceButton = screen.getByRole("button", { name: /Voice Call/i });
    await act(async () => {
      fireEvent.click(voiceButton);
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /Continue/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(continuePhoneEnrollment).toHaveBeenCalledWith({ type: "voice" });
  });

  it("updates message type when sms or voice buttons clicked", async () => {
    render(<PhoneIdentifierEnrollmentForm />);

    const smsButton = screen.getByRole("button", { name: /Text Message/i });
    const voiceButton = screen.getByRole("button", { name: /Voice Call/i });

    // Click sms
    await act(async () => {
      fireEvent.click(smsButton);
    });
    // Submit to check if selected is 'text'
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    });
    expect(continuePhoneEnrollment).toHaveBeenLastCalledWith({ type: "text" });

    // Click voice
    await act(async () => {
      fireEvent.click(voiceButton);
      fireEvent.click(screen.getByRole("button", { name: /Continue/i }));
    });
    expect(continuePhoneEnrollment).toHaveBeenLastCalledWith({ type: "voice" });
  });
});
