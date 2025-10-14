import {
  resendCode,
  submitCode,
  useScreen,
} from "@auth0/auth0-acul-react/login-passwordless-email-code";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginPasswordlessEmailCodeScreen from "../index";

describe("LoginPasswordlessEmailCodeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with email code login content", () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    // Verify description is displayed
    expect(screen.getByText(/Mock description text/i)).toBeInTheDocument();
  });

  it("calls submitCode SDK method when form is submitted with code", async () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    // Fill in the email code
    await ScreenTestUtils.fillInput(/Enter the code/i, "123456");

    // Click submit button
    await ScreenTestUtils.clickButton(/Mock Submit/i);

    expect(submitCode).toHaveBeenCalled();
  });

  it("calls resendCode SDK method when resend button is clicked", async () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    // Click the resend button
    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendCode).toHaveBeenCalled();
  });

  it("sets correct document title from SDK", () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    expect(document.title).toBe("Mock Login with Email Code");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "login-passwordless-email-code",
      texts: undefined,
      isCaptchaAvailable: false,
      captchaProvider: null,
      captchaSiteKey: null,
      captchaImage: null,
      captcha: null,
      links: null,
      data: {},
      backLink: null,
      signupLink: null,
      resetPasswordLink: null,
      editIdentifierLink: null,
    });

    render(<LoginPasswordlessEmailCodeScreen />);

    expect(document.title).toBe("Enter your email code to log in");
  });
});
