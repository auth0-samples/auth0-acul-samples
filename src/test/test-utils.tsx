import React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

// Custom render function that wraps components with providers if needed
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  // If you have theme providers or context providers, add them here
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from testing library
export * from "@testing-library/react";
export { customRender as render };

// Common test helpers
export const expectElementToBeInDocument = (element: HTMLElement | null) => {
  expect(element).toBeInTheDocument();
};

export const expectElementToHaveClass = (
  element: HTMLElement | null,
  className: string,
) => {
  expect(element).toHaveClass(className);
};

export const expectElementToBeDisabled = (element: HTMLElement | null) => {
  expect(element).toBeDisabled();
};

export const expectElementToHaveAttribute = (
  element: HTMLElement | null,
  attribute: string,
  value?: string,
) => {
  if (value !== undefined) {
    expect(element).toHaveAttribute(attribute, value);
  } else {
    expect(element).toHaveAttribute(attribute);
  }
};
