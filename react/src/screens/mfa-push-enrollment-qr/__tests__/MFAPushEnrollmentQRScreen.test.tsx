import {
  pickAuthenticator,
  useErrors,
} from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaPushEnrollmentQRScreen from "../index";

describe("MfaPushEnrollmentQRScreen", () => {
  beforeAll(() => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPushEnrollmentQRScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure", async () => {
    await renderScreen();

    expect(screen.getByText("Secure Your Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Scan the QR Code below using the Auth0 Guardian app on your mobile device./
      )
    ).toBeInTheDocument();
  });

  it("should call window navigator cliboard write menthod when Copy as code button is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Copy as code/i);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("should call pickAuthenticator when try another method is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(pickAuthenticator).toHaveBeenCalled();
  });

  it("should render the mocked QR code", async () => {
    await renderScreen();

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "mocked_qr_data_url"
    );
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
