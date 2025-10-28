import { useScreen } from "@auth0/auth0-acul-react/reset-password-error";
import { render, screen } from "@testing-library/react";

import ResetPasswordErrorScreen from "../index";

describe("ResetPasswordErrorScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with error message", () => {
    render(<ResetPasswordErrorScreen />);

    expect(screen.getByText(/An Error Occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("sets correct document title from SDK", () => {
    render(<ResetPasswordErrorScreen />);

    expect(document.title).toBe("Password Reset Failed");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "reset-password-error",
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

    render(<ResetPasswordErrorScreen />);

    expect(document.title).toBe("Password reset error");
  });
});
