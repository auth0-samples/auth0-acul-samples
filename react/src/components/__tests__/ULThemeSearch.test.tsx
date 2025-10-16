import { fireEvent, render, screen } from "@testing-library/react";

import { ULThemeSearch } from "../ULThemeSearch";

describe("ULThemeSearch", () => {
  // Snapshot Test
  it("matches snapshot with default props", () => {
    const { container } = render(<ULThemeSearch />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // Functional Tests
  it("renders with custom placeholder and search icon", () => {
    const { container } = render(
      <ULThemeSearch placeholder="Search countries..." />
    );

    expect(
      screen.getByPlaceholderText("Search countries...")
    ).toBeInTheDocument();

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("handles user input and onChange callback", () => {
    const handleChange = jest.fn();

    render(<ULThemeSearch onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "test query" } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test query");
  });

  it("supports controlled input with value updates", () => {
    const { rerender } = render(<ULThemeSearch value="initial" readOnly />);
    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("initial");

    rerender(<ULThemeSearch value="updated" readOnly />);
    expect(input).toHaveValue("updated");
  });

  it("applies custom className and has correct input type", () => {
    render(<ULThemeSearch className="custom-input" />);
    const input = screen.getByPlaceholderText("Search");

    expect(input).toHaveClass("custom-input");
    expect(input).toHaveAttribute("type", "text");
  });
});
