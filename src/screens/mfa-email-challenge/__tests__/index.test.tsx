import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import {
  createMockMfaEmailChallengeInstance,
  MockMfaEmailChallengeInstance,
} from "@/__mocks__/@auth0/auth0-acul-react/mfa-email-challenge";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";
import MFAEmailChallengeScreen from "../index";

jest.mock("../hooks/useMFAEmailChallengeManager", () => ({
  useMfaEmailChallengeManager: jest.fn(),
}));
jest.mock("@/utils/theme/themeEngine");

describe("MFAEmailChallengeInstance", () => {
  let mockInstance: MockMfaEmailChallengeInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    mockInstance = createMockMfaEmailChallengeInstance();

    (useMfaEmailChallengeManager as jest.Mock).mockReturnValue({
      mfaEmailChallenge: mockInstance,
      data: mockInstance.screen.data,
      texts: mockInstance.screen.texts,
      errors: mockInstance.transaction.errors || [],
      handleContinue: mockInstance.handleContinue,
      handleResendEmail: mockInstance.handleResendEmail,
      handleTryAnotherMethod: mockInstance.handleTryAnotherMethod,
    });
  });

  it("renders correctly with header, form, and footer", () => {
    render(<MFAEmailChallengeScreen />);

    // Verify the page title is set properly
    expect(document.title).toBe(mockInstance.screen.texts?.pageTitle);
    expect(screen.getByText(/verify your identity/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: mockInstance.screen.texts?.buttonText,
      })
    ).toBeInTheDocument();
  });

  it("applies theme on load", () => {
    render(<MFAEmailChallengeScreen />);
    expect(applyAuth0Theme).toHaveBeenCalledWith(mockInstance);
  });

  it("displays the resend action text and triggers handleResendEmail on click", async () => {
    render(<MFAEmailChallengeScreen />);

    const resendButton = screen.getByText(
      mockInstance.screen.texts?.resendActionText || "Resend"
    );

    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(mockInstance.handleResendEmail).toHaveBeenCalled();
    });

    expect(mockInstance.handleResendEmail).toHaveBeenCalled();
  });
});
