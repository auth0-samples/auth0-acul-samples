import { fireEvent, render, screen } from "@testing-library/react";

import ULThemeLink from "../ULThemeLink";

describe("ULThemeLink Component", () => {
  const defaultProps = {
    href: "https://example.com",
    children: "Example Link",
    className: "custom-class",
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ULThemeLink {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the correct text", () => {
    render(<ULThemeLink {...defaultProps} />);
    expect(screen.getByText("Example Link")).toBeInTheDocument();
  });

  it("applies additional class names", () => {
    render(<ULThemeLink {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("renders the correct href attribute", () => {
    render(<ULThemeLink {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("calls the onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    render(<ULThemeLink {...defaultProps} onClick={mockOnClick} />);
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("disables the link when the disabled prop is true", () => {
    render(<ULThemeLink {...defaultProps} disabled />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("pointer-events-none cursor-not-allowed");
    expect(link).toHaveAttribute("aria-disabled", "true");
  });
});
