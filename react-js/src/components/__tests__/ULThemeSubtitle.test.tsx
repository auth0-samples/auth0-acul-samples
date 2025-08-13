import { render } from "@testing-library/react";

import ULThemeSubtitle from "../ULThemeSubtitle";

describe("ULThemeSubtitle Component", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(
      <ULThemeSubtitle>Test Subtitle</ULThemeSubtitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeSubtitle className="custom-class">Test Subtitle</ULThemeSubtitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with additional props", () => {
    const { container } = render(
      <ULThemeSubtitle id="test-id" data-testid="subtitle">
        Test Subtitle
      </ULThemeSubtitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with multiple children", () => {
    const { container } = render(
      <ULThemeSubtitle>
        <span>Child 1</span>
        <span>Child 2</span>
      </ULThemeSubtitle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Fuctional Tests

  it("renders children correctly", () => {
    const { getByText } = render(
      <ULThemeSubtitle>Test Subtitle</ULThemeSubtitle>
    );
    expect(getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("applies additional props correctly", () => {
    const { container } = render(
      <ULThemeSubtitle data-testid="subtitle">Test Subtitle</ULThemeSubtitle>
    );
    expect(container.firstChild).toHaveAttribute("data-testid", "subtitle");
  });

  it("combines themed styles and custom className", () => {
    const { container } = render(
      <ULThemeSubtitle className="custom-class">Test Subtitle</ULThemeSubtitle>
    );
    expect(container.firstChild).toHaveClass(
      "mb-4 text-body-text justify-text-header text-(length:--ul-theme-font-subtitle-size) font-subtitle"
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("combines themed styles and custom className", () => {
    const { container } = render(
      <ULThemeSubtitle className="custom-class">Test Subtitle</ULThemeSubtitle>
    );
    expect(container.firstChild).toHaveClass(
      "mb-4 text-body-text justify-text-header text-(length:--ul-theme-font-subtitle-size) font-subtitle"
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
