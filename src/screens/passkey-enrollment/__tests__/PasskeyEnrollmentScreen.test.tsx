import {
  abortPasskeyEnrollment,
  continuePasskeyEnrollment,
  useErrors,
  useScreen,
} from "@auth0/auth0-acul-react/passkey-enrollment";
import { render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import PasskeyEnrollmentScreen from "../index";

describe("PasskeyEnrollmentScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with passkey enrollment content", () => {
    render(<PasskeyEnrollmentScreen />);

    // Verify heading is displayed
    expect(
      screen.getByRole("heading", {
        name: /Create a passkey for All Applications on this device/i,
      })
    ).toBeInTheDocument();
  });

  it("calls continuePasskeyEnrollment SDK method when create button is clicked", async () => {
    render(<PasskeyEnrollmentScreen />);

    // Click the create passkey button
    await ScreenTestUtils.clickButton(/Create a passkey/i);

    expect(continuePasskeyEnrollment).toHaveBeenCalled();
  });

  it("calls abortPasskeyEnrollment SDK method when skip/continue without button is clicked", async () => {
    render(<PasskeyEnrollmentScreen />);

    // Click the continue without passkeys button
    await ScreenTestUtils.clickButton(/Continue without passkeys/i);

    expect(abortPasskeyEnrollment).toHaveBeenCalled();
  });

  it("sets correct document title from SDK", () => {
    render(<PasskeyEnrollmentScreen />);

    expect(document.title).toBe("Log in | All Applications");
  });

  it("sets fallback title when texts is missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      name: "passkey-enrollment",
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
      publicKey: null,
    });

    render(<PasskeyEnrollmentScreen />);

    expect(document.title).toBe("Login");
  });

  it("should display general errors", async () => {
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: {
        byField: jest.fn(() => []),
        byKind: jest.fn((kind: string) => {
          if (kind === "server") {
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

    render(<PasskeyEnrollmentScreen />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });
});
