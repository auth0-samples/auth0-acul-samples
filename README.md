# Auth0 Advanced Customizations for Universal Login Samples

This monorepo provides production-ready templates for creating custom Auth0 Advanced Customizations for Universal Login (ACUL) screens. Each sample demonstrates different implementation approaches and SDK integrations while following Auth0's design language and user experience patterns.

**What is ACUL?** Advanced Customizations for Universal Login (ACUL) allows you to build custom, client-rendered versions of Universal Login screens, giving you complete control over your authentication experience. ACUL uses a client/server model where you have full control over the client-side interface while leveraging the security, extensibility, and flexibility of Universal Login's hosted authentication on the server side.

> **⚠️ Important Notes**
>
> - **Enterprise Feature**: Requires Enterprise Auth0 plan and verified custom domain

## Available Samples

### [React-JS Sample](./react-js/)
- **SDK**: Auth0 ACUL JS SDK (`@auth0/auth0-acul-js`)
- **Screens**: 3 authentication screens
  - Login (universal login)
  - Login-ID (identifier-first flow)
  - Login-Password (password entry)
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Development**: Integrated context inspector for real-time debugging

<table>
  <tr>
    <td width="50%" align="center">
      <img 
        src="https://github.com/user-attachments/assets/800077f0-bb17-427b-bb56-80f676698986" 
        alt="Login ID Screen with mock data"
        width="100%" />
      <br />
      <sub><em>Login-id screen local development with ul-context-inspector</em></sub>
    </td>
    <td width="50%" align="center">
      <img 
        src="https://github.com/user-attachments/assets/dc7dd554-be25-4939-b1cd-c4a882355dba" 
        alt="Login ID Screen deployed with ACUL"
        width="100%" />
      <br />
      <sub><em>Login-id screen production deployment with ACUL</em></sub>
    </td>
  </tr>
</table>


### [React Sample](./react/)
- **SDK**: Auth0 ACUL React SDK (`@auth0/auth0-acul-react`)
- **Screens**: 31 authentication screens
  - **Login & Authentication (5)**: Login, Login-ID, Login-Password, Login-Passwordless-Email-Code, Login-Passwordless-SMS-OTP
  - **Signup & Registration (3)**: Signup, Signup-ID, Signup-Password
  - **Password Reset (4)**: Reset-Password-Request, Reset-Password-Email, Reset-Password, Reset-Password-Error
  - **Multi-Factor Authentication (15)**: MFA-Begin-Enroll-Options, MFA-Country-Codes, MFA-Email-Challenge, MFA-Email-List, MFA-Enroll-Result, MFA-Login-Options, MFA-Push-Challenge-Push, MFA-Push-Enrollment-QR, MFA-Push-List, MFA-Push-Welcome, MFA-SMS-Challenge, MFA-SMS-Enrollment, MFA-SMS-List, MFA-WebAuthn-Platform-Challenge, MFA-WebAuthn-Platform-Enrollment
  - **Passkeys (2)**: Passkey-Enrollment, Passkey-Enrollment-Local
  - **Identifier Management (2)**: Email-Identifier-Challenge, Phone-Identifier-Challenge
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Development**: Integrated context inspector for real-time debugging

<table>
  <tr>
    <td width="50%" align="center">
      <img 
        src="https://github.com/user-attachments/assets/52376b2d-d25b-4155-873c-9d314af64c91" 
        alt="Signup Screen with mock data"
        width="100%" />
      <br />
      <sub><em>Signup screen local development with ul-context-inspector</em></sub>
    </td>
    <td width="50%" align="center">
      <img 
        src="https://github.com/user-attachments/assets/01ce0c6f-1dea-4d24-ac58-61d7d7ca3390" 
        alt="Signup Screen deployed with ACUL"
        width="100%" />
      <br />
      <sub><em>Signup screen production deployment with ACUL</em></sub>
    </td>
  </tr>
</table>

## Table of Contents

