import { render } from "@testing-library/react";

import { useLoginPasswordlessEmailCodeManager } from "../hooks/useLoginPasswordlessEmailCodeManager";
import LoginPasswordlessEmailCodeScreen from "../index";

// Mocking the hook
jest.mock("../hooks/useLoginPasswordlessEmailCodeManager", () => ({
  useLoginPasswordlessEmailCodeManager: jest.fn(),
}));

describe("LoginPasswordlessEmailCodeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly and match snapshot", () => {
    // Mocking the hook return values
    (useLoginPasswordlessEmailCodeManager as jest.Mock).mockReturnValue({
      loginPasswordlessEmailCode: {},
      texts: { pageTitle: "Login with Email Code" },
    });

    const { asFragment } = render(<LoginPasswordlessEmailCodeScreen />);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  it("should set the document title based on texts.pageTitle", () => {
    (useLoginPasswordlessEmailCodeManager as jest.Mock).mockReturnValue({
      loginPasswordlessEmailCode: {},
      texts: { pageTitle: "Login with Email Code" },
    });

    render(<LoginPasswordlessEmailCodeScreen />);

    // Verify document title
    expect(document.title).toBe("Login with Email Code");
  });
});
