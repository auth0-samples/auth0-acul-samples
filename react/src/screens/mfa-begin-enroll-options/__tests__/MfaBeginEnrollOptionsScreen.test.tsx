import {
  enroll,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-begin-enroll-options";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaBeginEnrollOptionsScreen from "../index";

jest.mock("@/utils/theme/themeEngine");

describe("MfaBeginEnrollOptionsScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaBeginEnrollOptionsScreen />);
    });
    await screen.findByText(/SMS/i);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with MFA enrollment options", async () => {
    await renderScreen();

    // Verify the page title is set properly
    expect(document.title).toBe(
      "Add another authentication method | All Applications"
    );

    // Verify MFA options are displayed
    expect(screen.getByText(/SMS/i)).toBeInTheDocument();
    expect(screen.getByText(/Authenticator App/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Key/i)).toBeInTheDocument();
  });

  it("applies theme on load", async () => {
    await renderScreen();

    expect(applyAuth0Theme).toHaveBeenCalled();
  });

  it("calls enroll SDK method when SMS option is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/SMS/i);

    expect(enroll).toHaveBeenCalledWith({ action: "sms" });
  });

  it("calls enroll SDK method when OTP option is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Authenticator App/i);

    expect(enroll).toHaveBeenCalledWith({ action: "otp" });
  });

  it("calls enroll SDK method when Security Key option is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Security Key/i);

    expect(enroll).toHaveBeenCalledWith({ action: "webauthn-roaming" });
  });

  it("displays general errors when present", async () => {
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

    await renderScreen();

    expect(screen.getByText("Network error occurred")).toBeInTheDocument();
    expect(screen.getByText("Service unavailable")).toBeInTheDocument();
  });

  it("sets fallback title when texts is missing", async () => {
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

    await act(async () => {
      render(<MfaBeginEnrollOptionsScreen />);
    });

    expect(document.title).toBe("Add another authentication method");
  });
});
