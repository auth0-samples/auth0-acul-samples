import {
  continueMethod,
  resendCode,
} from "@auth0/auth0-acul-react/mfa-email-challenge";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MFAEmailChallengeScreen from "../index";

jest.mock("@/utils/theme/themeEngine");

describe("MFAEmailChallengeInstance", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MFAEmailChallengeScreen />);
    });
    await screen.findByRole("button", { name: /continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with header, form, and footer", async () => {
    await renderScreen();

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

  it("applies theme on load", async () => {
    await renderScreen();

    // Just verify theme was applied - actual instance structure is tested in hook
    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("displays the resend action text and triggers resendCode on click", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton("Resend");

    expect(resendCode).toHaveBeenCalled();
  });

  it("validates code input is required before submission", async () => {
    await renderScreen();

    // Try to submit without entering code
    await ScreenTestUtils.clickButton(/Continue/i);

    // Should show validation error
    await screen.findByText(/please enter the verification code/i);

    // Should NOT call the SDK method
    expect(continueMethod).not.toHaveBeenCalled();
  });

  it("successfully submits form with valid code", async () => {
    await renderScreen();

    // Fill the code field
    await ScreenTestUtils.fillInput(/Enter the code/i, "654321");

    // Submit form
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(continueMethod).toHaveBeenCalledTimes(1);
    expect(continueMethod).toHaveBeenCalledWith({
      code: "654321",
      rememberDevice: false,
    });
  });

  it("submits form with remember device option when checkbox is checked", async () => {
    await renderScreen();

    // Fill the code field
    await ScreenTestUtils.fillInput(/Enter the code/i, "123456");

    // Check remember device checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Remember this device for 30 days/i,
    });
    await act(async () => {
      checkbox.click();
    });

    // Submit form
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(continueMethod).toHaveBeenCalledWith({
      code: "123456",
      rememberDevice: true,
    });
  });
});
