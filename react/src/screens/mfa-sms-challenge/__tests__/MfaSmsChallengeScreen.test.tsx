import {
  continueMfaSmsChallenge,
  resendCode,
  tryAnotherMethod,
} from "@auth0/auth0-acul-react/mfa-sms-challenge";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaSmsChallengeScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

describe("MfaSmsChallengeScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaSmsChallengeScreen />);
    });
    await screen.findByRole("button", { name: /continue/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with data from mock", async () => {
    await renderScreen();

    // Verify it displays the mock data correctly
    expect(screen.getByText("Verify Your Identity")).toBeInTheDocument();
    expect(
      screen.getByText(/We've sent a text message to:/i)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("XXXXXXXXX1360")).toBeInTheDocument(); // Phone from mock
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Remember this device for 30 days")
    ).toBeInTheDocument();
    expect(screen.getByText("Didn't receive a code?")).toBeInTheDocument();
    expect(screen.getByText("Resend")).toBeInTheDocument();
    expect(screen.getByText("Try another method")).toBeInTheDocument();
  });

  it("should have phone number field disabled", async () => {
    await renderScreen();

    const phoneField = screen.getByDisplayValue("XXXXXXXXX1360");
    expect(phoneField).toBeDisabled();
  });

  it("should have code input field enabled and focusable", async () => {
    await renderScreen();

    const codeField = screen.getByRole("textbox", {
      name: /enter the 6-digit code/i,
    });
    expect(codeField).toBeInTheDocument();
    expect(codeField).not.toBeDisabled();
    expect(codeField).toHaveAttribute("autocomplete", "one-time-code");
  });

  it("should call continueMfaSmsChallenge with user input when form is submitted", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(/enter the 6-digit code/i, "123456");
    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueMfaSmsChallenge).toHaveBeenCalledWith({
      code: "123456",
      rememberDevice: false,
    });
  });

  it("should include rememberDevice when checkbox is checked", async () => {
    await renderScreen();

    await ScreenTestUtils.fillInput(/enter the 6-digit code/i, "654321");

    const checkbox = screen.getByRole("checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueMfaSmsChallenge).toHaveBeenCalledWith({
      code: "654321",
      rememberDevice: true,
    });
  });

  it("should show validation error when submitting empty code", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/continue/i);

    expect(continueMfaSmsChallenge).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.getByText("Please enter the verification code.")
      ).toBeInTheDocument();
    });
  });

  it("should call resendCode when resend link is clicked", async () => {
    await renderScreen();

    const resendButton = screen.getByText("Resend");
    await act(async () => {
      fireEvent.click(resendButton);
    });

    expect(resendCode).toHaveBeenCalled();
  });

  it("should call tryAnotherMethod when try another method is clicked", async () => {
    await renderScreen();

    const tryAnotherButton = screen.getByText("Try another method");
    await act(async () => {
      fireEvent.click(tryAnotherButton);
    });

    expect(tryAnotherMethod).toHaveBeenCalled();
  });
});
