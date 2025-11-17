import {
  useErrors,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/reset-password-email";
import { render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";

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

  it("should integrate with useErrors hook for error handling", async () => {
    render(<ResetPasswordEmailScreen />);

    // Verify useErrors hook is called (integration check)
    expect(useErrors).toHaveBeenCalled();

    // Verify component renders correctly with error handling in place
    expect(screen.getByText(/Check your email/i)).toBeInTheDocument();
  });

  it("should display general errors", async () => {
    // Configure mock transaction to have general error
    const mockTransaction = (useTransaction as jest.Mock)();
    mockTransaction.errors = [CommonTestData.errors.network];
    mockTransaction.hasErrors = true;
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byKind: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: CommonTestData.errors.network.message,
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

    render(<ResetPasswordEmailScreen />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });
});
