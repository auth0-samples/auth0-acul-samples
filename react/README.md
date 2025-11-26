# Auth0 ACUL React Sample (React SDK)

This sample demonstrates how to build custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, Tailwind CSS, and the **Auth0 ACUL React SDK**.

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

The development server includes **ul-context-inspector** - a tool for local development without an Auth0 tenant.

**What it does:**
- Simulates Auth0's Universal Login context using local mock JSON files
- Enables instant screen switching, variant testing, and context editing
- Automatically removed from production builds

**Development vs Production:**
- **Development**: Uses local mocks from `public/screens/` (no Auth0 required)
- **Production**: Uses real Auth0 context from `window.universal_login_context`

### Adding Mock Data

Create mock files in `public/screens/{prompt}/{screen}/`:

```bash
mkdir -p public/screens/login/login
```

Add `default.json` and `with-errors.json`:
```json
{
  "screen": {
    "name": "login",
    "texts": { "pageTitle": "Log in | Auth0" }
  },
  "tenant": { "name": "your-tenant" }
}
```

Register in `public/manifest.json`:
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

Restart `npm run dev` - the screen appears in the inspector automatically!

## Build Output

The Vite build process generates optimized bundles with code splitting:

```
dist/
├── index.html                           # Main entry point
└── assets/
    ├── main.[hash].js                   # Main application bundle
    ├── shared/
    │   ├── style.[hash].css             # Global styles (Tailwind + Auth0 theme)
    │   ├── react-vendor.[hash].js       # React core (~194 kB)
    │   ├── vendor.[hash].js             # Third-party dependencies (~347 kB)
    │   └── common.[hash].js             # Shared app code (~95 kB)
    └── [screen-name]/
        └── index.[hash].js              # Screen-specific code (0.9-6 kB)
```

**Bundle Strategy:**

- **react-vendor**: React + ReactDOM for optimal caching
- **vendor**: Third-party packages (captcha providers, form libraries, utilities)
- **common**: Shared components, hooks, and utilities from src/
- **Screen bundles**: Minimal screen-specific logic for fast loading

Each screen can be deployed independently for incremental rollouts.

## Features

- **Auth0 ACUL React SDK Integration**: Uses `@auth0/auth0-acul-react`
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Auth0 Design System**: Implements Auth0's design language with theme support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **CI/CD Ready**: GitHub Actions workflow for automated deployment
- **Development Tools**: Integrated context inspector for real-time Auth0 context visualization and manipulation

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with optimized code splitting (react-vendor, vendor, common, screen bundles)
- **Styling**: Tailwind CSS v4 with Auth0 theme engine
- **Auth SDK**: @auth0/auth0-acul-react
- **Testing**: Jest + React Testing Library
- **UI Components**: Custom ULTheme components following Auth0 design system

## Project Structure

```
react/
├── src/
│   ├── screens/           # 31 authentication screens
│   ├── components/        # Reusable themed UI components
│   ├── hooks/            # React hooks for auth flows
│   ├── utils/            # Helper utilities and theme engine
│   ├── test/             # Test utilities and setup
│   └── types/            # TypeScript definitions
├── .github/workflows/    # Deployment automation
└── ...config files
```

## Deployment

This sample includes a GitHub Actions workflow for automated deployment to AWS S3. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions or [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for workflow details.

## Documentation

For detailed documentation, refer to the main repository README and Auth0 ACUL documentation.
