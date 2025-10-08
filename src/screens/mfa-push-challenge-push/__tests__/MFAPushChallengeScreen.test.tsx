import { act, render, screen } from "@testing-library/react";

import type { MockMfaPushChallengeInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-push-challenge-push";
import { createMockMfaPushChallengeInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-push-challenge-push";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import { useMfaPushChallengeManager } from "../hooks/useMfaPushChallengeManager";
import MfaPushChallengeScreen from "../index";

jest.mock("../hooks/useMfaPushChallengeManager", () => ({
  useMfaPushChallengeManager: jest.fn(),
}));

describe("MfaPushChallengeScreen", () => {
  let mockInstance: MockMfaPushChallengeInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPushChallengeScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockMfaPushChallengeInstance();

    // Mock the useSignupIdManager hook to return our mock data
    (useMfaPushChallengeManager as jest.Mock).mockReturnValue({
      mfaPushChallenge: mockInstance,
      handleContinueMfaPushChallenge: mockInstance.continue,
      handleResendPushNotification: mockInstance.resendPushNotification,
      handleEnterCodeManually: mockInstance.enterCodeManually,
      handleTryAnotherMethod: mockInstance.tryAnotherMethod,
      useMfaPolling: (payload: unknown) => {
        console.log("useMfaPolling called with payload:", payload);
        return {
          isRunning: true,
          startPolling: () => console.log("Mocked startPolling method called"),
          stopPolling: () => console.log("Mocked stopPolling method called"),
        };
      },
      texts: mockInstance.screen.texts,
      errors: mockInstance.transaction.errors || [],
      data: mockInstance.screen.data,
      links: mockInstance.screen.links,
      enrolledFactors: mockInstance.user.enrolledFactors,
    });
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

  it("should verify spinner and device name", async () => {
    await renderScreen();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Your Device")).toBeInTheDocument();
    expect(screen.getByTestId("ul-theme-spinner")).toBeInTheDocument();
  });

  it("should handle Resend Click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(mockInstance.resendPushNotification).toHaveBeenCalled();
  });

  it("should handle Try Another method link click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(mockInstance.tryAnotherMethod).toHaveBeenCalled();
  });

  it("should handle Manually Enter Code click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Manually Enter Code/i);

    expect(mockInstance.enterCodeManually).toHaveBeenCalled();
  });
});
