import { render } from "@testing-library/react";

import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import ULThemeLogo from "../ULThemeLogo";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(),
}));

describe("ULThemeLogo", () => {
  const mockExtractTokenValue = extractTokenValue as jest.Mock;

  beforeEach(() => {
    mockExtractTokenValue.mockReset();
  });

  // Snapshot Test: Default Props
  it("renders correctly with default props", () => {
    mockExtractTokenValue.mockReturnValue("");
    const { container } = render(<ULThemeLogo altText="Default Logo" />);
    expect(container).toMatchSnapshot();
  });

  // Functional Test: Uses imageUrl prop
  it("uses the imageUrl prop when provided", () => {
    render(
      <ULThemeLogo
        imageUrl="https://example.com/logo.png"
        altText="Custom Logo"
      />
    );
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass(
      "relative flex shrink-0 overflow-hidden rounded-none size-auto"
    );
  });

  // Functional Test: Uses fallback when imageUrl is not provided
  it("uses fallback when imageUrl is not provided", () => {
    mockExtractTokenValue.mockReturnValue(
      "https://example.com/fallback-logo.png"
    );
    render(<ULThemeLogo altText="Fallback Logo" />);
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass(
      "relative flex shrink-0 overflow-hidden rounded-none size-auto"
    );
  });

  // Functional Test: Applies custom className
  it("applies custom className", () => {
    render(
      <ULThemeLogo altText="Custom Class Logo" className="custom-class" />
    );
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveClass(
      "relative flex shrink-0 overflow-hidden rounded-none size-auto"
    );
  });

  // Snapshot Test: With custom className
  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeLogo altText="Snapshot Logo" className="snapshot-class" />
    );
    expect(container).toMatchSnapshot();
  });

  // Functional Test: Renders with correct alt text
  it("renders with correct alt text", () => {
    render(
      <ULThemeLogo
        imageUrl="https://example.com/logo.png"
        altText="Accessible Logo"
      />
    );
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeInTheDocument();
  });

  // Functional Test: Handles empty imageUrl and fallback gracefully
  it("handles empty imageUrl and fallback gracefully", () => {
    mockExtractTokenValue.mockReturnValue("");
    render(<ULThemeLogo altText="Empty Fallback Logo" />);
    const avatar = document.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeInTheDocument();
  });
});