- [Quick Start](#quick-start)
- [Development with ul-context-inspector](#development-with-ul-context-inspector)
- [Prerequisites](#prerequisites)
- [Screens](#screens)
- [Build Structure](#build-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

<a id="quick-start"></a>

## Quick Start

### React-JS Sample (Auth0 ACUL JS SDK)

```bash
# Navigate to the React-JS sample
cd react-js

# Install dependencies
npm install

# Start development server with context inspector
npm run dev  # Opens http://localhost:3000
```

The development server includes an integrated context inspector that lets you visualize and edit the Auth0 Universal Login context in real-time, switch between screens, and test different scenarios.

<a id="development-with-ul-context-inspector"></a>

## Development with ul-context-inspector

`ul-context-inspector` is a developer panel that simulates Auth0's Universal Login context using local mock data, enabling development without an Enterprise Auth0 tenant.

**How it works:**
- **Development**: Loads mock JSON from `public/screens/` → No Auth0 connection needed
- **Production**: Uses real Auth0 context from `window.universal_login_context`

### Creating Local Mocks

1. Add screen mocks in `public/screens/{prompt}/{screen}/`:
   - `default.json` - Default state
   - `with-errors.json` - Error state

2. Register in `public/manifest.json`:
```json
{
  "versions": ["v2", "v0"],
  "screens": [
    {
      "login": {
        "login": {
          "path": "/screens/login/login",
          "variants": ["default", "with-errors"]
        }
      }
    }
  ]
}
```

3. Run `npm run dev` - screens appear in the inspector automatically!

<a id="prerequisites"></a>

## Prerequisites

**For Local Development:**

- Node.js version 22+ (`node -v` to check)

**For Production Use:**

- Auth0 tenant with verified custom domain
- Enterprise Auth0 plan (for ACUL access)

> **Open Source Contributors:** You can explore and contribute to this codebase without needing an Auth0 Enterprise plan using the development context inspector.

<details>
<summary>Need to install Node.js?</summary>

We recommend using NVM (Node Version Manager):

- macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
- Windows: Install [nvm-windows](https://github.com/coreybutler/nvm-windows)

```bash
nvm install 22
nvm use 22
```

</details>

### Testing with Real Auth0

Once you're ready to test with actual Auth0 authentication:

```bash
# Navigate to the React-JS sample
cd react-js

# Build and serve assets locally
npm run build
npx serve dist -p 8080 --cors

# Install Auth0 CLI and configure (Enterprise tenants only)
npm install -g @auth0/auth0-cli
auth0 login

# Configure ACUL with settings file
auth0 ul customize --rendering-mode advanced --prompt login-id --screen login-id --settings-file ./settings.json
```

**About settings.json:** This file contains the same ACUL payload configuration as shown in the [Build Structure](#build-structure) section. It defines how Auth0 should load your custom screen assets, including CSS files, JavaScript bundles, and context configuration. The settings.json file structure is identical to the payload you'd use when configuring ACUL programmatically.

> **⚠️ Use development/testing tenants only**

<a id="screens"></a>

## Screens

The main screen implementations are located in:

- **React-JS Sample**: [`react-js/src/screens/`](./react-js/src/screens/) - 3 screens
- **React Sample**: [`react/src/screens/`](./react/src/screens/) - 31 screens

Each screen is designed to integrate with the [Auth0 ACUL SDK](https://github.com/auth0/universal-login).

<a id="build-structure"></a>

## Build Structure

**About manifest.json:** The `manifest.json` file at the project root defines the available templates and screens for the `auth0-cli` tool, enabling developers to scaffold projects with `auth0 acul init` by specifying which files and directories to include for each framework and screen combination.

Vite compiles each screen as a separate entry point for optimized loading:

```bash
# Navigate to the React or React-JS sample
cd react  # or cd react-js

# Build optimized assets
npm run build

# Serve locally for testing
npx serve dist -p 8080 --cors
```

**Output Structure:**

```
dist/
├── index.html                           # Main entry point
└── assets/
    ├── main.[hash].js                   # Main application bundle
    ├── shared/
    │   ├── style.[hash].css             # Global styles (Tailwind + Auth0 theme)
    │   ├── react-vendor.[hash].js       # React + ReactDOM (~324 kB)
    │   ├── vendor.[hash].js             # Third-party dependencies (~196 kB)
    │   └── common.[hash].js             # Shared app code (~87 kB)
    └── [screen-name]/
        └── index.[hash].js              # Screen-specific code (0.9-6 kB)
```

**Bundle Strategy:**
- **react-vendor**: Contains React and ReactDOM for better caching across deploys
- **vendor**: Contains all other third-party packages (captcha providers, utilities)
- **common**: Shared application code (components, hooks, utilities)
- **Screen bundles**: Only screen-specific logic, optimized for fast loading

Screen-specific bundles can be deployed independently for incremental rollouts.

<details>
<summary>ACUL Payload Configuration Example (settings.json)</summary>

When configuring Auth0 ACUL for a specific screen, your settings.json file will reference the built assets:

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
        "src": "https://your-cdn-domain.com/assets/shared/react-vendor.[hash].js",
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
        "src": "https://your-cdn-domain.com/assets/shared/common.[hash].js",
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

Reference these built assets in your Auth0 ACUL configuration.

</details>

<a id="deployment"></a>

## Deployment

This repository includes GitHub Actions workflows for automated deployment. See [DEPLOYMENT.md](./react/DEPLOYMENT.md) for complete setup instructions.

<details>
<summary>Enabling Screens for Deployment</summary>

Control which screens are deployed by modifying [`react/.github/config/deploy_config.yml`](./react/.github/config/deploy_config.yml):

```yaml
default_screen_deployment_status:
  "login-id": true # Enable for deployment
  "signup": false # Disable for deployment
```

</details>

<a id="contributing"></a>

## Contributing

We welcome contributions! Here's how you can help:

**Getting Started:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes using the development server: `npm run dev`
4. Test thoroughly: `npm test`
5. Submit a pull request

**What to Contribute:**

- Bug fixes and improvements
- Documentation updates
- Test coverage improvements
- Component enhancements

**Development Guidelines:**

- Follow the existing code patterns in `react-js/src/screens/` or `react/src/screens/`
- Use TypeScript for type safety
- Follow the Auth0 design system principles
- Include tests for new functionality
- Use `npm run dev` to start the development server with context inspector

<a id="documentation"></a>

## Documentation

- **[Auth0 ACUL Documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations)** - Official ACUL guide

<a id="troubleshooting"></a>

## Troubleshooting

### Common Issues

<details>
<summary>Screen not loading or showing blank page</summary>

**Symptoms:** Browser shows blank page or loading spinner
**Solutions:**

1. Check browser console for JavaScript errors
2. Ensure all dependencies installed: `npm install`
3. Try clearing browser cache and restarting dev server: `npm run dev`
</details>

### Getting Help

- **Bug Reports:** [Create an issue](https://github.com/auth0-samples/auth0-acul-samples/issues/new) with reproduction steps
- **Community Discussion:** [Auth0 Community Forum](https://community.auth0.com/)
- **Documentation:** [Auth0 ACUL Docs](https://auth0.com/docs/customize/login-pages/advanced-customizations)
- **Feature Requests:** [Open a discussion](https://github.com/auth0-samples/auth0-acul-samples/discussions)
