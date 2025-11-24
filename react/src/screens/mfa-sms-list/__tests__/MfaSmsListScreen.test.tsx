import {
  backAction,
  selectPhoneNumber,
  useErrors,
  useUser,
} from "@auth0/auth0-acul-react/mfa-sms-list";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaSmsListScreen from "../index";

describe("MfaSmsListScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaSmsListScreen />);
    });
    await screen.findByText(/enrolled phone numbers/i);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with all enrolled phone numbers from user data", async () => {
    await renderScreen();

    // Verify title from screen texts
    expect(screen.getByText("Enrolled Phone Numbers")).toBeInTheDocument();

    // Verify back button
    const backButton = screen.getByRole("button", { name: /go back/i });
    expect(backButton).toBeInTheDocument();

    // Verify all phone numbers from user.enrolledPhoneNumbers are displayed
    expect(screen.getByText("XXXXXXXXX1360")).toBeInTheDocument();
    expect(screen.getByText("XXXXXXXXX3364")).toBeInTheDocument();
  });

  it("should call backAction SDK method when back button is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/go back/i);

    expect(backAction).toHaveBeenCalledTimes(1);
    expect(backAction).toHaveBeenCalledWith({});
  });

  it("should call selectPhoneNumber SDK method with correct index when phone number is clicked", async () => {
    await renderScreen();

    const firstPhoneButton = screen
      .getByText("XXXXXXXXX1360")
      .closest("button");
    const secondPhoneButton = screen
      .getByText("XXXXXXXXX3364")
      .closest("button");

    // Click first phone
    await act(async () => {
      firstPhoneButton?.click();
    });
    expect(selectPhoneNumber).toHaveBeenCalledWith({ index: 0 });

    // Click second phone
    await act(async () => {
      secondPhoneButton?.click();
    });
    expect(selectPhoneNumber).toHaveBeenCalledWith({ index: 1 });
  });

  it("should display general errors from transaction and filter out field-specific errors", async () => {
    const generalError = "Unable to load phone numbers";

    const mockUseErrors = useErrors as jest.Mock;

    // Mock useErrors to return errors
    mockUseErrors.mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn(() => [{ id: "1", message: generalError }]),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await renderScreen();

    // General error should be displayed
    expect(screen.getByText(generalError)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should handle empty phone numbers list gracefully", async () => {
    const mockUseUser = useUser as jest.Mock;
    const originalMock = mockUseUser();
    mockUseUser.mockReturnValue({
      ...originalMock,
      enrolledPhoneNumbers: [],
    });

    await renderScreen();

    // Title should still be there
    expect(screen.getByText("Enrolled Phone Numbers")).toBeInTheDocument();

    // No phone numbers should be displayed
    expect(screen.queryAllByText(/XXXXXXXXX/)).toHaveLength(0);
  });

  it("should set document title from screen texts", async () => {
    await renderScreen();
    expect(document.title).toBe(
      "List of available phone numbers | All Applications"
    );
  });
});
