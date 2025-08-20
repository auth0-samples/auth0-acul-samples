import { render } from "@testing-library/react";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";
import LoginPasswordlessSmsOtpScreen from "../index";

// Mocking the hook
jest.mock("../hooks/useLoginPasswordlessSmsOtpManager", () => ({
  useLoginPasswordlessSmsOtpManager: jest.fn(),
}));

describe("LoginPasswordlessSmsOtpScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly and match snapshot", () => {
    // Mocking the hook return values
    (useLoginPasswordlessSmsOtpManager as jest.Mock).mockReturnValue({
      loginPasswordlessSmsOtp: {},
      texts: { pageTitle: "Login with SMS OTP" },
    });

    const { asFragment } = render(<LoginPasswordlessSmsOtpScreen />);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  it("should set the document title based on texts.pageTitle", () => {
    (useLoginPasswordlessSmsOtpManager as jest.Mock).mockReturnValue({
      loginPasswordlessSmsOtp: {},
      texts: { pageTitle: "Login with SMS OTP" },
    });

    render(<LoginPasswordlessSmsOtpScreen />);

    // Verify document title
    expect(document.title).toBe("Login with SMS OTP");
  });
});
