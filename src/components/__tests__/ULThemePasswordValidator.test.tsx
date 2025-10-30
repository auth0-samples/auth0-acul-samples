import { render, screen } from "@testing-library/react";

import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";

// Mock validation rules for testing
const mockValidationRules: any[] = [
  {
    code: "password-policy-length-at-least",
    label: "At least 8 characters",
    isValid: true,
  },
  {
    code: "password-policy-contains-at-least",
    label: "At least 3 of the following:",
    isValid: true,
  },
  {
    code: "password-policy-lower-case",
    label: "Lower case letters (a-z)",
    isValid: true,
  },
  {
    code: "password-policy-upper-case",
    label: "Upper case letters (A-Z)",
    isValid: true,
  },
  {
    code: "password-policy-numbers",
    label: "Numbers (0-9)",
    isValid: true,
  },
  {
    code: "password-policy-special-characters",
    label: "Special characters (e.g. !@#$%^&*)",
    isValid: false,
  },
  {
    code: "password-policy-identical-chars",
    label: "No more than 2 identical characters in a row",
    isValid: true,
  },
];

const mockGroupedRulesOnly: any[] = [
  {
    code: "password-policy-contains-at-least",
    label: "At least 2 of the following:",
    isValid: true,
  },
  {
    code: "password-policy-lower-case",
    label: "Lower case letters (a-z)",
    isValid: true,
  },
  {
    code: "password-policy-upper-case",
    label: "Upper case letters (A-Z)",
    isValid: false,
  },
  {
    code: "password-policy-numbers",
    label: "Numbers (0-9)",
    isValid: true,
  },
];

describe("ULThemePasswordValidator", () => {
  it("does not render when show is false or rules are empty", () => {
    // Test show=false
    const { container: container1 } = render(
      <ULThemePasswordValidator
        validationRules={mockValidationRules}
        show={false}
      />
    );
    expect(container1.firstChild).toBeNull();

    const { container: container2 } = render(
      <ULThemePasswordValidator validationRules={[]} show={true} />
    );
    expect(container2.firstChild).toBeNull();
  });

  it("renders validation rules with correct structure and content", () => {
    render(
      <ULThemePasswordValidator
        validationRules={mockValidationRules}
        passwordSecurityText="Your password must contain:"
        className="custom-class"
      />
    );

    // Check password security text and custom class
    expect(screen.getByText("Your password must contain:")).toBeInTheDocument();
    const container = screen.getAllByRole("list")[0].closest("div");
    expect(container).toHaveClass("custom-class");

    // Check main rules and sub-rules are displayed
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
    expect(
      screen.getByText("At least 3 of the following:")
    ).toBeInTheDocument();
    expect(screen.getByText("Lower case letters (a-z)")).toBeInTheDocument();
    expect(
      screen.getByText("Special characters (e.g. !@#$%^&*)")
    ).toBeInTheDocument();
  });

  it("displays correct visual indicators for valid and invalid rules", () => {
    render(<ULThemePasswordValidator validationRules={mockValidationRules} />);

    // Valid rules should have check icons
    expect(
      screen.getByTestId("check-icon-password-policy-length-at-least")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("check-icon-password-policy-contains-at-least")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("check-icon-password-policy-lower-case")
    ).toBeInTheDocument();

    // Invalid rule should not have check icon
    expect(
      screen.queryByTestId("check-icon-password-policy-special-characters")
    ).not.toBeInTheDocument();

    // Verify CSS styling
    expect(screen.getByText("At least 8 characters").closest("li")).toHaveClass(
      "text-success"
    );
    expect(
      screen.getByText("Special characters (e.g. !@#$%^&*)").closest("li")
    ).toHaveClass("text-body-text");
  });

  it("handles grouped rules validation correctly", () => {
    render(<ULThemePasswordValidator validationRules={mockGroupedRulesOnly} />);

    // Contains-at-least group should be valid (2 valid sub-rules meets "at least 2" requirement)
    expect(
      screen.getByTestId("check-icon-password-policy-contains-at-least")
    ).toBeInTheDocument();
    expect(
      screen.getByText("At least 2 of the following:").closest("li")
    ).toHaveClass("text-success");

    // Valid sub-rules should have check icons
    expect(
      screen.getByTestId("check-icon-password-policy-lower-case")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("check-icon-password-policy-numbers")
    ).toBeInTheDocument();

    // Invalid sub-rule should not have check icon
    expect(
      screen.queryByTestId("check-icon-password-policy-upper-case")
    ).not.toBeInTheDocument();
  });
});
