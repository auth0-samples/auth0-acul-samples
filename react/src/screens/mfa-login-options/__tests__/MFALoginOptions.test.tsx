import { fireEvent, render, screen } from "@testing-library/react";

import MFALoginOptionsList from "../components/MFALoginOptionsList";
import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

// Mocks
jest.mock("../hooks/useMFALoginOptionsManager", () => ({
  useMfaLoginOptionsManager: jest.fn(),
}));

// Mock icons
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
jest.mock("@/assets/icons/MFAEmailIcon", () => ({
  MFAEmailIcon: () => <div data-testid="icon-email" />,
}));
jest.mock("@/assets/icons/MFARecoveryCodeIcon", () => ({
  MFARecoveryCodeIcon: () => <div data-testid="icon-recovery" />,
}));
jest.mock("@/assets/icons/MFADuoIcon", () => ({
  MFAEDuoIcon: () => <div data-testid="icon-duo" />,
}));
jest.mock("@/assets/icons/MFAWebAuthnPlatformIcon", () => ({
  MFAWebAuthnPlatformIcon: () => <div data-testid="icon-platform" />,
}));

// Mock components
jest.mock("@/components/ULThemeError", () => ({
  ULThemeAlert: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert">{children}</div>
  ),
  ULThemeAlertTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-title">{children}</div>
  ),
}));

jest.mock("@/components/ULThemeSocialProviderButton", () => {
  return ({
    displayName,
    buttonText,
    onClick,
  }: {
    displayName: string;
    buttonText: string;
    onClick: () => void;
  }) => (
    <button data-testid={`mfa-button-${displayName}`} onClick={onClick}>
      {buttonText}
    </button>
  );
});

jest.mock("@/components/ULThemeSeparator", () => () => (
  <hr data-testid="separator" />
));

describe("MFALoginOptionsList", () => {
  const mockHandleEnroll = jest.fn();

  const mockTexts = {
    authenticatorNamesSMS: "SMS",
    authenticatorNamesOTP: "OTP App",
    authenticatorNamesWebauthnRoaming: "Security Key",
    authenticatorNamesEmail: "Email",
  };

  const mockUseManager = useMfaLoginOptionsManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseManager.mockReturnValue({
      texts: mockTexts,
      handleEnroll: mockHandleEnroll,
      errors: [],
      enrolledFactors: ["sms", "otp", "webauthn-roaming", "email"],
    });
  });

  it("renders the correct MFA options", () => {
    render(<MFALoginOptionsList />);

    expect(screen.getByTestId("mfa-button-SMS")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-OTP App")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-Security Key")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-Email")).toBeInTheDocument();

    // Each option should be followed by a separator
    expect(screen.getAllByTestId("separator")).toHaveLength(4);
  });

  it("calls handleEnroll with correct action when button is clicked", () => {
    render(<MFALoginOptionsList />);

    fireEvent.click(screen.getByTestId("mfa-button-SMS"));
    fireEvent.click(screen.getByTestId("mfa-button-Email"));

    expect(mockHandleEnroll).toHaveBeenCalledTimes(2);
    expect(mockHandleEnroll).toHaveBeenCalledWith({ action: "sms" });
    expect(mockHandleEnroll).toHaveBeenCalledWith({ action: "email" });
  });

  it("renders general errors if present", () => {
    const mockErrors = [
      { message: "Network error", field: null },
      { message: "Invalid credentials", field: undefined },
    ];

    mockUseManager.mockReturnValueOnce({
      texts: mockTexts,
      handleEnroll: mockHandleEnroll,
      errors: mockErrors,
      enrolledFactors: ["otp"],
    });

    render(<MFALoginOptionsList />);

    const alerts = screen.getAllByTestId("alert");
    expect(alerts).toHaveLength(2);
    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("falls back to raw factor name if display name is missing", () => {
    mockUseManager.mockReturnValueOnce({
      texts: {}, // empty object to force fallback
      handleEnroll: mockHandleEnroll,
      errors: [],
      enrolledFactors: ["duo"], // not defined in fallback
    });

    render(<MFALoginOptionsList />);
    expect(screen.getByText("Notification via DUO app")).toBeInTheDocument();
  });
});
