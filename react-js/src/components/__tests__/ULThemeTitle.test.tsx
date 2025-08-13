import { render } from "@testing-library/react";

import ULThemeTitle from "@/components/ULThemeTitle";

describe("ULThemeTitle Component", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(<ULThemeTitle>Test Title</ULThemeTitle>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeTitle className="custom-class">Test Title</ULThemeTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with additional props", () => {
    const { container } = render(
      <ULThemeTitle id="test-id" data-testid="title">
        Test Title
      </ULThemeTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with multiple children", () => {
    const { container } = render(
      <ULThemeTitle>
        <span>Child 1</span>
        <span>Child 2</span>
      </ULThemeTitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests
  it("renders children correctly", () => {
    const { getByText } = render(<ULThemeTitle>Test Title</ULThemeTitle>);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("applies default themed styles", () => {
    const { container } = render(<ULThemeTitle>Test Title</ULThemeTitle>);
    expect(container.firstChild).toHaveClass(
      "mt-6 mb-4 text-header justify-text-header text-(length:--ul-theme-font-title-size) font-title"
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <ULThemeTitle className="custom-class">Test Title</ULThemeTitle>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("passes additional props to the root element", () => {
    const { container } = render(
      <ULThemeTitle id="test-id" data-testid="title">
        Test Title
      </ULThemeTitle>
    );
    expect(container.firstChild).toHaveAttribute("id", "test-id");
    expect(container.firstChild).toHaveAttribute("data-testid", "title");
  });
});
