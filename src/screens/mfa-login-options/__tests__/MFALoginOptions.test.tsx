import { fireEvent, render, screen } from "@testing-library/react";

// Import your custom mock
import {
  handleEnroll,
  useMfaLoginOptionsManager,
} from "@/__mocks__/@auth0/auth0-acul-react/mfa-login-options";

import MFALoginOptionsList from "../components/MFALoginOptionsList";

// Auto mock the hook
jest.mock("../hooks/useMFALoginOptionsManager", () => ({
  useMfaLoginOptionsManager: jest.requireActual(
    "@/__mocks__/@auth0/auth0-acul-react/mfa-login-options"
  ).useMfaLoginOptionsManager,
}));

// Mock UI components
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct MFA options", () => {
    render(<MFALoginOptionsList />);

    expect(screen.getByTestId("mfa-button-SMS")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-OTP App")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-Security Key")).toBeInTheDocument();
    expect(screen.getByTestId("mfa-button-Email")).toBeInTheDocument();

    expect(screen.getAllByTestId("separator")).toHaveLength(4);
  });

  it("calls handleEnroll with correct action when button is clicked", () => {
    render(<MFALoginOptionsList />);

    fireEvent.click(screen.getByTestId("mfa-button-SMS"));
    fireEvent.click(screen.getByTestId("mfa-button-Email"));

    expect(handleEnroll).toHaveBeenCalledTimes(2);
    expect(handleEnroll).toHaveBeenCalledWith({ action: "sms" });
    expect(handleEnroll).toHaveBeenCalledWith({ action: "email" });
  });

  it("renders general errors if present", () => {
    // Override the hook to simulate errors
    (useMfaLoginOptionsManager as jest.Mock).mockReturnValueOnce({
      texts: {},
      handleEnroll,
      errors: [
        { message: "Network error", field: null },
        { message: "Invalid credentials", field: undefined },
      ],
      enrolledFactors: ["otp"],
    });

    render(<MFALoginOptionsList />);

    expect(screen.getAllByTestId("alert")).toHaveLength(2);
    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("falls back to raw factor name if display name is missing", () => {
    (useMfaLoginOptionsManager as jest.Mock).mockReturnValueOnce({
      texts: {}, // Empty texts to trigger fallback
      handleEnroll,
      errors: [],
      enrolledFactors: ["duo"],
    });

    render(<MFALoginOptionsList />);
    expect(screen.getByText("Notification via DUO app")).toBeInTheDocument();
  });
});
