import { render, screen } from "@testing-library/react";

// Mocks
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import { useMfaBeginEnrollOptionsManager } from "../hooks/useMFABeginEnrollOptionsManager";
// Component under test
import MFABeginEnrollOptions from "../index";

// Mock the hook
jest.mock("../hooks/useMFABeginEnrollOptionsManager", () => ({
  useMfaBeginEnrollOptionsManager: jest.fn(),
}));

// Mock the theme application function
jest.mock("@/utils/theme/themeEngine", () => ({
  applyAuth0Theme: jest.fn(),
}));

// Mock child components to isolate testing
jest.mock("@/components/ULThemeCard", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-card">{children}</div>
  );
});

jest.mock("@/components/ULThemePageLayout", () => {
  return ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="mock-page-layout" data-classname={className}>
      {children}
    </div>
  );
});

jest.mock("../components/Header", () => () => (
  <div data-testid="mock-header">Mock Header</div>
));

jest.mock("../components/MFAEnrollOptions", () => () => (
  <div data-testid="mock-mfa-enroll-options">Mock MFA Options</div>
));

describe("MFABeginEnrollOptions", () => {
  const mockTexts = {
    pageTitle: "Add MFA Method",
  };

  const mockEnrollOptions = {
    someOption: true, // Example shape
  };

  const mockUseMfaBeginEnrollOptionsManager =
    useMfaBeginEnrollOptionsManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMfaBeginEnrollOptionsManager.mockReturnValue({
      mfaBeginEnrollOptions: mockEnrollOptions,
      texts: mockTexts,
    });
  });

  it("should render the layout and all child components", () => {
    render(<MFABeginEnrollOptions />);

    expect(screen.getByTestId("mock-page-layout")).toBeInTheDocument();
    expect(screen.getByTestId("mock-page-layout")).toHaveAttribute(
      "data-classname",
      "theme-universal"
    );

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mfa-enroll-options")).toBeInTheDocument();
  });

  it("should apply the theme using applyAuth0Theme", () => {
    render(<MFABeginEnrollOptions />);
    expect(applyAuth0Theme).toHaveBeenCalledWith(mockEnrollOptions);
  });

  it("should set document.title to texts.pageTitle when available", () => {
    render(<MFABeginEnrollOptions />);
    expect(document.title).toBe(mockTexts.pageTitle);
  });

  it("should set fallback title when texts is missing", () => {
    mockUseMfaBeginEnrollOptionsManager.mockReturnValue({
      mfaBeginEnrollOptions: mockEnrollOptions,
      texts: null,
    });

    render(<MFABeginEnrollOptions />);
    expect(document.title).toBe("Add another authentication method");
  });
});
