import { useForm } from "react-hook-form";

import { fireEvent, render, screen } from "@testing-library/react";

import { Form } from "@/components/ui/form";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";

// Wrapper component for tests that need form context
function TestFormWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  return <Form {...form}>{children}</Form>;
}

describe("ULThemePasswordField", () => {
  it("renders password field with toggle button", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toBeInTheDocument();
  });

  it("toggles password visibility when button is clicked", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    // Initially password type
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument();
  });

  it("calls onVisibilityToggle callback when toggled", () => {
    const handleVisibilityToggle = jest.fn();

    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          onVisibilityToggle={handleVisibilityToggle}
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button", { name: /show password/i });

    // Click to show password
    fireEvent.click(toggleButton);
    expect(handleVisibilityToggle).toHaveBeenCalledWith(true);

    // Click to hide password
    fireEvent.click(toggleButton);
    expect(handleVisibilityToggle).toHaveBeenCalledWith(false);
  });

  it("accepts all standard input props", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          disabled
          data-testid="password-input"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeDisabled();
  });
});
