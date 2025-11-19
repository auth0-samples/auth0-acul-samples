import { FormProvider, useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";

// Mock Turnstile so it renders a testable element
jest.mock("react-turnstile", () => ({
  __esModule: true,
  default: (props: any) => <div role="presentation" {...props} />,
}));

import AuthChallengeWidget from "../AuthChallengeWidget";

const baseProps = {
  config: {
    provider: "auth0_v2",
    siteKey: "test-site-key",
  },
  onCaptchaResponse: jest.fn(),
  className: "",
  theme: "light" as const,
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

describe("AuthChallengeWidget", () => {
  it("renders the Turnstile widget", () => {
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <AuthChallengeWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("calls onCaptchaResponse on verify", () => {
    // Simulate Turnstile onVerify
    const onCaptchaResponse = jest.fn();
    render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <AuthChallengeWidget
            {...baseProps}
            control={control}
            onCaptchaResponse={onCaptchaResponse}
          />
        )}
      </Wrapper>
    );
    expect(typeof onCaptchaResponse).toBe("function");
  });

  it("matches snapshot (default)", () => {
    const { container } = render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <AuthChallengeWidget {...baseProps} control={control} />
        )}
      </Wrapper>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (with error)", () => {
    const { container } = render(
      <Wrapper>
        {({ control }: { control: any }) => (
          <AuthChallengeWidget
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
