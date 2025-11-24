# Auth0 ACUL React Sample (JS SDK)

This sample demonstrates how to build custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, Tailwind CSS, and the **Auth0 ACUL JS SDK**.

## Features

- 🔐 **Auth0 ACUL JS SDK Integration**: Uses `@auth0/auth0-acul-js`
- ⚡ **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS
- 🎨 **Auth0 Design System**: Uses Auth0's Universal Design System (UDS) components
- 🧪 **Testing**: Comprehensive test suite with Jest and React Testing Library
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🚀 **CI/CD**: GitHub Actions workflow for automated deployment
- 🔍 **Development Tools**: Integrated context inspector for real-time Auth0 context visualization and manipulation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server with context inspector
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Serve built files locally for testing
npx serve dist -p 8080 --cors
```

## Development with Context Inspector

The development server includes **ul-context-inspector** - a developer panel that simulates the Auth0 Universal Login context using local mock data. This enables offline development without requiring an Auth0 tenant.

**Key Benefits:**
- No Auth0 tenant or custom domain required
```

## Development with Context Inspector

The development server includes **ul-context-inspector** - a powerful tool for local development without requiring an Auth0 tenant.

### What is ul-context-inspector? �

`ul-context-inspector` is a developer panel that simulates the Auth0 Universal Login context (`window.universal_login_context`) using local mock data. This enables complete offline development and testing.

### Using the Inspector

When you run `npm run dev`, the inspector panel automatically appears with:

- **Screen selector** - Switch between all 3 screens instantly
- **Variant toggle** - Test default vs error states
- **Context editor** - Modify any context property in real-time
- **Data source** - Choose mock versions or custom data
- **Live preview** - See changes immediately

### Creating Local Mocks

Mock data is stored in `public/screens/` with this structure:

```
public/screens/
  {prompt}/
    {screen}/
      default.json       # Default state mock
      with-errors.json   # Error state mock
```

**Example: Adding a new screen mock**

1. Create the directory structure:
```bash
mkdir -p public/screens/login/login
```

2. Add mock files (`default.json`, `with-errors.json`):
```json
{
  "screen": {
    "name": "login",
    "data": {},
    "texts": {
      "pageTitle": "Log in | Auth0"
    }
  },
  "organization": null,
  "client": {
    "metadata": {}
  },
  "tenant": {
    "name": "your-tenant"
  }
}
```

3. Register in `public/manifest.json`:
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

## Development with Context Inspector

The development server includes **ul-context-inspector** - a developer panel that simulates the Auth0 Universal Login context using local mock data. This enables offline development without requiring an Auth0 tenant.

**Key Benefits:**
- No Auth0 tenant or custom domain required
- Instant context updates with live reload
- Switch between screens and variants easily
- Version controlled mock data in `public/screens/`

**Development vs Production:**
- Development: Uses local JSON files, instant updates, works offline
- Production: Requires Auth0 Enterprise tenant with custom domain

**Adding Mock Data:**
1. Create directory: `public/screens/{prompt}/{screen}/`
2. Add `default.json` and `with-errors.json` with context structure
3. Register in `public/manifest.json` under `screens` array
4. Restart dev server

**Note:** Inspector is automatically removed from production builds.

## Build Output

The Vite build process generates optimized bundles with code splitting:

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
- **react-vendor**: React and ReactDOM for optimal caching
- **vendor**: Third-party packages (captcha providers, utilities)
- **common**: Shared components and utilities from src/
- **Screen bundles**: Minimal screen-specific logic for fast loading

Each screen can be deployed independently for incremental rollouts.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with optimized code splitting (react-vendor, vendor, common, screen bundles)
- **Styling**: Tailwind CSS v4
- **Auth SDK**: @auth0/auth0-acul-js
- **Testing**: Jest + React Testing Library
- **UI Components**: Auth0 UDS Base Components

## Project Structure

```
react-js/
├── src/
│   ├── screens/           # Authentication screens
│   ├── components/        # Reusable UI components
│   ├── utils/            # Helper utilities
│   └── types/            # TypeScript definitions
├── .github/workflows/    # Deployment automation
└── ...config files
```

## Deployment

This sample includes a GitHub Actions workflow for automated deployment to AWS S3. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions or [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for workflow details.

## Documentation

For detailed documentation, refer to the main repository README and Auth0 ACUL documentation.
