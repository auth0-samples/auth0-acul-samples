import React from "react";
import { useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";

import { Form, FormField, FormItem } from "@/components/ui/form";

import { ULThemeFormMessage } from "../ULThemeFormMessage";

// Test wrapper that mimics IdentifierForm usage pattern
const TestFormMessageWrapper = ({
  children,
  hasValidationError = false,
  validationMessage = "This field is required",
}: {
  children: React.ReactNode;
  hasValidationError?: boolean;
  validationMessage?: string;
}) => {
  const form = useForm({
    defaultValues: { identifier: "" },
  });

  React.useEffect(() => {
    if (hasValidationError) {
      form.setError("identifier", { message: validationMessage });
    }
  }, [form, hasValidationError, validationMessage]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="identifier"
          render={() => <FormItem>{children}</FormItem>}
        />
      </form>
    </Form>
  );
};

describe("ULThemeFormMessage Component", () => {
  // Snapshot Tests - covering main usage scenarios
  it("matches snapshot with SDK error", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage sdkError="Invalid email format" />
      </TestFormMessageWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with form validation error", () => {
    const { container } = render(
      <TestFormMessageWrapper hasValidationError>
        <ULThemeFormMessage hasFormError={true} />
      </TestFormMessageWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with no errors", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage hasFormError={false} />
      </TestFormMessageWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests - real-world scenarios from IdentifierForm
  it("prioritizes SDK error over form validation (like in IdentifierForm)", () => {
    render(
      <TestFormMessageWrapper
        hasValidationError
        validationMessage="This field is required"
      >
        <ULThemeFormMessage
          sdkError="Invalid email format"
          hasFormError={true}
        />
      </TestFormMessageWrapper>
    );

    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    expect(
      screen.queryByText("This field is required")
    ).not.toBeInTheDocument();
  });

  it("shows form validation error when no SDK error (required field scenario)", () => {
    render(
      <TestFormMessageWrapper
        hasValidationError
        validationMessage="This field is required"
      >
        <ULThemeFormMessage hasFormError={true} />
      </TestFormMessageWrapper>
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("shows maximum length validation error", () => {
    render(
      <TestFormMessageWrapper
        hasValidationError
        validationMessage="Maximum 100 characters allowed"
      >
        <ULThemeFormMessage hasFormError={true} />
      </TestFormMessageWrapper>
    );

    expect(
      screen.getByText("Maximum 100 characters allowed")
    ).toBeInTheDocument();
  });

  it("renders nothing when no errors (clean state)", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage hasFormError={false} />
      </TestFormMessageWrapper>
    );

    expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
  });

  it("applies proper error styling", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage sdkError="Theme test error" />
      </TestFormMessageWrapper>
    );

    const errorContainer = container.querySelector('[role="alert"]');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveAttribute("class");
  });

  it("includes error icon for accessibility", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage sdkError="Error with icon" />
      </TestFormMessageWrapper>
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("h-4", "w-4");
  });

  it("can hide icon when specified", () => {
    const { container } = render(
      <TestFormMessageWrapper>
        <ULThemeFormMessage sdkError="Error without icon" showIcon={false} />
      </TestFormMessageWrapper>
    );

    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
