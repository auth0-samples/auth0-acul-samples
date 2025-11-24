import { FormProvider, useForm } from "react-hook-form";

import { render } from "@testing-library/react";

import Captcha from "@/components/Captcha";

// Test wrapper component that provides real form context
function TestWrapper({ children, defaultValues = {} }: any) {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form>{children({ control: methods.control })}</form>
    </FormProvider>
  );
}

describe("Captcha Component", () => {
  const baseProps = {
    label: "Enter CAPTCHA",
    imageUrl: "https://example.com/captcha.png",
    imageAltText: "CAPTCHA verification image",
    name: "captcha" as const,
  };

  // Snapshot Tests
  it("matches snapshot when imageUrl is provided", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => <Captcha {...baseProps} control={control} />}
      </TestWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot when imageUrl is empty", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => (
          <Captcha {...baseProps} imageUrl="" control={control} />
        )}
      </TestWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with custom className", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => (
          <Captcha {...baseProps} className="custom-class" control={control} />
        )}
      </TestWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests
  it("renders CAPTCHA image when imageUrl is provided", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => <Captcha {...baseProps} control={control} />}
      </TestWrapper>
    );

    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/captcha.png");
    expect(image).toHaveAttribute("alt", "CAPTCHA verification image");
  });

  it("does not render when imageUrl is empty", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => (
          <Captcha {...baseProps} imageUrl="" control={control} />
        )}
      </TestWrapper>
    );

    expect(container.firstChild?.firstChild).toBeNull();
  });

  it("renders image container with proper styling", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => <Captcha {...baseProps} control={control} />}
      </TestWrapper>
    );

    // Find the image container div that contains the img element
    const imageContainer = container.querySelector("div img")?.parentElement;
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveAttribute("class");
    // Verify container has visual styling applied
    expect(imageContainer?.className).toBeTruthy();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <TestWrapper>
        {({ control }: any) => (
          <Captcha {...baseProps} className="custom-class" control={control} />
        )}
      </TestWrapper>
    );

    const rootContainer = container.querySelector(".custom-class");
    expect(rootContainer).toBeInTheDocument();
  });
});
