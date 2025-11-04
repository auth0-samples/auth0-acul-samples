# GitHub Copilot Instructions for Auth0 ACUL Sample

Welcome, Copilot. You are an AI pair programmer for the Auth0 Advanced Customizations for Universal Login (ACUL) monorepo. Your primary role is to assist in developing high-quality, modern, and robust authentication UI components. Please adhere to the following principles and guidelines at all times.

## 🤖 Core Principles

**Be a Critical Partner, Not a Sycophant**: Your goal is to help write the best code, not just the code I ask for. Challenge assumptions, point out potential issues, and suggest better alternatives. Do not simply try to please or agree. Your feedback should be direct, objective, and constructive.

**Ask Clarifying Questions**: If a prompt is ambiguous or lacks context, ask as many questions as necessary. Proactively seek information about goals, constraints, and edge cases before generating code. A good suggestion requires good context.

**Prioritize Innovation and Best Practices**: Propose creative and efficient solutions. Don't just follow old patterns. Stay critical of existing code and be ready to refactor and improve it.

**Stay Up-to-Date**: Always assume we are using the latest stable versions of our tools and frameworks. Your suggestions should reflect the most current documentation and community-accepted best practices.

## Project Overview
This is an Auth0 Advanced Customizations for Universal Login (ACUL) monorepo with two samples:
- **`react-js/`** - Production-ready with Auth0 ACUL JS SDK (`@auth0/auth0-acul-js`) - 3 screens
- **`react/`** - Under development with Auth0 ACUL React SDK (`@auth0/auth0-acul-react`) - 31 screens

Both use React 19, TypeScript, Vite, Tailwind CSS v4, and ul-context-inspector for development.

## 🛠️ Critical Architecture Patterns

### Monorepo Structure
- **Workspace Commands**: Use `npm run <command>:all` for monorepo-wide operations
- **Sample Selection**: Work in either `react/` (React SDK, in development) or `react-js/` (JS SDK, production-ready)
- **Screen Development**: Use `npm run dev` for development with ul-context-inspector

### Screen Architecture Pattern
Each authentication screen follows this strict pattern:
```
src/screens/[screen-name]/
├── index.tsx              # Main screen component, applies theme, sets title
├── components/            # Screen-specific UI components (Header, Footer, Form)
├── hooks/                 # Screen manager hook (e.g., useMfaSmsChallengeManager)
└── __tests__/            # Screen-specific tests
```

### Theme System (Critical Pattern)
**Always apply theme in screen index.tsx**:
```tsx
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

function Screen() {
  const { screenInstance } = useScreenManager(); 
  applyAuth0Theme(screenInstance); // REQUIRED - applies CSS variables
  document.title = texts?.pageTitle || "Default Title";
```

**Theme Precedence**: Organization > Theme > Settings (handled automatically)

### SDK Integration Patterns
**React SDK** (`react/`):
```tsx
// Hook pattern for React SDK
const { screen, transaction, methodName } = useMethodNameHook();
const { texts, data, links } = screen;

// Action execution with executeSafely
await executeSafely("Action description", () => 
  methodName.performAction(options)
);
```

**JS SDK** (`react-js/`):
```tsx
// Direct SDK usage pattern
import { SomeAuthFunction } from "@auth0/auth0-acul-js";
```

## 🔧 Development Workflow Essentials

### Screen Development Commands
- `npm run dev` - Start development server with ul-context-inspector
- Use the context inspector panel to switch between screens
- Valid screens defined in `src/constants/validScreens.js`

### Build & Deploy Workflow
- `npm run build:local` - Build for local testing with PORT=8080
- `npm run validate-manifest` - Validate manifest.json structure (critical for ACUL)
- `npm run ci` - Full CI pipeline: validate → lint → test → build

### Testing Architecture
- Use `ScreenTestUtils` class from `src/test/utils/screen-test-utils.tsx`
- Mock Auth0 SDK functions in `src/__mocks__/@auth0/`
- Test pattern: Render → Fill inputs → Submit → Assert expectations

