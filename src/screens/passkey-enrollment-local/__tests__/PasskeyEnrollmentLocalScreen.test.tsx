import {
  abortPasskeyEnrollment,
  continuePasskeyEnrollment,
  useErrors,
} from "@auth0/auth0-acul-react/passkey-enrollment-local";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
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

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });
});
