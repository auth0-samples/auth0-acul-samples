import { render, screen } from "@testing-library/react";

import { ULThemePrimaryButton } from "../ULThemePrimaryButton";

describe("ULThemePrimaryButton", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(
      <ULThemePrimaryButton>Default Button</ULThemePrimaryButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with disabled state", () => {
    const { container } = render(
      <ULThemePrimaryButton disabled>Disabled Button</ULThemePrimaryButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemePrimaryButton className="w-full custom-btn">
        Full Width Button
      </ULThemePrimaryButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with different sizes", () => {
    const { container: smallContainer } = render(
      <ULThemePrimaryButton size="sm">Small Button</ULThemePrimaryButton>
    );
    const { container: largeContainer } = render(
      <ULThemePrimaryButton size="lg">Large Button</ULThemePrimaryButton>
    );

    expect(smallContainer.firstChild).toMatchSnapshot("small-button");
    expect(largeContainer.firstChild).toMatchSnapshot("large-button");
  });

  // Functional Tests
  it("renders with text content", () => {
    render(<ULThemePrimaryButton>Click me</ULThemePrimaryButton>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("forwards props to UDS Button", () => {
    render(
      <ULThemePrimaryButton disabled data-testid="test-button">
        Disabled Button
      </ULThemePrimaryButton>
    );
    const button = screen.getByTestId("test-button");
    expect(button).toBeDisabled();
  });

  it("applies theme classes correctly", () => {
    render(
      <ULThemePrimaryButton data-testid="themed-button">
        Themed
      </ULThemePrimaryButton>
    );
    const button = screen.getByTestId("themed-button");
    expect(button.className).toContain("theme-universal:bg-primary-button");
  });

  it("supports custom className", () => {
    render(
      <ULThemePrimaryButton
        className="custom-class"
        data-testid="custom-button"
      >
        Custom
      </ULThemePrimaryButton>
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<ULThemePrimaryButton>Accessible Button</ULThemePrimaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toBe("button");
  });

  it("applies Auth0 theme utility classes", () => {
    render(
      <ULThemePrimaryButton data-testid="auth0-button">
        Auth0 Themed
      </ULThemePrimaryButton>
    );
    const button = screen.getByTestId("auth0-button");

    // Check for theme-universal variant classes
    expect(button.className).toContain("theme-universal:bg-primary-button");
    expect(button.className).toContain("theme-universal:font-button");
    expect(button.className).toContain("theme-universal:rounded-button");
  });
});
