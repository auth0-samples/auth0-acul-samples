import {
  enroll,
  pickAuthenticator,
  useErrors,
} from "@auth0/auth0-acul-react/mfa-push-welcome";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaPusWelcomeScreen from "../index";

describe("MFAPushWelcomeScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPusWelcomeScreen />);
    });
    await screen.findByText("Secure Your Account");
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure", async () => {
    await renderScreen();

    expect(screen.getByText("Secure Your Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        /In order to continue, install the Auth0 Guardian app via the app store from your mobile device./
      )
    ).toBeInTheDocument();
  });

  it("should call enroll when continue button is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Continue/i);

    expect(enroll).toHaveBeenCalled();
  });

  it("should call pickAuthenticator when try another method is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(pickAuthenticator).toHaveBeenCalled();
  });

  it("should render app store links with correct hrefs", async () => {
    await renderScreen();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "mock_ios_link");
    expect(links[1]).toHaveAttribute("href", "mock_android_link");
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
