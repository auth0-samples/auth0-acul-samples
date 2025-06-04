import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../index";

// Mock the Icon component if needed
jest.mock("@/common/Icon", () => ({
  __esModule: true,
  default: ({ name, ...props }: any) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));

describe("Button Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  describe("Rendering", () => {
    it("renders button with children", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("renders as button type by default", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("renders with custom type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  // Variant tests
  describe("Variants", () => {
    it("renders primary variant by default", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary", "text-white");
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-background-widget", "text-text-default");
    });

    it("renders icon variant", () => {
      render(<Button variant="icon">Icon</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "h-full",
        "flex",
        "items-center",
        "justify-center",
      );
    });
  });

  // Size tests
  describe("Sizes", () => {
    it("renders medium size by default", () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-md");
    });

    it("renders small size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-sm");
    });

    it("renders large size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-lg");
    });
  });

  // State tests
  describe("States", () => {
    it("handles disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("handles loading state", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveClass("cursor-not-allowed", "opacity-75");
      expect(screen.getByText("Processing...")).toBeInTheDocument();
    });

    it("displays custom loading text", () => {
      render(
        <Button isLoading loadingText="Please wait...">
          Loading
        </Button>,
      );
      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    it("renders full width", () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });
  });

  // Icon tests
  describe("Icons", () => {
    const TestIcon = <span data-testid="test-icon">Icon</span>;

    it("renders left icon", () => {
      render(<Button iconLeft={TestIcon}>With Left Icon</Button>);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(<Button iconRight={TestIcon}>With Right Icon</Button>);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("hides icons when loading", () => {
      render(
        <Button isLoading iconLeft={TestIcon} iconRight={TestIcon}>
          Loading
        </Button>,
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });
  });

  // Interaction tests
  describe("Interactions", () => {
    it("handles click events", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not trigger click when loading", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles keyboard navigation", () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole("button");

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("sets aria-label when provided", () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Custom label",
      );
    });

    it("has proper disabled attributes", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("disabled");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("maintains focus behavior", () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  // Forward ref test
  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref test</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe("Ref test");
    });
  });
});
