import { render } from "@testing-library/react";

import ULThemeSpinner from "../ULThemeSpinner";

describe("ULThemeSpinner", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ULThemeSpinner />);
    expect(container).toMatchSnapshot();
  });

  it("renders with the correct default props", () => {
    const { getByTestId } = render(<ULThemeSpinner />);
    const spinner = getByTestId("ul-theme-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("applies the correct size class when size prop is provided", () => {
    const { getByTestId } = render(<ULThemeSpinner size="lg" />);
    const spinner = getByTestId("ul-theme-spinner");
    expect(spinner).toHaveClass("size-12");
  });

  it("applies the correct variant class when variant prop is provided", () => {
    const { getByTestId } = render(<ULThemeSpinner variant="dots" />);
    const spinner = getByTestId("ul-theme-spinner");
    expect(spinner).toHaveClass("border-dotted");
  });
});
