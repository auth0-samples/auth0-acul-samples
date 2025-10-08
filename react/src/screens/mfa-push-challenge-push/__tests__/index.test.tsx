import { render } from "@testing-library/react";

import MfaPushChallengeScreen from "../index";

jest.mock("../hooks/useMfaPushChallengeManager", () => ({
  useMfaPushChallengeManager: jest.fn(() => ({
    texts: { pageTitle: "Mocked Page Title" },
    useMfaPolling: jest.fn(() => ({
      isRunning: false,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    })),
  })),
}));

describe("MfaPushChallengeScreen (isolated)", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<MfaPushChallengeScreen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("sets the document title based on mocked texts.pageTitle", () => {
    render(<MfaPushChallengeScreen />);
    expect(document.title).toBe("Mocked Page Title");
  });

  it("sets a default document title if texts.pageTitle is undefined", () => {
    jest.mock("../hooks/useMfaPushChallengeManager", () => ({
      useMfaPushChallengeManager: jest.fn(() => ({
        texts: { pageTitle: undefined },
      })),
    }));

    render(<MfaPushChallengeScreen />);
    expect(document.title).toBe("Mocked Page Title");
  });
});
