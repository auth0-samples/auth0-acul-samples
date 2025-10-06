import { render } from "@testing-library/react";

import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";
import MFALoginOptions from "../index";

// Mock the hook
jest.mock("../hooks/useMFALoginOptionsManager", () => ({
  useMfaLoginOptionsManager: jest.fn(),
}));

// Mock the theme application function
jest.mock("@/utils/theme/themeEngine", () => ({
  applyAuth0Theme: jest.fn(),
}));

// Mock child components
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

jest.mock("../components/MFALoginOptionsList", () => () => (
  <div data-testid="mock-login-options-list">Mock Login Options List</div>
));

describe("MFALoginOptions", () => {
  const mockTexts = {
    pageTitle: "Login with another method",
  };

  const mockLoginOptions = {
    options: ["sms", "email"],
  };

  const mockUseMfaLoginOptionsManager = useMfaLoginOptionsManager as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMfaLoginOptionsManager.mockReturnValue({
      mfaLoginOptions: mockLoginOptions,
      texts: mockTexts,
    });
  });

  it("should apply the theme using applyAuth0Theme", () => {
    render(<MFALoginOptions />);
    expect(applyAuth0Theme).toHaveBeenCalledWith(mockLoginOptions);
  });

  it("should set document.title to texts.pageTitle when available", () => {
    render(<MFALoginOptions />);
    expect(document.title).toBe(mockTexts.pageTitle);
  });

  it("should set fallback title when texts is missing", () => {
    mockUseMfaLoginOptionsManager.mockReturnValue({
      mfaLoginOptions: mockLoginOptions,
      texts: null,
    });

    render(<MFALoginOptions />);
    expect(document.title).toBe("List of other login methods");
  });
});
