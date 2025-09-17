import { FormProvider, useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";

// Mock HCaptcha so it renders a testable element
jest.mock("@hcaptcha/react-hcaptcha", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="hcaptcha" {...props} />,
}));

import HCaptchaWidget from "../HCaptchaWidget";

const baseProps = {
  config: {
    provider: "hcaptcha",
    siteKey: "test-site-key",
  },
  onCaptchaResponse: jest.fn(),
  className: "",
  theme: "light" as const,
  error: undefined,
  control: undefined,
  name: "captcha",
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

describe("HCaptchaWidget", () => {
  it("renders the HCaptcha widget", () => {
    render(<Wrapper>{() => <HCaptchaWidget {...baseProps} />}</Wrapper>);
    expect(screen.getByTestId("hcaptcha")).toBeInTheDocument();
  });

  it("matches snapshot (default)", () => {
    const { container } = render(
      <Wrapper>{() => <HCaptchaWidget {...baseProps} />}</Wrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (with error)", () => {
    const { container } = render(
      <Wrapper>
        {() => <HCaptchaWidget {...baseProps} error="Test error" />}
      </Wrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
