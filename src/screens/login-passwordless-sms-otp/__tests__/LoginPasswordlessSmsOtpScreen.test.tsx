import {
  resendOTP,
  submitOTP,
  useScreen,
} from "@auth0/auth0-acul-react/login-passwordless-sms-otp";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginPasswordlessSmsOtpScreen from "../index";

describe("LoginPasswordlessSmsOtpScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with SMS OTP login content", () => {
    render(<LoginPasswordlessSmsOtpScreen />);

    // Verify description is displayed
    expect(screen.getByText(/Mock description text/i)).toBeInTheDocument();
  });

  it("calls submitOTP SDK method when form is submitted with code", async () => {
    render(<LoginPasswordlessSmsOtpScreen />);

    // Fill in the OTP code
    await ScreenTestUtils.fillInput(/Enter the 6-digit code/i, "123456");

    // Click submit button
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(submitOTP).toHaveBeenCalled();
  });

  it("calls resendOTP SDK method when resend button is clicked", async () => {
    render(<LoginPasswordlessSmsOtpScreen />);

    // Click the resend button
    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendOTP).toHaveBeenCalled();
  });

  it("sets correct document title from SDK", () => {
    render(<LoginPasswordlessSmsOtpScreen />);

    expect(document.title).toBe("Mock Login with SMS OTP");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "login-passwordless-sms-otp",
      texts: undefined,
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: null,
      data: {},
      signupLink: null,
      resetPasswordLink: null,
      backLink: null,
    });

    render(<LoginPasswordlessSmsOtpScreen />);

    expect(document.title).toBe("Enter your phone code to log in");
  });
});
