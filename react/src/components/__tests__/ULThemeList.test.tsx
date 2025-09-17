import { render, screen } from "@testing-library/react";

import ULThemeList from "../ULThemeList";

describe("ULThemeList Component", () => {
  const defaultProps = {
    items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
    className: "custom-list-class",
  };

  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <ULThemeList variant="icon" {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the correct text for each item", () => {
    render(<ULThemeList variant="icon" {...defaultProps} />);
    defaultProps.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("applies additional class names", () => {
    render(<ULThemeList variant="icon" {...defaultProps} />);
    const list = screen.getByRole("list");
    expect(list).toHaveClass("text-sm space-y-3");
  });

  it("renders an empty list when no items are provided", () => {
    render(<ULThemeList variant="icon" items={[]} />);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });
});
