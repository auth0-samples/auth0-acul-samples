import { fireEvent, render, screen } from "@testing-library/react";

import MFAEnrollOptions from "../components/MFAEnrollOptions";
import { useMfaBeginEnrollOptionsManager } from "../hooks/useMFABeginEnrollOptionsManager";

// Mocks
jest.mock("../hooks/useMFABeginEnrollOptionsManager", () => ({
  useMfaBeginEnrollOptionsManager: jest.fn(),
}));

// Mock icons and components
jest.mock("@/assets/icons/MFAGuardianIcon", () => ({
  MFAGuardianIcon: () => <div data-testid="icon-guardian" />,
}));

jest.mock("@/assets/icons/MFAOTPIcon", () => ({
  MFAOTPIcon: () => <div data-testid="icon-otp" />,
}));

jest.mock("@/assets/icons/MFAPhoneIcon", () => ({
  MFAPhoneIcon: () => <div data-testid="icon-phone" />,
}));

jest.mock("@/assets/icons/MFASmsIcon", () => ({
  MFASmsIcon: () => <div data-testid="icon-sms" />,
}));

jest.mock("@/assets/icons/MFAWebAuthnRoamingIcon", () => ({
  MFAWebAuthnRoamingIcon: () => <div data-testid="icon-webauthn" />,
}));

jest.mock("@/components/ULThemeError", () => ({
  ULThemeAlert: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert">{children}</div>
  ),
  ULThemeAlertTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-title">{children}</div>
  ),
}));

jest.mock("@/components/ULThemeSocialProviderButton", () => {
  return ({ displayName, buttonText, onClick }: any) => (
    <button data-testid={`mfa-button-${displayName}`} onClick={onClick}>
      {buttonText}
    </button>
  );
});

describe("MFAEnrollOptions", () => {
  const mockHandleEnroll = jest.fn();

  const baseTexts = {
    authenticatorNamesSMS: "SMS",
    authenticatorNamesPhone: "Phone",
    authenticatorNamesPushNotification: "Push",
    authenticatorNamesOTP: "OTP App",
    authenticatorNamesWebauthnRoaming: "Security Key",
  };

  const mockUseManager = useMfaBeginEnrollOptionsManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseManager.mockReturnValue({
      texts: baseTexts,
      handleEnroll: mockHandleEnroll,
      errors: [],
      enrollmentOptions: ["sms", "otp", "webauthn-roaming"],
    });
  });

  it("renders the correct MFA options", () => {
    render(<MFAEnrollOptions />);

    expect(screen.getByTestId("mfa-button-SMS")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-OTP App")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-Security Key")).toBeInTheDocument();
  });

  it("triggers handleEnroll when a button is clicked", () => {
    render(<MFAEnrollOptions />);

    fireEvent.click(screen.getByTestId("mfa-button-SMS"));
    fireEvent.click(screen.getByTestId("mfa-button-OTP App"));

    expect(mockHandleEnroll).toHaveBeenCalledTimes(2);
    expect(mockHandleEnroll).toHaveBeenCalledWith({ action: "sms" });
    expect(mockHandleEnroll).toHaveBeenCalledWith({ action: "otp" });
  });

  it("displays general errors if present", () => {
    const mockErrors = [
      { message: "Something went wrong", field: null },
      { message: "Another error", field: undefined },
    ];

    mockUseManager.mockReturnValueOnce({
      texts: baseTexts,
      handleEnroll: mockHandleEnroll,
      errors: mockErrors,
      enrollmentOptions: ["sms"],
    });

    render(<MFAEnrollOptions />);

    const alerts = screen.getAllByTestId("alert");
    expect(alerts).toHaveLength(2);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Another error")).toBeInTheDocument();
  });
});
