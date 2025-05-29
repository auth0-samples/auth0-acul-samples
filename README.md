# Auth0 Advanced Customizations for Universal Login Template

This project provides a template for creating custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, and Tailwind CSS. It's designed to help you build screens that match Auth0's Universal Login design language.

## 📑 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Screens](#screens)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Technical Details](#technical-details)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

<a id="prerequisites"></a>

## ⚙️ Prerequisites

<details>
<summary>📂 Repository Setup</summary>

- Clone the auth0-acul-samples repository:
  ```bash
  git clone https://github.com/auth0-samples/auth0-acul-samples.git
  cd auth0-acul-samples
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
│   ├── config/          # Deployment configuration files
│   │   ├── deploy_config.yml        # Controls which screens to deploy
│   │   ├── screen-to-prompt-mapping.json  # Maps screens to Auth0 prompts
│   │   └── context-configuration.json     # Auth0 context data configuration
│   ├── actions/         # Custom GitHub Actions
│   │   └── configure-auth0-screens/ # Action for configuring Auth0 screens
│   └── workflows/       # GitHub workflow definitions
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
│   │       ├── hooks/      # Hooks specific ONLY to this screen (e.g., use<ScreenName>Manager, use<ScreenName>Form)
│   │       └── index.tsx   # Main screen component, orchestrates components from its ./components/ folder.
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

### Auth0 ACUL SDK Integration

This template demonstrates how to integrate screen components with the Auth0 ACUL JavaScript SDK. Each screen follows these patterns:

- Initialize the appropriate SDK class for the screen (e.g., `LoginId`, `Login`, `LoginPassword`) typically within a custom hook in `src/screens/[screen-name]/hooks/use<ScreenName>Manager.ts`.
- Screen-specific UI logic and form handling are often encapsulated in sub-components within `src/screens/[screen-name]/components/`, which utilize the screen's custom hooks (manager and form hooks) for data and actions.
- Set up proper form handling with the SDK methods.
- Handle errors and loading states appropriately.

<a id="deployment"></a>

## 📤 Deployment

### Automated Deployment with GitHub Actions

This boilerplate includes a GitHub Actions workflow to automate the process of:

1. Building your customized ACUL screens
2. Uploading the assets to an AWS S3 bucket
3. Configuring your Auth0 tenant to use these assets in Advanced mode
4. Serving the assets through a CDN for optimal performance

**For detailed setup instructions including AWS S3, CloudFront, IAM roles, Auth0 M2M applications, and GitHub secrets, please refer to the comprehensive deployment guide:**

➡️ **[DEPLOYMENT.md](./DEPLOYMENT.md)**

➡️ **[GitHub Actions Configuration](./.github/README.md)** - For quick reference on secrets and configuration

### Enabling Screens for Advanced Mode Deployment

To control which screens are deployed and configured for Advanced Mode in your Auth0 tenant, you need to modify the `.github/config/deploy_config.yml` file.

This YAML file contains a list of all available ACUL screens. To enable a specific screen for deployment in Advanced Mode, find its entry in the `default_screen_deployment_status` map and change its value from `false` to `true`.

For example, to enable the `login-id` and `signup` screens:

```yaml
# .github/config/deploy_config.yml
default_screen_deployment_status:
  "email-identifier-challenge": false
  # ... other screens ...
  "login-id": true # Was false, now true to enable deployment
  # ... other screens ...
  "signup": true # Was false, now true to enable deployment
  # ... other screens ...
```

Only screens set to `true` in this configuration file will be processed by the deployment workflow for Advanced Mode. This allows you to selectively roll out your custom screens.

<a id="technical-details"></a>

## 🔍 Technical Details

### Styling with Tailwind CSS

The project uses Tailwind CSS for styling, with a configuration designed to match Auth0's Universal Login design language and support dynamic theming based on tenant/organization branding.

**1. Default Theme Variables (`src/index.css`)**

Base theme colors and other CSS custom properties are defined with default values in `src/index.css`:

```css
/* src/index.css */
@theme {
  --color-primary: #0059d6; /* Default primary color */
  --color-link: #007bad;
  --color-background-page: #f9fafb;
  --color-background-widget: #ffffff;
  --logo-url-string: "https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg";
  /* ... other variables ... */
}

:root {
  /* You can also define variables here */
}
```

**2. Dynamic Theming (`src/context/BrandingProvider.tsx`)**

A `BrandingProvider` component dynamically adjusts the theme:

- It consumes the `universal_login_context` (from Auth0 tenant settings in production, or `src/mock-data/*.json` locally).
- Using a helper (`getThemeValue`), it selects the appropriate branding values (e.g., organization's primary color, logo URL) based on a defined precedence.
- It then updates the CSS custom properties on the HTML root element in real-time (e.g., `document.documentElement.style.setProperty('--color-primary', resolvedPrimaryColor);`).

**3. Component Styling**

Components use standard Tailwind utility classes. These classes automatically reflect the dynamic theme because they are mapped to the CSS variables that `BrandingProvider` updates.

```tsx
// Example in a screen component
// This div will use the dynamically set --color-background-widget
<div className="bg-background-widget p-4">
  {/* This button will use the dynamically set --color-primary */}
  <button className="bg-primary text-white">Continue</button>
</div>
```

For direct JavaScript access to resolved theme values (e.g., a logo URL for an `<img>` tag), components can use the `useBranding` hook provided by `BrandingProvider`.

This setup ensures that UI elements adapt to specific tenant or organization branding, providing a consistent user experience.

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
