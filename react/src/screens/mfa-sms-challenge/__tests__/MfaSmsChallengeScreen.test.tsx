import {
  useMfaSmsChallenge,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-sms-challenge";
import { act, render, screen } from "@testing-library/react";

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

  it("should render screen with basic structure and texts from CommonTestData", async () => {
    await renderScreen();

    expect(screen.getByText("Verify Your Identity")).toBeInTheDocument();
    expect(
      screen.getByText(/We've sent a text message to/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  it("should render the phone number field as disabled", async () => {
    await renderScreen();

    const phoneField = screen.getByDisplayValue(/XXXXXXXXX/);
    expect(phoneField).toBeInTheDocument();
    expect(phoneField).toBeDisabled();
  });

  it("should render the SMS code input field", async () => {
    await renderScreen();

    const codeField = screen.getByRole("textbox", {
      name: /enter the 6-digit code/i,
    });
    expect(codeField).toBeInTheDocument();
    expect(codeField).not.toBeDisabled();
  });

  it("should render remember device checkbox when showRememberDevice is true", async () => {
    // Mock the data to show remember device option
    const mockUseScreen = useScreen as jest.Mock;
    mockUseScreen.mockReturnValue({
      ...mockUseScreen(),
      data: {
        phoneNumber: "XXXXXXXXX1360",
        showRememberDevice: true,
        showLinkVoice: false,
      },
    });

    await renderScreen();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(
      screen.getByText("Remember this device for 30 days")
    ).toBeInTheDocument();
  });

  it("should render resend link in footer", async () => {
    await renderScreen();

    expect(screen.getByText("Didn't receive a code?")).toBeInTheDocument();
    expect(screen.getByText("Resend")).toBeInTheDocument();
  });

  it("should call continueMfaSmsChallenge when form is submitted", async () => {
    const mockContinueMfaSmsChallenge = jest.fn();
    const mockUseMfaSmsChallenge = useMfaSmsChallenge as jest.Mock;
    mockUseMfaSmsChallenge.mockReturnValue({
      continueMfaSmsChallenge: mockContinueMfaSmsChallenge,
      resendCode: jest.fn(),
      getACall: jest.fn(),
      pickSms: jest.fn(),
      tryAnotherMethod: jest.fn(),
    });

    await renderScreen();

    // Fill the code input
    await ScreenTestUtils.fillInput(/enter the 6-digit code/i, "123456");

    // Submit the form
    await ScreenTestUtils.clickButton(/continue/i);

    expect(mockContinueMfaSmsChallenge).toHaveBeenCalledWith({
      code: "123456",
      rememberDevice: false,
    });
  });
});
