import { render } from "@testing-library/react";

import ULThemePageLayout from "@/components/ULThemePageLayout";

describe("ULThemePageLayout Component Test Suite", () => {
  // Snapshot Tests
  it("matches snapshot with default props", () => {
    const { container } = render(
      <ULThemePageLayout>
        <div>Test Content</div>
      </ULThemePageLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <ULThemePageLayout className="custom-class">
        <div>Test Content</div>
      </ULThemePageLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with additional props", () => {
    const { container } = render(
      <ULThemePageLayout id="test-id" data-testid="test-layout">
        <div>Test Content</div>
      </ULThemePageLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests
  it("renders children correctly", () => {
    const { getByText } = render(
      <ULThemePageLayout>
        <div>Test Content</div>
      </ULThemePageLayout>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default themed styles", () => {
    const { container } = render(
      <ULThemePageLayout>Test Content</ULThemePageLayout>
    );

    expect(container.firstChild).toHaveClass(
      "flex px-10 py-20 justify-page-layout bg-(color:--ul-theme-page-bg-background-color) bg-(image:--ul-theme-page-bg-background-image-url)"
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <ULThemePageLayout className="custom-class">
        Test Content
      </ULThemePageLayout>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("passes additional props to the root element", () => {
    const { container } = render(
      <ULThemePageLayout id="test-id" data-testid="test-layout">
        Test Content
      </ULThemePageLayout>
    );

    expect(container.firstChild).toHaveAttribute("id", "test-id");
    expect(container.firstChild).toHaveAttribute("data-testid", "test-layout");
  });
});
