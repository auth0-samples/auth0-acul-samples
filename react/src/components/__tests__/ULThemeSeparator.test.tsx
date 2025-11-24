import { render, screen } from "@testing-library/react";

import ULThemeSeparator from "@/components/ULThemeSeparator";

describe("ULThemeSeparator Component", () => {
  // Snapshot Tests
  it("matches snapshot without text (renders as hr)", () => {
    const { container } = render(<ULThemeSeparator />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with text (renders with separator text)", () => {
    const { container } = render(<ULThemeSeparator text="OR" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeSeparator text="OR" className="custom-class" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Rendering Tests
  it("renders as hr element when no text is provided", () => {
    const { container } = render(<ULThemeSeparator />);
    const hrElement = container.querySelector("hr");
    expect(hrElement).toBeInTheDocument();
  });

  it("renders with separator text when text is provided", () => {
    render(<ULThemeSeparator text="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("renders separator lines when text is provided", () => {
    const { container } = render(<ULThemeSeparator text="OR" />);
    const lines = container.querySelectorAll("div.border-t");
    expect(lines).toHaveLength(2); // Two separator lines
  });

  // Theme Styling Tests
  it("applies proper text styling", () => {
    render(<ULThemeSeparator text="OR" />);
    const textElement = screen.getByText("OR");

    // Check for proper styling
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveAttribute("class");
  });
});
