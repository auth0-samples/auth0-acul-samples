import { fireEvent, render, screen } from "@testing-library/react";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";
import ResetPasswordEmailScreen from "../index";

// Mocking the hooks and utility functions
jest.mock("../hooks/useResetPasswordEmailManager", () => ({
  useResetPasswordEmailManager: jest.fn(),
}));

describe("ResetPasswordEmailScreen", () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure a clean slate
    jest.clearAllMocks();
  });

  // Ensures the component renders correctly and matches a snapshot.
  // This verifies the static structure of the component with mock data.
  it("should render correctly and match snapshot", () => {
    // Mock the hook's return values
    (useResetPasswordEmailManager as jest.Mock).mockReturnValue({
      resetPasswordEmail: {},
      texts: {
        pageTitle: "Password Reset",
        resendLinkText: "Resend verification email",
      },
      handleResendEmail: jest.fn(),
    });

    const { asFragment } = render(<ResetPasswordEmailScreen />);

    // Snapshot test to capture the rendered output
    expect(asFragment()).toMatchSnapshot();
  });

  // Verifies that the document title is updated correctly based on the hook's data.
  it("should set the document title based on texts.pageTitle", () => {
    const mockPageTitle = "Password Reset";
    (useResetPasswordEmailManager as jest.Mock).mockReturnValue({
      resetPasswordEmail: {},
      texts: { pageTitle: mockPageTitle },
      handleResendEmail: jest.fn(),
    });

    render(<ResetPasswordEmailScreen />);

    // Assert that the document title matches the mocked value
    expect(document.title).toBe(mockPageTitle);
  });

  it("should call handleResendEmail when the resend button is clicked", () => {
    // Create a mock function to spy on the button's behavior
    const mockHandleResendEmail = jest.fn();

    (useResetPasswordEmailManager as jest.Mock).mockReturnValue({
      resetPasswordEmail: {},
      texts: {
        pageTitle: "Password Reset",
        resendLinkText: "Resend email",
      },
      handleResendEmail: mockHandleResendEmail,
    });

    render(<ResetPasswordEmailScreen />);

    const resendButton = screen.getByRole("button", {
      name: /Resend email/i,
    });
    fireEvent.click(resendButton);

    expect(mockHandleResendEmail).toHaveBeenCalledTimes(1);
  });
});
