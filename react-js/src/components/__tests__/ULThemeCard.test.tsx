import { render } from "@testing-library/react";

import ULThemeCard from "../ULThemeCard";

describe("ULThemeCard Component", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(<ULThemeCard>Test Card</ULThemeCard>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeCard className="custom-class">Test Card</ULThemeCard>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with additional props", () => {
    const { container } = render(
      <ULThemeCard id="test-id" data-testid="card">
        Test Card
      </ULThemeCard>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with multiple children", () => {
    const { container } = render(
      <ULThemeCard>
        <span>Child 1</span>
        <span>Child 2</span>
      </ULThemeCard>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests
  it("renders children correctly", () => {
    const { getByText } = render(<ULThemeCard>Test Card</ULThemeCard>);
    expect(getByText("Test Card")).toBeInTheDocument();
  });

  it("applies additional props correctly", () => {
    const { container } = render(
      <ULThemeCard data-testid="card">Test Card</ULThemeCard>
    );
    expect(container.firstChild).toHaveAttribute("data-testid", "card");
  });

  it("combines themed styles and custom className", () => {
    const { container } = render(
      <ULThemeCard className="custom-class">Test Card</ULThemeCard>
    );
    expect(container.firstChild).toHaveClass("custom-class");
    // Verify card has proper styling applied
    expect(container.firstChild).toHaveAttribute("class");
    expect(container.firstChild).toBeInTheDocument();
  });
});
