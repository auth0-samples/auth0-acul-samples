import { useScreen } from "@auth0/auth0-acul-react/reset-password-email";
import { render, screen } from "@testing-library/react";

import ResetPasswordEmailScreen from "../index";

describe("ResetPasswordEmailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with reset password email content", () => {
    render(<ResetPasswordEmailScreen />);

    expect(screen.getByText(/Check your email/i)).toBeInTheDocument();
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordEmailScreen />);

    expect(document.title).toBe("Mock Password Reset Email");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "reset-password-email",
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

    render(<ResetPasswordEmailScreen />);

    expect(document.title).toBe("Check your email");
  });
});
