import { fireEvent, render, screen } from "@testing-library/react";

import {
  enroll,
  useScreen,
  useTransaction,
} from "@/__mocks__/@auth0/auth0-acul-react/mfa-begin-enroll-options";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaBeginEnrollOptionsScreen from "../index";

jest.mock("@/utils/theme/themeEngine");

describe("MfaBeginEnrollOptionsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with MFA enrollment options", () => {
    render(<MfaBeginEnrollOptionsScreen />);

    // Verify the page title is set properly
    expect(document.title).toBe(
      "Add another authentication method | All Applications"
    );

    // Verify MFA options are displayed
    expect(screen.getByText(/SMS/i)).toBeInTheDocument();
    expect(screen.getByText(/Authenticator App/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Key/i)).toBeInTheDocument();
  });

  it("applies theme on load", () => {
    render(<MfaBeginEnrollOptionsScreen />);

    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("calls enroll SDK method when SMS option is clicked", async () => {
    render(<MfaBeginEnrollOptionsScreen />);

    const smsButton = screen.getByText(/SMS/i).closest("button");
    fireEvent.click(smsButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "sms" });
  });

  it("calls enroll SDK method when OTP option is clicked", async () => {
    render(<MfaBeginEnrollOptionsScreen />);

    const otpButton = screen.getByText(/Authenticator App/i).closest("button");
    fireEvent.click(otpButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "otp" });
  });

  it("calls enroll SDK method when Security Key option is clicked", async () => {
    render(<MfaBeginEnrollOptionsScreen />);

    const securityKeyButton = screen
      .getByText(/Security Key/i)
      .closest("button");
    fireEvent.click(securityKeyButton!);

    expect(enroll).toHaveBeenCalledWith({ action: "webauthn-roaming" });
  });

  it("displays general errors when present", () => {
    const mockErrors = [
      { message: "Network error occurred", field: null },
      { message: "Service unavailable", field: undefined },
    ];

    (useTransaction as jest.Mock).mockReturnValue({
      state: "",
      locale: "",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      hasErrors: true,
      errors: mockErrors,
      currentConnection: null,
      alternateConnections: null,
    });

    render(<MfaBeginEnrollOptionsScreen />);

    expect(screen.getByText("Network error occurred")).toBeInTheDocument();
    expect(screen.getByText("Service unavailable")).toBeInTheDocument();
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValue({
      name: "mfa-begin-enroll-options",
      texts: null,
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
      data: {
        enrollmentOptions: ["sms"],
      },
    });

    render(<MfaBeginEnrollOptionsScreen />);

    expect(document.title).toBe("Add another authentication method");
  });
});
