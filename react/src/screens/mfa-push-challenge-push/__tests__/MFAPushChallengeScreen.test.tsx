import {
  enterCodeManually,
  resendPushNotification,
  tryAnotherMethod,
  useErrors,
  useMfaPolling,
} from "@auth0/auth0-acul-react/mfa-push-challenge-push";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaPushChallengeScreen from "../index";

describe("MfaPushChallengeScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPushChallengeScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure using CommonTestData", async () => {
    await renderScreen();
    expect(screen.getByText("Verify Your Identity")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We’ve sent a notification to the following device via the Auth0 Guardian app:/
      )
    ).toBeInTheDocument();
  });

  it("should verify useMfaPolling called on page load", async () => {
    await renderScreen();

    expect(useMfaPolling).toHaveBeenCalled();
  });

  it("should verify spinner and device name", async () => {
    await renderScreen();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Your Device")).toBeInTheDocument();
    expect(screen.getByTestId("ul-theme-spinner")).toBeInTheDocument();
  });

  it("should handle Resend Click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendPushNotification).toHaveBeenCalled();
  });

  it("should handle Try Another method link click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(tryAnotherMethod).toHaveBeenCalled();
  });

  it("should handle Manually Enter Code click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Manually Enter Code/i);

    expect(enterCodeManually).toHaveBeenCalled();
  });

  it("should display general errors", async () => {
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      hasErrors: true,
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn((kind: string) => {
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

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });
});
