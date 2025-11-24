import {
  resendCode,
  returnToPrevious,
  submitEmailChallenge,
  useErrors,
  useResend,
  useScreen,
} from "@auth0/auth0-acul-react/email-identifier-challenge";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import EmailIdentifierChallengeScreen from "../index";

describe("EmailIdentifierChallengeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset useErrors mock to default state
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn(() => []),
        byCode: jest.fn(() => []),
      },
      hasError: false,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    // Reset useResend mock to default state
    (useResend as jest.Mock).mockReturnValue({
      remaining: 0,
      disabled: false,
      startResend: jest.fn(),
    });
  });

  it("renders correctly with email identifier challenge content", () => {
    render(<EmailIdentifierChallengeScreen />);

    expect(screen.getByText(/Verify Your Identity/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We've sent an email with your code to: mock_email@gmail\.com/i
      )
    ).toBeInTheDocument();
  });

  it("calls submitEmailChallenge SDK method when form is submitted with code", async () => {
    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.fillInput(/Enter the 6-digit code/i, "123456");
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(submitEmailChallenge).toHaveBeenCalledWith({
      code: "123456",
    });
  });

  it("calls resendCode SDK method when resend button is clicked", async () => {
    const startResend = jest.fn();
    (useResend as jest.Mock).mockReturnValueOnce({
      remaining: 0,
      disabled: false,
      startResend,
    });

    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendCode).toHaveBeenCalled();
  });

  it("calls returnToPrevious SDK method when go back button is clicked", async () => {
    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Go back/i);

    expect(returnToPrevious).toHaveBeenCalled();
  });

  it("shows resend cooldown when useResend hook is active", async () => {
    (useResend as jest.Mock).mockReturnValueOnce({
      remaining: 25,
      disabled: true,
      startResend: jest.fn(),
    });

    render(<EmailIdentifierChallengeScreen />);

    expect(screen.getByText(/Resend in 25s/i)).toBeInTheDocument();
  });

  it("displays errors from useErrors hook", async () => {
    const mockDismiss = jest.fn();
    const mockUseErrors = useErrors as jest.Mock;

    // Mock useErrors to return errors
    mockUseErrors.mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn(() => [
          {
            id: "error-1",
            message: "Invalid code. Please try again.",
            field: null,
          },
        ]),
        byCode: jest.fn(() => []),
      },
      hasError: true,
      dismiss: mockDismiss,
      dismissAll: jest.fn(),
    });

    render(<EmailIdentifierChallengeScreen />);

    expect(
      screen.getByText(/Invalid code. Please try again./i)
    ).toBeInTheDocument();
  });

  it("sets correct document title from SDK", () => {
    render(<EmailIdentifierChallengeScreen />);

    expect(document.title).toBe("Enter your email code to log in | my app");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "email-identifier-challenge",
      texts: undefined,
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: null,
      data: {},
      backLink: null,
      loginLink: null,
    });

    render(<EmailIdentifierChallengeScreen />);

    expect(document.title).toBe("Enter your email code to log in");
  });
});
