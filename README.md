# Auth0 Advanced Customizations for Universal Login Template

This project provides a production-ready template for creating custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, and Tailwind CSS. It demonstrates how to build high-quality authentication screens that replicate Auth0's Universal Login design language and functionality using the [Auth0 ACUL JavaScript SDK](https://github.com/auth0/universal-login).

ACUL enables enterprise customers with custom domains to replace Auth0's default authentication screens with their own custom-built interfaces, providing complete control over the authentication user experience while leveraging Auth0's security infrastructure.

> **⚠️ Important Notes**
>
> - **Early Access Feature**: ACUL is currently in Early Access (EA) and not yet Generally Available (GA)
> - **Work in Progress**: This template repository is actively being developed as we continue to add new screens and functionality
> - **Custom Domain Required**: ACUL requires a verified custom domain in your Auth0 tenant

## 📑 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Screens](#screens)
- [Build Structure](#build-structure)
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

**Prerequisites:**

- Node.js >=22.0.0

**Install project dependencies:**

```bash
npm install
```

  </details>

<a id="quick-start"></a>

## 🚀 Getting Started - Three Ways to Run

### 1. **Local Development** (Recommended for building screens)

Develop and test screens locally using mock data:

```bash
# Install dependencies
npm install

# Run a specific screen with mock data
npm run screen <screen_name>

# Example: Run the login-id screen
npm run screen login-id
```

This loads the screen at `http://localhost:3000` using realistic mock data from `src/mock-data/`. Perfect for developing new screens or customizing existing ones.

### 2. **Locally Serving Assets** (Testing with real Auth0 flow)

Test your screens with actual Auth0 authentication:

```bash
# Build the project
npm run build

# Serve the built assets locally
npx serve dist -p 8080 --cors
```

**Configure Advanced Rendering Mode:**

> **⚠️ Warning**: Only use development/testing tenants when configuring advanced rendering mode. Configuring production tenants may affect live customers.

Using Auth0 CLI to enable advanced mode for your screens:

```bash
# Install Auth0 CLI
npm install -g @auth0/auth0-cli

# Login to your Auth0 tenant
auth0 login

# Configure a screen for advanced rendering (example format)
auth0 ul customize --rendering-mode advanced --prompt login-id --screen login-id --settings-file settings.json
```

> **📖 For complete CLI documentation and examples, see:** [Auth0 ACUL SDK Quickstart](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/sdk-quickstart)

**Test with a Real Application:**

Use any Auth0 quickstart application (e.g., [React SPA quickstart](https://auth0.com/docs/quickstart/spa/react/interactive)) with configuration:

```javascript
// Example configuration (use your actual values)
{
  "domain": "https://your-tenant.your-custom-domain.com",  // Your custom domain
  "clientId": "your_client_id_here",
  "audience": "https://your-tenant.auth0.com/api/v2/"     // Optional
}
```

**About Advanced Rendering Mode:**

- **Standard Mode**: Uses Auth0's default Universal Login screens
- **Advanced Mode**: Uses your custom screens hosted at the configured URL
- Switch between modes anytime using the [Auth0 CLI](https://auth0.github.io/auth0-cli/auth0_universal-login_switch.html)

### 3. **Automated Production Deployment**

Deploy your screens automatically using CI/CD:

This repository includes GitHub Actions workflows that build, deploy, and configure your screens automatically. While the current [DEPLOYMENT.md](./DEPLOYMENT.md) focuses on AWS S3/CloudFront setup, you can adapt the pipeline for other providers like Cloudflare, Vercel, or any CDN by using the existing workflow as a reference.

<a id="screens"></a>

## 🖥️ Screens

The main screen implementations are located in [`src/screens/`](./src/screens/), with each screen designed to integrate with the [Auth0 ACUL JavaScript SDK](https://github.com/auth0/universal-login).

<a id="build-structure"></a>

## 🏗️ Build Structure

The project uses Vite to create an optimized build structure where each screen is compiled as a separate entry point, enabling selective loading and better performance for Auth0 ACUL deployments.

### Output Structure

When you run `npm run build`, the project generates the following structure in the `dist/` directory:

```
dist/
├── index.html                           # Main entry point
├── assets/
│   ├── main.[hash].js                   # Main application bundle
│   ├── shared/
│   │   ├── style.[hash].css             # Global styles (single CSS file)
│   │   ├── common.[hash].js             # Shared components and utilities
│   │   └── vendor.[hash].js             # Third-party dependencies (React, etc.)
│   └── [screen-name]/
│       ├── index.[hash].js              # Screen-specific code
│       └── chunk.[hash].js              # Screen-specific chunks (if any)
```

### Key Build Features

Each screen in `src/screens/` becomes a separate JavaScript bundle with shared dependencies optimized for CDN distribution and caching.

### How to Build and Serve Assets

```bash
# Build optimized assets for production
npm run build

# Serve locally for testing
npx serve dist -p 8080 --cors

# Assets are ready for deployment to any CDN or hosting service
```

The build process creates screen-specific bundles that can be deployed independently, allowing you to roll out screens incrementally.

### ACUL Payload Configuration

When configuring Auth0 ACUL for a specific screen, your payload will reference the built assets:

```json
{
  "rendering_mode": "advanced",
  "context_configuration": [
    "branding.settings",
    "branding.themes.default",
    "screen.texts"
  ],
  "default_head_tags_disabled": false,
  "head_tags": [
    {
      "tag": "base",
      "attributes": {
        "href": "https://your-cdn-domain.com/"
      }
    },
    {
      "tag": "meta",
      "attributes": {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1"
      }
    },
    {
      "tag": "link",
      "attributes": {
        "rel": "stylesheet",
        "href": "https://your-cdn-domain.com/assets/shared/style.[hash].css"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "https://your-cdn-domain.com/assets/main.[hash].js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "https://your-cdn-domain.com/assets/shared/common.[hash].js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "https://your-cdn-domain.com/assets/shared/vendor.[hash].js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "https://your-cdn-domain.com/assets/login-id/index.[hash].js",
        "type": "module"
      }
    }
  ]
}
```

Reference these built assets in your Auth0 ACUL configuration to load only the screen-specific code needed.

<a id="deployment"></a>

## 📤 Deployment

Automated deployment workflows are included for AWS S3/CloudFront. See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.

### Enabling Screens for Deployment

Control which screens are deployed by modifying [`.github/config/deploy_config.yml`](./.github/config/deploy_config.yml):

```yaml
# .github/config/deploy_config.yml
default_screen_deployment_status:
  "login-id": true # Enable for deployment
  "signup": false # Disable for deployment
  # ... other screens ...
```

<a id="technical-details"></a>

## 🔍 Technical Details

<details>
<summary>🔄 Development Workflow</summary>

### Local Development with Mock Data

For local development, each screen component is provided with mock data in folder [`src/mock-data/`](./src/mock-data/) for sdk to render screens. To work on a specific screen:

```bash
npm run screen <screen_name>
```

This command, managed by [`scripts/dev-screen.js`](./scripts/dev-screen.js):

1. Validates the `<screen_name>` and checks for a corresponding `src/mock-data/<screen_name>.json` file.
2. Sets the `VITE_SCREEN_NAME` environment variable.
3. Starts the Vite development server.
4. The application ([`src/main.tsx`](./src/main.tsx) via [`src/utils/screen/mockContextLoader.ts`](./src/utils/screen/mockContextLoader.ts)) then uses `VITE_SCREEN_NAME` to dynamically load and inject the appropriate mock data for that screen.
5. This allows you to see and interact with the UI of the specific screen component locally.

The screen components include proper integration with Auth0 ACUL SDK methods (like `handleLogin`, `handleSocialLogin`, etc.), but these methods won't perform actual authentication in this local mock data development environment.

### Auth0 ACUL SDK Integration

This template demonstrates how to integrate screen components with the Auth0 ACUL JavaScript SDK. Each screen follows these patterns:

- Initialize the appropriate SDK class for the screen (e.g., `LoginId`, `Login`, `LoginPassword`) typically within a custom hook in `src/screens/[screen-name]/hooks/use<ScreenName>Manager.ts`.
- Screen-specific UI logic and form handling are often encapsulated in sub-components within `src/screens/[screen-name]/components/`, which utilize the screen's custom hooks (manager and form hooks) for data and actions.
- Set up proper form handling with the SDK methods.
- Handle errors and loading states appropriately.

</details>

<details>
<summary>🎨 Styling with Tailwind CSS</summary>

The project uses Tailwind CSS with a semantic Auth0 theme token system that automatically applies tenant branding.

**1. Auth0 Theme System ([`src/utils/theme/`](./src/utils/theme/))**

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

**2. CSS Variables ([`src/index.css`](./src/index.css))**

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

</details>

<details>
<summary>⚙️ Build Configuration</summary>

Uses Vite with custom configuration for automatic screen discovery and optimized bundling. See [`vite.config.ts`](./vite.config.ts) for details.

</details>

<details>
<summary>🚀 GitHub Actions & CI/CD</summary>

Includes automated workflows for building, deploying to AWS S3/CloudFront, and configuring Auth0 tenants. See [DEPLOYMENT.md](./DEPLOYMENT.md) for setup.

</details>

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
