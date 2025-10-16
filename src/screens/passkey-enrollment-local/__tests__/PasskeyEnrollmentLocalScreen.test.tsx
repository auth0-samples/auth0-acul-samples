import {
  abortPasskeyEnrollment,
  continuePasskeyEnrollment,
} from "@auth0/auth0-acul-react/passkey-enrollment-local";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import PasskeyEnrollmentLocalScreen from "../index";

describe("PasskeyEnrollmentLocalInstance", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<PasskeyEnrollmentLocalScreen />);
    });
    await screen.findByRole("button", { name: /Create a new passkey/i });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with header, form", async () => {
    await renderScreen();

    // Verify the page title is set properly
    expect(document.title).toBe("Log in | All Applications");
    expect(
      screen.getByText(/Create a passkey for All Applications on this device/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Create a new passkey/i,
      })
    ).toBeInTheDocument();
  });

  it("displays the Create a new passkey action text and triggers continuePasskeyEnrollment on click", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton("Create a new passkey");

    expect(continuePasskeyEnrollment).toHaveBeenCalled();
  });

  it("displays the Create without a new passkey action text and triggers abortPasskeyEnrollment on click", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton("Continue without a new passkey");

    expect(abortPasskeyEnrollment).toHaveBeenCalled();
  });
});
