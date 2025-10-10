import { enroll, useScreen } from "@auth0/auth0-acul-react/mfa-login-options";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock theme application
jest.mock("@/utils/theme/themeEngine", () => ({
  applyAuth0Theme: jest.fn(),
}));

import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MFALoginOptionsScreen from "../index";

describe("MfaLoginOptionsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with MFA login options", () => {
    render(<MFALoginOptionsScreen />);

    // Verify MFA options are displayed
    expect(screen.getByText(/SMS/i)).toBeInTheDocument();
    expect(screen.getByText(/OTP App/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Key/i)).toBeInTheDocument();
  });

  it("applies theme on load", () => {
    render(<MFALoginOptionsScreen />);

    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("calls enroll SDK method when SMS option is clicked", async () => {
    render(<MFALoginOptionsScreen />);

    const smsButton = screen.getByText(/SMS/i).closest("button");
    fireEvent.click(smsButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "sms" });
  });

  it("calls enroll SDK method when OTP option is clicked", async () => {
    render(<MFALoginOptionsScreen />);

    const otpButton = screen.getByText(/OTP App/i).closest("button");
    fireEvent.click(otpButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "otp" });
  });

  it("calls enroll SDK method when Security Key option is clicked", async () => {
    render(<MFALoginOptionsScreen />);

    const securityKeyButton = screen
      .getByText(/Security Key/i)
      .closest("button");
    fireEvent.click(securityKeyButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "webauthn-roaming" });
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "mfa-login-options",
      texts: undefined,
      data: { enrolled_factors: [] },
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
    });

    render(<MFALoginOptionsScreen />);

    expect(document.title).toBe("List of other login methods");
  });
});
