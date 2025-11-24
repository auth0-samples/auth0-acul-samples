import { FormProvider, useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";

// Mock ReCAPTCHA and ReCAPTCHAEnterprise
jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="recaptcha" {...props} />,
}));
jest.mock("react-google-recaptcha-enterprise", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="recaptcha-enterprise" {...props} />
  ),
}));

import ReCaptchaCombinedWidget from "../ReCaptchaCombinedWidget";

const baseProps = {
  config: {
    provider: "recaptcha_v2",
    siteKey: "test-site-key",
  },
  name: "captcha",
  onCaptchaResponse: jest.fn(),
  className: "",
  theme: "light" as const,
  error: undefined,
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

describe("ReCaptchaCombinedWidget", () => {
  it("renders the ReCAPTCHA widget for v2", () => {
    render(
      <Wrapper>{() => <ReCaptchaCombinedWidget {...baseProps} />}</Wrapper>
    );
    expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
  });

  it("renders the ReCAPTCHAEnterprise widget for enterprise", () => {
    const props = {
      ...baseProps,
      config: {
        provider: "recaptcha_enterprise",
        siteKey: "test-site-key",
      },
    };
    render(<Wrapper>{() => <ReCaptchaCombinedWidget {...props} />}</Wrapper>);
    expect(screen.getByTestId("recaptcha-enterprise")).toBeInTheDocument();
  });

  it("matches snapshot (default)", () => {
    const { container } = render(
      <Wrapper>{() => <ReCaptchaCombinedWidget {...baseProps} />}</Wrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (with error)", () => {
    const { container } = render(
      <Wrapper>
        {() => <ReCaptchaCombinedWidget {...baseProps} error="Test error" />}
      </Wrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
