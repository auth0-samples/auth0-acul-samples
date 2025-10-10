import {
  abortPasskeyEnrollment,
  continuePasskeyEnrollment,
  useScreen,
} from "@auth0/auth0-acul-react/passkey-enrollment";
import { render, screen } from "@testing-library/react";

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
      screen.getByRole("heading", { name: /Create a passkey on this device/i })
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

    expect(document.title).toBe("Mock Passkey Enrollment");
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
});
