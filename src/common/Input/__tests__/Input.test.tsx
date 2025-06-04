import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../index";

describe("Input Component", () => {
  const defaultProps = {
    id: "test-input",
    name: "test-input",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  describe("Rendering", () => {
    it("renders input with required props", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("id", "test-input");
      expect(input).toHaveAttribute("name", "test-input");
    });

    it("renders with custom className", () => {
      render(<Input {...defaultProps} className="custom-class" />);
      expect(screen.getByRole("textbox")).toHaveClass("custom-class");
    });

    it("renders with default type text", () => {
      render(<Input {...defaultProps} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders with custom type", () => {
      render(<Input {...defaultProps} type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("renders with placeholder", () => {
      render(<Input {...defaultProps} placeholder="Enter text" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "Enter text",
      );
    });

    it("uses non-breaking space as default placeholder", () => {
      render(<Input {...defaultProps} />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "\u00A0",
      );
    });
  });

  // Size tests
  describe("Sizes", () => {
    it("renders medium size by default", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-3", "py-4", "h-14", "text-base");
    });

    it("renders small size", () => {
      render(<Input {...defaultProps} size="sm" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-2", "py-2", "h-10", "text-sm");
    });

    it("renders large size", () => {
      render(<Input {...defaultProps} size="lg" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("px-4", "py-5", "h-16", "text-lg");
    });
  });

  // Variant tests
  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "border-gray-mid",
        "focus:border-link",
        "focus:ring-link",
      );
    });

    it("renders error variant", () => {
      render(<Input {...defaultProps} variant="error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-error", "ring-1", "ring-error");
    });

    it("renders success variant", () => {
      render(<Input {...defaultProps} variant="success" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "border-success",
        "focus:border-success",
        "focus:ring-success",
      );
    });
  });

  // Force focus style tests
  describe("Force Focus Style", () => {
    it("applies focus styles when forceFocusStyle is true", () => {
      render(<Input {...defaultProps} forceFocusStyle />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-link", "ring-1", "ring-link");
    });

    it("does not apply focus styles when forceFocusStyle is false", () => {
      render(<Input {...defaultProps} forceFocusStyle={false} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "border-gray-mid",
        "focus:border-link",
        "focus:ring-link",
      );
    });
  });

  // State tests
  describe("States", () => {
    it("handles disabled state", () => {
      render(<Input {...defaultProps} disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
      expect(input).toHaveClass(
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      );
    });

    it("handles readonly state", () => {
      render(<Input {...defaultProps} readOnly />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("readonly");
    });

    it("handles required state", () => {
      render(<Input {...defaultProps} required />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("required");
    });
  });

  // Value and change handling tests
  describe("Value and Changes", () => {
    it("renders with initial value", () => {
      render(
        <Input {...defaultProps} value="initial value" onChange={() => {}} />,
      );
      expect(screen.getByDisplayValue("initial value")).toBeInTheDocument();
    });

    it("handles onChange events", async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Input {...defaultProps} onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue("test");
    });

    it("handles uncontrolled input", async () => {
      const user = userEvent.setup();

      render(<Input {...defaultProps} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "uncontrolled");
      expect(input).toHaveValue("uncontrolled");
    });
  });

  // Focus and blur events
  describe("Focus and Blur", () => {
    it("handles focus events", async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();

      render(<Input {...defaultProps} onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(input).toHaveFocus();
    });

    it("handles blur events", async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();

      render(<Input {...defaultProps} onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
      expect(input).not.toHaveFocus();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("has proper labeling with id", () => {
      render(
        <>
          <label htmlFor="accessible-input">Label</label>
          <Input id="accessible-input" name="accessible-input" />
        </>,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "accessible-input");
      expect(screen.getByLabelText("Label")).toBe(input);
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Input {...defaultProps} aria-describedby="help-text" />
          <div id="help-text">Help text</div>
        </>,
      );

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        "help-text",
      );
    });

    it("supports aria-invalid for error state", () => {
      render(<Input {...defaultProps} variant="error" aria-invalid />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid");
    });
  });

  // Keyboard interactions
  describe("Keyboard Interactions", () => {
    it("handles Enter key", async () => {
      const handleKeyDown = jest.fn();
      const user = userEvent.setup();

      render(<Input {...defaultProps} onKeyDown={handleKeyDown} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("{Enter}");

      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Enter",
        }),
      );
    });

    it("handles Escape key", async () => {
      const handleKeyDown = jest.fn();
      const user = userEvent.setup();

      render(<Input {...defaultProps} onKeyDown={handleKeyDown} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.keyboard("{Escape}");

      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "Escape",
        }),
      );
    });
  });

  // Forward ref test
  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("allows calling methods on ref", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input {...defaultProps} ref={ref} />);

      // Test that we can call input methods
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.blur).toBeDefined();
      expect(ref.current?.select).toBeDefined();
    });
  });

  // Error handling
  describe("Error Handling", () => {
    it("gracefully handles missing required props in development", () => {
      // This would typically cause TypeScript errors, but test runtime behavior
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<Input id="" name="" />);

      consoleSpy.mockRestore();
    });
  });
});
