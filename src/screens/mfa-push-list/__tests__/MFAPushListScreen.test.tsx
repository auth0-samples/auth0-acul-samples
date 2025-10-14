import { act, render, screen } from "@testing-library/react";

import {
  goBack,
  selectMfaPushDevice,
  useTransaction,
  useUser,
} from "@/__mocks__/@auth0/auth0-acul-react/mfa-push-list";
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

  it("should display general errors from transaction and filter out field-specific errors", async () => {
    const generalError = "Unable to load devices";
    const fieldError = "Invalid device name";

    const mockUseTransaction = useTransaction as jest.Mock;
    const originalMock = mockUseTransaction();
    mockUseTransaction.mockReturnValue({
      ...originalMock,
      hasErrors: true,
      errors: [
        { message: generalError, field: null },
        { message: fieldError, field: "device" },
      ],
    });

    await renderScreen();

    // General error should be displayed
    expect(screen.getByText(generalError)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Field-specific error should NOT be displayed in error alert
    expect(screen.queryByText(fieldError)).not.toBeInTheDocument();
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
