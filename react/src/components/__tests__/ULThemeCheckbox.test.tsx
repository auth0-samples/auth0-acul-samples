import { fireEvent, render, screen } from "@testing-library/react";

import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";

describe("ULThemeCheckbox", () => {
  it("should render as an unchecked checkbox by default", () => {
    render(<ULThemeCheckbox id="test-checkbox" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should render as checked when checked prop is true", () => {
    render(<ULThemeCheckbox id="test-checkbox" checked={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should handle user interactions", () => {
    const handleChange = jest.fn();

    render(
      <ULThemeCheckbox id="test-checkbox" onCheckedChange={handleChange} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    // Check that the first argument is the boolean value (true)
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("should be accessible with proper ARIA attributes", () => {
    render(<ULThemeCheckbox id="test-checkbox" aria-label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAccessibleName("Accept terms");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<ULThemeCheckbox id="test-checkbox" disabled />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    expect(checkbox).toHaveAttribute("data-disabled");
  });
});
