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

   This command loads the specified screen component with its corresponding mock data (e.g., `src/mock-data/login-id.json`) in your browser for local development. The `scripts/dev-screen.js` utility handles setting the `VITE_SCREEN_NAME` environment variable, which `src/utils/screen/mockContextLoader.ts` uses to inject the correct mock context.

<a id="project-structure"></a>

```
auth0-acul-samples/
├── .github/             # GitHub Actions workflows for CI/CD
│   ├── config/          # Deployment configuration files
│   │   ├── deploy_config.yml        # Controls which screens to deploy
│   │   ├── screen-to-prompt-mapping.js  # Maps screens to Auth0 prompts
│   │   └── context-configuration.js     # Auth0 context data configuration
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
│       ├── theme/       # Auth0 theming system
│       └── screen/      # Screen utilities including mockContextLoader.ts
└── ...                  # Build and configuration files
```

<a id="screens"></a>

## 🖥️ Screens

This template includes implementations for several Universal Login screens that match Auth0's design language:

- **Login ID Screen** (`src/screens/login-id/`)

  - Username/email input step in a multi-step login flow
  - Follows Auth0's Identifier First authentication pattern

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
4. The application (`src/main.tsx` via `src/utils/screen/mockContextLoader.ts`) then uses `VITE_SCREEN_NAME` to dynamically load and inject the appropriate mock data for that screen.
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

➡️ **[GitHub Actions Configuration](./.github/GITHUB_ACTIONS.md)** - For quick reference on secrets and configuration

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

<a id="testing"></a>

## Testing

This project uses [Jest](https://jestjs.io/) for unit and integration testing of screen components.

### Running Tests

To run the entire test suite:

```bash
npm test
```

Run per screens tests

```bash
npm test -- --testPathPatterns="<screen_name>"
```

<a id="technical-details"></a>

## 🔍 Technical Details

### Styling with Tailwind CSS

The project uses Tailwind CSS with a semantic Auth0 theme token system that automatically applies tenant branding.

**1. Auth0 Theme System (`src/utils/theme/`)**

The theme system converts Auth0 branding data into CSS variables with semantic naming:

```tsx
// In any screen component
import { applyAuth0Theme } from "@/utils/theme";

function LoginScreen() {
  const { loginIdInstance } = useLoginIdManager();

  // Apply Auth0 theme automatically
  applyAuth0Theme(loginIdInstance);

  return <div>...</div>;
}
```

**2. CSS Variables (`src/index.css`)**

Default theme tokens are defined with Auth0 design system values:

```css
@theme {
  --ul-theme-color-primary-button: #635dff;
  --ul-theme-color-widget-background: #ffffff;
  --ul-theme-border-button-border-radius: 3px;
  --ul-theme-font-title-size: 1.5rem;
  /* ... 49+ semantic tokens */
}
```

**3. Component Styling**

Components use semantic Tailwind classes that map to theme tokens:

```tsx
// Automatically reflects tenant branding
<button className="bg-primary-button text-primary-button-label rounded-button">
  Continue
</button>
<div className="bg-widget-background border-widget rounded-widget">
  Content
</div>
```

The system supports **Organization > Theme > Settings** precedence and scales to 80+ screen types without modification.

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

- **GitHub Issues**: Report issues or request features through [GitHub Issues](https://github.com/auth0-samples/auth0-acul-samples/issues)
- **Auth0 Community**: Ask questions in the [Auth0 Community](https://community.auth0.com/)
- **Auth0 Documentation**: Visit the [Auth0 ACUL Documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations) for more information
