# Testing Guide

This project uses Jest and React Testing Library for unit testing React components. This setup provides comprehensive testing capabilities for the Auth0 Universal Login components.

## Setup

### Dependencies

The testing setup includes:

- **Jest**: Test runner and framework
- **React Testing Library**: React component testing utilities
- **Jest Environment JSDOM**: Browser-like environment for testing
- **@testing-library/jest-dom**: Additional Jest matchers
- **@testing-library/user-event**: User interaction simulation

### Installation

Install dependencies:

```bash
npm install
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Directory Organization

```
src/
├── common/
│   ├── Button/
│   │   ├── index.tsx
│   │   └── __tests__/
│   │       └── Button.test.tsx
│   ├── Input/
│   │   ├── index.tsx
│   │   └── __tests__/
│   │       └── Input.test.tsx
│   └── ...
└── test/
    ├── setup.ts          # Test environment setup
    ├── test-utils.tsx    # Custom testing utilities
    └── README.md         # This file
```

### Test File Conventions

- Place test files in `__tests__/` directories next to the component
- Name test files as `ComponentName.test.tsx`
- Alternative: `ComponentName.spec.tsx`

## Writing Tests

### Basic Test Structure

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComponentName from "../index";

describe("ComponentName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders with basic props", () => {
      render(<ComponentName />);
      expect(screen.getByRole("...")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("handles user interactions", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<ComponentName onClick={handleClick} />);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Testing Categories

Each component should include tests for:

1. **Rendering Tests**

   - Basic rendering with required props
   - Rendering with different props
   - Custom className application
   - Default values

2. **Variant Tests** (if applicable)

   - Different visual variants
   - Size variations
   - State variations

3. **Interaction Tests**

   - Click events
   - Keyboard interactions
   - Form submissions
   - User input handling

4. **State Tests**

   - Disabled states
   - Loading states
   - Error states
   - Focus states

5. **Accessibility Tests**

   - ARIA attributes
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

6. **Ref Forwarding Tests**
   - Proper ref forwarding
   - Ref method availability

### Testing Utilities

#### Custom Render Function

Use the custom render function from `test-utils.tsx`:

```tsx
import { render, screen } from "@/test/test-utils";

// This automatically wraps components with necessary providers
render(<YourComponent />);
```

#### Common Test Helpers

```tsx
import {
  expectElementToBeInDocument,
  expectElementToHaveClass,
  expectElementToBeDisabled,
  expectElementToHaveAttribute,
} from "@/test/test-utils";

// Usage
expectElementToBeInDocument(screen.getByRole("button"));
expectElementToHaveClass(button, "primary-button");
```

## Testing Patterns

### Mocking External Dependencies

```tsx
// Mock utility functions
jest.mock("@/utils/cn", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Mock components
jest.mock("@/common/Icon", () => ({
  __esModule: true,
  default: ({ name, ...props }: any) => (
    <span data-testid={`icon-${name}`} {...props} />
  ),
}));
```

### Testing User Interactions

```tsx
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

// Clicking
await user.click(screen.getByRole("button"));

// Typing
await user.type(screen.getByRole("textbox"), "Hello");

// Keyboard navigation
await user.tab();
await user.keyboard("{Enter}");
```

### Testing Form Components

```tsx
// Input components
const input = screen.getByRole("textbox");
await user.type(input, "test value");
expect(input).toHaveValue("test value");

// Form submission
const form = screen.getByRole("form");
await user.click(screen.getByRole("button", { name: "Submit" }));
```

### Testing Accessibility

```tsx
// ARIA attributes
expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Close");

// Screen reader text
expect(screen.getByText("Close")).toBeInTheDocument();

// Focus management
const button = screen.getByRole("button");
button.focus();
expect(button).toHaveFocus();
```

## Best Practices

### 1. Query Priorities

Use queries in this order of preference:

1. `getByRole()` - Most accessible
2. `getByLabelText()` - Forms
3. `getByPlaceholderText()` - Forms
4. `getByText()` - Content
5. `getByTestId()` - Last resort

### 2. Async Testing

Always use `async/await` with user interactions:

```tsx
// ✅ Good
await user.click(button);
expect(handleClick).toHaveBeenCalled();

// ❌ Bad
user.click(button);
expect(handleClick).toHaveBeenCalled();
```

### 3. Test Independence

Each test should be independent:

```tsx
beforeEach(() => {
  jest.clearAllMocks();
  // Reset any global state if needed
});
```

### 4. Descriptive Test Names

```tsx
// ✅ Good
it("disables submit button when form is invalid", () => {});
it("shows error message when validation fails", () => {});

// ❌ Bad
it("works correctly", () => {});
it("handles edge case", () => {});
```

### 5. Group Related Tests

```tsx
describe("Button Component", () => {
  describe("Variants", () => {
    it("renders primary variant", () => {});
    it("renders secondary variant", () => {});
  });

  describe("States", () => {
    it("handles disabled state", () => {});
    it("handles loading state", () => {});
  });
});
```

## Coverage Goals

Aim for high test coverage on:

- Critical user paths
- Component public APIs
- Error handling
- Accessibility features

Coverage targets:

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Common Issues and Solutions

### Issue: Tests fail with CSS class assertions

**Solution**: Mock the `cn` utility function:

```tsx
jest.mock("@/utils/cn", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));
```

### Issue: Component not found errors

**Solution**: Check that the component is exported correctly and the import path is correct.

### Issue: Async test timing issues

**Solution**: Always use `await` with user interactions and `waitFor` when needed:

```tsx
import { waitFor } from "@testing-library/react";

await waitFor(() => {
  expect(screen.getByText("Loading complete")).toBeInTheDocument();
});
```

## Adding New Tests

When adding a new component:

1. Create `__tests__/` directory in the component folder
2. Create `ComponentName.test.tsx`
3. Follow the testing patterns shown in existing tests
4. Cover all component variants and states
5. Test user interactions and accessibility
6. Run tests to ensure they pass

Example command to run specific test file:

```bash
npx jest Button.test.tsx
```

## Maintenance

- Run tests regularly during development
- Update tests when component APIs change
- Review coverage reports to identify gaps
- Keep test dependencies up to date
- Refactor tests when they become hard to maintain
