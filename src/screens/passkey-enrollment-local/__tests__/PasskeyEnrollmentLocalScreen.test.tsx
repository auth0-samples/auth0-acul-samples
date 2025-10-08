import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import {
  abortPasskeyEnrollment,
  continuePasskeyEnrollment,
} from "@/__mocks__/@auth0/auth0-acul-react/passkey-enrollment-local";

import PasskeyEnrollmentLocalScreen from "../index";

describe("PasskeyEnrollmentLocalInstance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with header, form", () => {
    render(<PasskeyEnrollmentLocalScreen />);

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
    render(<PasskeyEnrollmentLocalScreen />);

    const createClickButton = screen.getByText("Create a new passkey");

    fireEvent.click(createClickButton);

    await waitFor(() => {
      expect(continuePasskeyEnrollment).toHaveBeenCalled();
    });
  });

  it("displays the Create without a new passkey action text and triggers abortPasskeyEnrollment on click", async () => {
    render(<PasskeyEnrollmentLocalScreen />);

    const abortClickButton = screen.getByText("Continue without a new passkey");

    fireEvent.click(abortClickButton);

    await waitFor(() => {
      expect(abortPasskeyEnrollment).toHaveBeenCalled();
    });
  });
});
