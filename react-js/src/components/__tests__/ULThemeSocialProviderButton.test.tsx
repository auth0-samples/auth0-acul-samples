import { fireEvent, render, screen } from "@testing-library/react";

import ULThemeSocialProviderButton from "../ULThemeSocialProviderButton";

describe("ULThemeSocialProviderButton Component", () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    iconComponent: <span data-testid="icon">Icon</span>,
    displayName: "Google",
    buttonText: "Sign in with Google",
    onClick: mockOnClick,
    disabled: false,
    className: "custom-class",
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <ULThemeSocialProviderButton {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it("displays the correct button text", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} />);
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("renders the correct icon", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when the disabled prop is true", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies additional class names", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders the correct data-testid based on displayName", () => {
    render(<ULThemeSocialProviderButton {...defaultProps} />);
    const button = screen.getByTestId("social-provider-button-google");
    expect(button).toBeInTheDocument();
  });
});
