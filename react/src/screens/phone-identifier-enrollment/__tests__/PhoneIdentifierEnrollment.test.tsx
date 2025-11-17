import {
  continuePhoneEnrollment,
  returnToPrevious,
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/phone-identifier-enrollment";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PhoneIdentifierEnrollmentForm from "../components/PhoneEnrollmentForm";

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

    render(<Header />);
    expect(screen.getByText(/Verify Your Identity/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We will send a 6-digit code to the following phone number/i
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

  it("should display general errors", async () => {
    // Configure mock transaction to have general error
    const mockTransaction = (useTransaction as jest.Mock)();
    mockTransaction.errors = [CommonTestData.errors.network];
    mockTransaction.hasErrors = true;
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byKind: jest.fn((kind: string) => {
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

    render(<PhoneIdentifierEnrollmentForm />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
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
