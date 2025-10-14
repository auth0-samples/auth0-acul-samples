import { act, render, screen } from "@testing-library/react";

import type { MockMfaPushWelcomeInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-push-welcome";
import { createMockMfaPushWelcomeInstance } from "@/__mocks__/@auth0/auth0-acul-react/mfa-push-welcome";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import { useMfaPushWelcomeManager } from "../hooks/useMfaPushWelcomeManager";
import MfaPusWelcomeScreen from "../index";

jest.mock("../hooks/useMfaPushWelcomeManager", () => ({
  useMfaPushWelcomeManager: jest.fn(),
}));

describe("MFAPushWelcomeScreen", () => {
  let mockInstance: MockMfaPushWelcomeInstance;

  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPusWelcomeScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockInstance = createMockMfaPushWelcomeInstance();

    // Mock the useMfaPushWelcomeManager hook to return our mock data
    (useMfaPushWelcomeManager as jest.Mock).mockReturnValue({
      mfaPushWelcome: mockInstance,
      handleMfaPushWelcomeEnroll: mockInstance.enroll,
      handlePickAuthenticator: mockInstance.pickAuthenticator,
      texts: mockInstance.screen.texts,
      errors: mockInstance.transaction.errors || [],
      data: mockInstance.screen.data,
      links: mockInstance.screen.links,
      enrolledFactors: mockInstance.user.enrolledFactors,
    });
  });

  it("should render screen with basic structure using CommonTestData", async () => {
    await renderScreen();
    expect(screen.getByText("Secure Your Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        /In order to continue, install the Auth0 Guardian app via the app store from your mobile device./
      )
    ).toBeInTheDocument();
  });

  it("should handle Enroll Click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Continue/i);

    expect(mockInstance.enroll).toHaveBeenCalled();
  });

  it("should handle Try Another method link click using ScreenTestUtils", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(mockInstance.pickAuthenticator).toHaveBeenCalled();
  });

  it("should verify href on Android Link using ScreenTestUtils", async () => {
    await renderScreen();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "mock_ios_link");
    expect(links[1]).toHaveAttribute("href", "mock_android_link");
  });
});
