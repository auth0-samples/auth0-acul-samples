import {
  resendCode,
  returnToPrevious,
  submitEmailChallenge,
  useScreen,
} from "@auth0/auth0-acul-react/email-identifier-challenge";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import EmailIdentifierChallengeScreen from "../index";

describe("EmailIdentifierChallengeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendCode).toHaveBeenCalled();
  });

  it("calls returnToPrevious SDK method when go back button is clicked", async () => {
    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Go back/i);

    expect(returnToPrevious).toHaveBeenCalled();
  });

  it("shows resend limit reached text after resending", async () => {
    render(<EmailIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(screen.getByText(/Code has been resent/i)).toBeInTheDocument();
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