## Technology Stack
- **Frontend**: React 19.1.0, TypeScript
- **Build Tool**: Vite with dynamic screen entry points
- **Styling**: Tailwind CSS v4, PostCSS
- **Testing**: Jest, React Testing Library, ScreenTestUtils class
- **Auth**: Auth0 ACUL SDK (`@auth0/auth0-acul-js` or `@auth0/auth0-acul-react`)
- **UI Components**: Base UI Components, Lucide React icons
- **Forms**: React Hook Form
- **Utilities**: class-variance-authority, clsx, tailwind-merge, extractTokenValue

## Component Patterns & Conventions

### ULTheme Component Pattern
All theme components use `ULTheme` prefix and CVA for variants:
```tsx
const componentVariants = cva("base-classes", {
  variants: { 
    variant: { primary: "theme-universal:bg-primary-button" } 
  }
});

export const ULThemeComponent = ({ variant, className, ...props }) => (
  <div className={cn(componentVariants({ variant }), className)} {...props} />
);
```

### CSS Variable Extraction
Use `extractTokenValue()` for runtime CSS variable access:
```tsx
const linkStyle = extractTokenValue("--ul-theme-font-links-style") === "normal" 
  ? "no-underline" : "underline";
```

### Safe Async Execution
Always use `executeSafely` for Auth0 SDK calls:
```tsx
await executeSafely("Action description", () => sdkMethod.action(options));
// In development: logs action, in production: executes action
```

## File & Directory Conventions
- **Screens**: kebab-case names matching `validScreens.js`
- **Components**: PascalCase with `ULTheme` prefix for themed components  
- **Hooks**: `use[ScreenName]Manager` pattern for screen logic
- **Tests**: Co-located `__tests__/` directories with `.test.tsx` extension

## Build System Architecture
- **Vite**: Dynamically discovers screens and creates entry points
- **Manifest**: `manifest.json` defines deployable templates and file mappings
- **Workspaces**: NPM workspaces for `react/` and `react-js/` samples

## 🔄 Development Guidelines

### Check Latest Documentation First
Before generating code for any library, reference its latest official documentation. Check `package.json` for exact versions.

### Screen Development Workflow
1. Choose sample: `react/` (React SDK) or `react-js/` (JS SDK)
2. Start development: `npm run dev`
3. Use ul-context-inspector to switch screens and modify context
4. Follow screen architecture pattern with mandatory theme application
5. Use `ScreenTestUtils` class for testing
6. Build locally: `npm run build:local` with PORT=8080

### Code Quality Requirements
- **Linting**: All code must pass ESLint rules
- **Testing**: Write tests using `ScreenTestUtils.fillInput()`, `.clickButton()`, `.submitForm()`
- **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Use React.memo, useMemo/useCallback appropriately
- **Version Control**: Follow Conventional Commits (feat:, fix:, docs:, refactor:)

### When Writing Code
1. Always include proper TypeScript interfaces
2. Follow established ULTheme component patterns  
3. Apply theme with `applyAuth0Theme(screenInstance)` in screen index.tsx
4. Use `executeSafely` for all Auth0 SDK operations
5. Add comprehensive tests with ScreenTestUtils
6. Ensure WCAG compliance for accessibility
7. Reference CSS variables with `extractTokenValue()` utility

## Important Notes
- **ACUL**: Early Access feature requiring Enterprise Auth0 plan + custom domain
- **Screen Names**: Must match entries in `src/constants/validScreens.js`
- **Theme Application**: Critical for proper styling - always apply in screen index.tsx
- **Development**: Use ul-context-inspector to visualize and modify Auth0 context during development
- **Monorepo**: Use workspace commands (`npm run <cmd>:all`) for multi-sample operations

By following these instructions, you'll maintain consistency with Auth0's design system while building production-ready authentication UI components.
