import {
  resendCode,
  returnToPrevious,
  submitPhoneChallenge,
  useErrors,
  useResend,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/phone-identifier-challenge";
import { render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import PhoneIdentifierChallengeScreen from "../index";

describe("PhoneIdentifierChallengeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with Phone identifier challenge content", () => {
    render(<PhoneIdentifierChallengeScreen />);

    expect(screen.getByText(/Verify Your Identity/i)).toBeInTheDocument();
    expect(screen.getByText(/We've sent a text message/i)).toBeInTheDocument();
  });

  it("renders correctly with voice messageType", () => {
    (useScreen as jest.Mock).mockReturnValue({
      data: { messageType: "voice" },
    });

    render(<PhoneIdentifierChallengeScreen />);
    expect(
      screen.getByText(
        /We've sent a 6-digit code via voice phone call to the following phone number: your phone/i
      )
    ).toBeInTheDocument();
  });

  it("calls submitPhoneChallenge when form is submitted", async () => {
    render(<PhoneIdentifierChallengeScreen />);

    await ScreenTestUtils.fillInput(/Enter the 6-digit code/i, "123456");
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(submitPhoneChallenge).toHaveBeenCalledWith({
      code: "123456",
    });
  });

  it("calls resendCode when Resend is clicked", async () => {
    render(<PhoneIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Resend/i);

    expect(resendCode).toHaveBeenCalled();
  });

  it("calls returnToPrevious when Go back is clicked", async () => {
    render(<PhoneIdentifierChallengeScreen />);

    await ScreenTestUtils.clickButton(/Resend/i);
    (useResend as jest.Mock).mockReturnValueOnce({
      disabled: true,
    });
    render(<PhoneIdentifierChallengeScreen />);
    await ScreenTestUtils.clickButton(/Go back/i);

    expect(returnToPrevious).toHaveBeenCalled();
  });

  it("shows resend limit reached text after resending", async () => {
    render(<PhoneIdentifierChallengeScreen />);
    await ScreenTestUtils.clickButton(/Resend/i);
    (useResend as jest.Mock).mockReturnValueOnce({
      disabled: true,
    });
    render(<PhoneIdentifierChallengeScreen />);
    expect(screen.getByText(/Code has been resent/i)).toBeInTheDocument();
  });

  it("sets correct document title from SDK", () => {
    render(<PhoneIdentifierChallengeScreen />);

    expect(document.title).toBe("Enter your phone code to log in");
  });

  it("sets default title if texts are missing", () => {
    (useScreen as jest.Mock).mockReturnValueOnce({
      texts: undefined,
    });

    render(<PhoneIdentifierChallengeScreen />);
    expect(screen.getByText("Verify Your Identity")).toBeInTheDocument();
  });

  it("should display general errors", async () => {
    // Configure mock transaction to have general error
    const mockTransaction = (useTransaction as jest.Mock)();
    mockTransaction.errors = [CommonTestData.errors.network];
    mockTransaction.hasErrors = true;
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
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

    render(<PhoneIdentifierChallengeScreen />);

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });
});
