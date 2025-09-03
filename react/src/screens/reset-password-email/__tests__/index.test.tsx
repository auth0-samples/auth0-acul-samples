import { render } from "@testing-library/react";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";
import ResetPasswordEmailScreen from "../index";

/// Mocking the hook
jest.mock("../hooks/useResetPasswordEmailManager", () => ({
  useResetPasswordEmailManager: jest.fn(),
}));

// Mocking the hooks and utility functions
jest.mock("../hooks/useResetPasswordEmailManager");

describe("ResetPasswordEmailScreen", () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure a clean slate
    jest.clearAllMocks();
  });

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
});
