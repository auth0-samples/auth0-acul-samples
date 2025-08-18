import { FormProvider, useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";

import SimpleCaptchaWidget from "../SimpleCaptchaWidget";

const baseProps = {
  config: {
    provider: "auth0",
    image: "https://example.com/captcha.png",
    placeholder: "Enter CAPTCHA",
  },
  name: "captcha",
  label: "Enter CAPTCHA",
  control: undefined,
  rules: { required: "Please complete the CAPTCHA" },
  onCaptchaResponse: jest.fn(),
};

function Wrapper({
  children,
  defaultValues = {},
}: {
  children: any;
  defaultValues?: any;
}) {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form>{children({ control: methods.control })}</form>
    </FormProvider>
  );
}

describe("SimpleCaptchaWidget", () => {
  it("renders the captcha image", () => {
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      baseProps.config.image
    );
  });

  it("renders the label", () => {
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(screen.getByLabelText(baseProps.label)).toBeInTheDocument();
  });

  it("renders the input field", () => {
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget
            {...baseProps}
            control={control}
            error="Test error"
          />
        )}
      </Wrapper>
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("matches snapshot (default)", () => {
    const { container } = render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (with error)", () => {
    const { container } = render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <SimpleCaptchaWidget
            {...baseProps}
            control={control}
            error="Test error"
          />
        )}
      </Wrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
