# Auth0 Advanced Customizations for Universal Login Template

This project provides a template for creating custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, and Tailwind CSS. It's designed to help you build screens that match Auth0's Universal Login design language.

## 📑 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Screens](#screens)
- [Development Workflow](#development-workflow)
- [Technical Details](#technical-details)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

<a id="prerequisites"></a>

## ⚙️ Prerequisites

<details>
<summary>📂 Repository Setup</summary>

- Clone the auth0-acul-react-boilerplate repository:
  ```bash
  git clone https://github.com/auth0-samples/auth0-acul-react-boilerplate.git
  cd auth0-acul-react-boilerplate
  ```
  </details>

<details>
<summary>🔧 Node.js Environment</summary>

- Node.js version 22 or above is required
- Check your current version: `node -v`
- We recommend using NVM (Node Version Manager) to manage Node.js versions:
  - Install NVM:
    - For macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
    - For Windows: Install [nvm-windows](https://github.com/coreybutler/nvm-windows)
  - Install and use Node.js v22:
  ```bash
  nvm install 22
  nvm use 22
  ```
  </details>

<details>
<summary>📦 Dependencies Installation</summary>

- Install dependencies:
  ```bash
  npm install
  ```
  </details>

<a id="quick-start"></a>

## 🚀 Quick Start

1. Start local development for a specific screen:

   ```bash
   # View a specific screen component
   # Replace <screen_name> with the desired screen (e.g., login-id, login-password, signup-id)
   npm run screen <screen_name>

   # Examples:
   npm run screen login-id
   npm run screen login-password
   ```

   This command loads the specified screen component with its corresponding mock data (e.g., `src/mock-data/login-id.json`) in your browser for local development. The `scripts/dev-screen.js` utility handles setting the `VITE_SCREEN_NAME` environment variable, which `src/utils/mockContextLoader.ts` uses to inject the correct mock context.

<a id="project-structure"></a>

## 📁 Project Structure

```
auth0-acul-samples/
├── .github/             # GitHub Actions workflows for CI/CD
│   └── actions/         # Custom GitHub Actions
│       └── configure-auth0-screens/ # Action for configuring Auth0 screens
├── dist/                # Production build output
├── scripts/             # Node.js helper scripts for development
│   └── dev-screen.js    # Script to run a specific screen with mock data
├── src/                 # Source files
│   ├── common/          # Shared, reusable UI components (grouped by function)
│   │   ├── Button/      # e.g., Button components
│   │   ├── Input/       # e.g., Input components
│   │   ├── Layout/      # e.g., Layout templates like AuthScreen
│   │   ├── Link/        # e.g., Link components like SignupLink
│   │   ├── Alert/       # e.g., ErrorMessages
│   │   └── ...          # etc. (other functional groups)
│   ├── constants/       # Project-wide constant values
│   │   └── validScreens.js # List of valid screen names for the dev script
│   ├── screens/         # Login flow screens
│   │   └── [screen-name]/
│   │       ├── components/ # Components specific ONLY to this screen
│   │       │   └── ...
│   │       ├── hooks/      # Hooks specific ONLY to this screen
│   │       └── index.tsx   # Main screen component
│   ├── mock-data/       # Mock data JSON files for local screen development (e.g., login-id.json)
│   └── utils/           # Shared utility functions
│       └── mockContextLoader.ts # Utility to load mock sdk values to render screen in dev
└── ...                  # Build and configuration files
```

<a id="screens"></a>

## 🖥️ Screens

This template includes implementations for several Universal Login screens that match Auth0's design language:

- **Login Screen** (`src/screens/login/`)

  - Main login screen with username/email and password
  - Matches the standard Auth0 Universal Login design

- **Login ID Screen** (`src/screens/login-id/`)

  - Username/email input step in a multi-step login flow
  - Follows Auth0's Identifier First authentication pattern

- **Login Password Screen** (`src/screens/login-password/`)
  - Password entry step in a multi-step login flow
  - Matches Auth0's password screen design

Each screen component is designed to be used with the Auth0 ACUL JavaScript SDK in production, but uses mock data for local development.

<a id="development-workflow"></a>

## 🔄 Development Workflow

### Local Development with Mock Data

For local development, each screen component is provided with mock data in folder `mock-data` for sdk to render screens. To work on a specific screen:

```bash
npm run screen <screen_name>
```

This command, managed by `scripts/dev-screen.js`:

1. Validates the `<screen_name>` and checks for a corresponding `src/mock-data/<screen_name>.json` file.
2. Sets the `VITE_SCREEN_NAME` environment variable.
3. Starts the Vite development server.
4. The application (`src/main.tsx` via `src/utils/mockContextLoader.ts`) then uses `VITE_SCREEN_NAME` to dynamically load and inject the appropriate mock data for that screen.
5. This allows you to see and interact with the UI of the specific screen component locally.

The screen components include proper integration with Auth0 ACUL SDK methods (like `handleLogin`, `handleSocialLogin`, etc.), but these methods won't perform actual authentication in this local mock data development environment.

<a id="technical-details"></a>

## 🔍 Technical Details

### Application Mounting in ACUL

In an Auth0 Advanced Customization for Universal Login (ACUL) environment, Auth0 provides the main HTML page. Your custom application, built with this template, doesn't bundle its own `index.html`. Instead, it needs to be dynamically injected into the DOM provided by Auth0.

The `src/main.tsx` file handles this by:

1. Creating a new `div` element.
2. Assigning it an `id` (e.g., `root`).
3. Appending this `div` to the `document.body`.
4. Mounting the React application into this newly created `div`.

This ensures your custom UI is correctly rendered within the Auth0-hosted page. Here's a conceptual overview of how this is done in `src/main.tsx`:

```typescript
const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);
```

### Auth0 ACUL SDK Integration

This template demonstrates how to integrate screen components with the Auth0 ACUL JavaScript SDK. Each screen follows these patterns:

- Initialize the appropriate SDK class for the screen (e.g., `LoginId`, `Login`, `LoginPassword`)
- Set up proper form handling with the SDK methods
- Handle errors and loading states appropriately
- Follow Auth0's Universal Login design language

### Styling with Tailwind CSS

The project uses Tailwind CSS for styling, with a configuration designed to match Auth0's Universal Login design language. Here's how theming is approached:

- **Core Theme Colors**: Defined as CSS custom properties (e.g., `--color-primary`, `--color-link`) within an `@theme` block in `src/index.css`. This method, aligned with Tailwind CSS v4.x, allows Tailwind to automatically generate utility classes like `bg-primary` or `text-link` from these variables.
- **Global Base Styles**: General styles like the base `font-family` and `line-height` for the application are set in a `:root` block within `src/index.css`.
- **Tailwind Configuration (`tailwind.config.js`)**:
  - This file extends Tailwind's default theme.
  - For colors, it references the CSS variables defined in `src/index.css` (e.g., `theme.extend.colors.primary = 'var(--color-primary)'`).
  - Other theme aspects like `spacing`, `fontSize`, `fontWeight`, `lineHeight`, and `borderRadius` are configured directly in this file, as the `src/tokens` directory (which previously held JavaScript-based tokens) has been removed.
- **Component Styling**: Individual components and screens currently use inline Tailwind utility classes for styling (e.g., `className="bg-primary text-white ..."`).

Refer to `src/index.css` for the core color definitions and `tailwind.config.js` for how these and other theme aspects are integrated into Tailwind.

<a id="documentation"></a>

## 📚 Documentation

### Advanced Custom Universal Login (ACUL)

Auth0's Advanced Custom Universal Login (ACUL) allows you to create highly customized authentication experiences using your own design system and components. ACUL gives you complete control over the UI while Auth0 handles the security aspects of authentication.

Learn more about ACUL in the [Auth0 ACUL Documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations).

### ACUL JavaScript SDK

The ACUL JavaScript SDK provides screen classes and authentication methods for building advanced custom login experiences with Auth0. It enables you to integrate authentication screens (login, signup, passwordless, passkey enrollment, etc.) into your web applications by providing the necessary screen managers and authentication APIs.

Explore the [ACUL API documentation](https://auth0.github.io/universal-login/modules/Classes.html) to learn about all available modules and classes.

<a id="troubleshooting"></a>

## ❓ Troubleshooting

### Common Issues

<details>
<summary>Components not displaying properly in local development</summary>

- **Issue**: Screen components don't display or display incorrectly
- **Solution**:
  1. Check the browser console for errors related to missing mock data
  2. Verify that the screen name is correct and matches a directory in `src/screens/`
  3. Ensure all dependencies are installed correctly
  </details>

### Getting Help

- **GitHub Issues**: Report issues or request features through [GitHub Issues](https://github.com/auth0/auth0-acul-react-boilerplate/issues)
- **Auth0 Community**: Ask questions in the [Auth0 Community](https://community.auth0.com/)
- **Auth0 Documentation**: Visit the [Auth0 ACUL Documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) for more information
