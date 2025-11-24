import {
  goBack,
  selectMfaPushDevice,
  useErrors,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-list";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaPushListScreen from "../index";

describe("MFAPushListScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPushListScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with all enrolled devices from user data", async () => {
    await renderScreen();

    // Verify title from screen texts
    expect(screen.getByText("Registered Devices")).toBeInTheDocument();

    // Verify back button
    const backButton = screen.getByRole("button", { name: /go back/i });
    expect(backButton).toBeInTheDocument();

    // Verify all device names from user.enrolledDevices are displayed
    expect(screen.getByText("Test Device 1")).toBeInTheDocument();
    expect(screen.getByText("Test Device 2")).toBeInTheDocument();
  });

  it("should call goBack SDK method when back button is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/go back/i);

    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it("should call selectMfaPushDevice SDK method with correct index when a device is clicked", async () => {
    await renderScreen();

    const firstDevice = screen.getByText("Test Device 1").closest("button");
    const secondDevice = screen.getByText("Test Device 2").closest("button");

    // Click first device
    await act(async () => {
      firstDevice?.click();
    });
    expect(selectMfaPushDevice).toHaveBeenCalledWith({ deviceIndex: 0 });

    // Click second device
    await act(async () => {
      secondDevice?.click();
    });
    expect(selectMfaPushDevice).toHaveBeenCalledWith({ deviceIndex: 1 });
  });

  it("should verify scenario with non-sequential device IDs to verify the correct value is passed", async () => {
    (useUser as jest.Mock).mockReturnValue({
      ...(useUser as jest.Mock)(),
      enrolledDevices: [
        {
          id: 42,
          device: "Test Device 1",
        },
        {
          id: 99,
          device: "Test Device 2",
        },
      ],
    });

    await renderScreen();

    const firstDevice = screen.getByText("Test Device 1").closest("button");
    const secondDevice = screen.getByText("Test Device 2").closest("button");

    // Click first device
    await act(async () => {
      firstDevice?.click();
    });

    expect(selectMfaPushDevice).toHaveBeenCalledWith({ deviceIndex: 42 });

    // Click second device
    await act(async () => {
      secondDevice?.click();
    });
    expect(selectMfaPushDevice).toHaveBeenCalledWith({ deviceIndex: 99 });
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

  it("should handle empty devices list gracefully", async () => {
    const mockUseUser = useUser as jest.Mock;
    const originalMock = mockUseUser();
    mockUseUser.mockReturnValue({
      ...originalMock,
      enrolledDevices: [],
    });

    await renderScreen();

    // Title should still be there
    expect(screen.getByText("Registered Devices")).toBeInTheDocument();

    // No devices should be displayed
    expect(screen.queryAllByText(/Test Device/)).toHaveLength(0);
  });

  it("should set document title from screen texts", async () => {
    await renderScreen();
    expect(document.title).toBe("List of available devices | My App");
  });
});
