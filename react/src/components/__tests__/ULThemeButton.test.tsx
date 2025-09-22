import { render, screen } from "@testing-library/react";

import { ULThemeButton } from "../ULThemeButton";

describe("ULThemeButton", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(<ULThemeButton>Default Button</ULThemeButton>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with disabled state", () => {
    const { container } = render(
      <ULThemeButton disabled>Disabled Button</ULThemeButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemeButton className="w-full custom-btn">
        Full Width Button
      </ULThemeButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with different sizes", () => {
    const { container: smallContainer } = render(
      <ULThemeButton size="sm">Small Button</ULThemeButton>
    );
    const { container: largeContainer } = render(
      <ULThemeButton size="lg">Large Button</ULThemeButton>
    );

    expect(smallContainer.firstChild).toMatchSnapshot("small-button");
    expect(largeContainer.firstChild).toMatchSnapshot("large-button");
  });

  // Functional Tests
  it("renders with text content", () => {
    render(<ULThemeButton>Click me</ULThemeButton>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("forwards props to UDS Button", () => {
    render(
      <ULThemeButton disabled data-testid="test-button">
        Disabled Button
      </ULThemeButton>
    );
    const button = screen.getByTestId("test-button");
    expect(button).toBeDisabled();
  });

  it("applies theme classes correctly", () => {
    render(<ULThemeButton data-testid="themed-button">Themed</ULThemeButton>);
    const button = screen.getByTestId("themed-button");
    expect(button.className).toContain("theme-universal:bg-primary-button");
  });

  it("supports custom className", () => {
    render(
      <ULThemeButton className="custom-class" data-testid="custom-button">
        Custom
      </ULThemeButton>
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<ULThemeButton>Accessible Button</ULThemeButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toBe("button");
  });

  it("applies Auth0 theme utility classes", () => {
    render(
      <ULThemeButton data-testid="auth0-button">Auth0 Themed</ULThemeButton>
    );
    const button = screen.getByTestId("auth0-button");

    // Check for theme-universal variant classes
    expect(button.className).toContain("theme-universal:bg-primary-button");
    expect(button.className).toContain("theme-universal:font-button");
    expect(button.className).toContain("theme-universal:rounded-button");
  });

  it("supports outline variant", () => {
    render(<ULThemeButton variant="outline">Outline Button</ULThemeButton>);
    const button = screen.getByRole("button", { name: "Outline Button" });
    expect(button.className).toContain("theme-universal:border-1");
    expect(button.className).toContain(
      "theme-universal:border-(--ul-theme-color-secondary-button-border)"
    );
  });

  it("supports link variant", () => {
    render(
      <ULThemeButton variant="link" size="link">
        Link Button
      </ULThemeButton>
    );
    const button = screen.getByRole("button", { name: "Link Button" });
    expect(button.className).toContain("text-link-focus");
    expect(button.className).toContain(
      "theme-universal:text-(length:--ul-theme-font-links-size)"
    );
  });
});
