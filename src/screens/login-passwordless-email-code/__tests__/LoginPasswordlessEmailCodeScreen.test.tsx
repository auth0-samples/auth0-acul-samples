import {
  resendCode,
  submitCode,
  useScreen,
} from "@auth0/auth0-acul-react/login-passwordless-email-code";
import { render, screen } from "@testing-library/react";

import { useCaptcha } from "@/hooks/useCaptcha";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import LoginPasswordlessEmailCodeScreen from "../index";

jest.mock("@/hooks/useCaptcha", () => ({
  useCaptcha: jest.fn(),
}));

describe("LoginPasswordlessEmailCodeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const mockedUseCaptcha = useCaptcha as jest.Mock;
    mockedUseCaptcha.mockReturnValue({
      captchaConfig: {
        siteKey: "mock-key",
        provider: "auth0",
        image: "data:image/png;base64,mockimage",
      },
      captchaProps: { label: "CAPTCHA" },
      captchaValue: "mock-value",
    });
  });

  it("renders correctly with email code login content", () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    // Verify description is displayed
    expect(
      screen.getByText(/We've sent an email with your code to:/i)
    ).toBeInTheDocument();
  });

  it("should render captcha when available", async () => {
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    mockScreen.captcha = {
      provider: "auth0",
      image: "data:image/png;base64,test",
    };
    render(<LoginPasswordlessEmailCodeScreen />);

    expect(screen.getByText(/CAPTCHA/)).toBeInTheDocument();
  });

  it("calls submitCode SDK method when form is submitted with code", async () => {
    render(<LoginPasswordlessEmailCodeScreen />);

    // Fill in the email code & captcha
    await ScreenTestUtils.fillInput(/Enter the code/i, "123456");
    await ScreenTestUtils.fillInput("CAPTCHA", "Test123");

    // Click submit button
    await ScreenTestUtils.clickButton(/continue/i);

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

    expect(document.title).toBe("Enter your email code to log in | My App");
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
