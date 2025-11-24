import {
  enroll,
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-login-options";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

// Mock theme application
jest.mock("@/utils/theme/themeEngine", () => ({
  applyAuth0Theme: jest.fn(),
}));

import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MFALoginOptionsScreen from "../index";

describe("MfaLoginOptionsScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MFALoginOptionsScreen />);
    });
    await screen.findByText(/SMS/i);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with MFA login options", async () => {
    await renderScreen();

    // Verify MFA options are displayed
    expect(screen.getByText(/SMS/i)).toBeInTheDocument();
    expect(screen.getByText(/OTP App/i)).toBeInTheDocument();
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

    await ScreenTestUtils.clickButton(/OTP App/i);

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

    // Configure mock transaction to have general error
    (useTransaction as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: mockErrors,
    });

    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: "Network error occurred",
                kind: "server",
              },
              {
                id: "service-unavailable",
                message: "Service unavailable",
                kind: "server",
              },
            ];
          }
          return [];
        }),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await renderScreen();

    expect(screen.getByText("Network error occurred")).toBeInTheDocument();
    expect(screen.getByText("Service unavailable")).toBeInTheDocument();
  });

  it("sets fallback title when texts is missing", async () => {
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

    await act(async () => {
      render(<MFALoginOptionsScreen />);
    });

    expect(document.title).toBe("List of other login methods");
  });
});
