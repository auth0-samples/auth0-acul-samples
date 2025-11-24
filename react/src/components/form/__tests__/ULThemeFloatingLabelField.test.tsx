import React from "react";
import { useForm } from "react-hook-form";

import { fireEvent, render, screen } from "@testing-library/react";

import { Form, FormField, FormItem } from "@/components/ui/form";

import { ULThemeFloatingLabelField } from "../ULThemeFloatingLabelField";

// Test wrapper that mimics IdentifierForm usage pattern
const TestFormFieldWrapper = ({
  children,
  hasValidationError = false,
  validationMessage = "This field is required",
}: {
  children: (field: any) => React.ReactNode;
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
          rules={{
            required: "This field is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              {children({ field, error: !!fieldState.error })}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

describe("ULThemeFloatingLabelField Component", () => {
  // Snapshot Tests - main usage scenarios
  it("matches snapshot with email identifier", () => {
    const { container } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            autoComplete="email"
            autoFocus={true}
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with error state", () => {
    const { container } = render(
      <TestFormFieldWrapper hasValidationError>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with phone number type", () => {
    const { container } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests - real-world scenarios from IdentifierForm
  it("handles user input correctly like in IdentifierForm", () => {
    render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            data-testid="identifier-input"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    const input = screen.getByTestId("identifier-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "user@example.com" } });

    expect(input.value).toBe("user@example.com");
  });

  it("applies error styling when validation fails", () => {
    const { container } = render(
      <TestFormFieldWrapper hasValidationError>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    // Check for error styling on the form field - when error=true, should have error variant classes
    const fieldElement = container.querySelector(
      'div[class*="text-destructive-foreground"]'
    );
    expect(fieldElement).toBeTruthy();
  });

  it("focuses automatically when autoFocus is true (like IdentifierForm)", () => {
    render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            autoFocus={true}
            data-testid="auto-focus-input"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    const input = screen.getByTestId("auto-focus-input");
    expect(input).toHaveFocus();
  });

  it("applies Auth0 Universal Login theme styling", () => {
    const { container } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    // Check for the w-full class on the ULThemeFloatingLabelField wrapper
    const wrapper = container.querySelector("div.w-full");
    expect(wrapper).toBeTruthy();

    // Check for proper form field styling
    const formField = container.querySelector('div[class*="bg-"]');
    expect(formField).toBeInTheDocument();
  });

  it("supports different input types (email, tel, text)", () => {
    const { container: emailContainer } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    const { container: phoneContainer } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Phone"
            type="tel"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    const emailInput = emailContainer.querySelector("input");
    const phoneInput = phoneContainer.querySelector("input");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(phoneInput).toHaveAttribute("type", "tel");
  });

  it("forwards autoComplete attribute correctly", () => {
    const { container } = render(
      <TestFormFieldWrapper>
        {({ field, error }) => (
          <ULThemeFloatingLabelField
            {...field}
            label="Email"
            type="email"
            autoComplete="email"
            error={error}
          />
        )}
      </TestFormFieldWrapper>
    );

    const input = container.querySelector("input");
    expect(input).toHaveAttribute("autoComplete", "email");
  });
});
