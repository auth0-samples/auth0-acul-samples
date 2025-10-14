import {
  goBack,
  selectMfaEmail,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-email-list";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaEmailListScreen from "../index";

jest.mock("@auth0/auth0-acul-react/mfa-email-list");

describe("MfaEmailListScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaEmailListScreen />);
    });
    await screen.findByText(/enrolled email addresses/i);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with all enrolled emails from user data", async () => {
    await renderScreen();

    expect(screen.getByText("Enrolled Email Addresses")).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /go back/i });
    expect(backButton).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, el) => !!el?.textContent?.includes("tany******@atko******")
      )
    ).toBeInTheDocument();
  });

  it("should call goBack SDK method when back button is clicked", async () => {
    await renderScreen();
    await ScreenTestUtils.clickButton(/go back/i);

    expect(goBack).toHaveBeenCalledTimes(1);
    expect(jest.isMockFunction(goBack)).toBe(true);
  });

  it("should call selectMfaEmail SDK method with correct index when email is clicked", async () => {
    await renderScreen();

    const emailButtons = screen.getAllByRole("button", {
      name: /@atko/i,
    });

    // Click first email
    await act(async () => {
      emailButtons[0]?.click();
    });
    expect(selectMfaEmail).toHaveBeenCalledWith({ index: 0 });

    // Click second email
    await act(async () => {
      emailButtons[1]?.click();
    });
    expect(selectMfaEmail).toHaveBeenCalledWith({ index: 1 });
  });

  it("should display general errors from transaction and filter out field-specific errors", async () => {
    const generalError = "Unable to load email addresses";
    const fieldError = "Invalid email";

    const mockUseTransaction = useTransaction as jest.Mock;
    const originalMock = mockUseTransaction();
    mockUseTransaction.mockReturnValue({
      ...originalMock,
      hasErrors: true,
      errors: [
        { message: generalError, field: null },
        { message: fieldError, field: "email" },
      ],
    });

    await renderScreen();

    expect(screen.getByText(generalError)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(fieldError)).not.toBeInTheDocument();
  });

  it("should handle empty email list gracefully", async () => {
    const mockUseUser = useUser as jest.Mock;
    const originalMock = mockUseUser();
    mockUseUser.mockReturnValue({
      ...originalMock,
      enrolled_emails: [],
    });

    await renderScreen();

    expect(screen.getByText("Enrolled Email Addresses")).toBeInTheDocument();
    expect(screen.queryAllByRole("button", { name: /@atko/i })).toHaveLength(0);
  });

  it("should set document title from screen texts", async () => {
    await renderScreen();
    expect(document.title).toBe("List of available email addresses | My App");
  });
});
