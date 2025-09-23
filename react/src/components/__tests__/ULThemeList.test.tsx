import { render, screen } from "@testing-library/react";

import {
  ULThemeList,
  ULThemeListDescription,
  ULThemeListItem,
  ULThemeListTitle,
} from "../ULThemeList";

describe("ULThemeList Components", () => {
  test("ULThemeList renders children correctly", () => {
    render(
      <ULThemeList>
        <div>Child Content</div>
      </ULThemeList>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("ULThemeList matches snapshot", () => {
    const { asFragment } = render(
      <ULThemeList>
        <div>Child Content</div>
      </ULThemeList>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("ULThemeListItem renders with icon and info", () => {
    render(
      <ULThemeListItem icon={<span>Icon</span>} info={<span>Info</span>}>
        Item Content
      </ULThemeListItem>
    );
    expect(screen.getByText("Item Content")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Info")).toBeInTheDocument();
  });

  test("ULThemeListItem matches snapshot", () => {
    const { asFragment } = render(
      <ULThemeListItem icon={<span>Icon</span>} info={<span>Info</span>}>
        Item Content
      </ULThemeListItem>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("ULThemeListTitle renders correctly", () => {
    render(<ULThemeListTitle>Title Content</ULThemeListTitle>);
    expect(screen.getByText("Title Content")).toBeInTheDocument();
  });

  test("ULThemeListTitle matches snapshot", () => {
    const { asFragment } = render(
      <ULThemeListTitle>Title Content</ULThemeListTitle>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("ULThemeListDescription renders correctly", () => {
    render(
      <ULThemeListDescription>Description Content</ULThemeListDescription>
    );
    expect(screen.getByText("Description Content")).toBeInTheDocument();
  });

  test("ULThemeListDescription matches snapshot", () => {
    const { asFragment } = render(
      <ULThemeListDescription>Description Content</ULThemeListDescription>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
