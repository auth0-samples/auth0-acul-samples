import { render, screen } from "@testing-library/react";

import { ULThemeAlert, ULThemeAlertTitle } from "../ULThemeError";

describe("ULThemeAlert", () => {
  // Snapshot test for component structure
  it("matches snapshot with ULThemeAlertTitle", () => {
    const { container } = render(
      <ULThemeAlert>
        <ULThemeAlertTitle>Error message</ULThemeAlertTitle>
      </ULThemeAlert>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Core functionality test
  it("renders as alert with proper accessibility", () => {
    render(
      <ULThemeAlert>
        <ULThemeAlertTitle>Test error</ULThemeAlertTitle>
      </ULThemeAlert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  // Auth0 theme integration test
  it("applies proper error styling", () => {
    render(
      <ULThemeAlert data-testid="themed-alert">
        <ULThemeAlertTitle>Themed error</ULThemeAlertTitle>
      </ULThemeAlert>
    );

    const alert = screen.getByTestId("themed-alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("class");
    // Verify error styling is applied
    expect(alert.className).toBeTruthy();
  });
});

describe("ULThemeAlert Integration", () => {
  // Real-world usage test matching IdentifierForm implementation
  it("handles multiple error scenarios like IdentifierForm", () => {
    const errors = [
      { message: "Enter a valid phone number" },
      { message: "Enter a valid phone number2" },
    ];

    render(
      <div className="space-y-3">
        {errors.map((error, index) => (
          <ULThemeAlert key={index}>
            <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
          </ULThemeAlert>
        ))}
      </div>
    );

    expect(screen.getByText("Enter a valid phone number")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid phone number2")).toBeInTheDocument();
  });
});
